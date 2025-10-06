"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockRecurringPayments, recurringPaymentsSummary } from "@/lib/mock-data"
import { Calendar, Clock, CheckCircle2 } from "lucide-react"

export function RecurringPaymentsCard() {
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
      return <Badge variant="destructive" className="text-[10px] sm:text-xs">Due Today</Badge>
    } else if (payment.daysUntilDue <= 3) {
      return <Badge variant="secondary" className="text-[10px] sm:text-xs">in {payment.daysUntilDue}d</Badge>
    } else if (payment.daysUntilDue <= 7) {
      return <Badge variant="outline" className="text-[10px] sm:text-xs">in {payment.daysUntilDue}d</Badge>
    } else {
      return <Badge variant="outline" className="text-[10px] sm:text-xs bg-muted">in {payment.daysUntilDue}d</Badge>
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

  // Group payments by frequency
  const monthlyPayments = mockRecurringPayments.filter(p => p.frequency === 'monthly')
  const totalPaidThisMonth = monthlyPayments
    .filter(p => p.lastPaidDate.startsWith('2025-10'))
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="truncate">Recurring Payments</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">
              Track and manage your recurring expenses
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-1 shrink-0">
            October 2025
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Monthly Total</div>
            <div className="text-lg sm:text-xl font-bold text-primary">
              {formatCurrency(recurringPaymentsSummary.totalMonthly)}
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20">
            <div className="text-xs sm:text-sm text-muted-foreground mb-1">Paid This Month</div>
            <div className="text-lg sm:text-xl font-bold text-secondary">
              {formatCurrency(totalPaidThisMonth)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-muted-foreground">Payment Progress</span>
            <span className="font-semibold">
              {((totalPaidThisMonth / recurringPaymentsSummary.totalMonthly) * 100).toFixed(0)}%
            </span>
          </div>
          <Progress
            value={(totalPaidThisMonth / recurringPaymentsSummary.totalMonthly) * 100}
            className="h-2"
          />
        </div>

        {/* Upcoming Payments */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Upcoming Payments
            </h4>
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              {recurringPaymentsSummary.upcomingCount} in 7 days
            </Badge>
          </div>

          <div className="space-y-2">
            {mockRecurringPayments
              .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
              .map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-2 p-2 sm:p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs sm:text-sm shrink-0">
                    {getMerchantIcon(payment.merchant)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-xs sm:text-sm truncate flex items-center gap-1.5">
                      {payment.name}
                      {payment.isAutomatic && (
                        <CheckCircle2 className="h-3 w-3 text-secondary shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="truncate">{payment.merchant}</span>
                      <span className="shrink-0">•</span>
                      <span className="shrink-0">{payment.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-0.5 shrink-0">
                  <div className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {formatCurrency(payment.amount)}
                  </div>
                  {getStatusBadge(payment)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Categories Breakdown */}
        <div className="space-y-2 pt-2 border-t">
          <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
            By Category
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Array.from(new Set(mockRecurringPayments.map(p => p.category)))
              .map(category => {
                const categoryTotal = mockRecurringPayments
                  .filter(p => p.category === category)
                  .reduce((sum, p) => sum + p.amount, 0)
                const categoryCount = mockRecurringPayments.filter(p => p.category === category).length

                return (
                  <div key={category} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span className="truncate">{category}</span>
                    <div className="text-right shrink-0 ml-2">
                      <div className="font-semibold">{formatCurrency(categoryTotal)}</div>
                      <div className="text-[10px] text-muted-foreground">{categoryCount} items</div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
