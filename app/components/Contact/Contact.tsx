'use client';

import React, { useEffect, useState } from 'react';
import Form from './Form';
import { useInView } from '@/app/hooks/useInView';

const Contact: React.FC = () => {
  const [contactRef, contactInView] = useInView<HTMLDivElement>();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Следим за появлением компонента в зоне видимости и фиксируем анимацию
  useEffect(() => {
    if (contactInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [contactInView, hasAnimated]);

  return (
    <div
      ref={contactRef}
      className={`flex flex-col md:flex-row w-full h-screen opacity-0 ${
        hasAnimated ? 'animate-fadeIn opacity-100' : ''
      }`}
    >
      {/* Левая половина (Форма) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-end lg:items-center justify-center p-0 md:p-8 sm:px-4">
        <Form />
      </div>

      {/* Правая половина (Текст) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-5xl font-unbounded font-extrabold text-center ">
            Оставьте заявку!
        </h1>
      </div>
    </div>
  );
};

export default Contact;