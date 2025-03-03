// import { NextRequest, NextResponse } from 'next/server';

// const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_AUTH_BOT_TOKEN || '';

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('user_id');

//   if (!userId) {
//     return NextResponse.json({ error: 'user_id не указан' }, { status: 400 });
//   }

//   try {
//     const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`);
//     const data = await response.json();

//     if (!data.ok || data.result.total_count === 0) {
//       return NextResponse.json({ error: 'Фото не найдено' }, { status: 404 });
//     }

//     const fileId = data.result.photos[0][0].file_id;

//     // Получаем прямую ссылку на фото
//     const fileResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
//     const fileData = await fileResponse.json();

//     if (!fileData.ok) {
//       return NextResponse.json({ error: 'Ошибка при получении файла' }, { status: 500 });
//     }

//     const filePath = fileData.result.file_path;
//     const photoUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

//     return NextResponse.json({ photo_url: photoUrl });
//   } catch (error) {
//     console.error('Ошибка загрузки фото Telegram:', error);
//     return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
//   }
// }