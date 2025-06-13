import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input with correct placeholder', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name or symbol (e.g. Bitcoin, BTC)');
    expect(input).toBeInTheDocument();
  });

  it('displays the search term', () => {
    render(<SearchBar searchTerm="bitcoin" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name or symbol (e.g. Bitcoin, BTC)');
    expect(input).toHaveValue('bitcoin');
  });

  it('calls onSearchChange when input changes', () => {
    const handleSearchChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={handleSearchChange} />);
    const input = screen.getByPlaceholderText('Search by name or symbol (e.g. Bitcoin, BTC)');
    fireEvent.change(input, { target: { value: 'eth' } });
    expect(handleSearchChange).toHaveBeenCalledWith('eth');
  });

  it('shows clear button when there is text', () => {
    render(<SearchBar searchTerm="bitcoin" onSearchChange={() => {}} />);
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('hides clear button when search is empty', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    const clearButton = screen.queryByRole('button', { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('clears search when clear button is clicked', () => {
    const handleSearchChange = jest.fn();
    render(<SearchBar searchTerm="bitcoin" onSearchChange={handleSearchChange} />);
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    expect(handleSearchChange).toHaveBeenCalledWith('');
  });

  it('applies focus styles when input is focused', () => {
    const { container } = render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name or symbol (e.g. Bitcoin, BTC)');
    fireEvent.focus(input);
    
    const searchContainer = container.querySelector('div > div > div');
    expect(searchContainer).toHaveClass(
      'relative',
      'flex',
      'items-center',
      'bg-white/95',
      'dark:bg-gray-900/95',
      'border',
      'border-gray-200/50',
      'dark:border-gray-700/50',
      'rounded-lg',
      'transition-all',
      'duration-200'
    );
  });

  it('renders search icon', () => {
    const { container } = render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toHaveClass('h-5', 'w-5', 'text-gray-400');
  });

  it('applies correct dark mode styles', () => {
    const { container } = render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    const searchContainer = container.querySelector('div > div > div');
    expect(searchContainer).toHaveClass(
      'bg-white/95',
      'dark:bg-gray-900/95',
      'border-gray-200/50',
      'dark:border-gray-700/50'
    );
  });
}); 