import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CryptoData, ExchangeRates, TOP_CRYPTOS } from "~/types/crypto";
import { API_ENDPOINTS, API_PARAMS } from "~/config/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { SearchBar } from "~/components/SearchBar";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
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

  const { sensors, handleDragEnd, getSortedCryptos, resetOrder } = useCryptoDrag(cryptos);

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
      showNotification('Cryptocurrency prices updated.');
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

  const filteredAndSortedCryptos = getSortedCryptos().filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-2">
              Crypto Market Overview
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
              Live cryptocurrency prices in USD and BTC
            </p>
            {lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={fetchData}
              disabled={isRefreshing}
              icon={<ArrowPathIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />}
              size="md"
            >
              Update Prices
            </Button>
            <Button
              onClick={resetOrder}
              variant="secondary"
              size="md"
            >
              Sort Alphabetically
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredAndSortedCryptos.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCryptos.map((crypto) => (
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
