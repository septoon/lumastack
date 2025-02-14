'use client';

import React, { useState } from 'react';
import { TextDecrypt } from '../../common/Text/TextDecrypt';
import { scrollToSection } from '@/app/common/scrollToSection';
import { NavMobile } from './nav-mobile';
import { navigation } from '@/app/common/navigation';
import { NavDesktop } from './nav-desktop';

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
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('#home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-xl font-semibold hover:text-gray-600 transition-colors ${
              activeNav === '#home' ? 'text-[#ec704c]' : 'text-[#575757]'
            }`}>
            <TextDecrypt text="Techno Art" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavDesktop />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>

      </nav>
    </header>
  );
};

const MemoizedHeader = React.memo(Header);
export default MemoizedHeader;
