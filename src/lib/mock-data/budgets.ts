import { Budget, BudgetCategory } from '@/types';

// Enhanced budget data for Monarch-style dashboard
export interface BudgetSummary {
  fixed: {
    budgeted: number;
    spent: number;
    remaining: number;
    categories: BudgetCategory[];
  };
  flexible: {
    budgeted: number;
    spent: number;
    remaining: number;
    categories: BudgetCategory[];
  };
  total: {
    budgeted: number;
    spent: number;
    remaining: number;
  };
}

export const mockBudgetCategories: BudgetCategory[] = [
  // FIXED EXPENSES (Non-flexible)
  {
    id: "cat-1",
    name: "Housing",
    budgetedAmount: 6500,
    spentAmount: 6500.00,
    currency: "AED",
    color: "#dc2626",
    isFlexible: false,
  },
  {
    id: "cat-2",
    name: "Utilities",
    budgetedAmount: 1300,
    spentAmount: 1262.80,
    currency: "AED",
    color: "#f59e0b",
    isFlexible: false,
  },
  {
    id: "cat-3",
    name: "Childcare",
    budgetedAmount: 3200,
    spentAmount: 3200.00,
    currency: "AED",
    color: "#7c3aed",
    isFlexible: false,
  },
  {
    id: "cat-4",
    name: "Transportation",
    budgetedAmount: 1645,
    spentAmount: 1645.00,
    currency: "AED",
    color: "#3b82f6",
    isFlexible: false,
  },
  {
    id: "cat-5",
    name: "Insurance",
    budgetedAmount: 580,
    spentAmount: 580.00,
    currency: "AED",
    color: "#06b6d4",
    isFlexible: false,
  },

  // FLEXIBLE EXPENSES
  {
    id: "cat-6",
    name: "Groceries",
    budgetedAmount: 1800,
    spentAmount: 1603.00,
    currency: "AED",
    color: "#10b981",
    isFlexible: true,
  },
  {
    id: "cat-7",
    name: "Dining",
    budgetedAmount: 1200,
    spentAmount: 1038.00,
    currency: "AED",
    color: "#ef4444",
    isFlexible: true,
  },
  {
    id: "cat-8",
    name: "Shopping",
    budgetedAmount: 900,
    spentAmount: 945.00,
    currency: "AED",
    color: "#8b5cf6",
    isFlexible: true,
  },
  {
    id: "cat-9",
    name: "Healthcare",
    budgetedAmount: 400,
    spentAmount: 320.00,
    currency: "AED",
    color: "#059669",
    isFlexible: true,
  },
  {
    id: "cat-10",
    name: "Entertainment",
    budgetedAmount: 300,
    spentAmount: 162.50,
    currency: "AED",
    color: "#db2777",
    isFlexible: true,
  },
];

export const mockBudgets: Budget[] = [
  {
    id: "budget-1",
    userId: "user-123",
    name: "Monthly Budget",
    type: "category",
    period: "monthly",
    totalAmount: 20000,
    currency: "AED",
    categories: mockBudgetCategories,
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    isActive: true
  }
];

// Calculate budget summary for Monarch-style dashboard
export const mockBudgetSummary: BudgetSummary = (() => {
  const fixedCategories = mockBudgetCategories.filter(cat => !cat.isFlexible);
  const flexibleCategories = mockBudgetCategories.filter(cat => cat.isFlexible);

  const fixedBudgeted = fixedCategories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
  const fixedSpent = fixedCategories.reduce((sum, cat) => sum + cat.spentAmount, 0);

  const flexibleBudgeted = flexibleCategories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
  const flexibleSpent = flexibleCategories.reduce((sum, cat) => sum + cat.spentAmount, 0);

  return {
    fixed: {
      budgeted: fixedBudgeted,
      spent: fixedSpent,
      remaining: fixedBudgeted - fixedSpent,
      categories: fixedCategories
    },
    flexible: {
      budgeted: flexibleBudgeted,
      spent: flexibleSpent,
      remaining: flexibleBudgeted - flexibleSpent,
      categories: flexibleCategories
    },
    total: {
      budgeted: fixedBudgeted + flexibleBudgeted,
      spent: fixedSpent + flexibleSpent,
      remaining: (fixedBudgeted + flexibleBudgeted) - (fixedSpent + flexibleSpent)
    }
  };
})();