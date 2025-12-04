"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Zap,
  CheckCircle,
  AlertTriangle,
  Trophy,
  DollarSign
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

interface GoalsOverviewProps {
  goals: Goal[]
}

export function GoalsOverview({ goals }: GoalsOverviewProps) {
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100

  const onTrackGoals = goals.filter(g => g.aiPredictions.successProbability >= 0.8)
  const atRiskGoals = goals.filter(g => g.aiPredictions.successProbability < 0.7)
  const aheadOfSchedule = goals.filter(g => g.aiPredictions.monthsAhead > 0)

  const upcomingDeadlines = goals
    .filter(g => new Date(g.targetDate).getFullYear() === 2024)
    .sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())

  const monthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)
  const averageSuccessProbability = goals.reduce((sum, goal) => sum + goal.aiPredictions.successProbability, 0) / goals.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Goals Overview
              <Badge
                variant={averageSuccessProbability >= 0.8 ? "secondary" : averageSuccessProbability >= 0.6 ? "default" : "destructive"}
                className="text-xs"
              >
                {averageSuccessProbability >= 0.8 ? "Excellent" : averageSuccessProbability >= 0.6 ? "Good" : "Needs Attention"}
              </Badge>
            </CardTitle>
            <CardDescription>
              AI-powered insights for your financial objectives
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Timeline
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">AED {(totalCurrentAmount / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Total Saved</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">AED {(totalTargetAmount / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Total Target</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">AED {(monthlyContributions / 1000).toFixed(1)}K</div>
              <div className="text-sm text-muted-foreground">Monthly Total</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span>{overallProgress.toFixed(1)}% complete</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">AI Goal Intelligence</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="font-medium">{Math.round(averageSuccessProbability * 100)}%</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">On Track:</span>
                <span className="font-medium text-secondary">{onTrackGoals.length} goals</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Ahead of Schedule:</span>
                <span className="font-medium text-secondary">{aheadOfSchedule.length} goals</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">At Risk:</span>
                <span className={`font-medium ${atRiskGoals.length > 0 ? 'text-destructive' : 'text-secondary'}`}>
                  {atRiskGoals.length} goals
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground">This Year:</span>
                <span className="font-medium">{upcomingDeadlines.length} due</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">UAE Specific:</span>
                <span className="font-medium">{goals.filter(g => g.isUAESpecific).length} goals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goal Status Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Priority Alerts
          </h4>

          {atRiskGoals.length > 0 && (
            <Alert variant="default">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-sm">
                {atRiskGoals.length} Goal{atRiskGoals.length > 1 ? 's' : ''} Need Attention
              </AlertTitle>
              <AlertDescription className="text-sm">
                <div className="mt-2 space-y-1">
                  {atRiskGoals.slice(0, 2).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{goal.icon}</span>
                        <span>{goal.name}</span>
                      </div>
                      <Badge size="sm" variant="destructive" className="text-xs">
                        {Math.round(goal.aiPredictions.successProbability * 100)}% chance
                      </Badge>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {aheadOfSchedule.length > 0 && (
            <Alert variant="secondary">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle className="text-sm">
                {aheadOfSchedule.length} Goal{aheadOfSchedule.length > 1 ? 's' : ''} Ahead of Schedule
              </AlertTitle>
              <AlertDescription className="text-sm">
                <div className="mt-2 space-y-1">
                  {aheadOfSchedule.slice(0, 2).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{goal.icon}</span>
                        <span>{goal.name}</span>
                      </div>
                      <Badge size="sm" variant="secondary" className="text-xs">
                        {Math.abs(goal.aiPredictions.monthsAhead)} months ahead
                      </Badge>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {upcomingDeadlines.length > 0 && (
            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertTitle className="text-sm">Upcoming Deadlines</AlertTitle>
              <AlertDescription className="text-sm">
                <div className="mt-2 space-y-1">
                  {upcomingDeadlines.slice(0, 2).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{goal.icon}</span>
                        <span>{goal.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(goal.targetDate).toLocaleDateString('en-AE', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <Button size="sm" variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Optimize All
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            Increase Contributions
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Target className="h-3 w-3 mr-1" />
            Set Milestones
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}