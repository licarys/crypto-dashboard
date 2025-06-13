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
import { NoResults } from "~/components/NoResults";
import { meta } from "~/meta";

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableCryptoCard } from '~/components/SortableCryptoCard';
import { useCryptoDrag } from '~/hooks/useCryptoDrag';

export { meta };

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
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Crypto Market Overview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Live cryptocurrency prices in USD and BTC
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Controls Section */}
        <div className="sticky top-4 z-10 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-full sm:w-96 flex-shrink-0">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                onClick={resetOrder}
                variant="secondary"
                className="whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Sort Alphabetically
              </Button>
              <Button
                onClick={fetchData}
                variant="primary"
                className="whitespace-nowrap hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors duration-200"
                disabled={isRefreshing}
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span className="ml-2">Update Prices</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} />
            </div>
          )}

          <div className="min-h-[400px]">
            {loading && !cryptos.length ? (
              <div className="flex justify-center items-center h-[400px]">
                <LoadingSpinner />
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={filteredAndSortedCryptos.map(crypto => crypto.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAndSortedCryptos.map((crypto) => (
                      <SortableCryptoCard
                        key={crypto.id}
                        crypto={crypto}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {!loading && filteredAndSortedCryptos.length === 0 && (
              <NoResults />
            )}
          </div>
        </div>
      </div>

      {/* Notification */}
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
