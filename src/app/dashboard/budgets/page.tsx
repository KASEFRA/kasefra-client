"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Target,
  TrendingDown,
  PieChart,
  DollarSign
} from "lucide-react"
import { CreateBudgetWizard } from "@/components/budgets/create-budget-wizard"
import { BudgetCard } from "@/components/budgets/budget-card"
import { BudgetChart } from "@/components/budgets/budget-chart"
import { RecurringPaymentsCard } from "@/components/budgets/recurring-payments-card"
import { BudgetProgressOverview } from "@/components/budgets/budget-progress-overview"
import { mockBudgetPageData } from "@/lib/mock-data"
import {
  BUDGET_TOTAL,
  BUDGET_TOTAL_SPENT,
  BUDGET_TOTAL_REMAINING,
  BUDGET_USAGE_PERCENTAGE
} from "@/lib/mock-data/financial-constants"

export default function BudgetsPage() {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-3 sm:px-4 lg:px-6">

      {/* Budget Summary Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrency(BUDGET_TOTAL)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              October 2025 budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrency(BUDGET_TOTAL_SPENT)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Remaining</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(BUDGET_TOTAL_REMAINING)}</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Available to spend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Budget Usage</CardTitle>
            <PieChart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-2xl font-bold">{BUDGET_USAGE_PERCENTAGE.toFixed(0)}%</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Of monthly budget used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress and Analytics - 50/50 Layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Budget Progress Overview */}
        <BudgetProgressOverview />

        {/* Budget Analytics Chart */}
        <BudgetChart />
      </div>

      {/* Budget Management Section */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
          <div>
            <CardTitle className="text-lg sm:text-xl font-semibold">Active Budgets</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Manage your spending limits and track progress
            </CardDescription>
          </div>
          <CreateBudgetWizard />
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {mockBudgetPageData.activeBudgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onUpdate={(id, newBudget) => {
                  console.log(`Update budget ${id} to AED ${newBudget}`)
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recurring Payments - Full Width */}
      <RecurringPaymentsCard />
    </div>
  )
}