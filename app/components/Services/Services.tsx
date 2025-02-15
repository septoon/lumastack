'use client'
import React, { useEffect, useState } from 'react';
import { services } from '@/app/common/api/services';
import { useInView } from '@/app/hooks/useInView';

const Services = () => {
  const [servicesRef, servicesInView] = useInView<HTMLDivElement>();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Следим за появлением компонента в зоне видимости и устанавливаем флаг
  useEffect(() => {
    if (servicesInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [servicesInView, hasAnimated]);

  return (
    <div
      ref={servicesRef}
      className={`min-h-screen w-full items-center py-24 opacity-0 ${
        hasAnimated ? 'animate-slideInRight opacity-100' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Услуги и стоимость</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((serv, index) => (
            <div
              key={serv.id}
              className={`p-4 w-full bg-white/60 dark:bg-black/60 backdrop-blur-md text-black dark:text-white rounded-lg shadow-sm 
                opacity-0 ${
                  hasAnimated ? 'animate-scaleUp opacity-100' : ''
                }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-full h-full flex flex-col justify-between items-start">
                <h3 className="text-xl text-gray font-semibold mb-3">
                  {serv.service_name}
                </h3>
                <div>
                  <span className="my-3 text-gray">{serv.description}</span>
                  <div className="flex justify-between mt-3">
                    <span>{serv.execution_time}</span>
                    <span className="font-bold">{serv.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;