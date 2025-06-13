import { CryptoData } from "~/types/crypto";

interface CryptoCardProps {
  crypto: CryptoData;
}

const formatUSD = (value: number) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatBTC = (value: number) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  });
};

export function CryptoCard({ crypto }: CryptoCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{crypto.name}</h2>
          <p className="text-sm text-gray-500">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">USD Price:</span>
          <span className="font-semibold">
            {crypto.toUsd ? `$${formatUSD(crypto.toUsd)}` : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">BTC Price:</span>
          <span className="font-semibold">
            {crypto.toBTC ? `${formatBTC(crypto.toBTC)} BTC` : 'N/A'}
          </span>
        </div>
      </div>
    </article>
  );
} 