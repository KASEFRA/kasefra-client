/**
 * Centralized Reports Data
 * Aligns data across all report components using consistent sources
 */

import { mockFinancialData } from './net-worth'
import { mockBudgetCategories } from './budgets'
import { mockTransactions } from './transactions'

// Category mapping between different data sources
export const CATEGORY_MAPPING = {
    'Housing': 'Housing',
    'Utilities': 'Utilities',
    'Childcare': 'Childcare',
    'Transportation': 'Transportation',
    'Insurance': 'Insurance',
    'Groceries': 'Food & Dining',
    'Dining': 'Food & Dining',
    'Shopping': 'Shopping',
    'Healthcare': 'Healthcare',
    'Entertainment': 'Entertainment'
} as const

// Generate spending data from budget categories (aligned with actual spending)
export interface SpendingCategoryData {
    category: string
    amount: number
    percentage: number
    trend: 'up' | 'down' | 'stable'
    trendPercentage: number
    budgeted: number
    remaining: number
    monthlyData: {
        month: string
        amount: number
    }[]
}

// Calculate actual spending from budget categories
const totalBudgetSpent = mockBudgetCategories.reduce((sum, cat) => sum + cat.spentAmount, 0) // 17,256 AED

export const generateSpendingData = (): SpendingCategoryData[] => {
    // Group budget categories by main categories
    const categoryGroups = {
        'Housing': mockBudgetCategories.filter(cat => cat.name === 'Housing'),
        'Food & Dining': mockBudgetCategories.filter(cat => ['Groceries', 'Dining'].includes(cat.name)),
        'Transportation': mockBudgetCategories.filter(cat => cat.name === 'Transportation'),
        'Shopping': mockBudgetCategories.filter(cat => cat.name === 'Shopping'),
        'Healthcare': mockBudgetCategories.filter(cat => cat.name === 'Healthcare'),
        'Utilities': mockBudgetCategories.filter(cat => cat.name === 'Utilities'),
    }

    return Object.entries(categoryGroups).map(([category, budgetItems]) => {
        const totalSpent = budgetItems.reduce((sum, item) => sum + item.spentAmount, 0)
        const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgetedAmount, 0)
        const percentage = (totalSpent / totalBudgetSpent) * 100

        // Calculate trend based on budget performance
        const budgetUsage = (totalSpent / totalBudgeted) * 100
        let trend: 'up' | 'down' | 'stable' = 'stable'
        let trendPercentage = 0

        if (budgetUsage > 105) {
            trend = 'up'
            trendPercentage = budgetUsage - 100
        } else if (budgetUsage < 85) {
            trend = 'down'
            trendPercentage = 100 - budgetUsage
        } else {
            trend = 'stable'
            trendPercentage = Math.abs(budgetUsage - 100)
        }

        // Generate monthly data from financial data (last 6 months)
        const monthlyData = mockFinancialData.monthly.data.slice(-6).map((data, index) => {
            const monthNames = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
            // Calculate category proportion of monthly spending
            const monthlyAmount = Math.round((totalSpent / mockFinancialData.monthly.data[mockFinancialData.monthly.data.length - 1].spending) * data.spending)

            return {
                month: monthNames[index],
                amount: monthlyAmount + Math.round((Math.random() - 0.5) * monthlyAmount * 0.1) // Add small variation
            }
        })

        return {
            category,
            amount: Math.round(totalSpent),
            percentage: Math.round(percentage * 10) / 10,
            trend,
            trendPercentage: Math.round(trendPercentage * 10) / 10,
            budgeted: Math.round(totalBudgeted),
            remaining: Math.round(totalBudgeted - totalSpent),
            monthlyData
        }
    }).filter(item => item.amount > 0) // Only include categories with spending
}

// Generate net worth data from mockFinancialData (aligned with actual data)
export interface NetWorthReportData {
    date: string
    netWorth: number
    assets: number
    liabilities: number
    change: number
    changePercent: number
}

export const generateNetWorthData = (): NetWorthReportData[] => {
    return mockFinancialData.monthly.data.slice(-12).map((data, index) => {
        // Assets breakdown from financial constants
        const assets = data.networth + 4200 // Add back the debt to get total assets
        const liabilities = 4200 // Current debt amount

        return {
            date: data.date,
            netWorth: data.networth,
            assets,
            liabilities,
            change: data.change,
            changePercent: data.changePercent
        }
    })
}

// Cash flow data (already aligned)
export const getCashFlowData = () => {
    return mockFinancialData.monthly.data.slice(-6).map((data, index) => {
        const monthNames = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

        return {
            month: monthNames[index],
            income: data.income,
            expenses: data.expenses,
            netCashFlow: data.cashflow,
            cumulativeCashFlow: data.networth
        }
    })
}

// Category icons mapping
export const CATEGORY_ICONS = {
    'Housing': 'Home',
    'Food & Dining': 'Utensils',
    'Transportation': 'Car',
    'Shopping': 'ShoppingCart',
    'Healthcare': 'Heart',
    'Utilities': 'Zap',
    'Entertainment': 'Plane'
} as const

// Category colors (consistent with budget colors)
export const CATEGORY_COLORS = [
    'hsl(var(--primary))',     // Housing
    'hsl(var(--secondary))',   // Food & Dining
    'hsl(var(--accent))',      // Transportation
    'hsl(var(--muted-foreground))', // Shopping
    '#22c55e',                 // Healthcare
    '#f59e0b',                 // Utilities
    '#8b5cf6'                  // Entertainment
] as const

// Export generated data
export const reportsSpendingData = generateSpendingData()
export const reportsNetWorthData = generateNetWorthData()
export const reportsCashFlowData = getCashFlowData()

// Summary statistics
export const getSpendingInsights = () => {
    const data = reportsSpendingData
    const totalSpending = data.reduce((sum, item) => sum + item.amount, 0)
    const highestCategory = data.reduce((max, cat) => cat.amount > max.amount ? cat : max)
    const increasingSpending = data.filter(cat => cat.trend === 'up')
    const decreasingSpending = data.filter(cat => cat.trend === 'down')
    const overBudgetCategories = data.filter(cat => cat.amount > cat.budgeted)

    return {
        totalSpending,
        highestCategory: highestCategory.category,
        highestAmount: highestCategory.amount,
        highestPercentage: highestCategory.percentage,
        increasingCount: increasingSpending.length,
        decreasingCount: decreasingSpending.length,
        overBudgetCount: overBudgetCategories.length,
        insights: [
            `Highest spending category: ${highestCategory.category} (${highestCategory.percentage}% of total)`,
            `${increasingSpending.length} categories over budget, ${decreasingSpending.length} categories under budget`,
            `Total spending: AED ${totalSpending.toLocaleString()} (${((totalSpending / 22800) * 100).toFixed(1)}% of total expenses)`
        ]
    }
}