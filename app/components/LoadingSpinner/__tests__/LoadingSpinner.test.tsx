import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the loading spinner', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('applies full screen classes by default', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'min-h-screen'
    );
  });

  it('applies compact classes when fullScreen is false', () => {
    const { container } = render(<LoadingSpinner fullScreen={false} />);
    expect(container.firstChild).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'p-4'
    );
  });

  it('has the correct aria-label', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('has the correct spinner styling', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'h-8',
      'w-8',
      'border-b-2',
      'border-blue-500'
    );
  });
}); 