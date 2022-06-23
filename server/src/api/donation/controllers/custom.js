
const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
module.exports = createCoreController('api::donation.donation', ({ strapi }) => ({
    async createStripeSession(ctx) {
        console.log(process.env.STRIPE_SECRET_KEY);
        const { item } = ctx.request.body;
        const transformedItem = {
            price_data: {
                currency: item.currency,
                product_data: {
                    images: [item.image],
                    name: item.name,
                }, unit_amount: item.price * 100,
            },
            description: item.description ? item.description : "No description",
            quantity: 1,
        };
        const redirect_url = process.env.NODE_ENV === 'production' ? "http://compassion.toptechonly.com" : "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [transformedItem],
            mode: 'payment',
            success_url: redirect_url + '/api/success',
            cancel_url: redirect_url + '/api/cancel',
        });
        try {

            let donation = await strapi.query("api::donation.donation").create({
                data: {
                    payment_id: session.id,
                    success: false,
                    charity: item.charity,
                    amount: item.price,
                    comment: item.comment,
                    user: item.user,
                    fund_raise: item.fund_raise,
                    publishedAt: new Date().toISOString()
                }
            });
            let fund_raiser = await strapi.query("api::fund-raise.fund-raise").findOne({
                where: {
                    id: item.fund_raise
                }
            });
            let updated_fund_raiser = await strapi.query("api::fund-raise.fund-raise").update({
                where: {
                    id: item.fund_raise
                }, data: {
                    fund_raised: fund_raiser.fund_raised + donation.amount,
                    donations_count: fund_raiser.donations_count + 1
                }
            });
            console.log("-------------- updated fund_raiser ------------------- ");
            console.log(updated_fund_raiser);
            console.log("-------------- updated fund_raiser ------------------- ");
            ctx.send({ id: session.id });
        } catch (err) {
            ctx.send({ error: err.message })
        }
    },

    async donationSuccess(ctx) {
        const endpointSecret = "whsec_6zIGcwrsY5HOgQnOEkNzZL1d4vcMSEuo";

        const sig = ctx.request.body['stripe-signature'];
        const rawBody = ctx.request.body['raw-body'];
        let event;
        try {
            if (!sig || !rawBody) return;
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

        } catch (err) {
            // ctx.res.status(400).send(`Webhook Error: ${err.message}`);
            console.log('------------------ webhoook error -----------------')
            console.error(err.message);
            console.log('------------------ webhoook error -----------------')
            return ctx.res.status = 400;
            // .send(`Webhook Error: ${err.message}`);
        }
        if (event.type === 'checkout.session.completed') {
            let donation = await strapi.query("api::donation.donation").update({
                where: {
                    payment_id: event.data.object.id
                },
                data: {
                    success: true
                }
            })
            ctx.res.status = 200;
            console.log("-------------- updated donation ------------------- ");
            console.log(donation);
            console.log("-------------- updated donation ------------------- ");
        } else {
            if (event) {
                await strapi.query("api::donation.donation").delete({
                    where: {
                        payment_id: event.data.object.id
                    }
                })
            }
            ctx.res.status = 400;
        }
        console.log('------------------ webhoook event -----------------')
        console.log(event.data.object);

        console.log('------------------ webhoook event -----------------')
        console.log(`Unhandled event type ${event.type}`);
        // stripe-signature

    }
}))