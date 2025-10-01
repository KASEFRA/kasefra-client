"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockGoals } from "@/lib/mock-data"

export function GoalsSummary() {
  // Get top 2 active high-priority goals
  const topGoals = mockGoals
    .filter(goal => goal.priority === 'high' && !goal.isCompleted)
    .slice(0, 2)

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const getGoalIcon = (goalName: string) => {
    // Check for keyword matches (flexible matching)
    const nameLower = goalName.toLowerCase()
    if (nameLower.includes('vacation') || nameLower.includes('travel') || nameLower.includes('trip')) {
      return '🏖️'
    }
    if (nameLower.includes('house') || nameLower.includes('down payment') || nameLower.includes('property') || nameLower.includes('villa')) {
      return '🏠'
    }
    if (nameLower.includes('hajj') || nameLower.includes('umrah') || nameLower.includes('pilgrimage')) {
      return '🕋'
    }
    if (nameLower.includes('education') || nameLower.includes('school') || nameLower.includes('university')) {
      return '📚'
    }
    if (nameLower.includes('car') || nameLower.includes('vehicle')) {
      return '🚗'
    }
    return '🎯'
  }

  const getProgressInfo = (current: number, target: number) => {
    const percentage = (current / target) * 100
    return {
      percentage: Math.min(percentage, 100),
      isComplete: percentage >= 100
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals</CardTitle>
        <CardDescription>Your top 2 priorities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {topGoals.map((goal) => {
          const progressInfo = getProgressInfo(goal.currentAmount, goal.targetAmount)
          const remainingAmount = goal.targetAmount - goal.currentAmount

          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lg">{getGoalIcon(goal.name)}</div>
                  <div>
                    <h4 className="font-semibold text-sm">{goal.name}</h4>
                    <p className="text-xs text-muted-foreground">{goal.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {formatCurrency(goal.targetAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(goal.currentAmount)} ({progressInfo.percentage.toFixed(0)}%) This month
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Progress
                  value={progressInfo.percentage}
                  className="h-2"
                />

                {goal.currentAmount === 0 ? (
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(remainingAmount)} remaining to reach goal
                  </div>
                ) : (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(goal.currentAmount)} saved</span>
                    <span>{formatCurrency(remainingAmount)} to go</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Quick Actions */}
        <div className="pt-4 border-t space-y-2">
          <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
            Quick Actions
          </h5>
          <div className="grid grid-cols-2 gap-2">
            <button className="text-xs text-primary hover:text-primary/80 p-2 rounded border border-border hover:bg-muted/50 transition-colors">
              Add Funds
            </button>
            <button className="text-xs text-primary hover:text-primary/80 p-2 rounded border border-border hover:bg-muted/50 transition-colors">
              View All Goals
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}