'use client';

import React, { FormEvent, useRef } from 'react';
import { TextDecrypt } from "../Text/TextDecrypt";
import { TextField } from '@mui/material';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    console.log(form.current)
  };

  return (
    <section id="contact" className="w-full h-full flex flex-col justify-center items-center py-8">
      <div className="flex sm:flex-col justify-between items-center w-[80%] sm:w-full">
        <div className="flex rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.51)] w-1/2 sm:w-full h-[28em] p-[2em]">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col w-full space-y-4"
          >
            <TextField
              id="outlined-name-input"
              label="Name"
              type="text"
              size="small"
              variant="filled"
              name="name"
              className="w-full p-2 text-black border border-gray-300 rounded"
            />
            <TextField
              id="outlined-password-input"
              label="Email"
              type="email"
              size="small"
              variant="filled"
              name="email"
              className="w-full p-2 text-black border border-gray-300 rounded"
            />
            <TextField
              id="outlined-password-input"
              label="Message"
              type="textarea"
              size="small"
              multiline
              minRows={5}
              variant="filled"
              name="message"
              className="w-full p-2 text-black border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-auto no-underline text-white bg-black p-[10px] rounded-[10px] hover:bg-[#ec704c]"
            >
              <i className="fa-solid fa-terminal"></i>
              <span>{`>_ Отправить`}</span>
            </button>
          </form>
        </div>
        <div className='flex w-1/2 justify-center'>
          <h1 className="font-bold text-7xl w-[60%]">
            <TextDecrypt text=" Закажи сейчас." />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Contact