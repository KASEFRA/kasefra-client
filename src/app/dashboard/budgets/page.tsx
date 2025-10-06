"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  PieChart,
  Calendar,
  DollarSign,
  Settings
} from "lucide-react"
import { CreateBudgetWizard } from "@/components/budgets/create-budget-wizard"
import { BudgetCard } from "@/components/budgets/budget-card"
import { BudgetChart } from "@/components/budgets/budget-chart"
import { RecurringPaymentsCard } from "@/components/budgets/recurring-payments-card"
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
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6">

      {/* Budget Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(BUDGET_TOTAL)}</div>
            <p className="text-xs text-muted-foreground">
              October 2025 budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(BUDGET_TOTAL_SPENT)}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(BUDGET_TOTAL_REMAINING)}</div>
            <p className="text-xs text-muted-foreground">
              Available to spend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{BUDGET_USAGE_PERCENTAGE.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Of monthly budget used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress and Analytics - 50/50 Layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Budget Progress Overview */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Budget Progress</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                October 2025 spending overview
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <CreateBudgetWizard />
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm font-medium">
                  <span>Overall Progress</span>
                  <span className="text-primary">{BUDGET_USAGE_PERCENTAGE.toFixed(0)}% of budget used</span>
                </div>
                <Progress value={BUDGET_USAGE_PERCENTAGE} className="h-2 sm:h-3" />
              </div>

              {/* Top Categories */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-xs sm:text-sm text-foreground">Top Spending Categories</h4>
                {[
                  { name: "Food & Dining", spent: 1850, budget: 2000, percentage: 93 },
                  { name: "Transportation", spent: 980, budget: 1200, percentage: 82 },
                  { name: "Utilities", spent: 450, budget: 600, percentage: 75 }
                ].map((category) => (
                  <div key={category.name} className="space-y-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium truncate">{category.name}</span>
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <span className="font-semibold whitespace-nowrap text-xs sm:text-sm">{formatCurrency(category.spent)}</span>
                        <Badge
                          variant={category.percentage > 90 ? "destructive" : category.percentage > 75 ? "default" : "secondary"}
                          className="text-[10px] sm:text-xs"
                        >
                          {category.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-1.5 sm:h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Analytics Chart */}
        <BudgetChart />
      </div>

      {/* Budget Management Section */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-4">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold">Active Budgets</CardTitle>
            <CardDescription className="text-sm">
              Manage your spending limits and track progress
            </CardDescription>
          </div>
          <CreateBudgetWizard />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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