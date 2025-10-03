"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowUpDown,
  ShoppingCart,
  Car,
  DollarSign,
  ShoppingBag,
  Zap,
  ArrowLeftRight,
  UtensilsCrossed,
  Plane,
  Receipt,
  Coffee,
  Home
} from "lucide-react"
import { mockTransactions } from "@/lib/mock-data"
import { FinancialHealthScore } from "@/components/ai/financial-health-score"
import { NetWorthChart } from "@/components/dashboard/net-worth-chart"
import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { GoalsSummary } from "@/components/dashboard/goals-summary"
import { RecurringPayments } from "@/components/dashboard/recurring-payments"
import { InvestmentSummary } from "@/components/dashboard/investment-summary"
import { useRouter } from "next/navigation"
import { mockAccounts } from "@/lib/mock-data"

export default function Page() {
  const router = useRouter()

  // Calculate net worth from accounts data
  const totalBalance = mockAccounts.reduce((sum, account) => sum + account.balance, 0)

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

  // Get icon for transaction category
  const getTransactionIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'groceries':
        return ShoppingCart
      case 'transportation':
        return Car
      case 'income':
        return DollarSign
      case 'shopping':
        return ShoppingBag
      case 'utilities':
        return Zap
      case 'transfer':
        return ArrowLeftRight
      case 'dining':
        return UtensilsCrossed
      case 'travel':
        return Plane
      default:
        return Receipt
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Net Worth Chart - Full Width with Dropdown */}
      <NetWorthChart />

      {/* Main Dashboard Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Left Column - Budget and Goals */}
        <div className="space-y-6">
          <BudgetOverview />
          <GoalsSummary />
        </div>

        {/* Middle Column - Transactions and Financial Health */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle className="text-base sm:text-lg">Transactions</CardTitle>
                <CardDescription className="text-sm">Most recent</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/transactions')} className="w-full sm:w-auto">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">All transactions</span>
                <span className="sm:hidden">View All</span>
              </Button>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${transaction.type === 'income' ? 'bg-success/10 text-success' :
                          transaction.type === 'expense' ? 'bg-destructive/10 text-destructive' :
                            'bg-primary/10 text-primary'
                        }`}>
                        {(() => {
                          const IconComponent = getTransactionIcon(transaction.category)
                          return <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        })()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs sm:text-sm truncate">{transaction.description}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
                          <span className="truncate">{transaction.category}</span>
                          <span className="shrink-0">•</span>
                          <span className="shrink-0">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-semibold text-xs sm:text-sm whitespace-nowrap ${transaction.amount > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {Math.abs(transaction.amount).toLocaleString('en-AE', {
                          style: 'currency',
                          currency: transaction.currency,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
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
