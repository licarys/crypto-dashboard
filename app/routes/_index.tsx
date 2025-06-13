import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoData, ExchangeRates, TOP_CRYPTOS } from "~/types/crypto";
import { API_ENDPOINTS, API_PARAMS } from "~/config/api";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { CryptoCard } from "~/components/CryptoCard";
import { SearchBar } from "~/components/SearchBar";

export default function Index() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch cryptocurrency data");
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cryptocurrency Dashboard</h1>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}
