'use client';

import React, { useEffect } from 'react';
import useDecrypt from '../../hooks/useDecrypt';

interface TextDecryptProps {
  text: string;
}

const decryptOptions = {
  chars: [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
],
  // chars: [
  //   '-', '.', '/', '*', '!', '?', '#', '%', '&', '@', '$', '€', '(', ')',
  //   '[', ']', '{', '}', '<', '>', '~', '0', '1', '2', '3', '4', '5', '6',
  //   '7', '8', '9', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
  //   'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч',
  //   'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',
  // ],
  interval: 50,
};

export const TextDecrypt: React.FC<TextDecryptProps> = ({ text }) => {
  const { result, dencrypt } = useDecrypt(decryptOptions);

  useEffect(() => {
    dencrypt(text || '');

    return () => {
      if (dencrypt) dencrypt(''); // Чистим при размонтировании
    };
  }, [dencrypt, text]);

  return <p>{result}&nbsp;</p>;
};