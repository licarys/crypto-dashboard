import { useCallback, useEffect, useMemo, useState } from 'react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { CryptoData } from '~/types/crypto';

export function useCryptoDrag(cryptos: CryptoData[]) {
  const [cryptoOrder, setCryptoOrder] = useState<string[]>([]);

  useEffect(() => {
    if (cryptos.length > 0) {
      setCryptoOrder(cryptos.map((c) => c.id));
    }
  }, [cryptos]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = cryptoOrder.indexOf(active.id);
      const newIndex = cryptoOrder.indexOf(over.id);
      setCryptoOrder((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  }, [cryptoOrder]);

  const cryptoMap = useMemo(() => new Map(cryptos.map(c => [c.id, c])), [cryptos]);

  const sortedCryptos = cryptoOrder.map(id => cryptoMap.get(id)).filter(Boolean) as CryptoData[];

  return { sensors, handleDragEnd, sortedCryptos };
}
