import { NextApiRequest, NextApiResponse } from "next";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from 'stripe'
const opt: any = {}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,opt);
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log(process.env.STRIPE_SECRET_KEY);
        
        const { item } = req.body;
        const transformedItem = {
            price_data: {
                currency: item.currency,
                product_data: {
                    images: [item.image],
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            description: item.description ? item.description : "No description",
            quantity: 1,
        };
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [transformedItem],
            mode: 'payment',
            success_url: 'http://localhost:3000/api/success',
            cancel_url: 'http://localhost:3000/api/cancel',
            
        });
        res.json({id:session.id});
    } else {
        res.status(405).send("Meathod not allowed");
    }
};