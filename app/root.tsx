import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeToggle } from "~/components/ThemeToggle";
import "./styles/tailwind.css";

export const links: LinksFunction = () => [];

export default function App() {
  return (
    <html lang="en" className="h-full bg-surface-light dark:bg-dark-surface-DEFAULT transition-colors duration-200">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Crypto Market Overview</title>
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let theme = localStorage.getItem('theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body className="h-full">
        <div className="fixed top-1 right-2 z-50 sm:top-4 sm:right-4">
          <ThemeToggle />
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
