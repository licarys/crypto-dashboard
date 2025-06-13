import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CryptoData } from '~/types/crypto';
import { CryptoCard } from '~/components/CryptoCard/CryptoCard';

export function SortableCryptoCard({ crypto }: { crypto: CryptoData }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: crypto.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CryptoCard crypto={crypto} />
    </div>
  );
}
