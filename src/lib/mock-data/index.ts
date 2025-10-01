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
    { date: '2025-10-01', value: 2150, category: 'Groceries' },
    { date: '2025-10-02', value: 850, category: 'Transportation' },
    { date: '2025-10-03', value: 1200, category: 'Utilities' },
    { date: '2025-10-04', value: 450, category: 'Dining' },
    { date: '2025-10-05', value: 320, category: 'Shopping' },
    { date: '2025-10-06', value: 180, category: 'Healthcare' },
    { date: '2025-10-07', value: 95, category: 'Entertainment' },
  ],
  incomeVsExpenses: [
    { month: 'Jul', income: 30500, expenses: 22400 },
    { month: 'Aug', income: 30500, expenses: 22600 },
    { month: 'Sep', income: 30500, expenses: 22700 },
    { month: 'Oct', income: 30500, expenses: 22800 },
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