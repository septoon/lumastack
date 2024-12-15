import { ThemeToggle } from "./components/Theme/ThemeToggle";
import Content from "./components/Content/Content";
import SideNavbar from "./components/Nav/SideNavBar";
import SocialIcons from "./components/Content/SocialIcons";
import Logo from "./components/Logo/Logo";

export default function Home() {
  return (
    <div className="flex flex-col z-10">
    <main className="h-screen flex items-center justify-between bg-transparent">
      <div className="w-[15%] fixed left-0 h-full flex flex-col items-center justify-between pt-10 pb-20">
        <Logo />
        <div className="w-14 h-[310px]">
        <SideNavbar />
        </div>
      </div>
      <Content />
      <div className="w-[15%] fixed right-0 h-full flex flex-col items-center justify-between py-10">
        <SocialIcons />
        <ThemeToggle />
      </div>
    </main>
    <footer className="bg-transparent relative z-10 text-center py-4">
      <p>© 2024 Altman Dev Studio. All rights reserved.</p>
    </footer>
  </div>
  );
}
