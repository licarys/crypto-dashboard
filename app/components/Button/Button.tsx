interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
  fullWidth = false
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
  };

  const variantClasses = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700
      active:bg-blue-800
      focus:ring-blue-500/50
      dark:bg-blue-500
      dark:hover:bg-blue-600
      dark:active:bg-blue-700
      dark:focus:ring-blue-400/50
    `,
    secondary: `
      bg-gray-100 text-gray-900
      hover:bg-gray-200
      active:bg-gray-300
      focus:ring-gray-500/50
      dark:bg-gray-800
      dark:text-gray-100
      dark:hover:bg-gray-700
      dark:active:bg-gray-600
      dark:focus:ring-gray-400/50
    `,
    tertiary: `
      bg-transparent text-gray-900
      hover:bg-gray-100
      active:bg-gray-200
      focus:ring-gray-500/50
      dark:text-gray-100
      dark:hover:bg-gray-800
      dark:active:bg-gray-700
      dark:focus:ring-gray-400/50
    `
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
} 