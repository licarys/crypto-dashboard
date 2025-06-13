import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message text', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('applies the correct classes', () => {
    const { container } = render(<ErrorMessage message="Error!" />);
    expect(container.firstChild).toHaveClass('flex items-center justify-center min-h-[200px]');
  });

  it('renders the error icon', () => {
    const { container } = render(<ErrorMessage message="Error!" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('h-6', 'w-6');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
