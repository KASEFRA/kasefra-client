"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockGoals } from "@/lib/mock-data"
import { handleClientScriptLoad } from "next/script"

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

  const handleGoalClick = () => {
    // Navigate to goals page
    window.location.href = '/dashboard/goals'
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
      <CardHeader className="px-3 sm:px-6 pb-3 sm:pb-6">
        <CardTitle className="text-sm sm:text-base lg:text-lg">Goals</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Your top 2 priorities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        {topGoals.map((goal) => {
          const progressInfo = getProgressInfo(goal.currentAmount, goal.targetAmount)
          const remainingAmount = goal.targetAmount - goal.currentAmount

          return (
            <div key={goal.id} className="space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="text-sm sm:text-base lg:text-lg shrink-0">{getGoalIcon(goal.name)}</div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-xs sm:text-sm truncate">{goal.name}</h4>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{goal.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs sm:text-sm font-semibold">
                    {formatCurrency(goal.targetAmount)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    {formatCurrency(goal.currentAmount)} ({progressInfo.percentage.toFixed(0)}%)
                  </div>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Progress
                  value={progressInfo.percentage}
                  className="h-1.5 sm:h-2"
                />

                {goal.currentAmount === 0 ? (
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    {formatCurrency(remainingAmount)} remaining to reach goal
                  </div>
                ) : (
                  <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
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
            <button onClick={handleGoalClick} className="text-xs text-primary hover:text-primary/80 p-2 rounded border border-border hover:bg-muted/50 transition-colors">
              Add Funds
            </button>
            <button onClick={handleGoalClick} className="text-xs text-primary hover:text-primary/80 p-2 rounded border border-border hover:bg-muted/50 transition-colors">
              View All Goals
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}