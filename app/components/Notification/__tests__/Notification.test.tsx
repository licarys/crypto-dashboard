import { render, screen, fireEvent } from '@testing-library/react';
import { Notification } from '../Notification';

describe('Notification', () => {
  const defaultProps = {
    message: 'Test notification',
    onClose: jest.fn(),
  };

  it('renders with default success type', () => {
    render(<Notification {...defaultProps} />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('bg-green-50', 'text-green-800');
  });

  it('renders with error type', () => {
    render(<Notification {...defaultProps} type="error" />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('bg-red-50', 'text-red-800');
  });

  it('renders with info type', () => {
    render(<Notification {...defaultProps} type="info" />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('bg-blue-50', 'text-blue-800');
  });

  it('calls onClose when close button is clicked', () => {
    render(<Notification {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders with correct positioning classes', () => {
    render(<Notification {...defaultProps} />);
    
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('fixed', 'bottom-6', 'right-6');
  });

  it('renders with animation class', () => {
    render(<Notification {...defaultProps} />);
    
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('animate-fade-in-up');
  });

  it('renders with correct base styles', () => {
    render(<Notification {...defaultProps} />);
    
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass(
      'rounded-lg',
      'border',
      'shadow-lg',
      'backdrop-blur-sm',
      'text-sm',
      'font-medium'
    );
  });

  it('renders close button with correct styles', () => {
    render(<Notification {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toHaveClass(
      'rounded-full',
      'hover:bg-white/20',
      'transition-colors',
      'duration-200'
    );
  });
}); 