import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative mb-6">
      <div className={`
        relative flex items-center
        bg-white/95 dark:bg-gray-900/95
        border border-gray-200/50 dark:border-gray-700/50
        rounded-lg
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-blue-500/50 border-transparent shadow-sm' : 'hover:border-gray-300/50 dark:hover:border-gray-600/50'}
      `}>
        <div className="pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search by name or symbol (e.g. Bitcoin, BTC)"
          className="
            w-full
            py-3 px-3
            bg-transparent
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            text-sm
          "
        />
        
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="
              p-2 mr-1
              text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              rounded-full
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors duration-200
            "
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
} 