"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { mockPortfolioSummary } from "@/lib/mock-data"

export function InvestmentSummary() {
  const {
    totalValue,
    dailyChange,
    dailyChangePercent,
    totalGainLoss,
    totalGainLossPercent,
    topMovers
  } = mockPortfolioSummary

  const formatCurrency = (amount: number, currency: string = 'AED') => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const formatChange = (change: number, currency: string = 'AED') => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${formatCurrency(Math.abs(change), currency)}`
  }

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  const isPositiveChange = dailyChange >= 0
  const isPositiveTotalGain = totalGainLoss >= 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {formatCurrency(totalValue)} investments
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                {formatChange(dailyChange)} ({formatPercentage(dailyChangePercent)})
              </span>
            </CardTitle>
            <CardDescription>Today</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Portfolio Performance */}
        <div className="p-3 rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Total Gain/Loss</span>
            <span className={`text-sm font-medium ${isPositiveTotalGain ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(totalGainLoss)} ({formatPercentage(totalGainLossPercent)})
            </span>
          </div>
        </div>

        {/* Top Movers Today */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Top movers today
          </h4>
          {topMovers.slice(0, 3).map((investment) => {
            const isPositive = investment.dailyChange >= 0
            return (
              <div key={investment.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">
                      {investment.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{investment.symbol}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      {investment.name.length > 20
                        ? investment.name.substring(0, 20) + '...'
                        : investment.name}
                      {investment.isShariahCompliant && (
                        <Badge variant="outline" className="text-xs px-1">
                          ☪ Halal
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {formatCurrency(investment.currentValue, investment.currency)}
                  </div>
                  <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{formatPercentage(investment.dailyChangePercent)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Investment Allocation */}
        <div className="pt-4 border-t space-y-2">
          <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
            Asset Allocation
          </h5>
          <div className="space-y-2">
            {[
              { type: 'Sukuk/Islamic Bonds', percentage: 38, color: 'bg-blue-500' },
              { type: 'Stocks', percentage: 35, color: 'bg-green-500' },
              { type: 'Funds & ETFs', percentage: 27, color: 'bg-purple-500' }
            ].map((asset, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${asset.color}`} />
                  <span>{asset.type}</span>
                </div>
                <span className="font-medium">{asset.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <button className="w-full text-xs text-primary hover:text-primary/80 p-2 rounded border border-border hover:bg-muted/50 transition-colors">
          View Full Portfolio
        </button>
      </CardContent>
    </Card>
  )
}