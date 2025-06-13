import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CryptoData } from '~/types/crypto';
import { CryptoCard } from '~/components/CryptoCard/CryptoCard';
import clsx from 'clsx';

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
    'transition-shadow duration-200',
    isDragging && 'border-2 border-dashed border-gray-400 shadow-lg scale-105 bg-white',
    isOver && 'border-2 border-dashed border-gray-400',
    isSorting && 'opacity-80'
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={clsx(cardClass, className)}>
      <CryptoCard crypto={crypto} />
    </div>
  );
}
