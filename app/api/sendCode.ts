import type { NextApiRequest, NextApiResponse } from 'next';

// В реальном проекте нужно хранить TOKEN_3 в .env и использовать process.env
const TOKEN_3 = 'Basic XXXXXXXXXX'; // Ваш токен в Base64

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { key } = req.body;
    if (!key) {
      return res.status(400).json({ error: 'No key provided' });
    }

    // Отправляем запрос на i-dgtl
    const response = await fetch('https://direct.i-dgtl.ru/api/v1/verifier/widget/send', {
      method: 'POST',
      headers: {
        Authorization: TOKEN_3,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to send code' });
    }

    const data = await response.json();
    // В data должен вернуться { messageUuid: 'SENT_MESSAGE_ID' }
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}