import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CryptoData, ExchangeRates, TOP_CRYPTOS } from "~/types/crypto";
import { API_ENDPOINTS, API_PARAMS } from "~/config/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { CryptoCard } from "~/components/CryptoCard";
import { SearchBar } from "~/components/SearchBar";
import { SortButtons } from "~/components/SortButtons";
import { SortField, SortOrder } from "~/types/sort";
import { RefreshIcon } from "~/assets/icons/RefreshIcon";
import { Button } from "~/components/Button";
import { Notification } from "~/components/Notification";

const REFRESH_INTERVAL = 30000; // 30 seconds

export default function Index() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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

  const filteredAndSortedCryptos = cryptos
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button
          onClick={fetchData}
          disabled={isRefreshing}
          icon={<RefreshIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />}
        >
          Refresh Rates
        </Button>
      </div>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <SortButtons
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedCryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>

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
