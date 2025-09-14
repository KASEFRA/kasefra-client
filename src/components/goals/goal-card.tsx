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
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{goal.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg font-semibold">{goal.name}</CardTitle>
                {goal.isUAESpecific && (
                  <Badge size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                    UAE
                  </Badge>
                )}
              </div>
              <CardDescription className="flex items-center gap-2">
                <span>Target: {formatDate(goal.targetDate)}</span>
                <span>•</span>
                <span className="capitalize">{goal.type}</span>
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              {getStatusIcon()}
              <Badge variant={getStatusColor()} className="text-xs">
                {getStatusText()}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(goal.aiPredictions.successProbability * 100)}% success rate
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
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
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">AI Forecast</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projected completion:</span>
              <span className="font-medium">{formatDate(goal.aiPredictions.projectedCompletionDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly contribution:</span>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={editContribution}
                      onChange={(e) => setEditContribution(e.target.value)}
                      className="w-20 h-6 text-xs px-2"
                    />
                    <span className="text-xs">AED</span>
                    <Button size="sm" onClick={handleSaveContribution} className="h-6 px-2 text-xs">
                      ✓
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium">AED {goal.monthlyContribution.toLocaleString()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="h-5 w-5 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            {goal.monthlyContribution !== goal.aiPredictions.recommendedMonthlyAmount && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">AI recommended:</span>
                <span className="font-medium text-primary">
                  AED {goal.aiPredictions.recommendedMonthlyAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Insights</h4>
          <div className="space-y-2">
            {goal.insights.slice(0, 2).map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <MoreHorizontal className="h-4 w-4 mr-1" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-xl">{goal.icon}</span>
                  {goal.name}
                </DialogTitle>
                <DialogDescription>
                  Track progress and manage your {goal.category.toLowerCase()} goal
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Goal Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">
                      AED {(remaining / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">Remaining</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-secondary">
                      {monthsRemaining.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Months Left</div>
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