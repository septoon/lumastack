'use client'

import React, { useEffect, useState } from "react";
import { TextDecrypt } from "../Text/TextDecrypt";

const SideNavbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>("#home");

  useEffect(() => {
    const sections = document.querySelectorAll("main[id], section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveNav(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    setActiveNav(targetId);

    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="py-2 flex flex-row-reverse items-center justify-between rotate-[-90deg]">
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, "#home")}
        className={`mr-5 no-underline ${
          activeNav === "#home" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="Главная" />
      </a>
      <a
        href="#works"
        onClick={(e) => handleNavClick(e, "#works")}
        className={`mr-5 no-underline ${
          activeNav === "#works" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="Проекты" />
      </a>
      <a
        href="#about"
        onClick={(e) => handleNavClick(e, "#about")}
        className={`mr-5 no-underline whitespace-nowrap ${
          activeNav === "#about" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="О нас" />
      </a>
      <a
        href="#contact"
        onClick={(e) => handleNavClick(e, "#contact")}
        className={`mr-5 no-underline ${
          activeNav === "#contact" ? "text-[#ec704c]" : "text-[#575757]"
        }`}
      >
        <TextDecrypt text="Контакты" />
      </a>
    </nav>
  );
};

export default SideNavbar;