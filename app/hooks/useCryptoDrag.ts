import { useCallback, useEffect, useMemo, useState } from 'react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { CryptoData } from '~/types/crypto';

const STORAGE_KEY = 'crypto-order';

export function useCryptoDrag(cryptos: CryptoData[]) {
  const [cryptoOrder, setCryptoOrder] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const savedOrder = stored ? JSON.parse(stored) as string[] : [];

    const cryptoIds = cryptos.map(c => c.id);
    const validSavedOrder = savedOrder.filter(id => cryptoIds.includes(id));
    const missingFromSaved = cryptoIds.filter(id => !validSavedOrder.includes(id));

    setCryptoOrder([...validSavedOrder, ...missingFromSaved]);
  }, [cryptos]);

  useEffect(() => {
    if (cryptoOrder.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cryptoOrder));
    }
  }, [cryptoOrder]);

  const resetOrder = () => {
    const originalOrder = cryptos.map((c) => c.id);
    setCryptoOrder(originalOrder);
    localStorage.removeItem(STORAGE_KEY); // También borra la persistencia
  };

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

  const sortedCryptos = cryptoOrder
    .map(id => cryptoMap.get(id))
    .filter((c): c is CryptoData => !!c);
  
  const getSortedCryptos = () => {
    const cryptoMap = new Map(cryptos.map(c => [c.id, c]));
    return cryptoOrder
      .map(id => cryptoMap.get(id))
      .filter((c): c is CryptoData => !!c);
  };

  return { sensors, handleDragEnd, getSortedCryptos, sortedCryptos, resetOrder };
}
