import { NextApiRequest, NextApiResponse } from "next";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { buffer } from 'micro'
// import Stripe from 'stripe'
// import axios from "axios";
const server_url = 'http://127.0.0.1:1337';
const opt: any = {}

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, opt);
    if (req.method === 'POST') {
        const sig = req.headers['stripe-signature'];
        const buf = await buffer(req);
        let checkout_res = await fetch(server_url + "/api/donations/success", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'stripe-signature': sig,
                'raw-body': buf
            })
        })

        // let event;
        // try {
        //     if (!sig) return;
        //     event = stripe.webhooks.constructEvent(buf, sig ,endpointSecret);
        // } catch (err) {
        //     // ctx.res.status(400).send(`Webhook Error: ${err.message}`);
        //     console.log('------------------ webhoook error -----------------')
        //     console.error((err as any).message);
        //     console.log('------------------ webhoook error -----------------')
        //     return res.status(400).send(`Webhook Error: ${(err as any).message}`);
        // }
        // console.log('------------------ webhoook event -----------------')
        // console.log(event);
        // console.log('------------------ webhoook event -----------------')
        console.log(checkout_res);

        res.status(checkout_res.status).send(checkout_res.body);
    }else{
        res.status(405);
        res.send("Method Not Allowed.")
    }
}
