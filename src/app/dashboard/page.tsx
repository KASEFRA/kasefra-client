"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Plus, TrendingUp, TrendingDown, Eye, Wallet } from "lucide-react"
import { mockAccounts, mockTransactions, mockUser } from "@/lib/mock-data"
import { SpendingTrendsChart } from "@/components/dashboard/spending-trends-chart"
import { FinancialHealthScore } from "@/components/ai/financial-health-score"
import { SmartRecommendations } from "@/components/ai/smart-recommendations"
import { AIChatWidget } from "@/components/ai/ai-chat-widget"
import { PredictiveAlerts } from "@/components/ai/predictive-alerts"
import { GoalForecasting } from "@/components/ai/goal-forecasting"

export default function DashboardPage() {
  // Calculate net worth
  const totalBalance = mockAccounts.reduce((sum, account) => sum + account.balance, 0)

  // Get recent transactions (last 5)
  const recentTransactions = mockTransactions.slice(0, 5)

  // Calculate monthly spending
  const monthlySpending = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <>
      <div className="space-y-8 p-1">
        {/* Welcome Section - Enhanced */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome back, {mockUser.name.split(' ')[0]}
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's what's happening with your finances today.
          </p>
        </div>

        {/* Quick Stats - Enhanced Layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="premium-card hover-lift border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Net Worth</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {totalBalance.toLocaleString('en-AE', {
                  style: 'currency',
                  currency: 'AED'
                })}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="text-emerald-600 font-semibold">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card hover-lift border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Monthly Spending</CardTitle>
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {monthlySpending.toLocaleString('en-AE', {
                  style: 'currency',
                  currency: 'AED'
                })}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="text-red-600 font-semibold">-5.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card hover-lift border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Savings Rate</CardTitle>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{mockUser.financialProfile.savingsRate}%</div>
              <p className="text-sm text-muted-foreground">
                Above UAE average of 20%
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card hover-lift border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Accounts</CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{mockAccounts.length}</div>
              <p className="text-sm text-muted-foreground">
                Across {new Set(mockAccounts.map(a => a.bank)).size} banks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid - Enhanced Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Account Overview & Spending Chart */}
          <div className="lg:col-span-8 space-y-8">
            {/* Account Overview */}
            <Card className="premium-card hover-lift border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                  <CardTitle className="text-xl font-bold">Account Overview</CardTitle>
                  <CardDescription className="text-base">Your connected accounts and balances</CardDescription>
                </div>
                <Button size="sm" className="premium-gradient text-white hover:opacity-90 transition-opacity">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Wallet className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-base">{account.name}</p>
                          <p className="text-sm text-muted-foreground">{account.bank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${account.balance < 0 ? 'text-red-600' : 'text-foreground'}`}>
                          {account.balance.toLocaleString('en-AE', {
                            style: 'currency',
                            currency: account.currency
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Spending Trends Chart */}
            <SpendingTrendsChart />
          </div>

          {/* Right Column - AI Components */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recent Transactions */}
            <Card className="premium-card hover-lift border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div>
                  <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
                  <CardDescription className="text-base">Latest activity</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${transaction.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
                            transaction.type === 'expense' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                              'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                          {transaction.merchant.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toLocaleString('en-AE', {
                            style: 'currency',
                            currency: transaction.currency
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium">{transaction.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Health Score */}
            <FinancialHealthScore />
          </div>
        </div>

        {/* AI Predictions Section */}
        <PredictiveAlerts />

        {/* Goal Forecasting Section */}
        <GoalForecasting />

        {/* Bottom Section - AI Recommendations & Quick Actions */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Smart Recommendations */}
          <SmartRecommendations />

          {/* Quick Actions */}
          <Card className="premium-card hover-lift border-0 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
              <CardDescription className="text-base">Common tasks to manage your finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 rounded-xl">
                  <Plus className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Add Transaction</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 rounded-xl">
                  <Wallet className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Link Account</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Create Budget</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-3 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 rounded-xl">
                  <Eye className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Set Goal</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}