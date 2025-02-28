'use client'
import { useEffect, useState } from 'react';
import LoginPage from '../components/Login/LoginPage';

export default function ProfilePage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) {
    return <LoginPage />;
  }
  console.log('widgetId:', process.env.NEXT_PUBLIC_WIDGET_ID);
  console.log('captchaSiteKey:', process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Личный кабинет</h2>
      <p>Здесь можно отобразить имя пользователя, фото и т.д.</p>
    </div>
  );
}