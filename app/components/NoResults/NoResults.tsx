import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface NoResultsProps {
  message?: string;
}

export function NoResults({ message = "No cryptocurrencies found matching your search." }: NoResultsProps) {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-3">
        <MagnifyingGlassIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {message}
        </p>
      </div>
    </div>
  );
} 