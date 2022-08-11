import { NextApiRequest, NextApiResponse } from "next";
const server_url = 'http://127.0.0.1:1337';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.send("success")
}