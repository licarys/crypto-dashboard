import { CryptoData } from "~/types/crypto";

interface CryptoCardProps {
  crypto: CryptoData;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{crypto.name}</h2>
          <p className="text-sm text-gray-500">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">USD Rate:</span>
          <span className="font-semibold">
            ${crypto.toUsd?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) ?? 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">BTC Rate:</span>
          <span className="font-semibold">
            {crypto.toBTC?.toLocaleString(undefined, {
              minimumFractionDigits: 8,
              maximumFractionDigits: 8,
            }) ?? 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
} 