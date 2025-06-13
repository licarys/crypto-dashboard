import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CryptoCard } from '../CryptoCard';
import { CryptoData } from '~/types/crypto';

describe('CryptoCard', () => {
  const mockCrypto: CryptoData = {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    toUsd: 50000,
    toBTC: 1
  };

  it('renders crypto name and symbol', () => {
    render(<CryptoCard crypto={mockCrypto} />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getAllByText('BTC')).toHaveLength(2); // Symbol and BTC price label
  });

  it('displays USD price correctly', () => {
    render(<CryptoCard crypto={mockCrypto} />);
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();
  });

  it('displays BTC price correctly', () => {
    render(<CryptoCard crypto={mockCrypto} />);
    expect(screen.getByText('1.00000000 BTC')).toBeInTheDocument();
  });

  it('handles null USD price', () => {
    const cryptoWithNullUsd = { ...mockCrypto, toUsd: null };
    render(<CryptoCard crypto={cryptoWithNullUsd} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles null BTC price', () => {
    const cryptoWithNullBtc = { ...mockCrypto, toBTC: null };
    render(<CryptoCard crypto={cryptoWithNullBtc} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    const { container } = render(<CryptoCard crypto={mockCrypto} />);
    const card = container.firstChild;
    expect(card).toHaveClass(
      'group',
      'relative',
      'bg-white/95',
      'dark:bg-gray-900/95',
      'backdrop-blur-sm',
      'rounded-lg',
      'overflow-hidden',
      'transition-all',
      'duration-300',
      'hover:shadow-lg',
      'border',
      'border-gray-200/50',
      'dark:border-gray-700/50'
    );
  });

  it('formats large numbers correctly', () => {
    const cryptoWithLargeNumbers = {
      ...mockCrypto,
      toUsd: 1234567.89,
      toBTC: 0.12345678
    };

    render(<CryptoCard crypto={cryptoWithLargeNumbers} />);
    expect(screen.getByText('$1,234,567.89')).toBeInTheDocument();
    expect(screen.getByText('0.12345678 BTC')).toBeInTheDocument();
  });

  it('renders the first letter of symbol in the icon', () => {
    render(<CryptoCard crypto={mockCrypto} />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('applies correct styles to the icon section', () => {
    const { container } = render(<CryptoCard crypto={mockCrypto} />);
    const iconSection = container.querySelector('.w-20');
    expect(iconSection).toHaveClass(
      'w-20',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'p-4',
      'bg-gradient-to-b',
      'from-gray-50/50',
      'to-white/0',
      'dark:from-gray-800/50',
      'dark:to-gray-900/0',
      'border-r',
      'border-gray-200/50',
      'dark:border-gray-700/50'
    );
  });

  it('applies correct styles to the price section', () => {
    const { container } = render(<CryptoCard crypto={mockCrypto} />);
    const priceSection = container.querySelector('.flex-1');
    expect(priceSection).toHaveClass(
      'flex-1',
      'p-4'
    );
  });
}); 