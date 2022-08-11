import { NextApiRequest, NextApiResponse, PageConfig } from "next";
const server_url = 'http://127.0.0.1:1337';

export const config:PageConfig = {
    api: {
        bodyParser:false
    },
}


function rawBody(req:NextApiRequest):Promise<string> {
    return new Promise((res,rej)=>{
        try {
            
            req.setEncoding('utf8');
            var data = '';
        
            req.on('data', function (chunk) {
                data += chunk;
            });
        
            req.on('end', function () {
                res(data);
            });
        } catch (error) {
            rej(error);
        }
    })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method === 'POST') {
        const sig = req.headers['x-cc-webhook-signature'];
        const raw_body = await rawBody(req);
        console.log('-------------------- Signature ---------------------');
        console.log(sig);
        console.log('-------------------- Signature ---------------------');
        
        let checkout_res = await fetch(server_url + "/api/donations/coinbase-webhook-handler", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'webhook-signature': sig,
                'raw-body': raw_body
            })
        })

        res.send(checkout_res);return;
    }
    res.send("Meathod not allowed.")
}
