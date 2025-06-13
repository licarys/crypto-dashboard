import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex items-center space-x-2 text-red-600">
        <ExclamationCircleIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-lg font-medium">{message}</span>
      </div>
    </div>
  );
} 