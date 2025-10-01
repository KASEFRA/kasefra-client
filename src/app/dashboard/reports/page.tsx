"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  PieChart,
  Activity,
  DollarSign
} from "lucide-react"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { CashFlowChart } from "@/components/reports/cash-flow-chart"
import { NetWorthChart } from "@/components/reports/net-worth-chart"
import { SpendingPatternsChart } from "@/components/reports/spending-patterns-chart"
import {
  CURRENT_NET_WORTH,
  MONTHLY_INCOME,
  MONTHLY_EXPENSES,
  SAVINGS_RATE,
  formatCompactCurrency,
  formatPercentage
} from "@/lib/mock-data/financial-constants"
import { mockFinancialData } from "@/lib/mock-data"

export default function ReportsPage() {
  // Calculate previous month values for comparison
  const currentMonthData = mockFinancialData.monthly.data[mockFinancialData.monthly.data.length - 1]
  const previousMonthData = mockFinancialData.monthly.data[mockFinancialData.monthly.data.length - 2]

  const netWorthChange = ((CURRENT_NET_WORTH - previousMonthData.networth) / previousMonthData.networth) * 100
  const expensesChange = ((MONTHLY_EXPENSES - previousMonthData.expenses) / previousMonthData.expenses) * 100

  return (
    <div className="space-y-8 px-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/20">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompactCurrency(CURRENT_NET_WORTH)}</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">+{netWorthChange.toFixed(1)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompactCurrency(MONTHLY_INCOME)}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Consistent monthly income</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCompactCurrency(MONTHLY_EXPENSES)}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-blue-600 font-semibold">{expensesChange > 0 ? '+' : ''}{expensesChange.toFixed(1)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/20">
              <PieChart className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(SAVINGS_RATE, 1)}</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600 font-semibold">Above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <ReportsOverview />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart />
        <NetWorthChart />
      </div>

      {/* Spending Analysis */}
      <SpendingPatternsChart />
    </div>
  )
}