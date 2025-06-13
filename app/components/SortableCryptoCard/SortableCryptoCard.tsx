import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CryptoData } from '~/types/crypto';
import { CryptoCard } from '~/components/CryptoCard/CryptoCard';
import clsx from 'clsx';
import { Bars3Icon } from '@heroicons/react/24/outline';

export function SortableCryptoCard({ crypto, className }: { crypto: CryptoData, className?: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
    isOver,
  } = useSortable({ id: crypto.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  const cardClass = clsx(
    'transition-all duration-75',
    isDragging && [
      'border-2 border-dashed border-blue-500/50',
      'shadow-lg',
      'scale-[1.02]',
      'bg-white/95 dark:bg-gray-900/95',
      'backdrop-blur-sm',
      'cursor-grabbing'
    ],
    isOver && [
      'border-2 border-dashed border-blue-500/30',
      'bg-gray-50/50 dark:bg-gray-800/50'
    ],
    isSorting && 'opacity-90'
  );

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={clsx(cardClass, className)}
    >
      <div className="relative">
        <div
          className="
            absolute -left-2 -top-2
            p-1.5
            rounded-full
            bg-white/95 dark:bg-gray-900/95
            border border-gray-200/50 dark:border-gray-700/50
            text-gray-400
            shadow-sm
            transition-all duration-200
            opacity-0 group-hover:opacity-100
            z-10
          "
          title="Drag to reorder"
        >
          <Bars3Icon className="w-4 h-4" />
        </div>
        <CryptoCard crypto={crypto} />
      </div>
    </div>
  );
}
