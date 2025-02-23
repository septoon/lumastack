'use client'
import React, { useEffect, useState } from 'react';
import { useInView } from '@/app/hooks/useInView';

const About = () => {
  const [aboutRef, aboutInView] = useInView<HTMLDivElement>();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Следим за попаданием компонента в зону видимости и фиксируем это
  useEffect(() => {
    if (aboutInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [aboutInView, hasAnimated]);

  return (
    <div
      ref={aboutRef}
      className={`min-h-screen w-full items-center py-24 opacity-0 ${
        hasAnimated ? 'animate-slideInLeft opacity-100' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-unbounded font-bold mb-8">О нас</h2>
        <div className="prose lg:prose-xl max-w-none">
          <p className="mb-6 text-lg text-gray">
            Студия "LumaStack" из Алушты — это сообщество энтузиастов, которые верят в силу
            современного фронтенда и генеративных технологий. Мы работаем над веб‑приложениями,
            мобильными интерфейсами, Telegram Mini Apps, а также предлагаем нейро фотосессии,
            генерацию видео, голоса и текстов. Всё, чтобы бизнес клиентов всегда был на острие
            цифровых инноваций.
          </p>
          <p className="mb-6 text-lg text-gray">
            Мы, уже более трёх
            лет рулим ReactJS, NextJS и React Native. Мы считаем, что качественный интерфейс — это
            не просто кнопочки и цвета, а способ взаимодействия, от которого зависит успех любой
            идеи.
          </p>
          <p className="text-lg text-gray">
            Наша миссия — превратить ваши задумки в удобные цифровые продукты и расширить
            возможности бренда с помощью современных инструментов.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: 'Фронтенд', text: 'Создаем современные, адаптивные интерфейсы с использованием React, Next.js и TypeScript' },
              { id: 2, title: 'Мобильная разработка', text: 'Разрабатываем нативные приложения на React Native и SwiftUI' },
              { id: 3, title: 'AI & Нейросети', text: 'Создаем контент нового поколения: фото, видео, голос и тексты' },
            ].map((item, index) => (
              <div
                key={item.id}
                className={`bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white p-6 rounded-lg shadow-sm 
                  opacity-0 ${
                    hasAnimated ? 'animate-scaleUp opacity-100' : ''
                  }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h3 className="text-xl text-gray font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;