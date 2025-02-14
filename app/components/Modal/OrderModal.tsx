'use client';

import React from 'react';
import Form from '@/app/components/Contact/Form';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    onClick={onClose}>
      <div className="bg-white dark:bg-darkGray rounded-lg p-6 max-w-lg w-full shadow-lg animate-slideUp" 
      onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}>
          ✖
        </button>
        <h3 className="text-xl font-semibold text-center mb-4">Оставьте заявку</h3>
        <Form />
      </div>
    </div>
  );
};

export default OrderModal;