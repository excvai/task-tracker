import { NextApiRequest, NextApiResponse } from 'next';

const tgbot = process.env.NEXT_TELEGRAM_TOKEN;

const sendMessage = async (chatId: number, msg: string) => {
  const ret = await fetch(
    `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${chatId}&text=${msg}&parse_mode=HTML`
  );
  return ret;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  const chatId = req.body?.message?.chat?.id;
  if (!chatId) {
    return res.status(404).send('Chat ID is empty');
  }
  const [command, ...commandArgs] = req.body.message.text.split(' ');

  if (command === '/start') {
    const message =
      'Welcome to <i>NextJS News Channel</i> <b>' +
      req.body.message.from.first_name +
      '</b>.%0ATo get a list of commands sends /help';
    await sendMessage(chatId, message);
  }

  if (command === '/help') {
    const message =
      'Help for <i>NextJS News Channel</i>.%0AUse /search <i>keyword</i> to search for <i>keyword</i> in my Medium publication';
    await sendMessage(chatId, message);
  }

  if (command === '/newtask') {
    const message = 'New task was added!';
    await sendMessage(chatId, message);
  }

  res.status(200).send('OK');
}
