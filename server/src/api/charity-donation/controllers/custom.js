
const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
module.exports = createCoreController('api::donation.donation', ({ strapi }) => ({
    async createStripeSession(ctx) {
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
            success_url: redirect_url +  '/my-donations/fundraiser-donations',
            cancel_url: redirect_url + '/api/cancel',
        });
        try {
            let charity_donation = await strapi.query("api::charity-donation.charity-donation").create({
                data: {
                    payment_id: session.id,
                    success: false,
                    charity: item.charity,
                    amount: item.price,
                    comment: item.comment,
                    user: item.user,
                    publishedAt: new Date().toISOString()
                }
            })
            ctx.send({ id: session.id });
        } catch (err) {
            ctx.send({
                error: err.message
            })
        }
    },

    async donationSuccess(ctx) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_CHARITY_DONATIION_SUCCESS;

        const sig = ctx.request.body['stripe-signature'];
        const rawBody = ctx.request.body['raw-body'];
        let event;
        try {
            if (!sig || !rawBody) return;
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
            if (event.type === 'checkout.session.completed') {
                let updated_donation = await strapi.query("api::charity-donation.charity-donation").update({
                    where: {
                        payment_id: event.data.object.id
                    },
                    data: {
                        success: true
                    },
                    populate: { charity: true },
                });
                if (!updated_donation) {
                    ctx.res.status = 400;
                } else {
                    let charity = await strapi.query("api::charity.charity").findOne({
                        where: {
                            id: updated_donation.charity.id
                        }
                    });
                    let updated_charity = await strapi.query("api::charity.charity").update({
                        where: { id: updated_donation.charity.id },
                        data: {
                            direct_funds: charity.direct_funds + updated_donation.amount,
                            direct_funds_count: charity.direct_funds_count + 1
                        }
                    });

                    ctx.res.status = 200;
                                    }
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
        } catch (err) {
            // ctx.res.status(400).send(`Webhook Error: ${err.message}`);
            console.error(err.message);
            return ctx.res.status = 400;
            // .send(`Webhook Error: ${err.message}`);
        }

    }
}))