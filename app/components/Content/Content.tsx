'use client';

import React from 'react';
import { TextDecrypt } from '../../common/Text/TextDecrypt';
import Resume from '../../settings/resume.json';
import { FirstName, LastName } from '../../utils/getName';
import { scrollToSection } from '@/app/common/scrollToSection';
import { TextTyping } from '@/app/common/Text/TextTyping';

const Content: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-auto">
        <div className={`flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center animate-float`}>
          <h1 className="text-4xl tracking-tight font-extrabold  max-w-[555px] sm:text-5xl md:text-6xl">
            {/* <TextTyping text="Готовы развивать ваш бизнес" /> */}
            <TextDecrypt text="Готовы развивать" />
            <TextDecrypt text="ваш бизнес" />
          </h1>
          <div className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            <TextTyping text="Создаем цифровые решения, которые имеют значение. Фокусируемся на разработке эффективных
              проектов через дизайн и программирование." />
          </div>
          <button className="mt-5 max-w-sm mx-auto bg-blue/60 hover:bg-blue/80 cursor-pointer sm:flex sm:justify-center md:mt-8">
            <p className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10">
              Начать проект
            </p>
          </button>
        </div>
    </div>
  );
};

export default Content;
