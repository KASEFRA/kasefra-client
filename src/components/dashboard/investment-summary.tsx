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

  const handleFullPortfolioClick = () => {
    // Navigate to full portfolio page
    window.location.href = '/dashboard/investments'
  }

  const isPositiveChange = dailyChange >= 0
  const isPositiveTotalGain = totalGainLoss >= 0

  return (
    <Card>
      <CardHeader className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-semibold truncate">
                {formatCurrency(totalValue)}
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                {isPositiveChange ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 shrink-0" />
                )}
                <span className={`text-xs sm:text-sm ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                  {formatChange(dailyChange)} ({formatPercentage(dailyChangePercent)})
                </span>
              </div>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Portfolio Value • Today</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-4 lg:px-6">
        {/* Portfolio Performance */}
        <div className="p-2 sm:p-3 rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Total Gain/Loss</span>
            <span className={`text-xs sm:text-sm font-medium ${isPositiveTotalGain ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(totalGainLoss)} ({formatPercentage(totalGainLossPercent)})
            </span>
          </div>
        </div>

        {/* Top Movers Today */}
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-medium text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
            Top movers today
          </h4>
          {topMovers.slice(0, 3).map((investment) => {
            const isPositive = investment.dailyChange >= 0
            return (
              <div key={investment.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] sm:text-xs font-semibold text-primary">
                      {investment.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-xs sm:text-sm truncate">{investment.symbol}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 sm:gap-2">
                      <span className="truncate">
                        {investment.name.length > 15
                          ? investment.name.substring(0, 15) + '...'
                          : investment.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-medium text-xs sm:text-sm whitespace-nowrap">
                    {formatCurrency(investment.currentValue, investment.currency)}
                  </div>
                  <div className={`text-[10px] sm:text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{formatPercentage(investment.dailyChangePercent)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Investment Allocation */}
        <div className="pt-3 sm:pt-4 border-t space-y-2">
          <h5 className="font-medium text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
            Asset Allocation
          </h5>
          <div className="space-y-1 sm:space-y-2">
            {[
              { type: 'Sukuk/Islamic Bonds', percentage: 38, color: 'bg-blue-500' },
              { type: 'Stocks', percentage: 35, color: 'bg-green-500' },
              { type: 'Funds & ETFs', percentage: 27, color: 'bg-purple-500' }
            ].map((asset, index) => (
              <div key={index} className="flex items-center justify-between text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${asset.color}`} />
                  <span className="truncate">{asset.type}</span>
                </div>
                <span className="font-medium shrink-0">{asset.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <button onClick={handleFullPortfolioClick} className="w-full text-[10px] sm:text-xs text-primary hover:text-primary/80 p-2 sm:p-2.5 rounded border border-border hover:bg-muted/50 transition-colors font-medium">
          View Full Portfolio
        </button>
      </CardContent>
    </Card>
  )
}