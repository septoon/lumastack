'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [phone, setPhone] = useState('+7');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  let messageKey = '';

  const sendAuthKeyFunc = async (key: string) => {
    console.log('sendAuthKeyFunc — key:', key);
    messageKey = key;

    return fetch('/api/sendCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });
  };

  // Функция, вызываемая при успешном вводе кода
  const onSuccessFunc = async () => {
    console.log('onSuccessFunc — пользователь ввёл верный код!');
    // Доп. проверка через /api/checkCode (если нужна) – здесь или до добавления пользователя

    // Добавляем пользователя в users.json
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, verified: true }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка добавления пользователя:', errorData);
        return;
      }
      const data = await response.json();
      console.log('Пользователь успешно добавлен:', data);

      // Сохраняем ID (или токен) в localStorage
      localStorage.setItem('authToken', data.user.id);

      alert('Номер телефона подтверждён!');
      router.push('/profile');
    } catch (error) {
      console.error('Ошибка сети при добавлении пользователя:', error);
    }
  };

  useEffect(() => {
    if (submitted && typeof window !== 'undefined') {
      const w = (window as any).VerifyWidget;
      if (w) {
        w.mount(
          '#sms-widget',
          {
            destination: phone,
            widgetId: process.env.NEXT_PUBLIC_I_DIGIT_WIDGET_ID,
            captchaSiteKey: process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY,
          },
          sendAuthKeyFunc,
          onSuccessFunc
        );
      } else {
        console.log('VerifyWidget не найден. Убедитесь, что скрипт загружен без async.');
      }
    }
  }, [submitted]);

  // Когда нажимают "Отправить SMS"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
  };

  return (
    <div style={{ margin: '2rem' }}>
      {!submitted ? (
        // Шаг 1: форма для ввода телефона
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
          <label>
            Введите номер телефона:
            <br />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '250px', marginTop: '0.5rem', color: 'black' }}
            />
          </label>
          <br />
          <button type="submit" style={{ marginTop: '1rem' }}>
            Отправить SMS
          </button>
        </form>
      ) : (
        // Шаг 2: контейнер, куда встраивается виджет
        <div>
          <h3>
            На номер <strong>{phone}</strong> отправлено SMS.
          </h3>
          <p>Введите код:</p>
          <div id="sms-widget" style={{ marginTop: '1rem' }} />
        </div>
      )}
    </div>
  );
}