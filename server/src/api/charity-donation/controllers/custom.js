
const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
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
        const server_url = process.env['NODE_ENV'] === "production" ? "https://toptechonly.com" : "http://localhost:3000"

        const { item } = ctx.request.body;
        try {
            if (!item.currency || !item.name || !item.price || item.price <= 0 || !item.charity || !item.charity_details['attributes']) {
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
            const redirect_url = process.env.NODE_ENV === 'production' ? "https://toptechonly.com" : "http://localhost:3000";
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [transformedItem],
                mode: 'payment',
                success_url: redirect_url + '/my-donations/fundraiser-donations',
                cancel_url: redirect_url + '/api/cancel',
            });
            let charity_donation = await strapi.query("api::charity-donation.charity-donation").create({
                data: {
                    payment_id: session.id,
                    success: false,
                    charity: item.charity,
                    amount: item.price,
                    type: 'stripe',
                    comment: item.comment,
                    user: item.user,
                    publishedAt: new Date().toISOString()
                },
                populate: {
                    charity: true, user: true
                }
            });

            var mail_subject = `${charity_donation.amount} ${charity_donation.charity.fund_type} to a charity ${item.charity_details['attributes'].name}`;
            var mail_html =
                `
            <h3>
                ${charity_donation.user ? charity_donation.user.username : 'Anonymous'} 
                <b> donated ${charity_donation.amount}
                    <span>${charity_donation.charity.fund_type.toUpperCase()}</span>
                </b>
                to a charity.
            </h3>
            <a href="${server_url}/admin/dashboard/charity-donation/${charity_donation.id}/details">details</a>
            `
            await sendMail(mail_subject, mail_html, mail_html)
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