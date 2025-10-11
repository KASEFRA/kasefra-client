"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
  Zap,
  Edit,
  MoreHorizontal,
  Trophy
} from "lucide-react"

interface Goal {
  id: string
  name: string
  type: 'savings' | 'debt' | 'purchase'
  targetAmount: number
  currentAmount: number
  targetDate: string
  currency: string
  category: string
  icon: string
  isUAESpecific: boolean
  uaeCategory?: string
  monthlyContribution: number
  aiPredictions: {
    successProbability: number
    projectedCompletionDate: string
    recommendedMonthlyAmount: number
    monthsAhead: number
  }
  insights: string[]
}

interface GoalCardProps {
  goal: Goal
  onUpdate?: (id: string, updates: Partial<Goal>) => void
}

export function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContribution, setEditContribution] = useState(goal.monthlyContribution.toString())

  const progress = (goal.currentAmount / goal.targetAmount) * 100
  const remaining = goal.targetAmount - goal.currentAmount
  const monthsRemaining = Math.ceil(new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)

  const getStatusIcon = () => {
    if (goal.aiPredictions.successProbability >= 0.85 && goal.aiPredictions.monthsAhead >= 0) {
      return <CheckCircle className="h-4 w-4 text-secondary" />
    }
    if (goal.aiPredictions.successProbability >= 0.70) {
      return <Target className="h-4 w-4 text-primary" />
    }
    if (goal.aiPredictions.successProbability >= 0.50) {
      return <Clock className="h-4 w-4 text-accent" />
    }
    return <AlertTriangle className="h-4 w-4 text-destructive" />
  }

  const getStatusText = () => {
    if (goal.aiPredictions.successProbability >= 0.85 && goal.aiPredictions.monthsAhead >= 0) return "On Track"
    if (goal.aiPredictions.successProbability >= 0.70) return "Likely"
    if (goal.aiPredictions.successProbability >= 0.50) return "At Risk"
    return "Behind"
  }

  const getStatusColor = () => {
    if (goal.aiPredictions.successProbability >= 0.85 && goal.aiPredictions.monthsAhead >= 0) return "secondary"
    if (goal.aiPredictions.successProbability >= 0.70) return "default"
    if (goal.aiPredictions.successProbability >= 0.50) return "default"
    return "destructive"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: goal.currency
    })
  }

  const handleSaveContribution = () => {
    const newContribution = parseInt(editContribution) || goal.monthlyContribution
    if (onUpdate) {
      onUpdate(goal.id, { monthlyContribution: newContribution })
    }
    setIsEditing(false)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="text-xl sm:text-2xl shrink-0">{goal.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <CardTitle className="text-sm sm:text-base lg:text-lg font-semibold truncate">{goal.name}</CardTitle>
                {goal.isUAESpecific && (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-[10px] sm:text-xs w-fit">
                    UAE
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span>Target: {formatDate(goal.targetDate)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="capitalize">{goal.type}</span>
                </div>
              </CardDescription>
            </div>
          </div>
          <div className="text-right sm:text-left shrink-0">
            <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2 mb-1">
              {getStatusIcon()}
              <Badge variant={getStatusColor()} className="text-[10px] sm:text-xs">
                {getStatusText()}
              </Badge>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {Math.round(goal.aiPredictions.successProbability * 100)}% success rate
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
        {/* Progress Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between text-xs sm:text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
            </span>
          </div>
          <Progress value={progress} className="h-1.5 sm:h-2" />
          <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>{Math.round(progress)}% complete</span>
            <span>
              {goal.aiPredictions.monthsAhead > 0
                ? `${Math.abs(goal.aiPredictions.monthsAhead)} months ahead`
                : goal.aiPredictions.monthsAhead < 0
                  ? `${Math.abs(goal.aiPredictions.monthsAhead)} months behind`
                  : 'On schedule'
              }
            </span>
          </div>
        </div>

        {/* AI Prediction Section */}
        <div className="p-2 sm:p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="font-medium text-xs sm:text-sm">AI Forecast</span>
          </div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Projected completion:</span>
              <span className="font-medium text-xs sm:text-sm">{formatDate(goal.aiPredictions.projectedCompletionDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Monthly contribution:</span>
              <div className="flex items-center gap-1 sm:gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={editContribution}
                      onChange={(e) => setEditContribution(e.target.value)}
                      className="w-16 sm:w-20 h-6 sm:h-7 text-xs px-1 sm:px-2"
                    />
                    <span className="text-[10px] sm:text-xs">AED</span>
                    <Button size="sm" onClick={handleSaveContribution} className="h-6 sm:h-7 px-1 sm:px-2 text-xs">
                      ✓
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-xs sm:text-sm">AED {goal.monthlyContribution.toLocaleString()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="h-4 w-4 sm:h-5 sm:w-5 p-0"
                    >
                      <Edit className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            {goal.monthlyContribution !== goal.aiPredictions.recommendedMonthlyAmount && (
              <div className="flex justify-between items-center text-[10px] sm:text-xs">
                <span className="text-muted-foreground">AI recommended:</span>
                <span className="font-medium text-primary">
                  AED {goal.aiPredictions.recommendedMonthlyAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="space-y-1 sm:space-y-2">
          <h4 className="font-medium text-xs sm:text-sm">Key Insights</h4>
          <div className="space-y-1 sm:space-y-2">
            {goal.insights.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-start gap-1 sm:gap-2 text-xs sm:text-sm">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                <span className="text-muted-foreground leading-tight">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1 sm:pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm h-7 sm:h-8">
                <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-md mx-4">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <span className="text-lg sm:text-xl">{goal.icon}</span>
                  <span className="truncate">{goal.name}</span>
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Track progress and manage your {goal.category.toLowerCase()} goal
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-6">
                {/* Goal Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                    <div className="text-base sm:text-lg font-bold text-primary">
                      AED {(remaining / 1000).toFixed(0)}K
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Remaining</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
                    <div className="text-base sm:text-lg font-bold text-secondary">
                      {monthsRemaining.toFixed(0)}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Months Left</div>
                  </div>
                </div>

                {/* Complete Insights */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">All Insights</h4>
                  <div className="space-y-2">
                    {goal.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Target className="h-3 w-3 mr-1" />
                    Set Milestone
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Adjust Date
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button size="sm" className="flex-1">
            <DollarSign className="h-4 w-4 mr-1" />
            Add Money
          </Button>
        </div>

        {/* Achievement Celebration */}
        {progress >= 100 && (
          <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg text-center">
            <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="font-medium text-secondary">Goal Achieved!</div>
            <div className="text-sm text-muted-foreground">Congratulations on reaching your target!</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}