import { NextApiRequest, NextApiResponse } from 'next';

const subscribers: NextApiResponse[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const action = req.query.action;

  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (action === 'subscribe') {
    subscribers.push(res);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    return;
  } else if (action === 'get') {
    return res.status(200).send(subscribers.length);
  } else if (action === 'notify') {
    const msg = req.query.message;
    subscribers.forEach((sub) => {
      sub.write(`data: ${msg}\n`);
      // sub.write(`id: ${id}\n`);
      sub.write('\n');
    });
  }

  res.status(200).send('OK');
}
