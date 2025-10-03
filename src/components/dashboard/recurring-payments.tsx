"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockRecurringPayments, recurringPaymentsSummary } from "@/lib/mock-data"

export function RecurringPayments() {
  const upcomingPayments = mockRecurringPayments
    .filter(payment => payment.daysUntilDue <= 7)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
    .slice(0, 3)

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const getStatusBadge = (payment: typeof mockRecurringPayments[0]) => {
    if (payment.daysUntilDue === 0) {
      return <Badge variant="destructive" className="text-xs">Due Today</Badge>
    } else if (payment.daysUntilDue === 1) {
      return <Badge variant="secondary" className="text-xs">in 1 day</Badge>
    } else {
      return <Badge variant="outline" className="text-xs">in {payment.daysUntilDue} days</Badge>
    }
  }

  const getMerchantIcon = (merchant: string) => {
    const icons: Record<string, string> = {
      'American Express': '💳',
      'Wells Fargo': '🏦',
      'DEWA': '⚡',
      'Du': '📡',
      'Emirates Islamic Bank': '🚗',
      'Salik': '🛣️',
      'Netflix': '📺',
      'Daman Health': '🏥'
    }
    return icons[merchant] || '💰'
  }

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg">Recurring</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{formatCurrency(recurringPaymentsSummary.remainingThisMonth)} remaining due</CardDescription>
          </div>
          <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-0.5 shrink-0">
            This month
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-3 sm:space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between gap-2 p-2 sm:p-3 rounded-lg border">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs sm:text-sm shrink-0">
                {getMerchantIcon(payment.merchant)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs sm:text-sm truncate">{payment.name}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                  <span className="truncate">{payment.merchant}</span>
                  {payment.isAutomatic && (
                    <Badge variant="outline" className="text-[9px] sm:text-xs px-1 shrink-0">
                      Auto
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right space-y-0.5 sm:space-y-1 shrink-0">
              <div className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                {formatCurrency(payment.amount)}
              </div>
              {getStatusBadge(payment)}
            </div>
          </div>
        ))}

        {/* Summary Stats */}
        <div className="pt-3 sm:pt-4 border-t space-y-2 sm:space-y-3">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Total Monthly</span>
            <span className="font-semibold">{formatCurrency(recurringPaymentsSummary.totalMonthly)}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Upcoming (7 days)</span>
            <span className="font-semibold">{recurringPaymentsSummary.upcomingCount} payments</span>
          </div>
        </div>

        {/* Quick Action */}
        <button className="w-full text-[10px] sm:text-xs text-primary hover:text-primary/80 p-2 sm:p-2.5 rounded border border-border hover:bg-muted/50 transition-colors font-medium">
          View All Recurring Payments
        </button>
      </CardContent>
    </Card>
  )
}