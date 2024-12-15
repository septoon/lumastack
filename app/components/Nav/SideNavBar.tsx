'use client'

import React, { useState } from "react";
import { TextDecrypt } from "../Text/TextDecrypt";

const SideNavbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>("#");

  return (
    <nav className="py-2 flex flex-row-reverse items-center justify-between rotate-[-90deg]">
      <a
        href="#"
        onClick={() => setActiveNav("#")}
        className={`mr-5 no-underline ${
          activeNav === "#" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="Главная" />
      </a>
      <a
        href="#works"
        onClick={() => setActiveNav("#works")}
        className={`mr-5 no-underline ${
          activeNav === "#works" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="Проекты" />
      </a>
      <a
        href="#about"
        onClick={() => setActiveNav("#about")}
        className={`mr-5 no-underline whitespace-nowrap ${
          activeNav === "#about" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="О нас" />
      </a>
      <a
        href="#contact"
        onClick={() => setActiveNav("#contact")}
        className={`mr-5 no-underline ${
          activeNav === "#contact" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="Контакты" />
      </a>
    </nav>
  );
};

export default SideNavbar