interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Notification({ message, type = 'success', onClose }: NotificationProps) {
  const styles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-green-200 dark:border-green-800/50'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-800 dark:text-red-300',
      border: 'border-red-200 dark:border-red-800/50'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800/50'
    }
  }[type];

  return (
    <div 
      className={`
        fixed bottom-6 right-6
        ${styles.bg}
        ${styles.text}
        ${styles.border}
        px-4 py-3
        rounded-lg
        border
        shadow-lg
        backdrop-blur-sm
        flex items-center gap-3
        animate-fade-in-up
        text-sm
        font-medium
      `}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="
          p-1
          rounded-full
          hover:bg-white/20 dark:hover:bg-black/20
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
          focus:ring-current
        "
        aria-label="Close notification"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 