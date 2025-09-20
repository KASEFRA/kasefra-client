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
      case 'checking': return 'bg-primary/10 text-primary hover:bg-primary/10'
      case 'savings': return 'bg-success/10 text-success hover:bg-success/10'
      case 'credit': return 'bg-destructive/10 text-destructive hover:bg-destructive/10'
      case 'investment': return 'bg-accent/20 text-accent-foreground hover:bg-accent/20'
      default: return 'bg-muted text-muted-foreground hover:bg-muted'
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <p className="text-muted-foreground">
          Manage your connected financial accounts
        </p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-success/10">
              <Wallet className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(totalBalance, 'AED', 'checking')}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(totalAssets, 'AED', 'savings')}
            </div>
            <p className="text-xs text-muted-foreground">
              Assets across {activeAccounts} accounts
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10">
              <TrendingDown className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(totalLiabilities, 'AED', 'credit')}
            </div>
            <p className="text-xs text-muted-foreground">
              Credit card balances
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/20">
              <Eye className="h-4 w-4 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAccounts}</div>
            <p className="text-xs text-muted-foreground">
              Across {new Set(mockAccounts.map(a => a.bank)).size} banks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <Card className="bg-card border shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Your Accounts</CardTitle>
              <CardDescription className="text-base">
                All connected accounts and their current balances
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHideBalances(!hideBalances)}
                              >
                {hideBalances ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                {hideBalances ? 'Show' : 'Hide'} Balances
              </Button>
              <Button variant="outline" size="sm" >
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync All
              </Button>
              <Button size="sm" >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </div>
          </div>
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
                      account.balance < 0 ? 'text-destructive' : 'text-foreground'
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