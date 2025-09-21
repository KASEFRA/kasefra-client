"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
  PieChart,
  Target,
  Building,
  Coins
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockInvestments } from "@/lib/mock-data"

type InvestmentCategory = 'all' | 'stocks' | 'crypto' | 'commodity' | 'real-estate'

export default function InvestmentsPage() {
  const [hideBalances, setHideBalances] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<InvestmentCategory>('all')

  // Filter investments by category
  const filteredInvestments = selectedCategory === 'all'
    ? mockInvestments
    : mockInvestments.filter(inv => inv.category === selectedCategory)

  // Calculate totals
  const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.purchaseValue, 0)
  const totalGainLoss = totalValue - totalInvested
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100
  const dailyChange = mockInvestments.reduce((sum, inv) => sum + inv.dailyChange, 0)
  const activeInvestments = mockInvestments.length

  // Category breakdown
  const categoryBreakdown = {
    stocks: mockInvestments.filter(inv => inv.category === 'stocks').reduce((sum, inv) => sum + inv.currentValue, 0),
    crypto: mockInvestments.filter(inv => inv.category === 'crypto').reduce((sum, inv) => sum + inv.currentValue, 0),
    commodity: mockInvestments.filter(inv => inv.category === 'commodity').reduce((sum, inv) => sum + inv.currentValue, 0),
    'real-estate': mockInvestments.filter(inv => inv.category === 'real-estate').reduce((sum, inv) => sum + inv.currentValue, 0)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'stocks': return <TrendingUp className="h-4 w-4" />
      case 'crypto': return <Coins className="h-4 w-4" />
      case 'commodity': return <PieChart className="h-4 w-4" />
      case 'real-estate': return <Building className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'stocks': return 'bg-green-500/10 text-green-600 hover:bg-green-500/10'
      case 'crypto': return 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/10'
      case 'commodity': return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/10'
      case 'real-estate': return 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/10'
      default: return 'bg-muted text-muted-foreground hover:bg-muted'
    }
  }

  const formatBalance = (balance: number, currency: string = 'AED') => {
    if (hideBalances) return "••••••"

    return balance.toLocaleString('en-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const formatChange = (change: number, currency: string = 'AED') => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${formatBalance(Math.abs(change), currency)}`
  }

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
        <p className="text-muted-foreground">
          Manage your investment portfolio across stocks, crypto, commodities, and real estate
        </p>
      </div>

      {/* Investment Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className={`${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(dailyChange / totalValue * 100)}
              </span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            <div className={`flex h-8 w-8 items-center justify-center rounded-md ${totalGainLoss >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(totalGainLoss)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(totalGainLossPercent)} overall return
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Allocation</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/20">
              <PieChart className="h-4 w-4 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Categories</div>
            <p className="text-xs text-muted-foreground">
              Diversified portfolio
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/20">
              <Target className="h-4 w-4 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInvestments}</div>
            <p className="text-xs text-muted-foreground">
              Across 4 categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investments List with Category Tabs */}
      <Card className="bg-card border shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Your Investments</CardTitle>
              <CardDescription className="text-base">
                All investment positions and their current performance
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHideBalances(!hideBalances)}
              >
                {hideBalances ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                {hideBalances ? 'Show' : 'Hide'} Values
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync All
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Investment
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as InvestmentCategory)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="commodity">Commodity</TabsTrigger>
              <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-4">
              {filteredInvestments.map((investment) => {
                const isPositiveChange = investment.dailyChange >= 0
                const isPositiveTotalGain = investment.totalGainLoss >= 0

                return (
                  <div key={investment.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        {getCategoryIcon(investment.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base">{investment.symbol}</h3>
                          <Badge className={getCategoryColor(investment.category)}>
                            {investment.category}
                          </Badge>
                          {investment.exchange && (
                            <Badge variant="outline" className="text-xs">
                              {investment.exchange}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{investment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {investment.quantity} shares • {investment.sector}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {formatBalance(investment.currentValue, investment.currency)}
                        </div>
                        <div className={`text-xs ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                          {formatChange(investment.dailyChange, investment.currency)} ({formatPercentage(investment.dailyChangePercent)})
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm font-medium ${isPositiveTotalGain ? 'text-green-600' : 'text-red-600'}`}>
                          {formatChange(investment.totalGainLoss, investment.currency)}
                        </div>
                        <div className={`text-xs ${isPositiveTotalGain ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(investment.totalGainLossPercent)}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Investment Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Buy More
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Sell Position
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Investment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}