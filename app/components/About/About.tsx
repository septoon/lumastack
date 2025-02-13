import React from 'react'

const About = () => {
  return (
    <div
        className={`min-h-screen w-full items-center py-24 opacity-0 animate-slideInLeft`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">О нас</h2>
          <div className="prose lg:prose-xl max-w-none">
            <p className="mb-6 text-lg text-gray">
              Студия "Techno Art" из Алушты — это сообщество энтузиастов, которые верят в силу
              современного фронтенда и генеративных технологий. Мы работаем над веб‑приложениями,
              мобильными интерфейсами, Telegram Mini Apps, а также предлагаем нейро фотосессии,
              генерацию видео, голоса и текстов. Всё, чтобы бизнес клиентов всегда был на острие
              цифровых инноваций.
            </p>
            <p className="mb-6 text-lg text-gray">
              Наш основатель, <span className="font-semibold">Тигран Дарчинян</span>, уже более трёх
              лет рулит ReactJS, NextJS и React Native. Он считает, что качественный интерфейс — это
              не просто кнопочки и цвета, а способ взаимодействия, от которого зависит успех любой
              идеи.
            </p>
            <p className="text-lg text-gray">
              Мы смотрим в будущее с лёгким юмором:{' '}
              <span className="italic">
                "Хороший код продлевает жизнь! (Ну, как минимум он укрепляет нервную систему
                разработчиков)".
              </span>{' '}
              Наша миссия — превратить ваши задумки в удобные цифровые продукты и расширить
              возможности бренда с помощью современных инструментов.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl text-gray font-semibold mb-3">Фронтенд</h3>
                <p className="text-gray-600">
                  Создаем современные, адаптивные интерфейсы с использованием React, Next.js и
                  TypeScript
                </p>
              </div>
              <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl text-gray font-semibold mb-3">Мобильная разработка</h3>
                <p className="text-gray-600">
                  Разрабатываем нативные приложения на React Native и SwiftUI
                </p>
              </div>
              <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl text-gray font-semibold mb-3">AI & Нейросети</h3>
                <p className="text-gray-600">
                  Создаем контент нового поколения: фото, видео, голос и тексты
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default About