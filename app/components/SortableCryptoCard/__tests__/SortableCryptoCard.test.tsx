import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import { SortableCryptoCard } from '../SortableCryptoCard';
import type { CryptoData } from '~/types/crypto';

const mockCrypto: CryptoData = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  toUsd: 50000,
  toBTC: 1,
};

describe('SortableCryptoCard', () => {
  const renderWithDndContext = (children: React.ReactNode) => {
    return render(
      <DndContext onDragEnd={() => {}}>
        {children}
      </DndContext>
    );
  };

  it('renders the crypto card with correct data', () => {
    renderWithDndContext(<SortableCryptoCard crypto={mockCrypto} />);
    
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getAllByText('BTC')).toHaveLength(2); // Symbol and BTC price label
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();
    expect(screen.getByText('1.00000000 BTC')).toBeInTheDocument();
  });

  it('applies correct base styles', () => {
    const { container } = renderWithDndContext(<SortableCryptoCard crypto={mockCrypto} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      'transition-all',
      'duration-75'
    );
  });

  it('renders drag handle icon', () => {
    const { container } = renderWithDndContext(<SortableCryptoCard crypto={mockCrypto} />);
    const dragHandle = container.querySelector('[title="Drag to reorder"]');
    expect(dragHandle).toBeInTheDocument();
    expect(dragHandle).toHaveClass(
      'absolute',
      '-left-2',
      '-top-2',
      'p-1.5',
      'rounded-full',
      'bg-white/95',
      'dark:bg-gray-900/95',
      'border',
      'border-gray-200/50',
      'dark:border-gray-700/50',
      'text-gray-400',
      'shadow-sm',
      'transition-all',
      'duration-200',
      'opacity-0',
      'group-hover:opacity-100',
      'z-10'
    );
  });

  it('renders with custom className', () => {
    const { container } = renderWithDndContext(
      <SortableCryptoCard crypto={mockCrypto} className="custom-class" />
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });
}); 