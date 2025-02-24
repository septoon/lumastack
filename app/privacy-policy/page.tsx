import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-4 ">
      <div className='w-24 my-6 ml-4 flex items-center justify-center px-10 py-2 bg-gradient-to-r from-gradientLight1 via-gradientLight2 to-gradientLight3 text-white rounded-lg shadow-lg 
        transform skew-x-[-15deg] transition-all duration-300 hover:scale-105 opacity-60'>
        <a href='/' className="font-bold font-unbounded"> Назад </a>
      </div>
        
      <div className='p-4 mt-6 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-md'>
        <h1 className="text-2xl font-semibold mb-4">Политика конфиденциальности</h1>
        <p className="mb-2">
          Мы ценим вашу конфиденциальность и стремимся защищать ваши персональные данные. Эта политика описывает, 
          как мы собираем, используем и защищаем информацию, которую вы предоставляете, заполняя форму на нашем сайте.
        </p>
        
        <h2 className="text-xl font-semibold mt-4 mb-2">Какие данные мы собираем?</h2>
        <p className="mb-2">
          Мы собираем следующие данные, которые вы предоставляете при отправке формы:
        </p>
        <ul className="list-inside list-disc mb-4">
          <li><strong>Имя:</strong> ваше имя, чтобы мы могли обратиться к вам по имени.</li>
          <li><strong>Телефон:</strong> для связи с вами по заявке.</li>
          <li><strong>Услуга:</strong> информация о том, какую услугу вы хотите заказать.</li>
          <li><strong>Комментарий:</strong> дополнительная информация или вопросы, которые вы хотите задать.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4 mb-2">Информация об устройстве</h2>
        <p className="mb-2">
          Мы также собираем информацию о вашем устройстве, чтобы улучшить качество обслуживания:
        </p>
        <ul className="list-inside list-disc mb-4">
          <li><strong>Браузер:</strong> используемый вами браузер.</li>
          <li><strong>ОС:</strong> операционная система вашего устройства.</li>
          <li><strong>Устройство:</strong> тип устройства (например, мобильное устройство или настольный ПК).</li>
          <li><strong>Разрешение экрана:</strong> разрешение экрана вашего устройства для улучшения интерфейса.</li>
          <li><strong>Время отправки:</strong> точное время, когда была отправлена заявка.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-4 mb-2">Как используются эти данные?</h2>
        <p className="mb-2">
          Мы используем собранную информацию для обработки вашего запроса, улучшения качества наших услуг и связи с вами. 
          Вся информация, полученная через форму, используется исключительно для обработки заявок.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Как мы защищаем ваши данные?</h2>
        <p className="mb-2">
          Все ваши данные передаются через защищенные каналы связи и не используются для других целей, кроме как для 
          обработки вашего запроса. Мы не передаем ваши данные третьим лицам без вашего согласия.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">Согласие</h2>
        <p className="mb-2">
          Отправляя форму, вы даете согласие на обработку ваших персональных данных в соответствии с нашей политикой 
          конфиденциальности.
        </p>

        <p className="mb-2">
          Если у вас есть вопросы о нашей политике конфиденциальности, пожалуйста, свяжитесь с нами.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;