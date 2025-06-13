import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Market Overview | Real-Time Cryptocurrency Prices" },
    { name: "description", content: "Professional cryptocurrency dashboard with real-time price tracking in USD and BTC. Features include live updates, customizable views, dark mode, and responsive design. Stay informed with accurate crypto market data." },
    { name: "keywords", content: "cryptocurrency, crypto prices, bitcoin, ethereum, live prices, crypto dashboard, BTC, USD, real-time crypto, crypto tracker, digital currency, blockchain, crypto market" },
    { name: "author", content: "Crypto Market Overview" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#ffffff" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "format-detection", content: "telephone=no" },
    { property: "og:title", content: "Crypto Market Overview | Real-Time Cryptocurrency Prices" },
    { property: "og:description", content: "Professional cryptocurrency dashboard with real-time price tracking in USD and BTC. Features include live updates, customizable views, dark mode, and responsive design. Stay informed with accurate crypto market data." },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Crypto Market Overview" },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Crypto Market Overview | Real-Time Cryptocurrency Prices" },
    { name: "twitter:description", content: "Professional cryptocurrency dashboard with real-time price tracking in USD and BTC. Features include live updates, customizable views, dark mode, and responsive design. Stay informed with accurate crypto market data." },
    { name: "twitter:creator", content: "@cryptomarket" },
    { name: "application-name", content: "Crypto Market Overview" },
    { name: "msapplication-TileColor", content: "#ffffff" },
    { name: "msapplication-config", content: "/browserconfig.xml" },
    { name: "generator", content: "Remix" },
    { name: "referrer", content: "strict-origin-when-cross-origin" },
    { name: "color-scheme", content: "light dark" },
  ];
}; 