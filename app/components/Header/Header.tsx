'use client';

import React, { useState } from 'react';
import { NavMobile } from './nav-mobile';
import { NavDesktop } from './nav-desktop';
import Image from 'next/image';
import icon  from '@/public/images/luma-icon.svg'

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {

  const [activeNav, setActiveNav] = useState<string>('#home');

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="max-w-5xl mx-auto bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-full shadow-sm">
        <div className="flex h-16 justify-between items-center px-6">
          <div className='flex items-center text-yellow-400'>
          
          <Image src={icon} alt="Веб-студия разработки сайтов в Алуште, создание лендингов, интернет-магазинов, чат-ботов, нейросети, генерация фото и видео с AI - LumaStack" className='w-6 h-6 mr-2' />
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveNav('#home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xl font-unbounded font-semibold bg-clip-text text-transparent 
            bg-gradient-to-r from-gradientLight1 via-gradientLight2 to-gradientLight3`}>
              LumaStack
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavDesktop />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <a href="/profile">Sign In</a>
        </div>

      </nav>
    </header>
  );
};

const MemoizedHeader = React.memo(Header);
export default MemoizedHeader;
