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
    currentValue: 18450.00,
    purchaseValue: 17800.00,
    quantity: 500,
    currency: "AED",
    currentPrice: 36.90,
    purchasePrice: 35.60,
    dailyChange: 285.00,
    dailyChangePercent: 1.57,
    totalGainLoss: 650.00,
    totalGainLossPercent: 3.65,
    sector: "Real Estate",
    exchange: "DFM",
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-2",
    symbol: "ADCB",
    name: "Abu Dhabi Commercial Bank",
    type: "stock",
    category: "stocks",
    currentValue: 24750.00,
    purchaseValue: 24000.00,
    quantity: 300,
    currency: "AED",
    currentPrice: 82.50,
    purchasePrice: 80.00,
    dailyChange: 165.00,
    dailyChangePercent: 0.67,
    totalGainLoss: 750.00,
    totalGainLossPercent: 3.13,
    sector: "Banking",
    exchange: "ADX",
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-3",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    category: "stocks",
    currentValue: 52650.00,
    purchaseValue: 51200.00,
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
    lastUpdated: "2024-01-24T16:00:00Z"
  },

  // CRYPTO
  {
    id: "inv-4",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    category: "crypto",
    currentValue: 147800.00,
    purchaseValue: 140000.00,
    quantity: 3.5,
    currency: "USD",
    currentPrice: 42228.57,
    purchasePrice: 40000.00,
    dailyChange: 1890.00,
    dailyChangePercent: 1.29,
    totalGainLoss: 7800.00,
    totalGainLossPercent: 5.57,
    sector: "Cryptocurrency",
    exchange: "Binance",
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-5",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    category: "crypto",
    currentValue: 59400.00,
    purchaseValue: 56000.00,
    quantity: 24,
    currency: "USD",
    currentPrice: 2475.00,
    purchasePrice: 2333.33,
    dailyChange: -726.00,
    dailyChangePercent: -1.21,
    totalGainLoss: 3400.00,
    totalGainLossPercent: 6.07,
    sector: "Cryptocurrency",
    exchange: "Coinbase",
    lastUpdated: "2024-01-24T16:00:00Z"
  },

  // COMMODITY
  {
    id: "inv-6",
    symbol: "GOLD",
    name: "Gold Bullion",
    type: "commodity",
    category: "commodity",
    currentValue: 73150.00,
    purchaseValue: 71000.00,
    quantity: 1000,
    currency: "USD",
    currentPrice: 73.15,
    purchasePrice: 71.00,
    dailyChange: 585.00,
    dailyChangePercent: 0.81,
    totalGainLoss: 2150.00,
    totalGainLossPercent: 3.03,
    sector: "Precious Metals",
    exchange: "COMEX",
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-7",
    symbol: "SILVER",
    name: "Silver Bullion",
    type: "commodity",
    category: "commodity",
    currentValue: 24680.00,
    purchaseValue: 25200.00,
    quantity: 1000,
    currency: "USD",
    currentPrice: 24.68,
    purchasePrice: 25.20,
    dailyChange: -98.72,
    dailyChangePercent: -0.40,
    totalGainLoss: -520.00,
    totalGainLossPercent: -2.06,
    sector: "Precious Metals",
    exchange: "COMEX",
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-8",
    symbol: "WTI",
    name: "Crude Oil WTI",
    type: "commodity",
    category: "commodity",
    currentValue: 18720.00,
    purchaseValue: 18000.00,
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
    lastUpdated: "2024-01-24T16:00:00Z"
  },

  // REAL ESTATE
  {
    id: "inv-9",
    symbol: "REIT-DXB",
    name: "Dubai Real Estate Investment Trust",
    type: "real-estate",
    category: "real-estate",
    currentValue: 85200.00,
    purchaseValue: 82000.00,
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
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-10",
    symbol: "VNQ",
    name: "Vanguard Real Estate ETF",
    type: "real-estate",
    category: "real-estate",
    currentValue: 32480.00,
    purchaseValue: 31500.00,
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
    lastUpdated: "2024-01-24T16:00:00Z"
  },
  {
    id: "inv-11",
    symbol: "ABU-PROP",
    name: "Abu Dhabi Property Fund",
    type: "real-estate",
    category: "real-estate",
    currentValue: 47850.00,
    purchaseValue: 46000.00,
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
    lastUpdated: "2024-01-24T16:00:00Z"
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
    lastUpdated: "2024-01-24T16:00:00Z",
    topMovers
  };
})();

// Performance data for charts
export const mockInvestmentPerformance = {
  daily: [
    { date: '2024-01-18', value: 68850, change: 450 },
    { date: '2024-01-19', value: 69200, change: 350 },
    { date: '2024-01-20', value: 69550, change: 350 },
    { date: '2024-01-21', value: 69100, change: -450 },
    { date: '2024-01-22', value: 69800, change: 700 },
    { date: '2024-01-23', value: 70150, change: 350 },
    { date: '2024-01-24', value: 70421, change: 271 }
  ],
  monthly: [
    { date: '2023-12-01', value: 65200, change: 0 },
    { date: '2024-01-01', value: 68450, change: 3250 },
    { date: '2024-01-24', value: 70421, change: 1971 }
  ]
};