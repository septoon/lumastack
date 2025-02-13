'use client';

import React from 'react';
import Form from './Form';
import { TextTyping } from '@/app/common/Text/TextTyping';
import { TextDecrypt } from '@/app/common/Text/TextDecrypt';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Левая половина (Форма) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-0 md:p-8">
        <Form />
      </div>

      {/* Правая половина (Текст) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-5xl font-extrabold text-center">
          <TextDecrypt text="Закажи Сейчас" />
        </h1>
      </div>
    </div>
  );
};

export default Contact;