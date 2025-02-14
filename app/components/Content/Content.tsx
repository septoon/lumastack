'use client';

import React, { useState } from 'react';
import Resume from '../../settings/resume.json';
import { TextTyping } from '@/app/common/Text/TextTyping';
import OrderModal from '../Modal/OrderModal';

const Content: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex items-center justify-center w-full h-auto">
        <div className={`flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center animate-float`}>
          <h1 className="text-4xl tracking-tight font-extrabold  max-w-[555px] sm:text-5xl md:text-6xl">
            Готовы развивать ваш бизнес
          </h1>
          <div className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            <TextTyping text="Создаем цифровые решения, которые имеют значение. Фокусируемся на разработке эффективных
              проектов через дизайн и программирование." />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="mt-5 max-w-sm mx-auto border rounded-2xl border-white/60 hover:border-blue/80 shadow-lg cursor-pointer sm:flex sm:justify-center md:mt-8">
            <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10">
              Зказать
            </p>
          </button>
        </div>
        <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Content;
