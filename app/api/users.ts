// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // "https://api.lumastack.ru"

interface User {
  id: string;
  phone: string;
  verified: boolean;
  createdAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Получаем список пользователей из remote users.json
    try {
      const response = await fetch(`${API_URL}/api/data/users.json`);
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error || 'Ошибка получения данных' });
      }
      const users: User[] = await response.json();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Ошибка при обращении к API' });
    }
  } else if (req.method === 'POST') {
    // Добавляем нового пользователя
    try {
      const { phone, verified } = req.body;
      if (!phone) {
        return res.status(400).json({ error: 'Не указан номер телефона' });
      }
      
      // Сначала получаем текущих пользователей
      let users: User[] = [];
      const getResponse = await fetch(`${API_URL}/api/data/users.json`);
      if (getResponse.ok) {
        users = await getResponse.json();
      } else {
        // Если файл не существует или произошла ошибка, начинаем с пустого массива
        users = [];
      }
      
      // Формируем новую запись
      const newUser: User = {
        id: Date.now().toString(),
        phone,
        verified: verified ?? false,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      
      // Обновляем файл users.json с помощью PUT-запроса к вашему серверу
      const putResponse = await fetch(`${API_URL}/api/save/users.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users, null, 2),
      });
      
      if (!putResponse.ok) {
        const errorData = await putResponse.json();
        return res.status(putResponse.status).json({ error: errorData.error || 'Ошибка записи данных' });
      }
      
      return res.status(200).json({ message: 'Пользователь добавлен', user: newUser });
    } catch (error) {
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
  }
}