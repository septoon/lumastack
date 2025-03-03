import { navigation } from '@/app/common/navigation';

export const NavDesktop = () => {
  return (
    <ul className="hidden lg:flex lg:items-center gap-5 text-sm text-black dark:text-white">
      {navigation.map((route) => {
        const { Icon, href, title } = route;
        return (
          <li key={route.title}>
            <a
              href={href}
              className="flex items-center gap-1 font-unbounded font-light hover:text-neutral-400 transition-all">
              <Icon />
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
