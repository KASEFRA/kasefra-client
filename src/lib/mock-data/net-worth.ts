// Enhanced Financial Data - Reusable for dashboard and dedicated pages

export interface FinancialDataPoint {
  date: string;
  networth: number;
  income: number;
  expenses: number;
  spending: number;
  cashflow: number;
  change: number;
  changePercent: number;
}

export interface FinancialData {
  current: number;
  change: number;
  changePercent: number;
  period: string;
  data: FinancialDataPoint[];
}

export type DataType = 'networth' | 'spending' | 'income' | 'expenses' | 'cashflow' | 'all';

// Generate comprehensive financial data
const generateFinancialData = (days: number, startNetWorth: number = 626800): FinancialDataPoint[] => {
  const data: FinancialDataPoint[] = [];
  let currentNetWorth = startNetWorth;
  let baseIncome = 30500; // Monthly income
  let baseExpenses = 22000; // Monthly expenses

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Calculate daily values from monthly averages
    const dailyIncome = baseIncome / 30 + (Math.random() - 0.5) * 200;
    const dailyExpenses = baseExpenses / 30 + (Math.random() - 0.5) * 150;
    const dailySpending = dailyExpenses * 0.7 + (Math.random() - 0.5) * 100; // Spending is subset of expenses
    const dailyCashFlow = dailyIncome - dailyExpenses;

    // Net worth fluctuates based on cash flow and market changes
    const marketChange = (Math.random() - 0.5) * 1000; // Market fluctuations
    const networthChange = dailyCashFlow + marketChange;
    currentNetWorth += networthChange;

    const previousNetWorth = i === days ? startNetWorth : data[data.length - 1]?.networth || startNetWorth;
    const change = currentNetWorth - previousNetWorth;
    const changePercent = (change / previousNetWorth) * 100;

    data.push({
      date: date.toISOString().split('T')[0],
      networth: Math.round(currentNetWorth),
      income: Math.round(dailyIncome),
      expenses: Math.round(dailyExpenses),
      spending: Math.round(dailySpending),
      cashflow: Math.round(dailyCashFlow),
      change: Math.round(change),
      changePercent: Number(changePercent.toFixed(2))
    });
  }

  return data;
};

export const mockFinancialData = {
  daily: {
    current: 626800,
    change: 2340,
    changePercent: 0.37,
    period: '30 days',
    data: generateFinancialData(30, 624460)
  } as FinancialData,

  weekly: {
    current: 626800,
    change: 8520,
    changePercent: 1.38,
    period: '12 weeks',
    data: Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const baseNetWorth = 619280 + (i * 710);
      const baseIncome = 30500 / 4.33; // Weekly income
      const baseExpenses = 22000 / 4.33; // Weekly expenses

      return {
        date: date.toISOString().split('T')[0],
        networth: baseNetWorth + Math.round((Math.random() - 0.5) * 3000),
        income: Math.round(baseIncome + (Math.random() - 0.5) * 1000),
        expenses: Math.round(baseExpenses + (Math.random() - 0.5) * 800),
        spending: Math.round(baseExpenses * 0.7 + (Math.random() - 0.5) * 600),
        cashflow: Math.round((baseIncome - baseExpenses) + (Math.random() - 0.5) * 200),
        change: i === 0 ? 0 : 710 + Math.round((Math.random() - 0.5) * 500),
        changePercent: i === 0 ? 0 : Number(((710 / baseNetWorth) * 100).toFixed(2))
      };
    }).reverse()
  } as FinancialData,

  monthly: {
    current: 626800,
    change: 94550,
    changePercent: 17.77,
    period: '12 months',
    data: [
      { date: '2024-11-01', networth: 533250, income: 30500, expenses: 22000, spending: 15400, cashflow: 8500, change: 0, changePercent: 0 },
      { date: '2024-12-01', networth: 541700, income: 30500, expenses: 22200, spending: 15540, cashflow: 8300, change: 8450, changePercent: 1.58 },
      { date: '2025-01-01', networth: 550300, income: 30500, expenses: 22100, spending: 15470, cashflow: 8400, change: 8600, changePercent: 1.59 },
      { date: '2025-02-01', networth: 559450, income: 31000, expenses: 22300, spending: 15610, cashflow: 8700, change: 9150, changePercent: 1.66 },
      { date: '2025-03-01', networth: 567700, income: 30500, expenses: 22500, spending: 15750, cashflow: 8000, change: 8250, changePercent: 1.47 },
      { date: '2025-04-01', networth: 576600, income: 30700, expenses: 22000, spending: 15400, cashflow: 8700, change: 8900, changePercent: 1.57 },
      { date: '2025-05-01', networth: 585150, income: 30500, expenses: 22200, spending: 15540, cashflow: 8300, change: 8550, changePercent: 1.48 },
      { date: '2025-06-01', networth: 593800, income: 30800, expenses: 22100, spending: 15470, cashflow: 8700, change: 8650, changePercent: 1.48 },
      { date: '2025-07-01', networth: 602300, income: 30500, expenses: 22400, spending: 15680, cashflow: 8100, change: 8500, changePercent: 1.43 },
      { date: '2025-08-01', networth: 610700, income: 30500, expenses: 22600, spending: 15820, cashflow: 7900, change: 8400, changePercent: 1.39 },
      { date: '2025-09-01', networth: 619350, income: 30500, expenses: 22700, spending: 15890, cashflow: 7800, change: 8650, changePercent: 1.42 },
      { date: '2025-10-01', networth: 626800, income: 30500, expenses: 22800, spending: 15960, cashflow: 7700, change: 7450, changePercent: 1.20 }
    ]
  } as FinancialData,

  yearly: {
    current: 626800,
    change: 448550,
    changePercent: 251.63,
    period: '5 years',
    data: [
      { date: '2020-01-01', networth: 178250, income: 336000, expenses: 240000, spending: 168000, cashflow: 96000, change: 0, changePercent: 0 },
      { date: '2021-01-01', networth: 248700, income: 348000, expenses: 252000, spending: 176400, cashflow: 96000, change: 70450, changePercent: 39.53 },
      { date: '2022-01-01', networth: 336100, income: 360000, expenses: 258000, spending: 180600, cashflow: 102000, change: 87400, changePercent: 35.14 },
      { date: '2023-01-01', networth: 438250, income: 366000, expenses: 264000, spending: 184800, cashflow: 102000, change: 102150, changePercent: 30.38 },
      { date: '2024-01-01', networth: 531800, income: 372000, expenses: 270000, spending: 189000, cashflow: 102000, change: 93550, changePercent: 21.35 },
      { date: '2025-01-01', networth: 626800, income: 372000, expenses: 270000, spending: 189000, cashflow: 102000, change: 95000, changePercent: 17.86 }
    ]
  } as FinancialData
};

// Current account breakdown for net worth calculation
export const mockAccountsBreakdown = [
  { name: 'Emirates NBD Current', balance: 52000, type: 'checking' },
  { name: 'ADCB Savings', balance: 145000, type: 'savings' },
  { name: 'FAB Credit Card', balance: -4200, type: 'credit' },
  { name: 'Investment Portfolio', balance: 298000, type: 'investment' },
  { name: 'HSBC USD Account', balance: 41000, type: 'savings' },
  { name: 'Toyota Land Cruiser 2023', balance: 95000, type: 'asset' }
];