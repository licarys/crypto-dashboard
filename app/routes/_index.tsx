import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CryptoData, ExchangeRates, TOP_CRYPTOS } from "~/types/crypto";
import { API_ENDPOINTS, API_PARAMS } from "~/config/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { SearchBar } from "~/components/SearchBar";
import { RefreshIcon } from "~/assets/icons/RefreshIcon";
import { Button } from "~/components/Button";
import { Notification } from "~/components/Notification";

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableCryptoCard } from '~/components/SortableCryptoCard';
import { useCryptoDrag } from '~/hooks/useCryptoDrag';

const REFRESH_INTERVAL = 30000; // 30 seconds

export default function Index() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const { sensors, handleDragEnd, sortedCryptos, resetOrder } = useCryptoDrag(cryptos);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const usdResponse = await axios.get<ExchangeRates>(
        `${API_ENDPOINTS.EXCHANGE_RATES}?currency=${API_PARAMS.DEFAULT_CURRENCY}`
      );
      const btcResponse = await axios.get<ExchangeRates>(
        `${API_ENDPOINTS.EXCHANGE_RATES}?currency=${API_PARAMS.DEFAULT_CRYPTO}`
      );
      const usdRates = usdResponse.data.data.rates;
      const btcRates = btcResponse.data.data.rates;

      const cryptoData = TOP_CRYPTOS.map((crypto) => {
        const rateToUSD = parseFloat(usdRates[crypto.id]);
        const rateToBTC = parseFloat(btcRates[crypto.id]);
        
        return {
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.id,
          toUsd: rateToUSD ? 1 / rateToUSD : null,
          toBTC: rateToBTC ? 1 / rateToBTC : null,
        };
      });

      setCryptos(cryptoData);
      setError(null);
      setLastUpdated(new Date());
      showNotification('Cryptocurrency rates updated.');
    } catch (error) {
      setError("Failed to fetch cryptocurrency data");
      showNotification('Failed to update cryptocurrency rates', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    const intervalId = setInterval(fetchData, REFRESH_INTERVAL);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-8 lg:flex-row flex-col items-center justify-between gap-8 lg:gap-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchData}
            disabled={isRefreshing}
            icon={<RefreshIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />}
          >
            Refresh Rates
          </Button>
          <Button
            onClick={resetOrder}
            variant="secondary"
            className="ml-2"
          >
            Reset Order
          </Button>
        </div>
      </div>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedCryptos.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCryptos.map((crypto) => (
              <SortableCryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
