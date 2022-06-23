import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('------------------- cancel ---------------------');
    console.log(req.headers);
    console.log(req.body);
    console.log('------------------- cancel ---------------------');
    res.send("cancel")
}