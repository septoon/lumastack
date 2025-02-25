import React from 'react';

const Footer = () => {
  return (
<footer className=" mb-4 mx-2 p-4 bg-white/60 dark:bg-black/60 rounded-lg backdrop-blur-md shadow-lg z-40">
  <div className="container mx-auto max-w-6xl flex flex-col justify-between items-start">
    <div className="flex flex-col items-start">
      <p className="text-sm mb-2">Почта: <a href="mailto:contact@lumastack.ru" className="hover:text-gray underline">contact@lumastack.ru</a></p>
      <p className="text-sm mb-2">Телефон: <a href="tel:+79786652048" className="hover:text-gray underline font-semibold">+7 978 665 20 48</a></p>
      <p className="text-sm mb-2">Адрес: г. Алушта</p>
      <p className="text-sm mb-2">Режим работы: ежедневно с 9 до 20:00</p>
    </div>

    <div className="flex flex-col sm:flex-row items-center mb-4">
      <a href="/privacy-policy" className="text-sm underline text-gray-400 hover:text-gray-200 mr-6">
        Политика конфиденциальности
      </a>
    </div>

    <div className="flex justify-center mt-4 sm:mt-0 self-center">
      <a href="https://lumastack.ru" className="text-sm">
        LumaStack Studio
      </a>
      <span className="sm:ml-4 text-sm">© 2024 Все права защищены.</span>
    </div>
  </div>
</footer>
  );
};

export default Footer;