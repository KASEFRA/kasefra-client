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
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {mockUser.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your finances today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalBalance.toLocaleString('en-AE', {
                  style: 'currency',
                  currency: 'AED'
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {monthlySpending.toLocaleString('en-AE', {
                  style: 'currency',
                  currency: 'AED'
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockUser.financialProfile.savingsRate}%</div>
              <p className="text-xs text-muted-foreground">
                Above UAE average of 20%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAccounts.length}</div>
              <p className="text-xs text-muted-foreground">
                Across {new Set(mockAccounts.map(a => a.bank)).size} banks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid - Enhanced Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Account Overview & Spending Chart */}
          <div className="lg:col-span-8 space-y-6">
            {/* Account Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Account Overview</CardTitle>
                  <CardDescription>Your connected accounts and balances</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-muted-foreground">{account.bank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${account.balance < 0 ? 'text-red-600' : 'text-foreground'}`}>
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
          <div className="lg:col-span-4 space-y-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          transaction.type === 'income' ? 'bg-green-100 text-green-700' :
                          transaction.type === 'expense' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {transaction.merchant.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium text-sm ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toLocaleString('en-AE', {
                            style: 'currency',
                            currency: transaction.currency
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
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
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Smart Recommendations */}
          <SmartRecommendations />

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Plus className="h-5 w-5" />
                  <span className="text-sm">Add Transaction</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Wallet className="h-5 w-5" />
                  <span className="text-sm">Link Account</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">Create Budget</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm">Set Goal</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat Widget - Floating */}
      <AIChatWidget />
    </>
  )
}