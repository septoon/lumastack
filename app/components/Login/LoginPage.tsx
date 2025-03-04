'use client';

import React from 'react';
import { LoginButton } from '@telegram-auth/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/GlobalRedux/store';
import { setUser, fetchTelegramPhoto, postUserData } from '@/app/GlobalRedux/Features/userSlice';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleTelegramAuth = (user: TelegramUser) => {
    console.log('Данные от Telegram:', user);

    // 1) Сохраняем пользователя в Redux и localStorage
    dispatch(setUser(user));

    // 2) Если есть user.id, грузим фото из Telegram
    if (user.id) {
      setTimeout(() => {
        dispatch(fetchTelegramPhoto(user.id));
      }, 500);
    }

    // 3) Отправляем данные пользователя на сервер
    dispatch(postUserData(user));
  };

  const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME || 'default_bot_username';

  return (
    <div className="flex flex-col items-start justify-center">
      <h2 className="text-sm mb-4">Вход через Telegram</h2>
      <LoginButton
        botUsername={botUsername}
        onAuthCallback={handleTelegramAuth}
        buttonSize="large"
        cornerRadius={10}
        showAvatar={false}
        lang="ru"
        requestAccess="write"
      />
    </div>
  );
};

export default LoginPage;