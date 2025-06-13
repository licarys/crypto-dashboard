import { ErrorIcon } from '~/assets/icons/ErrorIcon';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex items-center space-x-2 text-red-600">
        <ErrorIcon data-testid="error-icon" />
        <span className="text-lg font-medium">{message}</span>
      </div>
    </div>
  );
} 