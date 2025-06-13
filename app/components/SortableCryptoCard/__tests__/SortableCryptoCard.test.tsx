import { render, screen } from '@testing-library/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
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
    expect(screen.getByText('BTC')).toBeInTheDocument();
  });
}); 