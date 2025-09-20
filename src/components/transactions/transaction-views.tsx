"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  List,
  Grid,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  MapPin,
  Building
} from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  description: string
  merchant: string
  amount: number
  currency: string
  type: 'income' | 'expense' | 'transfer'
  category: string
  date: string
  accountId: string
  notes?: string
}

interface TransactionViewsProps {
  transactions: Transaction[]
  accounts: any[]
  viewMode: 'list' | 'cards' | 'timeline'
  onViewModeChange: (mode: 'list' | 'cards' | 'timeline') => void
}

export function TransactionViews({ 
  transactions, 
  accounts, 
  viewMode, 
  onViewModeChange 
}: TransactionViewsProps) {
  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId)
    return account ? account.name : "Unknown Account"
  }

  const getAccountIcon = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId)
    if (!account) return '💳'
    
    switch (account.type) {
      case 'checking': return '💳'
      case 'savings': return '🏦'
      case 'credit': return '💰'
      case 'investment': return '📈'
      default: return '💳'
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Food & Dining': '🍽️',
      'Transportation': '🚗',
      'Shopping': '🛍️',
      'Bills & Utilities': '⚡',
      'Healthcare': '🏥',
      'Entertainment': '🎬',
      'Travel': '✈️',
      'Education': '📚',
      'Groceries': '🛒',
      'Gas': '⛽',
      'Income': '💰',
      'Transfer': '↔️',
      'Other': '📝'
    }
    return icons[category] || '📝'
  }

  const formatAmount = (amount: number, currency: string) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: currency
    })
  }

  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = transaction.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(transaction)
      return acc
    }, {} as { [key: string]: Transaction[] })

    return Object.entries(grouped).sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
  }

  const renderListView = () => {
    const groupedTransactions = groupTransactionsByDate(transactions)
    
    return (
      <div className="space-y-6">
        {groupedTransactions.map(([date, dayTransactions]) => {
          const dayTotal = dayTransactions.reduce((sum, t) => sum + t.amount, 0)
          
          return (
            <div key={date}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{new Date(date).toLocaleDateString('en-AE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</h3>
                  <Badge variant="outline">{dayTransactions.length} transactions</Badge>
                </div>
                <div className={`text-sm font-medium ${dayTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {dayTotal >= 0 ? '+' : ''}{formatAmount(dayTotal, 'AED')}
                </div>
              </div>
              
              <div className="space-y-2">
                {dayTransactions.map((transaction) => (
                  <Link 
                    key={transaction.id}
                    href={`/dashboard/transactions/${transaction.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                            transaction.type === 'income' ? 'bg-green-100' :
                            transaction.type === 'expense' ? 'bg-red-100' :
                            'bg-primary/10'
                          }`}>
                            {getCategoryIcon(transaction.category)}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                            transaction.type === 'income' ? 'bg-green-600' :
                            transaction.type === 'expense' ? 'bg-red-600' :
                            'bg-primary'
                          }`}>
                            {transaction.type === 'income' ? (
                              <ArrowDownLeft className="w-3 h-3 text-white" />
                            ) : transaction.type === 'expense' ? (
                              <ArrowUpRight className="w-3 h-3 text-white" />
                            ) : (
                              <ArrowUpRight className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {transaction.description}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {getAccountName(transaction.accountId)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {transaction.merchant}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {formatAmount(transaction.amount, transaction.currency)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getAccountIcon(transaction.accountId)} {getAccountName(transaction.accountId)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderCardView = () => {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {transactions.map((transaction) => (
          <Link 
            key={transaction.id}
            href={`/dashboard/transactions/${transaction.id}`}
            className="block"
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      transaction.type === 'income' ? 'bg-green-100' :
                      transaction.type === 'expense' ? 'bg-red-100' :
                      'bg-primary/10'
                    }`}>
                      {getCategoryIcon(transaction.category)}
                    </div>
                    <div>
                      <CardTitle className="text-sm group-hover:text-primary transition-colors">
                        {transaction.description}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {transaction.category}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={
                    transaction.type === 'income' ? 'default' :
                    transaction.type === 'expense' ? 'destructive' :
                    'secondary'
                  }>
                    {transaction.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className={`text-lg font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      {formatAmount(transaction.amount, transaction.currency)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account</span>
                    <span className="text-sm font-medium">
                      {getAccountIcon(transaction.accountId)} {getAccountName(transaction.accountId)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm">{transaction.date}</span>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground truncate">
                      {transaction.merchant}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  }

  const renderTimelineView = () => {
    const groupedTransactions = groupTransactionsByDate(transactions)
    
    return (
      <div className="space-y-8">
        {groupedTransactions.map(([date, dayTransactions]) => (
          <div key={date} className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <h3 className="text-lg font-semibold">
                  {new Date(date).toLocaleDateString('en-AE', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
              </div>
              <Separator className="flex-1" />
              <Badge variant="outline">
                {dayTransactions.length} transactions
              </Badge>
            </div>
            
            <div className="ml-6 border-l-2 border-muted pl-6 space-y-4">
              {dayTransactions.map((transaction, index) => (
                <Link 
                  key={transaction.id}
                  href={`/dashboard/transactions/${transaction.id}`}
                  className="block"
                >
                  <div className="relative">
                    <div className="absolute -left-8 w-4 h-4 bg-background border-2 border-primary rounded-full"></div>
                    <div className="p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            transaction.type === 'income' ? 'bg-green-100' :
                            transaction.type === 'expense' ? 'bg-red-100' :
                            'bg-primary/10'
                          }`}>
                            {getCategoryIcon(transaction.category)}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.category} • {transaction.merchant}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}
                            {formatAmount(transaction.amount, transaction.currency)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getAccountName(transaction.accountId)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('list')}
        >
          <List className="mr-2 h-4 w-4" />
          List
        </Button>
        <Button
          variant={viewMode === 'cards' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('cards')}
        >
          <Grid className="mr-2 h-4 w-4" />
          Cards
        </Button>
        <Button
          variant={viewMode === 'timeline' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('timeline')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Timeline
        </Button>
      </div>

      {/* Render based on view mode */}
      {viewMode === 'list' && renderListView()}
      {viewMode === 'cards' && renderCardView()}
      {viewMode === 'timeline' && renderTimelineView()}
    </div>
  )
}