'use client';

import { useState, useRef, useCallback } from 'react';

interface DecryptOptions {
  chars: string[];
  interval: number;
}

interface UseDecryptReturn {
  result: string;
  dencrypt: (text: string) => void;
}

const useDecrypt = (options: DecryptOptions): UseDecryptReturn => {
  const { chars, interval } = options;
  const [result, setResult] = useState<string>('');
  const intervalRef = useRef<number | null>(null);

  const dencrypt = useCallback((text: string) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let currentIndex = 0; // Индекс для текущего символа
    let currentLength = 0; // Текущая длина строки
    const encryptedArray = Array.from({ length: text.length }, () => ''); // Инициализация пустой строки

    intervalRef.current = window.setInterval(() => {
      if (currentLength < text.length) {
        for (let i = 0; i <= currentLength; i++) {
          encryptedArray[i] = chars[Math.floor(Math.random() * chars.length)];
        }
        // Постепенно увеличиваем длину строки
        currentLength++;
      } else {
        // Продолжаем заменять случайные символы на целевые
        for (let i = 0; i < text.length; i++) {
          if (encryptedArray[i] !== text[i]) {
            encryptedArray[i] = chars[Math.floor(Math.random() * chars.length)];
          }
        }

        // Поочередно заменяем символы на целевые
        if (currentIndex < text.length) {
          encryptedArray[currentIndex] = text[currentIndex];
          currentIndex++;
        }
      }

      setResult(encryptedArray.join(''));

      // Завершаем, когда весь текст совпадает
      if (encryptedArray.join('') === text) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, interval);
  }, [chars, interval]);

  return { result, dencrypt };
};

export default useDecrypt;