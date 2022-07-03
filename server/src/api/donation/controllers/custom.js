
const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const { Client, resources, Webhook } = require('coinbase-commerce-node')
Client.init('12f15316-5684-4134-9426-fc2296550f17');
const { Charge } = resources;
const server_url = process.env['NODE_ENV'] === "production" ? "https://toptechonly.com" : "http://localhost:3000"

async function sendMail(subject, html, text) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.FROM_EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: process.env.FROM_EMAIL, // sender address
            to: process.env.TO_EMAIL, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.error(error.message);
    }
}
module.exports = createCoreController('api::donation.donation', ({ strapi }) => ({
    async createStripeSession(ctx) {
        try {
            const { item } = ctx.request.body;
            if (!item.currency || !item.name || !item.price || item.price <= 0 || !item.fund_raise || !item.fundraiser_details['attributes']) {
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
            if (!item.fundraiser_details['attributes']['approved']) {
                throw Error("Fundraiser is not approved!");
            }
            if (item.fundraiser_details['attributes']['fund_raised'] + item.price > item.fundraiser_details['attributes']['fund_target']) {
                throw Error("Your donation is exceeding fundraiser's target.");
            }

            const redirect_url = process.env.NODE_ENV === 'production' ? "https://toptechonly.com" : "http://localhost:3000";
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
                    type: 'stripe',
                    fund_raise: item.fund_raise,
                    publishedAt: new Date().toISOString()
                },
                populate: { user: true, fund_raise: true }
            })

            var mail_subject = `${donation.amount} ${(donation.fund_raise.fund_type).toUpperCase()} to a fundraiser ${donation.fund_raise.title}`;
            var mail_html = `
                <h3> ${donation.user ? donation.user.username : 'Anonymous'} 
                    <b> donated ${donation.amount}<span>${donation.fund_raise.fund_type.toUpperCase()}</sapn></b>
                    to a fundraiser.
                 </h3>
                 <a href="${server_url}/admin/dashboard/donation/${donation.id}/details">details</a>
            `
            await sendMail(mail_subject, mail_html, mail_html);
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
                    ctx.res.status = 400;
                    return;
                } catch (error) { }
                try {
                    await strapi.query("api::charity-donation.charity-donation").delete({
                        where: {
                            payment_id: event.data.object.id
                        }
                    });
                    ctx.res.status = 400;
                    return;
                } catch (error) { }
                ctx.res.status = 400;
                return;
            }

            let donation = await strapi.query("api::donation.donation").findOne({
                where: {
                    payment_id: event.data.object.id
                },
                populate: { charity: true, fund_raise: true, user: true }
            })
            if (!donation) {
                donation = await strapi.query("api::charity-donation.charity-donation").findOne({
                    where: {
                        payment_id: event.data.object.id
                    },
                    populate: { charity: true, fund_raise: true, user: true }
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
            }
            ctx.res.status = 200;
        } catch (err) {
            // ctx.res.status(400).send(`Webhook Error: ${err.message}`);
            console.error(err.message);

            return ctx.res.status = 400;
            // .send(`Webhook Error: ${err.message}`);
        }


    },
    async createCharge(ctx) {
        try {

            const { item } = ctx.request.body;
            if (!item.currency || !item.name || !item.price || item.price <= 0 || !item.fund_raise || !item.fundraiser_details['attributes']) {
                throw Error("Invalid details!");
            }
            let charge = await Charge.create({
                name: item.name,
                description: item.description,
                local_price: {
                    amount: item.price,
                    currency: item.currency,
                }, pricing_type: 'fixed_price',
                metadata: {
                    data: {
                        name: item.name,
                    }
                },
            });
            if (!item.fundraiser_details['attributes']['approved']) {
                throw Error("Fundraiser is not approved!");
            }
            if (item.fundraiser_details['attributes']['fund_raised'] + item.price > item.fundraiser_details['attributes']['fund_target']) {
                throw Error("Your donation is exceeding fundraiser's target.");
            }
            let donation = await strapi.query("api::donation.donation").create({
                data: {
                    payment_id: charge.id,
                    success: false,
                    charity: item.charity,
                    amount: item.price,
                    comment: item.comment,
                    user: item.user,
                    type: 'crypto',
                    fund_raise: item.fund_raise,
                    publishedAt: new Date().toISOString()
                },
                populate: { user: true, fund_raise: true }
            })

            var mail_subject = `${donation.amount} ${(donation.fund_raise.fund_type).toUpperCase()} to a fundraiser ${donation.fund_raise.title}`;
            var mail_html = `
            <h3> ${donation.user ? donation.user.username : 'Anonymous'} 
                <b> donated ${donation.amount}<span>${donation.fund_raise.fund_type.toUpperCase()}</sapn></b>
                to a fundraiser.
             </h3>
             <a href="${server_url}/admin/dashboard/donation/${donation.id}/details">details</a>
        `
            await sendMail(mail_subject, mail_html, mail_html);

            ctx.send(charge);
        } catch (error) {
            console.log('---------------- error ----------------------');
            console.log(error.message);
            console.log('---------------- error ----------------------');
            ctx.send({ error: error.message }, 400)
        }
    },
    async coinbaseWebhookHandler(ctx) {
        try {
            const signature = ctx.request.body['webhook-signature'];
            const webhookSecret = process.env.COINBASE_WEBHOOK_KEY;
            const rawBody = ctx.request.body['raw-body'];
            const event = Webhook.verifyEventBody((rawBody), signature, webhookSecret);
            console.log('---------------- Event ----------------------');
            console.log(event);
            console.log('---------------- Event ----------------------');
            if (event.type === 'charge:confirmed') {
                let donation = await strapi.query("api::donation.donation").findOne({
                    where: {
                        payment_id: event.data.id
                    },
                    populate: { charity: true, fund_raise: true, user: true }
                })
                if (!donation) {
                    donation = await strapi.query("api::charity-donation.charity-donation").findOne({
                        where: {
                            payment_id: event.data.id
                        },
                        populate: { charity: true, fund_raise: true, user: true }
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
                }
                ctx.res.status = 200;
            }
        } catch (error) {
            console.log('---------------- error ----------------------');
            console.log(error);
            console.log('---------------- error ----------------------');
            ctx.send({ error: error.message }, 400)
        }
    }
}))