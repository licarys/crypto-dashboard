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
    expect(screen.getByText('BTC')).toBeInTheDocument();
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
      'bg-white',
      'rounded-lg',
      'shadow-md',
      'p-6'
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
}); 