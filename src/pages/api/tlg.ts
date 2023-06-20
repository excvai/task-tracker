import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  console.log(req.body, tgbot);

  res.status(200).send('OK');
}
