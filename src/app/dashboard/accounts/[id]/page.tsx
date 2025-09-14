"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Building,
  RefreshCw,
  Edit,
  Download
} from "lucide-react"
import Link from "next/link"
import { mockAccounts, mockTransactions } from "@/lib/mock-data"

export default function AccountDetailPage() {
  const params = useParams()
  const accountId = params.id as string
  
  // Find the account
  const account = mockAccounts.find(acc => acc.id === accountId)
  
  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Account Not Found</h2>
          <p className="text-muted-foreground mb-4">The account you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/dashboard/accounts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Accounts
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get account transactions
  const accountTransactions = mockTransactions.filter(t => t.accountId === accountId)
  const recentTransactions = accountTransactions.slice(0, 10)
  
  // Calculate statistics
  const monthlyIncome = accountTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const monthlyExpenses = accountTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking': return '💳'
      case 'savings': return '🏦'  
      case 'credit': return '💰'
      case 'investment': return '📈'
      default: return '💳'
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'savings': return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'credit': return 'bg-red-100 text-red-800 hover:bg-red-100'
      case 'investment': return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/accounts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
              {getAccountIcon(account.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{account.name}</h1>
                <Badge className={getAccountTypeColor(account.type)}>
                  {account.type}
                </Badge>
              </div>
              <p className="text-muted-foreground">{account.bank}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Account Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-foreground'}`}>
              {account.balance.toLocaleString('en-AE', {
                style: 'currency',
                currency: account.currency
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {monthlyIncome.toLocaleString('en-AE', {
                style: 'currency',
                currency: account.currency
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {monthlyExpenses.toLocaleString('en-AE', {
                style: 'currency',
                currency: account.currency
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Details</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-muted-foreground">Account:</span> {account.accountNumber}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Connected:</span> {new Date(account.connectedDate).toLocaleDateString('en-AE')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Details and Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Complete account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-medium">{account.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank:</span>
                <span className="font-medium">{account.bank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <Badge className={getAccountTypeColor(account.type)}>
                  {account.type}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-medium">{account.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency:</span>
                <span className="font-medium">{account.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={account.isActive ? "default" : "secondary"}>
                  {account.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connected:</span>
                <span className="font-medium">
                  {new Date(account.connectedDate).toLocaleDateString('en-AE')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity on this account</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/transactions?account=${accountId}`}>
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-700' :
                        transaction.type === 'expense' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {transaction.merchant.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount.toLocaleString('en-AE', {
                          style: 'currency',
                          currency: transaction.currency
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found for this account</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}