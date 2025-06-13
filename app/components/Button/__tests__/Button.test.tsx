import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default primary variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'active:bg-blue-800',
      'dark:bg-blue-500',
      'dark:hover:bg-blue-600',
      'dark:active:bg-blue-700'
    );
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(
      'bg-gray-100',
      'text-gray-900',
      'hover:bg-gray-200',
      'active:bg-gray-300',
      'dark:bg-gray-800',
      'dark:text-gray-100',
      'dark:hover:bg-gray-700',
      'dark:active:bg-gray-600'
    );
  });

  it('renders with tertiary variant', () => {
    render(<Button variant="tertiary">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(
      'bg-transparent',
      'text-gray-900',
      'hover:bg-gray-100',
      'active:bg-gray-200',
      'dark:text-gray-100',
      'dark:hover:bg-gray-800',
      'dark:active:bg-gray-700'
    );
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm', 'rounded-md');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-sm', 'rounded-lg');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-base', 'rounded-lg');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('applies base classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2'
    );
  });

  it('renders with icon', () => {
    const icon = <span data-testid="test-icon">Icon</span>;
    render(<Button icon={icon}>Click me</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon').parentElement).toHaveClass('mr-2');
  });

  it('renders in full width', () => {
    render(<Button fullWidth>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('applies disabled styles', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );
  });
}); 