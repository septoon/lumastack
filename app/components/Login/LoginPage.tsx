'use client';

import React from 'react';
import { LoginButton } from '@telegram-auth/react';
import { useDispatch } from 'react-redux';
import { fetchTelegramPhoto, setUser } from '@/app/GlobalRedux/Features/userSlice';
import { AppDispatch } from '@/app/GlobalRedux/store';

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

  const handleTelegramAuth = async (user: TelegramUser) => {
    console.log('Данные от Telegram:', user);
    dispatch(setUser(user));

    setTimeout(() => {
        if (user.id) {
            dispatch(fetchTelegramPhoto(user.id));
        }
    }, 500);
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