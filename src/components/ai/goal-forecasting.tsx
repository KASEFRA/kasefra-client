"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Target,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react"

interface GoalForecast {
  id: string
  name: string
  type: 'savings' | 'debt' | 'purchase' | 'investment'
  targetAmount: number
  currentAmount: number
  targetDate: string
  currency: string

  // AI Predictions
  projectedCompletionDate: string
  projectedAmount: number
  successProbability: number
  monthsAhead: number // positive = ahead of schedule, negative = behind
  recommendedMonthlyAmount: number

  // UAE Specific
  isUAESpecific: boolean
  uaeCategory?: 'hajj' | 'property' | 'education' | 'wedding' | 'visa'

  insights: string[]
  actions: string[]
}

const mockGoalForecasts: GoalForecast[] = [
  {
    id: "goal-1",
    name: "Hajj Pilgrimage Fund",
    type: "savings",
    targetAmount: 20000,
    currentAmount: 8500,
    targetDate: "2025-06-15",
    currency: "AED",
    projectedCompletionDate: "2025-10-15",
    projectedAmount: 18200,
    successProbability: 0.72,
    monthsAhead: -4,
    recommendedMonthlyAmount: 1300,
    isUAESpecific: true,
    uaeCategory: "hajj",
    insights: [
      "At current pace of AED 800/month, you'll miss target by AED 1,800",
      "Consider Islamic investment options to boost savings",
      "Hajj costs may increase 5% annually - factor in inflation"
    ],
    actions: ["Increase Savings", "Islamic Investment", "Flexible Timeline"]
  },
  {
    id: "goal-2",
    name: "Dubai Property Down Payment",
    type: "purchase",
    targetAmount: 300000,
    currentAmount: 145000,
    targetDate: "2026-12-31",
    currency: "AED",
    projectedCompletionDate: "2026-08-15",
    projectedAmount: 310000,
    successProbability: 0.89,
    monthsAhead: 4,
    recommendedMonthlyAmount: 4500,
    isUAESpecific: true,
    uaeCategory: "property",
    insights: [
      "You're ahead of schedule! Property prices rising 3% annually",
      "Consider pre-approval to lock in current rates",
      "Dubai market shows strong growth in your target area"
    ],
    actions: ["Pre-Approval", "Market Research", "Continue Plan"]
  },
  {
    id: "goal-3",
    name: "Children's University Fund",
    type: "savings",
    targetAmount: 150000,
    currentAmount: 25000,
    targetDate: "2030-09-01",
    currency: "AED",
    projectedCompletionDate: "2030-11-01",
    projectedAmount: 148500,
    successProbability: 0.85,
    monthsAhead: -2,
    recommendedMonthlyAmount: 1850,
    isUAESpecific: true,
    uaeCategory: "education",
    insights: [
      "Education costs in UAE increasing 4% annually",
      "Consider education savings plans with tax benefits",
      "International university costs vary significantly"
    ],
    actions: ["Education Savings Plan", "Investment Review", "Cost Research"]
  },
  {
    id: "goal-4",
    name: "Emergency Fund",
    type: "savings",
    targetAmount: 35000,
    currentAmount: 12000,
    targetDate: "2024-12-31",
    currency: "AED",
    projectedCompletionDate: "2024-11-15",
    projectedAmount: 35500,
    successProbability: 0.94,
    monthsAhead: 1,
    recommendedMonthlyAmount: 2000,
    isUAESpecific: false,
    insights: [
      "UAE residents need higher emergency funds due to visa requirements",
      "You're on excellent track to meet your goal",
      "Consider high-yield savings accounts for better returns"
    ],
    actions: ["High-Yield Account", "Continue Plan", "Automate Savings"]
  },
  {
    id: "goal-5",
    name: "Wedding Celebration",
    type: "purchase",
    targetAmount: 80000,
    currentAmount: 15000,
    targetDate: "2025-03-15",
    currency: "AED",
    projectedCompletionDate: "2025-05-01",
    projectedAmount: 75000,
    successProbability: 0.68,
    monthsAhead: -1.5,
    recommendedMonthlyAmount: 5200,
    isUAESpecific: true,
    uaeCategory: "wedding",
    insights: [
      "Wedding costs in UAE vary greatly by venue and season",
      "Spring weddings (March-May) cost 20% more than summer",
      "Consider cultural requirements and family expectations"
    ],
    actions: ["Budget Review", "Venue Research", "Family Planning"]
  }
]

export function GoalForecasting() {
  const getStatusIcon = (probability: number, monthsAhead: number) => {
    if (probability >= 0.85 && monthsAhead >= 0) return <CheckCircle className="h-4 w-4 text-secondary" />
    if (probability >= 0.70) return <Target className="h-4 w-4 text-primary" />
    if (probability >= 0.50) return <Clock className="h-4 w-4 text-accent" />
    return <AlertTriangle className="h-4 w-4 text-destructive" />
  }

  const getStatusColor = (probability: number, monthsAhead: number) => {
    if (probability >= 0.85 && monthsAhead >= 0) return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    if (probability >= 0.70) return "bg-primary text-primary-foreground hover:bg-primary/80"
    if (probability >= 0.50) return "bg-accent text-accent-foreground hover:bg-accent/80"
    return "bg-destructive text-destructive-foreground hover:bg-destructive/80"
  }

  const getStatusText = (probability: number, monthsAhead: number) => {
    if (probability >= 0.85 && monthsAhead >= 0) return "On Track"
    if (probability >= 0.70) return "Likely"
    if (probability >= 0.50) return "At Risk"
    return "Behind"
  }

  const getUAECategoryIcon = (category?: string) => {
    switch (category) {
      case 'hajj': return '🕋'
      case 'property': return '🏠'
      case 'education': return '🎓'
      case 'wedding': return '💍'
      case 'visa': return '📄'
      default: return '🎯'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency: currency
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Goal Achievement Forecasts</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            View All Goals
          </Button>
        </div>
        <CardDescription>
          AI predictions for your financial goals with UAE-specific insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockGoalForecasts.map((goal) => (
            <div key={goal.id} className="p-4 border rounded-lg space-y-4">
              {/* Goal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getUAECategoryIcon(goal.uaeCategory)}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{goal.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Target: {formatDate(goal.targetDate)}</span>
                      {goal.isUAESpecific && (
                        <Badge size="sm" className="bg-primary/10 text-primary hover:bg-primary/10">
                          UAE
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(goal.successProbability, goal.monthsAhead)}
                    <Badge className={getStatusColor(goal.successProbability, goal.monthsAhead)}>
                      {getStatusText(goal.successProbability, goal.monthsAhead)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(goal.successProbability * 100)}% success rate
                  </div>
                </div>
              </div>

              {/* Progress and Amount */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {formatCurrency(goal.currentAmount, goal.currency)} / {formatCurrency(goal.targetAmount, goal.currency)}
                  </span>
                </div>
                <Progress
                  value={(goal.currentAmount / goal.targetAmount) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}% complete</span>
                  <span>
                    {goal.monthsAhead > 0
                      ? `${Math.abs(goal.monthsAhead)} months ahead`
                      : goal.monthsAhead < 0
                        ? `${Math.abs(goal.monthsAhead)} months behind`
                        : 'On schedule'
                    }
                  </span>
                </div>
              </div>

              {/* AI Prediction */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">AI Forecast</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Projected completion</div>
                    <div className="font-medium">{formatDate(goal.projectedCompletionDate)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Projected amount</div>
                    <div className="font-medium">{formatCurrency(goal.projectedAmount, goal.currency)}</div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">AI Insights</h4>
                {goal.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{insight}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Actions */}
              <div className="flex flex-wrap gap-2">
                {goal.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-3"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}