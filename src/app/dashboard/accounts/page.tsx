"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  EyeOff,
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockAccounts } from "@/lib/mock-data"

export default function AccountsPage() {
  const [hideBalances, setHideBalances] = useState(false)
  
  // Calculate totals
  const totalBalance = mockAccounts.reduce((sum, account) => sum + account.balance, 0)
  const activeAccounts = mockAccounts.filter(account => account.isActive).length
  const totalAssets = mockAccounts
    .filter(account => ['checking', 'savings', 'investment'].includes(account.type))
    .reduce((sum, account) => sum + Math.max(0, account.balance), 0)
  const totalLiabilities = mockAccounts
    .filter(account => account.type === 'credit')
    .reduce((sum, account) => sum + Math.abs(Math.min(0, account.balance)), 0)

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

  const formatBalance = (balance: number, currency: string, type: string) => {
    if (hideBalances) return "••••••"
    
    const formatted = balance.toLocaleString('en-AE', {
      style: 'currency',
      currency: currency
    })
    
    // For credit accounts, show debt as positive
    if (type === 'credit' && balance < 0) {
      return formatted.replace('-', '')
    }
    
    return formatted
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Accounts</h1>
          <p className="page-subtitle">
            Manage your connected financial accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="btn-outline-premium">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button className="btn-premium">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="metrics-grid">
        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Net Worth</CardTitle>
            <div className="icon-container bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {formatBalance(totalBalance, 'AED', 'checking')}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Assets</CardTitle>
            <div className="icon-container bg-emerald-100 dark:bg-emerald-900/20">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {formatBalance(totalAssets, 'AED', 'savings')}
            </div>
            <p className="text-sm text-muted-foreground">
              Assets across {activeAccounts} accounts
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Debt</CardTitle>
            <div className="icon-container bg-red-100 dark:bg-red-900/20">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {formatBalance(totalLiabilities, 'AED', 'credit')}
            </div>
            <p className="text-sm text-muted-foreground">
              Credit card balances
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Accounts</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHideBalances(!hideBalances)}
              className="hover:bg-primary/10"
            >
              {hideBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{activeAccounts}</div>
            <p className="text-sm text-muted-foreground">
              Across {new Set(mockAccounts.map(a => a.bank)).size} banks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <Card className="premium-card hover-lift border-0 shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold">Your Accounts</CardTitle>
          <CardDescription className="text-base">
            All connected accounts and their current balances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">{account.name}</h3>
                      <Badge className={getAccountTypeColor(account.type)}>
                        {account.type}
                      </Badge>
                      {!account.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.bank}</p>
                    <p className="text-xs text-muted-foreground">
                      Account {account.accountNumber} • Connected {new Date(account.connectedDate).toLocaleDateString('en-AE')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${
                      account.balance < 0 ? 'text-red-600' : 'text-foreground'
                    }`}>
                      {formatBalance(account.balance, account.currency, account.type)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {account.currency}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Account
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Balance
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}