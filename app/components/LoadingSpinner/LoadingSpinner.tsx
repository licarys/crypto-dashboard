interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export function LoadingSpinner({ fullScreen = true }: LoadingSpinnerProps) {
  const containerClasses = fullScreen 
    ? "flex items-center justify-center min-h-screen"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div
        role="status"
        aria-label="Loading"
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
      />
    </div>
  );
} 