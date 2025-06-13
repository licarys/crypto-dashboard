import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search cryptocurrencies/i);
    expect(input).toBeInTheDocument();
  });

  it('displays the search term', () => {
    render(<SearchBar searchTerm="bitcoin" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search cryptocurrencies/i);
    expect(input).toHaveValue('bitcoin');
  });

  it('calls onSearchChange when input changes', () => {
    const handleSearchChange = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={handleSearchChange} />);
    const input = screen.getByPlaceholderText(/search cryptocurrencies/i);
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
}); 