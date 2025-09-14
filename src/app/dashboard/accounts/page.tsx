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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage your connected financial accounts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setHideBalances(!hideBalances)}
            >
              {hideBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
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
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
          <CardDescription>
            All connected accounts and their current balances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{account.name}</h3>
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