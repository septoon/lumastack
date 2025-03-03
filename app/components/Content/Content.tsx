'use client';

import React, { useState } from 'react';
import { TextTyping } from '@/app/common/Text/TextTyping';
import OrderModal from '../Modal/OrderModal';

const Content: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex items-center justify-center w-full h-auto">
        <div className={`flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center animate-float`}>
          <h1 className="text-4xl tracking-tight font-unbounded 
          font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-gradientLight1 via-gradientLight2 to-gradientLight3
          max-w-full sm:text-5xl md:text-6xl">
            Создаем IT-продукты для роста вашего бизнеса
          </h1>
          <div className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            <TextTyping speed={20} text="От разработки ботов до сложных приложений - качественно, с гарантией и прозрачными условиями." />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="
          mt-5 max-w-sm mx-auto rounded-2xl text-black dark:text-white bg-btn-light dark:bg-btn-dark shadow-lg border-2 border-gradientLight1 hover:border-gradientLight2 cursor-pointer sm:flex sm:justify-center md:mt-8 transition-all duration-300 hover:scale-105">
            <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-btn-dark dark:text-btn-light md:py-4 md:text-lg md:px-10">
              Зказать
            </p>
          </button>
        </div>
        <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Content;
