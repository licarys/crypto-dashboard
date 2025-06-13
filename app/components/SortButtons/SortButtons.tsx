import { Button } from '../Button';
import { SortField, SortOrder } from "~/types/sort";

interface SortButtonsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const FIELD_LABELS: Record<SortField, string> = {
  name: 'Name',
  toUsd: 'USD Price',
  toBTC: 'BTC Price'
};

export function SortButtons({ sortField, sortOrder, onSort }: SortButtonsProps) {
  const getButtonText = (field: SortField) => {
    const label = FIELD_LABELS[field];
    if (field !== sortField) return label;
    return `${label} ${sortOrder === 'asc' ? '↑' : '↓'}`;
  };

  return (
    <div className="flex gap-2 mb-6">
      <Button
        onClick={() => onSort('name')}
        variant={sortField === 'name' ? 'primary' : 'secondary'}
      >
        {getButtonText('name')}
      </Button>
      <Button
        onClick={() => onSort('toUsd')}
        variant={sortField === 'toUsd' ? 'primary' : 'secondary'}
      >
        {getButtonText('toUsd')}
      </Button>
      <Button
        onClick={() => onSort('toBTC')}
        variant={sortField === 'toBTC' ? 'primary' : 'secondary'}
      >
        {getButtonText('toBTC')}
      </Button>
    </div>
  );
} 