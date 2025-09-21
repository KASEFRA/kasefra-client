"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { mockTransactions } from "@/lib/mock-data"
import { FinancialHealthScore } from "@/components/ai/financial-health-score"
import { NetWorthChart } from "@/components/dashboard/net-worth-chart"
import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { GoalsSummary } from "@/components/dashboard/goals-summary"
import { RecurringPayments } from "@/components/dashboard/recurring-payments"
import { InvestmentSummary } from "@/components/dashboard/investment-summary"
import { useRouter } from "next/navigation"

import data from "./data.json"

export default function Page() {
  const router = useRouter()

  // Calculate net worth from new data structure
  const totalBalance = data.reduce((sum, account) => sum + account.balance, 0)

  // Get recent transactions (first 5 from mock data)
  const recentTransactions = mockTransactions.slice(0, 5)

  // Calculate monthly spending from mock transactions
  const monthlySpending = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  // Quick action handlers
  const handleAddTransaction = () => {
    router.push('/dashboard/transactions')
  }

  const handleLinkAccount = () => {
    router.push('/dashboard/accounts')
  }

  const handleCreateBudget = () => {
    router.push('/dashboard/budgets')
  }

  const handleSetGoal = () => {
    router.push('/dashboard/goals')
  }

  return (
    <div className="space-y-8 p-6">
      {/* Net Worth Chart - Full Width with Dropdown */}
      <NetWorthChart />

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Budget and Goals */}
        <div className="space-y-6">
          <BudgetOverview />
          <GoalsSummary />
        </div>

        {/* Middle Column - Transactions and Financial Health */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Most recent</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/transactions')}>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                All transactions
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        transaction.type === 'income' ? 'bg-success/10 text-success' :
                        transaction.type === 'expense' ? 'bg-destructive/10 text-destructive' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {transaction.merchant.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {transaction.category}
                          <span>•</span>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium text-sm ${
                        transaction.amount > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount.toLocaleString('en-AE', {
                          style: 'currency',
                          currency: transaction.currency
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Health Score */}
          <FinancialHealthScore />
        </div>

        {/* Right Column - Recurring Payments and Investments */}
        <div className="space-y-6">
          <RecurringPayments />
          <InvestmentSummary />
        </div>
      </div>
    </div>
  )
}
