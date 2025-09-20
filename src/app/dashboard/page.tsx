"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Plus, TrendingUp, TrendingDown, Eye, Wallet, Target } from "lucide-react"
import { mockAccounts, mockTransactions, mockUser } from "@/lib/mock-data"
import { SpendingTrendsChart } from "@/components/dashboard/spending-trends-chart"
import { BigAnalyticsChart } from "@/components/dashboard/big-analytics-chart"
import { FinancialHealthScore } from "@/components/ai/financial-health-score"
import { SmartRecommendations } from "@/components/ai/smart-recommendations"
import { AIChatWidget } from "@/components/ai/ai-chat-widget"
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
    <div className="page-container">
              {/* Welcome Section */}
              <div className="page-header">
                <h1 className="page-title">
                  Welcome back, {mockUser.name.split(' ')[0]}
                </h1>
                <p className="page-subtitle">
                  Here's what's happening with your finances today.
                </p>
              </div>

              {/* Financial Stats Cards */}
              <div className="metrics-grid">
                  <Card className="premium-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
                      <div className="icon-container bg-emerald-100 dark:bg-emerald-900/20">
                        <Wallet className="h-4 w-4 text-emerald-600" />
                      </div>
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

                  <Card className="premium-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                      <div className="icon-container bg-red-100 dark:bg-red-900/20">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </div>
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

                  <Card className="premium-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                      <div className="icon-container bg-blue-100 dark:bg-blue-900/20">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{mockUser.financialProfile.savingsRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        Above UAE average of 20%
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="premium-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                      <div className="icon-container bg-purple-100 dark:bg-purple-900/20">
                        <Eye className="h-4 w-4 text-purple-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Across {new Set(data.map(a => a.bank)).size} banks
                      </p>
                    </CardContent>
                  </Card>
                </div>

              {/* Main Content Grid */}
              <div className="content-section">
                <div className="grid gap-4 lg:grid-cols-12">
                  {/* Left Column - Account Overview */}
                  <div className="lg:col-span-8 content-section">
                    <Card className="premium-card">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Account Overview</CardTitle>
                          <CardDescription>Your connected accounts and balances</CardDescription>
                        </div>
                        <Button size="sm" className="btn-premium">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Account
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {data.map((account) => (
                            <div key={account.id} className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Wallet className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{account.account}</p>
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

                    <SpendingTrendsChart />

                    {/* Big Analytics Chart */}
                    <BigAnalyticsChart />
                  </div>

                  {/* Right Column - Recent Transactions and AI Components */}
                  <div className="lg:col-span-4 content-section">
                    <Card className="premium-card">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Recent Transactions</CardTitle>
                          <CardDescription>Latest activity</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="btn-outline-premium">
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
              </div>

              {/* Bottom Section - AI Recommendations & Quick Actions */}
              <div className="content-section">
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Smart Recommendations */}
                  <SmartRecommendations />

                  {/* Quick Actions */}
                  <Card className="premium-card">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks to manage your finances</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        <Button
                          variant="outline"
                          className="btn-outline-premium h-20 flex flex-col items-center justify-center space-y-2"
                          onClick={handleAddTransaction}
                        >
                          <Plus className="h-5 w-5" />
                          <span className="text-sm">Add Transaction</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="btn-outline-premium h-20 flex flex-col items-center justify-center space-y-2"
                          onClick={handleLinkAccount}
                        >
                          <Wallet className="h-5 w-5" />
                          <span className="text-sm">Link Account</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="btn-outline-premium h-20 flex flex-col items-center justify-center space-y-2"
                          onClick={handleCreateBudget}
                        >
                          <TrendingUp className="h-5 w-5" />
                          <span className="text-sm">Create Budget</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="btn-outline-premium h-20 flex flex-col items-center justify-center space-y-2"
                          onClick={handleSetGoal}
                        >
                          <Target className="h-5 w-5" />
                          <span className="text-sm">Set Goal</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* AI Chat Widget - Floating */}
              <AIChatWidget />
    </div>
  )
}
