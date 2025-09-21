"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockBudgetSummary } from "@/lib/mock-data"

export function BudgetOverview() {
  const { fixed, flexible, total } = mockBudgetSummary

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100
    if (percentage > 100) return "bg-red-500"
    if (percentage > 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>January 2025</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fixed Expenses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Fixed</h4>
            <div className="text-right">
              <div className="text-sm font-semibold">
                {formatCurrency(fixed.spent)} spent
              </div>
              <div className="text-xs text-muted-foreground">
                {formatCurrency(fixed.remaining)} remaining
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Progress
              value={(fixed.spent / fixed.budgeted) * 100}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(fixed.budgeted)} budget</span>
              <span>{((fixed.spent / fixed.budgeted) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Flexible Expenses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Flexible</h4>
            <div className="text-right">
              <div className="text-sm font-semibold">
                {formatCurrency(flexible.spent)} spent
              </div>
              <div className="text-xs text-muted-foreground">
                {formatCurrency(flexible.remaining)} remaining
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Progress
              value={(flexible.spent / flexible.budgeted) * 100}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(flexible.budgeted)} budget</span>
              <span>{((flexible.spent / flexible.budgeted) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Non-Monthly */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Non-Monthly</h4>
            <div className="text-right">
              <div className="text-sm font-semibold">
                AED 308 spent
              </div>
              <div className="text-xs text-muted-foreground">
                AED 1,209 remaining
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Progress
              value={20.3}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>AED 1,517 budget</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        {/* Detailed Category Breakdown */}
        <div className="space-y-2 pt-2 border-t">
          <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
            Top Categories
          </h5>
          {[
            { name: "Utilities", spent: 1265, budgeted: 1300, type: "fixed" },
            { name: "Shopping", spent: 1350, budgeted: 1000, type: "flexible" },
            { name: "Groceries", spent: 1245, budgeted: 1500, type: "flexible" }
          ].map((category, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    category.type === 'fixed' ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                />
                <span>{category.name}</span>
              </div>
              <div className="text-right">
                <div className={`font-medium ${
                  category.spent > category.budgeted ? 'text-red-600' : 'text-foreground'
                }`}>
                  {formatCurrency(category.spent)}
                </div>
                <div className="text-muted-foreground">
                  of {formatCurrency(category.budgeted)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}