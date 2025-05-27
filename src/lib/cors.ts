import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
    origin: ["https://sritanjung.sagaradev.com/", "http://localhost:5173", "https://langkah-sritanjung.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

export function runCorsMiddleware(req: NextApiRequest, res: NextApiResponse){
    return new Promise<void>((resolve, reject) => {
        cors(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve();
        })
    })
}