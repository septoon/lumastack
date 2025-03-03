// import { NextRequest, NextResponse } from 'next/server';
// import { AuthDataValidator } from '@telegram-auth/server';
// import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

// const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_AUTH_BOT_TOKEN || '';

// export async function GET() {
//   return NextResponse.json({ message: 'API работает!' });
// }

// export async function POST(req: NextRequest) {
//   if (!BOT_TOKEN) {
//     return NextResponse.json({ error: 'BOT_TOKEN не установлен' }, { status: 500 });
//   }

//   try {
//     const body = await req.json();

//     // Создаем URLSearchParams из объекта body
//     const searchParams = new URLSearchParams();
//     Object.entries(body).forEach(([key, value]) => {
//       searchParams.append(key, String(value));
//     });

//     const data = urlStrToAuthDataMap(searchParams);
//     const validator = new AuthDataValidator({ botToken: BOT_TOKEN });

//     const user = await validator.validate(data);

//     return NextResponse.json({ success: true, user });
//   } catch (error) {
//     console.error('Ошибка валидации Telegram:', error);
//     return NextResponse.json({ error: 'Ошибка авторизации' }, { status: 400 });
//   }
// }