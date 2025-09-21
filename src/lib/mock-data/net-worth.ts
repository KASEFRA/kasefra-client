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
const generateFinancialData = (days: number, startNetWorth: number = 162050): FinancialDataPoint[] => {
  const data: FinancialDataPoint[] = [];
  let currentNetWorth = startNetWorth;
  let baseIncome = 25000; // Monthly income
  let baseExpenses = 18000; // Monthly expenses

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
    current: 162050,
    change: 2340,
    changePercent: 1.47,
    period: '30 days',
    data: generateFinancialData(30, 159710)
  } as FinancialData,

  weekly: {
    current: 162050,
    change: 8520,
    changePercent: 5.55,
    period: '12 weeks',
    data: Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const baseNetWorth = 153530 + (i * 710);
      const baseIncome = 25000 / 4.33; // Weekly income
      const baseExpenses = 18000 / 4.33; // Weekly expenses

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
    current: 162050,
    change: 23500,
    changePercent: 16.97,
    period: '12 months',
    data: [
      { date: '2024-01-01', networth: 138550, income: 25000, expenses: 18000, spending: 12600, cashflow: 7000, change: 0, changePercent: 0 },
      { date: '2024-02-01', networth: 141200, income: 25000, expenses: 18200, spending: 12740, cashflow: 6800, change: 2650, changePercent: 1.91 },
      { date: '2024-03-01', networth: 143800, income: 25000, expenses: 18100, spending: 12670, cashflow: 6900, change: 2600, changePercent: 1.84 },
      { date: '2024-04-01', networth: 146950, income: 25500, expenses: 18300, spending: 12810, cashflow: 7200, change: 3150, changePercent: 2.19 },
      { date: '2024-05-01', networth: 149200, income: 25000, expenses: 18500, spending: 12950, cashflow: 6500, change: 2250, changePercent: 1.53 },
      { date: '2024-06-01', networth: 152100, income: 25200, expenses: 18000, spending: 12600, cashflow: 7200, change: 2900, changePercent: 1.94 },
      { date: '2024-07-01', networth: 154650, income: 25000, expenses: 18200, spending: 12740, cashflow: 6800, change: 2550, changePercent: 1.68 },
      { date: '2024-08-01', networth: 157300, income: 25300, expenses: 18100, spending: 12670, cashflow: 7200, change: 2650, changePercent: 1.71 },
      { date: '2024-09-01', networth: 159800, income: 25000, expenses: 18400, spending: 12880, cashflow: 6600, change: 2500, changePercent: 1.59 },
      { date: '2024-10-01', networth: 161200, income: 25000, expenses: 18600, spending: 13020, cashflow: 6400, change: 1400, changePercent: 0.88 },
      { date: '2024-11-01', networth: 161850, income: 25000, expenses: 18700, spending: 13090, cashflow: 6300, change: 650, changePercent: 0.40 },
      { date: '2024-12-01', networth: 162050, income: 25000, expenses: 18800, spending: 13160, cashflow: 6200, change: 200, changePercent: 0.12 }
    ]
  } as FinancialData,

  yearly: {
    current: 162050,
    change: 84300,
    changePercent: 108.53,
    period: '5 years',
    data: [
      { date: '2020-01-01', networth: 77750, income: 280000, expenses: 200000, spending: 140000, cashflow: 80000, change: 0, changePercent: 0 },
      { date: '2021-01-01', networth: 95200, income: 290000, expenses: 210000, spending: 147000, cashflow: 80000, change: 17450, changePercent: 22.45 },
      { date: '2022-01-01', networth: 118600, income: 300000, expenses: 215000, spending: 150500, cashflow: 85000, change: 23400, changePercent: 24.58 },
      { date: '2023-01-01', networth: 138550, income: 305000, expenses: 220000, spending: 154000, cashflow: 85000, change: 19950, changePercent: 16.82 },
      { date: '2024-01-01', networth: 162050, income: 310000, expenses: 225000, spending: 157500, cashflow: 85000, change: 23500, changePercent: 16.97 }
    ]
  } as FinancialData
};

// Current account breakdown for net worth calculation
export const mockAccountsBreakdown = [
  { name: 'Emirates NBD Current', balance: 15750, type: 'checking' },
  { name: 'ADCB Savings', balance: 45250, type: 'savings' },
  { name: 'FAB Premium', balance: 28900, type: 'checking' },
  { name: 'RAKBANK Credit Card', balance: -3250, type: 'credit' },
  { name: 'HSBC Investment', balance: 75400, type: 'investment' }
];