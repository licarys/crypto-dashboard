import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
    // Reset document class
    document.documentElement.classList.remove('dark');
    // Reset matchMedia mock
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('renders with light mode by default', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('renders with dark mode when localStorage has dark theme', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /switch to light mode/i });
    expect(button).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('renders with dark mode when system preference is dark', () => {
    // Mock system preference to dark mode
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /switch to light mode/i });
    expect(button).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /switch to dark mode/i });
    
    // Initial state
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBeNull();

    // Click to switch to dark mode
    fireEvent.click(button);
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(button).toHaveAccessibleName('Switch to light mode');

    // Click to switch back to light mode
    fireEvent.click(button);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(button).toHaveAccessibleName('Switch to dark mode');
  });

  it('applies correct styles', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'p-2',
      'rounded-lg',
      'bg-white/95',
      'dark:bg-gray-900/95',
      'text-gray-600',
      'dark:text-gray-300',
      'hover:bg-gray-100',
      'dark:hover:bg-gray-800',
      'border',
      'border-gray-200/50',
      'dark:border-gray-700/50',
      'shadow-sm',
      'transition-colors',
      'duration-200'
    );
  });

  it('renders correct icon based on theme', () => {
    const { container } = render(<ThemeToggle />);
    
    // Light mode - shows moon icon
    const moonIcon = container.querySelector('svg');
    expect(moonIcon).toHaveClass('w-5', 'h-5');
    
    // Switch to dark mode
    fireEvent.click(screen.getByRole('button'));
    
    // Dark mode - shows sun icon
    const sunIcon = container.querySelector('svg');
    expect(sunIcon).toHaveClass('w-5', 'h-5');
  });
}); 