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
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recurring</CardTitle>
            <CardDescription>{formatCurrency(recurringPaymentsSummary.remainingThisMonth)} remaining due</CardDescription>
          </div>
          <div className="text-right text-sm">
            <div className="font-semibold">This month</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                {getMerchantIcon(payment.merchant)}
              </div>
              <div>
                <div className="font-medium text-sm">{payment.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{payment.merchant}</span>
                  {payment.isAutomatic && (
                    <Badge variant="outline" className="text-xs px-1">
                      Auto
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-medium text-sm">
                {formatCurrency(payment.amount)}
              </div>
              {getStatusBadge(payment)}
            </div>
          </div>
        ))}

        {/* Summary Stats */}
        <div className="pt-4 border-t space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Monthly</span>
            <span className="font-medium">{formatCurrency(recurringPaymentsSummary.totalMonthly)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Upcoming (7 days)</span>
            <span className="font-medium">{recurringPaymentsSummary.upcomingCount} payments</span>
          </div>
        </div>

        {/* Quick Action */}
        <button className="w-full text-xs text-primary hover:text-primary/80 p-2 rounded border border-border hover:bg-muted/50 transition-colors">
          View All Recurring Payments
        </button>
      </CardContent>
    </Card>
  )
}