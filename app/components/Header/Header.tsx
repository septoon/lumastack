"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TextDecrypt } from "../Text/TextDecrypt"
import { StyledWrapper } from "./Burger";

const navigation = [
  { name: 'Проекты', href: '#works' },
  { name: 'О нас', href: '#about' },
  { name: 'Технологии', href: '#skills' },
  { name: 'Связаться', href: '#contact' },
];;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("#home");

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
    <nav className="max-w-5xl mx-auto bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-full shadow-sm">
      <div className="flex h-16 justify-between items-center px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveNav("#home")
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`text-xl font-semibold hover:text-gray-600 transition-colors ${
            activeNav === "#home" ? "text-[#ec704c]" : "text-[#575757]"
          }`}>
          <TextDecrypt text="Techno Art" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.href)
                  scrollToSection(item.href);
                }}
              className={`hover:text-gray-900 inline-flex items-center px-1 text-sm font-medium transition-colors relative group ${
                activeNav === item.href ? "text-[#ec704c]" : "text-[#575757]"
              }`}>
              <TextDecrypt text={item.name} />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <StyledWrapper>
            <label onClick={() => setIsOpen(true)} className="hamburger">
              <input type="checkbox" />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                <path className="line" d="M7 16 27 16" />
              </svg>
            </label>
          </StyledWrapper>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2">
          <div className="bg-white/60 dark:bg-black/60 rounded-2xl shadow-lg py-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.href)
                  scrollToSection(item.href);
                }}
                className="block px-4 py-2 text-base font-medium text-gray hover:bg-gray-50 hover:text-gray-900 transition-colors">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  </header>
  );
};

export default Header;