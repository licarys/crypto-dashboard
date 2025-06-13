# Crypto Dashboard

A modern cryptocurrency dashboard built with React, TypeScript, and Tailwind CSS. The dashboard displays real-time cryptocurrency rates and allows users to customize their view through drag-and-drop reordering.

## Features

- Real-time cryptocurrency rates
- Drag-and-drop card reordering with persistent order
- Responsive grid layout
- Search functionality
- Dark mode support
- Automatic data refresh
- Smooth animations and transitions

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- @dnd-kit for drag-and-drop
- Axios for API calls
- Jest & React Testing Library for testing

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
```

## Project Structure

```
app/
├── assets/
│   └── icons/
├── components/
│   ├── Button/
│   ├── CryptoCard/
│   ├── ErrorMessage/
│   ├── LoadingSpinner/
│   ├── Notification/
│   ├── SearchBar/
│   └── SortableCryptoCard/
├── config/
│   └── api.ts
├── hooks/
│   └── useCryptoDrag.ts
├── routes/
│   └── _index.tsx
└── types/
    ├── crypto.ts
    └── sort.ts
```

## Design Decisions & Tradeoffs

### 1. State Management
- **Decision**: Used React's built-in state management with hooks
- **Why**: The application's state requirements are relatively simple and don't warrant a complex state management solution
- **Tradeoff**: Might need to refactor if the application grows significantly

### 2. Drag & Drop Implementation
- **Decision**: Used @dnd-kit instead of react-dnd or react-beautiful-dnd
- **Why**: 
  - Better TypeScript support
  - More modern API
  - Better performance
  - Simpler implementation
- **Tradeoff**: Slightly larger bundle size

### 3. Card Order Persistence
- **Decision**: Store order in localStorage
- **Why**: 
  - Simple to implement
  - Works offline
  - No backend required
- **Tradeoff**: Order is device-specific

### 4. API Integration
- **Decision**: Direct API calls with Axios
- **Why**: 
  - Simple to implement
  - Good TypeScript support
  - Familiar API
- **Tradeoff**: No built-in caching or request deduplication

### 5. Styling
- **Decision**: Tailwind CSS
- **Why**: 
  - Rapid development
  - Consistent design
  - Small bundle size
  - Great developer experience
- **Tradeoff**: Learning curve for team members new to Tailwind

### 6. Testing Strategy
- **Decision**: Jest + React Testing Library
- **Why**: 
  - Industry standard
  - Great integration with React
  - Focus on user-centric testing
- **Tradeoff**: Some setup complexity

## Performance Considerations

1. **API Calls**
   - Implemented 30-second refresh interval
   - Could be optimized with WebSocket for real-time updates

2. **Drag & Drop**
   - Using hardware acceleration for smooth animations
   - Optimized re-renders with useCallback and useMemo

3. **Responsive Design**
   - Mobile-first approach
   - Grid layout adapts to screen size
   - Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
