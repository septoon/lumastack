'use client'

import Content from "./components/Content/Content";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Works from "./components/Works/Works";
import About from "./components/About/About";
import { useState } from "react";
import TelegramButton from "./components/TelegramButton/TelegramButton";
import Services from "./components/Services/Services";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col z-10 snap-y snap-mandatory scroll-smooth px-28 sm:px-4">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`${isOpen ? 'absolute left-0 right-0 top-0 bottom-0 z-40 bg-white/50 dark:bg-black/50 backdrop-blur-md' : ''}`}></div>
      <TelegramButton />
      <main id="home" className="h-screen snap-start flex items-center justify-between bg-transparent">
        <Content />
        <div className="fixed bottom-0 left-0 w-auto">
        </div>
      </main>

      <section id="services" className="min-h-screen snap-start flex">
        <Services />
      </section>
      
      <section id="works" className="min-h-screen snap-start flex">
        <Works />
      </section>

      <section id="about" className="min-h-screen snap-start flex">
        <About />
      </section>

      <section id="contact" className="min-h-screen snap-start flex w-full">
      <Contact />
      </section>
      <footer className="bg-transparent snap-start relative z-10 text-center py-4">
        <p>© 2024 LumaStack Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
