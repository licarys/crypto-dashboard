interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export function Button({ onClick, children, isActive = false, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
} 