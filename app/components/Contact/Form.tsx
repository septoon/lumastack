'use client';

import React, { useEffect, useState } from 'react';
import { useMask } from '@react-input/mask';
import axios from 'axios';
import * as UAParser from 'ua-parser-js';

function SuccessPopup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-fadeIn">
      <div className="bg-white dark:bg-darkGray rounded-lg p-8 max-w-sm mx-4 relative animate-slideUp">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="bg-green-100 rounded-full p-3">
            <svg
              className="w-12 h-12 text-green-500 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-center mt-4 mb-2">Спасибо!</h3>
        <p className="text-gray-600 text-center">
          Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    </div>
  );
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
  });

  const inputRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<{
    browser: string;
    os: string;
    device: string;
  }>({
    browser: '',
    os: '',
    device: '',
  });

  useEffect(() => {
    const parser = new UAParser.UAParser();
    const result = parser.getResult();

    setDeviceInfo({
      browser: `${result.browser.name || ''} ${result.browser.version || ''}`.trim(),
      os: `${result.os.name || ''} ${result.os.version || ''}`.trim(),
      device: result.device.type
        ? `${result.device.vendor || ''} ${result.device.model || ''} (${
            result.device.type
          })`.trim()
        : 'Desktop',
    });
  }, []);

  const validatePhone = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    return digitsOnly.length === 11;
  };

  const validateName = (value: string) => {
    return value.trim().length >= 2;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
    if (errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: false,
      }));
    }
  };

  const sendToTelegram = async (data: typeof formData) => {
    const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const message = `
🔔 Новая заявка с сайта:

👤 Имя: ${data.name}
📱 Телефон: ${data.phone}
💬 Сообщение: ${data.message || 'Не указано'}

📱 Информация об устройстве:
• Браузер: ${deviceInfo.browser}
• ОС: ${deviceInfo.os}
• Устройство: ${deviceInfo.device}
• Разрешение экрана: ${window.screen.width}x${window.screen.height}
• Время отправки: ${new Date().toLocaleString('ru-RU')}
    `.trim();

    try {
      await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      });
      return true;
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !validateName(formData.name),
      phone: !validatePhone(formData.phone),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendToTelegram(formData);
      if (success) {
        setFormData({ name: '', phone: '', message: '' });
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="flex rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.51)] h-auto p-[2em] w-1/2 sm:w-full">
      <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Имя *"
              value={formData.name}
              onChange={handleChange}
              className={`w-full dark:placeholder-white/80 p-2 text-black border border-gray-300 rounded dark:bg-[#ec704c] ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red">Введите имя (минимум 2 символа)</p>}

            <input
              ref={inputRef}
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`block dark:placeholder-white/80 w-full p-2 rounded-md shadow-sm dark:bg-[#ec704c] focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+7 (___) ___-__-__"
              type="tel"
              inputMode="numeric"
              id="phone"
              name="phone"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red">Введите корректный номер телефона</p>
            )}

            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Сообщение"
              className="w-full dark:placeholder-white/80 p-2 text-black border border-gray-300 rounded dark:bg-[#ec704c]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-2 bg-black text-white rounded ${
                errors.name || errors.phone ? 'bg-red' : 'bg-black'
              }`}>
              {isSubmitting ? 'Отправка...' : '>_ Отправить'}
            </button>
            {showSuccessPopup && <SuccessPopup />}
      </form>
    </div>
  );
};

export default Form;
