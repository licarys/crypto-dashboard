import { useState, useEffect } from 'react';

export function DragHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the hint after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-gray-900/95 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] animate-fade-in-up">
      <p className="text-sm font-medium">
        💡 Drag and drop cards to reorder them
      </p>
    </div>
  );
} 