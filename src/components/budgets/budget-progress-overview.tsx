"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreateBudgetWizard } from "@/components/budgets/create-budget-wizard"
import { mockBudgetSummary } from "@/lib/mock-data"
import {
  BUDGET_TOTAL,
  BUDGET_TOTAL_SPENT,
  BUDGET_USAGE_PERCENTAGE
} from "@/lib/mock-data/financial-constants"

export function BudgetProgressOverview() {
  const { fixed, flexible, total } = mockBudgetSummary

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
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
        <div>
          <CardTitle className="text-base sm:text-lg font-semibold">Budget Progress</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            October 2025 spending overview
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <CreateBudgetWizard />
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between text-xs sm:text-sm font-medium">
              <span>Overall Progress</span>
              <span className="text-primary">{BUDGET_USAGE_PERCENTAGE.toFixed(0)}% of budget used</span>
            </div>
            <Progress value={BUDGET_USAGE_PERCENTAGE} className="h-2 sm:h-3" />
            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
              <span>{formatCurrency(BUDGET_TOTAL_SPENT)} spent</span>
              <span>{formatCurrency(BUDGET_TOTAL - BUDGET_TOTAL_SPENT)} remaining</span>
            </div>
          </div>

          {/* Fixed Expenses */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-xs sm:text-sm">Fixed</h4>
                <Badge variant="secondary" className="text-[10px] sm:text-xs">
                  {((fixed.spent / fixed.budgeted) * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-semibold">
                  {formatCurrency(fixed.spent)} spent
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">
                  {formatCurrency(fixed.remaining)} remaining
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Progress
                value={(fixed.spent / fixed.budgeted) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>{formatCurrency(fixed.budgeted)} budget</span>
                <span>{((fixed.spent / fixed.budgeted) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Flexible Expenses */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-xs sm:text-sm">Flexible</h4>
                <Badge variant="secondary" className="text-[10px] sm:text-xs">
                  {((flexible.spent / flexible.budgeted) * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-semibold">
                  {formatCurrency(flexible.spent)} spent
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">
                  {formatCurrency(flexible.remaining)} remaining
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Progress
                value={(flexible.spent / flexible.budgeted) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>{formatCurrency(flexible.budgeted)} budget</span>
                <span>{((flexible.spent / flexible.budgeted) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Non-Monthly */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-xs sm:text-sm">Non-Monthly</h4>
                <Badge variant="secondary" className="text-[10px] sm:text-xs">
                  20%
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-semibold">
                  AED 308 spent
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">
                  AED 1,209 remaining
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Progress
                value={20.3}
                className="h-2"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>AED 1,517 budget</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          {/* Detailed Category Breakdown */}
          <div className="space-y-2 pt-2 border-t">
            <h5 className="font-medium text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
              Top Spending Categories
            </h5>
            {[
              { name: "Food & Dining", spent: 1850, budget: 2000, percentage: 93 },
              { name: "Transportation", spent: 980, budget: 1200, percentage: 82 },
              { name: "Utilities", spent: 450, budget: 600, percentage: 75 }
            ].map((category, index) => (
              <div key={index} className="space-y-2 p-2 sm:p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium truncate">{category.name}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="font-semibold whitespace-nowrap text-xs sm:text-sm">{formatCurrency(category.spent)}</span>
                    <Badge
                      variant={category.percentage > 90 ? "destructive" : category.percentage > 75 ? "default" : "secondary"}
                      className="text-[10px] sm:text-xs"
                    >
                      {category.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-1.5 sm:h-2" />
                <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                  <span>Budget: {formatCurrency(category.budget)}</span>
                  <span>{formatCurrency(category.budget - category.spent)} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}