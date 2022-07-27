const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const { Client, resources, Webhook } = require('coinbase-commerce-node')
Client.init(process.env.COINBASE_API_KEY);
const { Charge } = resources;
async function sendMail(subject, html, text) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // true for 465, false for other ports
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
    } catch (error) {
        console.error(error.message);
    }
}
const server_url = process.env['NODE_ENV'] === "production" ? "https://toptechonly.com" : "http://localhost:3000"
module.exports = createCoreController('api::donation.donation', ({ strapi }) => ({
    async createStripeSession(ctx) {
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
            if (!item.user && item.new_user) {
                let new_user = await strapi.query("plugin::users-permissions.user").create(
                    {
                        data: {
                            username: item.new_user.username,
                            email: item.new_user.email,
                            password: item.new_user.password
                        }
                    }
                );
                item.user = new_user.id;
            }
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
    async createCharge(ctx) {
        try {

            const { item } = ctx.request.body;
            if (!item.currency || !item.name || !item.price || item.price <= 0 || !item.charity || !item.charity_details['attributes']) {
                throw Error("Invalid details!");
            }
            let charge = await Charge.create({
                name: item.name,
                description: item.description ? item.description : "No description",
                local_price: {
                    amount: item.price,
                    currency: item.currency,
                }, pricing_type: 'fixed_price',
            });
            if (!item.user && item.new_user) {
                let new_user = await strapi.query("plugin::users-permissions.user").create(
                    {
                        data: {
                            username: item.new_user.username,
                            email: item.new_user.email,
                            password: item.new_user.password
                        }
                    }
                );
                item.user = new_user.id;
            }
            let charity_donation = await strapi.query("api::charity-donation.charity-donation").create({
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
                populate: { user: true, charity: true }
            })

            var mail_subject = `${charity_donation.amount} ${(charity_donation.charity.fund_type).toUpperCase()} to a fundraiser ${charity_donation.charity.name}`;
            var mail_html = `
            <h3> ${charity_donation.user ? charity_donation.user.username : 'Anonymous'} 
                <b> donated ${charity_donation.amount}<span>${charity_donation.charity.fund_type.toUpperCase()}</span></b>
                to a fundraiser.
             </h3>
             <a href="${server_url}/admin/dashboard/charity-donation/${charity_donation.id}/details">details</a>
        `
            await sendMail(mail_subject, mail_html, mail_html);

            ctx.send(charge);
        } catch (error) {
            console.log('---------------- error ----------------------');
            console.log(error);
            console.log(error.message);
            console.log('---------------- error ----------------------');
            ctx.send({ error: error.message }, 400)
        }
    },
}))