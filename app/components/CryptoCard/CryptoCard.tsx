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
    <article className="group relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex h-full">
        {/* Left Section - Icon and Symbol */}
        <div className="w-20 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50/50 to-white/0 dark:from-gray-800/50 dark:to-gray-900/0 border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold text-lg shadow-sm mb-1.5 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {crypto.symbol.charAt(0)}
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {crypto.symbol}
          </span>
        </div>

        {/* Right Section - Name and Prices */}
        <div className="flex-1 p-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {crypto.name}
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[70px] transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                USD
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white font-mono tabular-nums transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                {crypto.toUsd ? `$${formatUSD(crypto.toUsd)}` : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[70px] transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                BTC
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white font-mono tabular-nums transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                {crypto.toBTC ? `${formatBTC(crypto.toBTC)} BTC` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-blue-500/0 group-hover:ring-blue-500/20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
    </article>
  );
} 