import { SortField, SortOrder } from "~/types/sort";
import { Button } from "./Button";

interface SortButtonsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export function SortButtons({ sortField, sortOrder, onSort }: SortButtonsProps) {
  return (
    <div className="mb-4 flex gap-4">
      <Button
        onClick={() => onSort('name')}
        isActive={sortField === 'name'}
      >
        Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
      </Button>
      <Button
        onClick={() => onSort('toUsd')}
        isActive={sortField === 'toUsd'}
      >
        USD Rate {sortField === 'toUsd' && (sortOrder === 'asc' ? '↑' : '↓')}
      </Button>
      <Button
        onClick={() => onSort('toBTC')}
        isActive={sortField === 'toBTC'}
      >
        BTC Rate {sortField === 'toBTC' && (sortOrder === 'asc' ? '↑' : '↓')}
      </Button>
    </div>
  );
} 