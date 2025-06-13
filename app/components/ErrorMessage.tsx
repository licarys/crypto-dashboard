import { ErrorIcon } from "./icons/ErrorIcon";

interface ErrorMessageProps {
  message: string;
  fullScreen?: boolean;
}

export function ErrorMessage({ message, fullScreen = true }: ErrorMessageProps) {
  const containerClasses = fullScreen
    ? "flex items-center justify-center min-h-screen"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ErrorIcon />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 