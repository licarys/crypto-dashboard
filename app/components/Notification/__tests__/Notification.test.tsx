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
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders with error type', () => {
    render(<Notification {...defaultProps} type="error" />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('renders with info type', () => {
    render(<Notification {...defaultProps} type="info" />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100', 'text-blue-800');
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
    expect(notification).toHaveClass('fixed', 'bottom-4', 'right-4');
  });

  it('renders with animation class', () => {
    render(<Notification {...defaultProps} />);
    
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('animate-fade-in-up');
  });
}); 