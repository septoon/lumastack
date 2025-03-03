'use client';
import { FaTelegram } from "react-icons/fa";

const TelegramButton = () => {
  return (
    <a
      href={process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-20 group text-black dark:text-white"
      aria-label="Открыть чат с ботом">
      <div className="relative">
        {/* Основная кнопка */}
        <div className="bg-white dark:bg-dark h-12 rounded-full flex items-center w-auto justify-start pr-6 transform transition-all duration-500 ease-in-out translate-y-[4px] shadow-xl">
          {/* Иконка Telegram */}
          <div className="relative flex items-center justify-center w-8 h-8 mx-3 my-3">
            <FaTelegram size="2rem" />
          </div>
          {/* Текст */}
          <div className="flex flex-col items-start overflow-hidden">
            <span className="text-gray-700 font-medium text-sm whitespace-nowrap w-auto opacity-100 transition-all duration-500 ease-in-out">
              Чат с ботом
            </span>
            <span className="text-green-600 text-xs whitespace-nowrap w-auto opacity-100 transition-all duration-500 ease-in-out delay-100">
              Онлайн 24/7
            </span>
          </div>
        </div>
        {/* Декоративный элемент */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-30 blur transition-all duration-500 ease-in-out -z-10"></div>
      </div>
    </a>
  );
}

export default TelegramButton