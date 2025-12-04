// Investment Portfolio Data - Reusable for dashboard and dedicated investments page

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'commodity' | 'real-estate' | 'sukuk' | 'fund' | 'etf' | 'bond';
  category: 'stocks' | 'crypto' | 'commodity' | 'real-estate';
  currentValue: number;
  purchaseValue: number;
  quantity: number;
  currency: string;
  currentPrice: number;
  purchasePrice: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  sector?: string;
  exchange?: string;
  lastUpdated: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dailyChange: number;
  dailyChangePercent: number;
  currency: string;
  lastUpdated: string;
  topMovers: Investment[];
}

export const mockInvestments: Investment[] = [
  // STOCKS
  {
    id: "inv-1",
    symbol: "EMAAR",
    name: "Emaar Properties",
    type: "stock",
    category: "stocks",
    currentValue: 35000.00,
    purchaseValue: 33800.00,
    quantity: 500,
    currency: "AED",
    currentPrice: 70.00,
    purchasePrice: 67.60,
    dailyChange: 285.00,
    dailyChangePercent: 1.57,
    totalGainLoss: 1200.00,
    totalGainLossPercent: 3.55,
    sector: "Real Estate",
    exchange: "DFM",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-2",
    symbol: "ADCB",
    name: "Abu Dhabi Commercial Bank",
    type: "stock",
    category: "stocks",
    currentValue: 28500.00,
    purchaseValue: 27600.00,
    quantity: 300,
    currency: "AED",
    currentPrice: 95.00,
    purchasePrice: 92.00,
    dailyChange: 165.00,
    dailyChangePercent: 0.67,
    totalGainLoss: 900.00,
    totalGainLossPercent: 3.26,
    sector: "Banking",
    exchange: "ADX",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-3",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    category: "stocks",
    currentValue: 45000.00,
    purchaseValue: 43750.00,
    quantity: 300,
    currency: "USD",
    currentPrice: 175.50,
    purchasePrice: 170.67,
    dailyChange: -420.00,
    dailyChangePercent: -0.79,
    totalGainLoss: 1450.00,
    totalGainLossPercent: 2.83,
    sector: "Technology",
    exchange: "NASDAQ",
    lastUpdated: "2025-10-03T16:00:00Z"
  },

  // CRYPTO
  {
    id: "inv-4",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    category: "crypto",
    currentValue: 28200.00,
    purchaseValue: 26800.00,
    quantity: 0.67,
    currency: "USD",
    currentPrice: 42089.55,
    purchasePrice: 40000.00,
    dailyChange: 1890.00,
    dailyChangePercent: 1.29,
    totalGainLoss: 1400.00,
    totalGainLossPercent: 5.22,
    sector: "Cryptocurrency",
    exchange: "Binance",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-5",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    category: "crypto",
    currentValue: 16500.00,
    purchaseValue: 15600.00,
    quantity: 6.67,
    currency: "USD",
    currentPrice: 2474.14,
    purchasePrice: 2339.10,
    dailyChange: -726.00,
    dailyChangePercent: -1.21,
    totalGainLoss: 900.00,
    totalGainLossPercent: 5.77,
    sector: "Cryptocurrency",
    exchange: "Coinbase",
    lastUpdated: "2025-10-03T16:00:00Z"
  },

  // COMMODITY
  {
    id: "inv-6",
    symbol: "GOLD",
    name: "Gold Bullion",
    type: "commodity",
    category: "commodity",
    currentValue: 35000.00,
    purchaseValue: 34000.00,
    quantity: 479,
    currency: "USD",
    currentPrice: 73.07,
    purchasePrice: 71.00,
    dailyChange: 285.00,
    dailyChangePercent: 0.82,
    totalGainLoss: 1000.00,
    totalGainLossPercent: 2.94,
    sector: "Precious Metals",
    exchange: "COMEX",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-7",
    symbol: "SILVER",
    name: "Silver Bullion",
    type: "commodity",
    category: "commodity",
    currentValue: 9700.00,
    purchaseValue: 10000.00,
    quantity: 393,
    currency: "USD",
    currentPrice: 24.68,
    purchasePrice: 25.45,
    dailyChange: -39.30,
    dailyChangePercent: -0.40,
    totalGainLoss: -300.00,
    totalGainLossPercent: -3.00,
    sector: "Precious Metals",
    exchange: "COMEX",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-8",
    symbol: "WTI",
    name: "Crude Oil WTI",
    type: "commodity",
    category: "commodity",
    currentValue: 25000.00,
    purchaseValue: 24000.00,
    quantity: 240,
    currency: "USD",
    currentPrice: 78.00,
    purchasePrice: 75.00,
    dailyChange: 124.80,
    dailyChangePercent: 0.67,
    totalGainLoss: 720.00,
    totalGainLossPercent: 4.00,
    sector: "Energy",
    exchange: "NYMEX",
    lastUpdated: "2025-10-03T16:00:00Z"
  },

  // REAL ESTATE
  {
    id: "inv-9",
    symbol: "REIT-DXB",
    name: "Dubai Real Estate Investment Trust",
    type: "real-estate",
    category: "real-estate",
    currentValue: 30000.00,
    purchaseValue: 29000.00,
    quantity: 400,
    currency: "AED",
    currentPrice: 213.00,
    purchasePrice: 205.00,
    dailyChange: 1278.00,
    dailyChangePercent: 1.52,
    totalGainLoss: 3200.00,
    totalGainLossPercent: 3.90,
    sector: "Real Estate",
    exchange: "DFM",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-10",
    symbol: "VNQ",
    name: "Vanguard Real Estate ETF",
    type: "real-estate",
    category: "real-estate",
    currentValue: 25100.00,
    purchaseValue: 24500.00,
    quantity: 350,
    currency: "USD",
    currentPrice: 92.80,
    purchasePrice: 90.00,
    dailyChange: 195.20,
    dailyChangePercent: 0.60,
    totalGainLoss: 980.00,
    totalGainLossPercent: 3.11,
    sector: "Real Estate",
    exchange: "NYSE",
    lastUpdated: "2025-10-03T16:00:00Z"
  },
  {
    id: "inv-11",
    symbol: "ABU-PROP",
    name: "Abu Dhabi Property Fund",
    type: "real-estate",
    category: "real-estate",
    currentValue: 20000.00,
    purchaseValue: 19500.00,
    quantity: 200,
    currency: "AED",
    currentPrice: 239.25,
    purchasePrice: 230.00,
    dailyChange: 287.10,
    dailyChangePercent: 0.60,
    totalGainLoss: 1850.00,
    totalGainLossPercent: 4.02,
    sector: "Real Estate",
    exchange: "ADX",
    lastUpdated: "2025-10-03T16:00:00Z"
  }
];

// Calculate portfolio summary
export const mockPortfolioSummary: PortfolioSummary = (() => {
  const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.purchaseValue, 0);
  const totalGainLoss = totalValue - totalInvested;
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;
  const dailyChange = mockInvestments.reduce((sum, inv) => sum + inv.dailyChange, 0);
  const dailyChangePercent = (dailyChange / totalValue) * 100;

  // Top movers (by absolute daily change)
  const topMovers = [...mockInvestments]
    .sort((a, b) => Math.abs(b.dailyChange) - Math.abs(a.dailyChange))
    .slice(0, 3);

  return {
    totalValue: Math.round(totalValue),
    totalInvested: Math.round(totalInvested),
    totalGainLoss: Math.round(totalGainLoss),
    totalGainLossPercent: Number(totalGainLossPercent.toFixed(2)),
    dailyChange: Math.round(dailyChange),
    dailyChangePercent: Number(dailyChangePercent.toFixed(2)),
    currency: "AED", // Base currency
    lastUpdated: "2025-10-03T16:00:00Z",
    topMovers
  };
})();

// Performance data for charts
export const mockInvestmentPerformance = {
  daily: [
    { date: '2025-09-25', value: 295200, change: -1850 },
    { date: '2025-09-26', value: 296800, change: 1600 },
    { date: '2025-09-27', value: 297150, change: 350 },
    { date: '2025-09-30', value: 298450, change: 1300 },
    { date: '2025-10-01', value: 297800, change: -650 },
    { date: '2025-10-02', value: 298900, change: 1100 },
    { date: '2025-10-03', value: 298000, change: -900 }
  ],
  monthly: [
    { date: '2025-08-01', value: 289500, change: 2150 },
    { date: '2025-09-01', value: 294200, change: 4700 },
    { date: '2025-10-01', value: 298000, change: 3800 }
  ]
};