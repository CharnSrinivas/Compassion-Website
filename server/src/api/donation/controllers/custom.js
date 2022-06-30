
const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
module.exports = createCoreController('api::donation.donation', ({ strapi }) => ({
    async createStripeSession(ctx) {
        try {
            const { item } = ctx.request.body;
            if (!item.currency || !item.name || !item.price || item.price <= 0 || !item.fund_raise  || !item.fundraiser_details['attributes']) {
                throw Error("Invalid details!");
            }
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

            if (item.fundraiser_details['attributes']['fund_raised'] + item.price > item.fundraiser_details['attributes']['fund_target']) {
                throw Error("Your donation is exceeding fundraiser's target.");
            }

            const redirect_url = process.env.NODE_ENV === 'production' ? "http://compassion.toptechonly.com" : "http://localhost:3000";
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [transformedItem],
                mode: 'payment',
                success_url: redirect_url + '/my-donations/fundraiser-donations',
                cancel_url: redirect_url + '/api/cancel',
            });
            let donation = await strapi.query("api::donation.donation").create({
                data: {
                    payment_id: session.id,
                    success: false,
                    charity: item.charity,
                    amount: item.price,
                    comment: item.comment,
                    user: item.user,
                    type:'stripe',
                    fund_raise: item.fund_raise,
                    publishedAt: new Date().toISOString()
                }
            });
            ctx.send({ id: session.id }, 200);
        } catch (err) {
            console.log('---------------- error ----------------------');
            console.log(err.message);
            console.log('---------------- error ----------------------');
            ctx.send({ error: err.message }, 400)
        }
    },

    async donationSuccess(ctx) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

        const sig = ctx.request.body['stripe-signature'];
        const rawBody = ctx.request.body['raw-body'];
        let event;
        try {
            if (!sig || !rawBody) return;
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
            if (event.type !== 'checkout.session.completed') {
                try {
                    await strapi.query("api::donation.donation").delete({
                        where: {
                            payment_id: event.data.object.id
                        }
                    })
                } catch (error) { }
                try {
                    await strapi.query("api::charity-donation.charity-donation").delete({
                        where: {
                            payment_id: event.data.object.id
                        }
                    })
                } catch (error) { }
                ctx.res.status = 400;
            }

            let donation = await strapi.query("api::donation.donation").findOne({
                where: {
                    payment_id: event.data.object.id
                },
                populate: { charity: true, fund_raise: true }
            })
            if (!donation) {
                donation = await strapi.query("api::charity-donation.charity-donation").findOne({
                    where: {
                        payment_id: event.data.object.id
                    },
                    populate: { charity: true, fund_raise: true }
                })
            }
            if (donation.fund_raise) {
                if (!donation.fund_raise.approved) {
                    ctx.res.status = 400;
                    return;
                }
                let fund_raiser = await strapi.query("api::fund-raise.fund-raise").findOne({
                    where: {
                        id: donation.fund_raise.id
                    }
                });
                let updated_fund_raiser = await strapi.query("api::fund-raise.fund-raise").update({
                    where: {
                        id: donation.fund_raise.id
                    }, data: {
                        fund_raised: parseInt(fund_raiser.fund_raised) + parseInt(donation.amount),
                        donations_count: parseInt(fund_raiser.donations_count) + 1
                    }
                });
                await strapi.query("api::donation.donation").update({
                    where: {
                        payment_id: event.data.object.id
                    }, data: {
                        success: true
                    },
                    populate: { charity: true, fund_raise: true }
                })
                console.log(updated_fund_raiser);
            }
            if (donation.charity) {
                if (!donation.charity.approved) {
                    ctx.res.status = 400;
                    return;
                }
                let charity = await strapi.query("api::charity.charity").findOne({
                    where: {
                        id: donation.charity.id
                    }
                });
                let updated_charity = await strapi.query("api::charity.charity").update({
                    where: { id: donation.charity.id },
                    data: {
                        direct_funds: parseInt(charity.direct_funds) + parseInt(donation.amount),
                        direct_funds_count: parseInt(charity.direct_funds_count) + 1
                    }
                });
                await strapi.query("api::charity-donation.charity-donation").update({
                    where: {
                        payment_id: event.data.object.id
                    }, data: {
                        success: true
                    },
                    populate: { charity: true, fund_raise: true }
                })
                console.log(updated_charity);
            }

            ctx.res.status = 200;
        } catch (err) {
            // ctx.res.status(400).send(`Webhook Error: ${err.message}`);
            console.error(err.message);

            return ctx.res.status = 400;
            // .send(`Webhook Error: ${err.message}`);
        }


    }
}))