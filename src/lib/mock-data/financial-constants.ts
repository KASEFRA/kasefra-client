/**
 * Centralized Financial Constants
 * Single source of truth for all financial data across the application
 * Updated: October 2025
 */

// Current Net Worth Breakdown (AED)
export const CASH_ASSETS = 238000      // Current + Savings accounts
export const INVESTMENTS = 298000      // Investment portfolio
export const VEHICLE = 95000           // Toyota Land Cruiser 2023
export const DEBT = -4200              // Credit card balance

// Total Net Worth
export const CURRENT_NET_WORTH = CASH_ASSETS + INVESTMENTS + VEHICLE + DEBT // 626,800 AED

// Monthly Financial Data (October 2025)
export const MONTHLY_INCOME = 30500
export const MONTHLY_EXPENSES = 22800
export const MONTHLY_SAVINGS = MONTHLY_INCOME - MONTHLY_EXPENSES // 7,700 AED
export const SAVINGS_RATE = (MONTHLY_SAVINGS / MONTHLY_INCOME) * 100 // 25.2%

// Budget Totals (October 2025) - Aligned with mockBudgetCategories
export const BUDGET_FIXED_TOTAL = 13225        // Housing + Utilities + Childcare + Transportation + Insurance
export const BUDGET_FLEXIBLE_TOTAL = 4600      // Groceries + Dining + Shopping + Healthcare + Entertainment
export const BUDGET_NON_MONTHLY_TOTAL = 1517   // Non-recurring expenses
export const BUDGET_TOTAL = BUDGET_FIXED_TOTAL + BUDGET_FLEXIBLE_TOTAL + BUDGET_NON_MONTHLY_TOTAL // 19,342 AED

// Budget Spending (calculated from mockBudgetCategories)
export const BUDGET_FIXED_SPENT = 13187.80     // Fixed expenses spent
export const BUDGET_FLEXIBLE_SPENT = 4068.50   // Flexible expenses spent
export const BUDGET_NON_MONTHLY_SPENT = 308    // Non-monthly spent
export const BUDGET_TOTAL_SPENT = BUDGET_FIXED_SPENT + BUDGET_FLEXIBLE_SPENT + BUDGET_NON_MONTHLY_SPENT // 17,564.30 AED

// Budget Remaining
export const BUDGET_TOTAL_REMAINING = BUDGET_TOTAL - BUDGET_TOTAL_SPENT // 1,777.70 AED
export const BUDGET_USAGE_PERCENTAGE = (BUDGET_TOTAL_SPENT / BUDGET_TOTAL) * 100 // ~91%

// Recurring Payments Total (from recurring-payments.ts)
export const RECURRING_PAYMENTS_MONTHLY = 4885  // Total monthly recurring payments

// Asset Breakdown for Display
export const ASSET_BREAKDOWN = [
  {
    name: 'Cash & Savings',
    value: CASH_ASSETS,
    percentage: Math.round((CASH_ASSETS / (CURRENT_NET_WORTH + Math.abs(DEBT))) * 100), // 38%
    type: 'cash',
    icon: '💵',
    description: 'Current and savings accounts',
    accounts: [
      { name: 'Emirates NBD Current', balance: 52000 },
      { name: 'ADCB Savings', balance: 145000 },
      { name: 'HSBC USD Account', balance: 41000 }
    ]
  },
  {
    name: 'Investments',
    value: INVESTMENTS,
    percentage: Math.round((INVESTMENTS / (CURRENT_NET_WORTH + Math.abs(DEBT))) * 100), // 47%
    type: 'investment',
    icon: '📈',
    description: 'Investment portfolio',
    accounts: [
      { name: 'EFG Hermes Portfolio', balance: 298000 }
    ]
  },
  {
    name: 'Vehicle',
    value: VEHICLE,
    percentage: Math.round((VEHICLE / (CURRENT_NET_WORTH + Math.abs(DEBT))) * 100), // 15%
    type: 'vehicle',
    icon: '🚗',
    description: 'Toyota Land Cruiser 2023',
    accounts: [
      { name: 'Toyota Land Cruiser 2023', balance: 95000 }
    ]
  },
  {
    name: 'Debt',
    value: DEBT,
    percentage: Math.round((Math.abs(DEBT) / (CURRENT_NET_WORTH + Math.abs(DEBT))) * 100), // 1%
    type: 'debt',
    icon: '💳',
    description: 'Credit card balance',
    accounts: [
      { name: 'FAB Credit Card', balance: DEBT }
    ]
  }
] as const

// Calculated Metrics
export const DEBT_TO_INCOME_RATIO = (Math.abs(DEBT) / MONTHLY_INCOME) * 100 // 13.8%
export const EMERGENCY_FUND_MONTHS = CASH_ASSETS / MONTHLY_EXPENSES // ~10.4 months
export const NET_WORTH_GROWTH_MONTHLY = 8500 // Average monthly growth
export const NET_WORTH_GROWTH_YEARLY = 94550 // Average yearly growth

// Financial Health Thresholds
export const RECOMMENDED_SAVINGS_RATE = 20
export const RECOMMENDED_EMERGENCY_FUND_MONTHS = 6
export const RECOMMENDED_DEBT_TO_INCOME = 30

// Display Formatters
export const formatCurrency = (amount: number, showDecimals = false) => {
  return amount.toLocaleString('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  })
}

export const formatPercentage = (value: number, decimals = 1) => {
  return `${value.toFixed(decimals)}%`
}

export const formatCompactCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `AED ${(amount / 1000000).toFixed(2)}M`
  }
  if (amount >= 1000) {
    return `AED ${(amount / 1000).toFixed(1)}K`
  }
  return formatCurrency(amount)
}
