import React from 'react'

const Works = () => {
  return (
    <div
    className={`min-h-screen w-full items-center py-24 opacity-0 animate-slideUp`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Проекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            id: 1,
            title: 'Меню ресторана',
            description: 'Интерактивное меню с функцией заказа и админ-панелью',
            image: '/images/projects/restaurant-menu.jpg',
            tech: 'ReactJS',
          },
          {
            id: 2,
            title: 'Сайт доставки еды',
            description: 'Полноценный сервис для заказа еды с личным кабинетом',
            image: '/images/projects/food-delivery.jpg',
            tech: 'NextJS',
          },
          {
            id: 3,
            title: 'Админ-панель',
            description: 'Панель управления для сайта доставки с интеграцией Telegram',
            image: '/images/projects/admin-panel.jpg',
            tech: 'ReactJS + Telegram Mini App',
          },
          {
            id: 4,
            title: 'Мобильное приложение',
            description: 'Нативное приложение для доставки еды',
            image: '/images/projects/mobile-app.jpg',
            tech: 'React Native/SwiftUI',
          },
          {
            id: 5,
            title: 'Нейро фотосессии',
            description: 'Сервис для генерации фотографий с помощью AI',
            image: '/images/projects/ai-photos.jpg',
            tech: 'Next.js + AI API',
          },
          {
            id: 6,
            title: 'Генерация видео',
            description: 'Платформа для создания видеоконтента с помощью нейросетей',
            image: '/images/projects/ai-video.jpg',
            tech: 'React + AI Integration',
          },
        ].map((project, index) => (
          <div
            key={project.id}
            className={`group bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
              transition-all duration-500 transform hover:-translate-y-2 opacity-100 animate-scaleUp hover:animate-pulse`}
            style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium">{project.tech}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Works