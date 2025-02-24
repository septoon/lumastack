'use client'
import { useInView } from '@/app/hooks/useInView';
import React, { useEffect, useState } from 'react';

const Works = () => {
  const [prefersDark, setPrefersDark] = useState(false);
  const [worksRef, worksInView] = useInView<HTMLDivElement>();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (worksInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [worksInView]);

  return (
    <div
      ref={worksRef}
      className={`min-h-screen py-24 w-full justify-center opacity-0 ${
        hasAnimated ? 'animate-slideUp opacity-100' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-unbounded font-bold mb-8">Проекты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              title: 'Студия лазерной эпиляции',
              description: 'Лендинг с функцией записи на прием и админ-панелью',
              image: '/images/empire.webp',
              tech: 'NextJS',
              url: "https://imperia-siyaniya.ru/"
            },
            {
              id: 2,
              title: 'Сайт доставки еды',
              description: 'Полноценный сервис для заказа еды с личным кабинетом',
              image: '/images/shd-web.webp',
              tech: 'NextJS',
              url: "https://shashlichny-dom.ru/"
            },
            {
              id: 3,
              title: 'Админ-панель',
              description: 'Панель управления для сайта доставки с интеграцией Telegram',
              image: !prefersDark ? '/images/shd-admin.webp' : '/images/shd-admin-dark.webp',
              tech: 'ReactJS + Telegram Mini App',
              url: "https://github.com/septoon/admin-shd"
            },
            {
              id: 4,
              title: 'Мобильное приложение',
              description: 'Нативное приложение для доставки еды',
              image: !prefersDark ? '/images/shd-light.webp' : '/images/shd-dark.webp',
              tech: 'React Native/SwiftUI',
              url: "https://www.rustore.ru/catalog/app/com.septon.shdapp"
            },
            {
              id: 5,
              title: 'Нейро фотосессии',
              description: 'Сервис для генерации фотографий с помощью AI',
              image: '/images/neuro.webp',
              tech: 'Flux + AI API',
              url: ""
            },
            {
              id: 6,
              title: 'Генерация видео',
              description: 'Платформа для создания видеоконтента с помощью нейросетей',
              video: '/videos/sample1.webm',
              tech: 'Kling + AI Integration',
              url: ""
            },
          ].map((project, index) => (
            <div
              key={project.id}
              className={`bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white transition-all duration-500 transform hover:translate-y-2 rounded-xl overflow-hidden shadow-md 
                opacity-0 ${
                  hasAnimated ? 'animate-slideUp opacity-100' : ''
                }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <a target="_blank" href={project.url}>
                <div className="relative h-48 overflow-hidden flex justify-center items-center">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-[90%] object-cover transition-transform duration-300 shadow-md rounded-lg transform hover:scale-105"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-[90%] object-cover transition-transform duration-300 rounded-lg transform hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray">{project.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;