import type { NextApiRequest, NextApiResponse } from 'next';

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (err?: unknown) => void
) => void;

export function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result?: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
}
