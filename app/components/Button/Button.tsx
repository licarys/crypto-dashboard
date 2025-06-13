interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false,
  icon
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
} 