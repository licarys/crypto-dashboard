interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Notification({ message, type = 'success', onClose }: NotificationProps) {
  const bgColor = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }[type];

  return (
    <div 
      className={`fixed bottom-4 right-4 ${bgColor} px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 animate-fade-in-up text-sm`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-75 focus:outline-none"
        aria-label="Close notification"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 