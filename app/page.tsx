import { ThemeToggle } from "./components/Theme/ThemeToggle";
import Content from "./components/Content/Content";
import SideNavbar from "./components/Nav/SideNavBar";
import SocialIcons from "./components/Content/SocialIcons";
import Logo from "./components/Logo/Logo";
import Contact from "./components/Contact/Content";

export default function Home() {
  return (
    <div className="flex flex-col z-10 snap-y snap-mandatory overflow-scroll scroll-smooth px-28 sm:px-12">
    <main id="home" className="h-screen snap-start flex items-center justify-between bg-transparent">
      <div className="w-[15%] fixed left-0 h-full flex flex-col items-center justify-between lg:pt-10 sm:pt-4 pb-20">
        <Logo />
        <div className="w-14 h-[310px]">
        <SideNavbar />
        </div>
      </div>
      <Content />
      <div className="w-[15%] fixed right-0 h-full flex flex-col items-center justify-between py-10 sm:pt-4">
        <SocialIcons />
        <ThemeToggle />
      </div>
    </main>
    <section id="works" className="min-h-screen snap-start flex">
    <p>works</p>
    </section>

    <section id="about" className="min-h-screen snap-start flex">
    <p>about</p>
    </section>

    <section id="contact" className="min-h-screen snap-start flex w-full">
    <Contact />
    </section>
    <footer className="bg-transparent snap-start relative z-10 text-center py-4">
      <p>© 2024 Altman Dev Studio. All rights reserved.</p>
    </footer>
  </div>
  );
}
