import type { Metadata } from 'next';
import DisplacementSphere from './components/Background/DisplacementSphere';
import { ThemeProvider } from './components/Theme/ThemeProvider';
import './globals.css';
import { Providers } from './GlobalRedux/provider';

export const metadata: Metadata = {
  title: 'LumaStack - Алушта',
  description: 'Создание сайтов, чат-ботов с ии, генерация контента с LumaStack в Алуште.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <meta name="theme-color" content="#121212" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="description" content={metadata.description || ''} />
        <meta
          name="keywords"
          content="веб-разработка, приложение, программирование, сайты, разработка приложений, 
        создать сайт, нейросеть, генерация фото, генерация видео, заказать чат бот, заказать сайт в Алуште, "
        />

        <meta name="yandex-verification" content="0f256fcac62c421c" />
        <meta name="google-site-verification" content="Q1YZzdstkjBtKW7UVGzp7GkNMYAwqY8TihJTvCcSqHI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lumastack.ru" />
        <meta property="og:title" content="LumaStack - Алушта" />
        <meta property="og:description" content="Создание сайтов, чат-ботов с ии, генерация контента с LumaStack в Алуште." />
        <meta property="og:image" content="https://lumastack.ru/image.webp" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lumastack.ru" />
        <meta property="twitter:title" content="LumaStack - Алушта" />
        <meta property="twitter:description" content="Создание сайтов, чат-ботов с ии, генерация контента с LumaStack в Алуште." />
        <meta property="twitter:image" content="https://lumastack.ru/image.webp" />
        <link rel="stylesheet" href="https://cdn.direct.i-dgtl.ru/VerifyWidget.css" />
        <script src="https://cdn.direct.i-dgtl.ru/VerifyWidget.umd.min.js" />
        <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var theme = localStorage.getItem('theme');
            if (!theme) {
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            }
          } catch (e) {}
        })();
      `,
    }}
  />
      </head>
      <body className="relative w-full h-full overflow-x-hidden">
        <ThemeProvider>
          <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
            <DisplacementSphere />
          </div>
          <div className="relative z-10 bg-transparent">
          <Providers>
            {children}
          </Providers>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
