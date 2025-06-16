# Crypto Market Overview

A modern, responsive cryptocurrency dashboard built with React and Remix. This application provides real-time cryptocurrency prices in both USD and BTC, featuring a clean and intuitive user interface with dark mode support.

## Features

- 🎨 Modern UI with dark mode support
- 📱 Fully responsive design
- 🔄 Real-time price updates
- 🔍 Search functionality
- 🎯 Sortable cryptocurrency cards
- 🌙 Theme toggle (light/dark mode)
- 📊 Price display in USD and BTC
- ⚡ Fast and efficient updates

## Tech Stack

- [Remix](https://remix.run/) - Full stack web framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Heroicons](https://heroicons.com/) - Icons
- [dnd-kit](https://dndkit.com/) - Drag and drop functionality
- [Jest](https://jestjs.io/) - Testing
- [Testing Library](https://testing-library.com/) - Component testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/licarys/crypto-dashboard
cd crypto-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/         # Reusable UI components
│   ├── Button/        # Button component
│   ├── CryptoCard/    # Cryptocurrency card component
│   ├── SearchBar/     # Search functionality
│   ├── ThemeToggle/   # Dark mode toggle
│   └── ...
├── routes/            # Application routes
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── config/           # Configuration files
```

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icons
