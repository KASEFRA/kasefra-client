export { mockUser } from './users';
export { mockAccounts } from './accounts';
export { mockTransactions } from './transactions';
export { mockAIResponses, mockFinancialHealthScore, mockSmartRecommendations } from './ai-responses';
export { mockBudgets, mockBudgetCategories, mockBudgetSummary, type BudgetSummary } from './budgets';
export { mockGoals } from './goals';
export { mockCategories, mockUAEBanks, mockUAEMerchants } from './categories';
export { mockFinancialData, mockAccountsBreakdown, type DataType, type FinancialData, type FinancialDataPoint } from './net-worth';
export { mockRecurringPayments, recurringPaymentsSummary } from './recurring-payments';
export { mockInvestments, mockPortfolioSummary, mockInvestmentPerformance } from './investments';

export const mockChartData = {
  spendingTrend: [
    { date: '2024-01-01', value: 2150, category: 'Groceries' },
    { date: '2024-01-02', value: 850, category: 'Transportation' },
    { date: '2024-01-03', value: 1200, category: 'Utilities' },
    { date: '2024-01-04', value: 450, category: 'Dining' },
    { date: '2024-01-05', value: 320, category: 'Shopping' },
    { date: '2024-01-06', value: 180, category: 'Healthcare' },
    { date: '2024-01-07', value: 95, category: 'Entertainment' },
  ],
  incomeVsExpenses: [
    { month: 'Oct', income: 25000, expenses: 18500 },
    { month: 'Nov', income: 25000, expenses: 19200 },
    { month: 'Dec', income: 27000, expenses: 18800 },
    { month: 'Jan', income: 25000, expenses: 17950 },
  ],
  categoryBreakdown: [
    { category: 'Groceries', amount: 2150, percentage: 28 },
    { category: 'Utilities', amount: 1265, percentage: 17 },
    { category: 'Transportation', amount: 685, percentage: 9 },
    { category: 'Dining', amount: 445, percentage: 6 },
    { category: 'Shopping', amount: 1350, percentage: 18 },
    { category: 'Healthcare', amount: 250, percentage: 3 },
    { category: 'Others', amount: 1455, percentage: 19 },
  ],
};