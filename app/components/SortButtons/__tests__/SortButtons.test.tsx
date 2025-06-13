import { render, screen, fireEvent } from '@testing-library/react';
import { SortButtons } from '../SortButtons';
import { SortField, SortOrder } from '~/types/sort';

describe('SortButtons', () => {
  const mockOnSort = jest.fn();

  beforeEach(() => {
    mockOnSort.mockClear();
  });

  it('renders all sort buttons', () => {
    render(
      <SortButtons
        sortField="name"
        sortOrder="asc"
        onSort={mockOnSort}
      />
    );

    expect(screen.getByRole('button', { name: /^name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^usd price/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^btc price/i })).toBeInTheDocument();
  });

  it('shows active state for current sort field', () => {
    render(
      <SortButtons
        sortField="name"
        sortOrder="asc"
        onSort={mockOnSort}
      />
    );

    const nameButton = screen.getByRole('button', { name: /^name/i });
    expect(nameButton).toHaveClass('bg-blue-500');
  });

  it('shows sort direction indicator', () => {
    render(
      <SortButtons
        sortField="name"
        sortOrder="asc"
        onSort={mockOnSort}
      />
    );

    const nameButton = screen.getByRole('button', { name: /^name.*↑/i });
    expect(nameButton).toBeInTheDocument();
  });

  it('calls onSort with correct parameters when clicking inactive field', () => {
    render(
      <SortButtons
        sortField="name"
        sortOrder="asc"
        onSort={mockOnSort}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /^usd price/i }));
    expect(mockOnSort).toHaveBeenCalledWith('toUsd');
  });

  it('toggles sort order when clicking active field', () => {
    const { rerender } = render(
      <SortButtons
        sortField="name"
        sortOrder="asc"
        onSort={mockOnSort}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /^name.*↑/i }));
    expect(mockOnSort).toHaveBeenCalledWith('name');

    rerender(
      <SortButtons
        sortField="name"
        sortOrder="desc"
        onSort={mockOnSort}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /^name.*↓/i }));
    expect(mockOnSort).toHaveBeenCalledWith('name');
  });
}); 