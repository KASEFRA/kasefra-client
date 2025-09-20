"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Plus,
  TrendingUp,
  Calendar,
  DollarSign,
  Settings,
  Trophy,
  Zap,
  CheckCircle
} from "lucide-react"
import { GoalsOverview } from "@/components/goals/goals-overview"
import { GoalChart } from "@/components/goals/goal-chart"
import { CreateGoalForm } from "@/components/goals/create-goal-form"
import { GoalCard } from "@/components/goals/goal-card"
import { GoalForecasting } from "@/components/ai/goal-forecasting"

const mockGoals = [
  {
    id: "goal-1",
    name: "Hajj Pilgrimage Fund",
    type: "savings" as const,
    targetAmount: 20000,
    currentAmount: 8500,
    targetDate: "2025-06-15",
    currency: "AED",
    category: "Religious",
    icon: "🕋",
    isUAESpecific: true,
    uaeCategory: "hajj" as const,
    monthlyContribution: 800,
    aiPredictions: {
      successProbability: 0.72,
      projectedCompletionDate: "2025-10-15",
      recommendedMonthlyAmount: 1300,
      monthsAhead: -4
    },
    insights: [
      "At current pace of AED 800/month, you'll miss target by AED 1,800",
      "Consider Islamic investment options to boost savings",
      "Hajj costs may increase 5% annually - factor in inflation"
    ]
  },
  {
    id: "goal-2",
    name: "Dubai Property Down Payment",
    type: "purchase" as const,
    targetAmount: 300000,
    currentAmount: 145000,
    targetDate: "2026-12-31",
    currency: "AED",
    category: "Real Estate",
    icon: "🏠",
    isUAESpecific: true,
    uaeCategory: "property" as const,
    monthlyContribution: 4500,
    aiPredictions: {
      successProbability: 0.89,
      projectedCompletionDate: "2026-08-15",
      recommendedMonthlyAmount: 4500,
      monthsAhead: 4
    },
    insights: [
      "You're ahead of schedule! Property prices rising 3% annually",
      "Consider pre-approval to lock in current rates",
      "Dubai market shows strong growth in your target area"
    ]
  },
  {
    id: "goal-3",
    name: "Children's University Fund",
    type: "savings" as const,
    targetAmount: 150000,
    currentAmount: 25000,
    targetDate: "2030-09-01",
    currency: "AED",
    category: "Education",
    icon: "🎓",
    isUAESpecific: true,
    uaeCategory: "education" as const,
    monthlyContribution: 1850,
    aiPredictions: {
      successProbability: 0.85,
      projectedCompletionDate: "2030-11-01",
      recommendedMonthlyAmount: 1850,
      monthsAhead: -2
    },
    insights: [
      "Education costs in UAE increasing 4% annually",
      "Consider education savings plans with tax benefits",
      "International university costs vary significantly"
    ]
  },
  {
    id: "goal-4",
    name: "Emergency Fund",
    type: "savings" as const,
    targetAmount: 35000,
    currentAmount: 12000,
    targetDate: "2024-12-31",
    currency: "AED",
    category: "Emergency",
    icon: "🛡️",
    isUAESpecific: false,
    monthlyContribution: 2000,
    aiPredictions: {
      successProbability: 0.94,
      projectedCompletionDate: "2024-11-15",
      recommendedMonthlyAmount: 2000,
      monthsAhead: 1
    },
    insights: [
      "UAE residents need higher emergency funds due to visa requirements",
      "You're on excellent track to meet your goal",
      "Consider high-yield savings accounts for better returns"
    ]
  },
  {
    id: "goal-5",
    name: "Wedding Celebration",
    type: "purchase" as const,
    targetAmount: 80000,
    currentAmount: 15000,
    targetDate: "2025-03-15",
    currency: "AED",
    category: "Personal",
    icon: "💍",
    isUAESpecific: true,
    uaeCategory: "wedding" as const,
    monthlyContribution: 5200,
    aiPredictions: {
      successProbability: 0.68,
      projectedCompletionDate: "2025-05-01",
      recommendedMonthlyAmount: 5200,
      monthsAhead: -1.5
    },
    insights: [
      "Wedding costs in UAE vary greatly by venue and season",
      "Spring weddings (March-May) cost 20% more than summer",
      "Consider cultural requirements and family expectations"
    ]
  }
]

export default function GoalsPage() {
  const activeGoals = mockGoals.length
  const totalTargetAmount = mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = (totalCurrentAmount / totalTargetAmount) * 100

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="page-header">
        <h1 className="page-title">Financial Goals</h1>
        <p className="page-subtitle">
          Track your savings goals and achieve your dreams
        </p>
      </div>

      {/* Goals Overview Section */}
      <div className="content-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <GoalsOverview goals={mockGoals} />
          </div>
          <div>
            <GoalChart goals={mockGoals} />
          </div>
        </div>
      </div>

      {/* AI Goal Forecasting */}
      <div className="content-section">
        <GoalForecasting goals={mockGoals} />
      </div>

      {/* Quick Stats */}
      <div className="metrics-grid">
        <Card className="premium-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Goals</CardTitle>
            <div className="icon-container bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{activeGoals}</div>
            <p className="text-sm text-muted-foreground">
              {mockGoals.filter(g => g.aiPredictions.successProbability > 0.8).length} on track
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Target</CardTitle>
            <div className="icon-container bg-blue-100 dark:bg-blue-900/20">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              AED {(totalTargetAmount / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Saved</CardTitle>
            <div className="icon-container bg-emerald-100 dark:bg-emerald-900/20">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              AED {(totalCurrentAmount / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-muted-foreground">
              {overallProgress.toFixed(1)}% of total target
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Next Milestone</CardTitle>
            <div className="icon-container bg-purple-100 dark:bg-purple-900/20">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
            <p className="text-sm text-muted-foreground">Goals due this year</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals Grid */}
      <Card className="premium-card hover-lift">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <div className="icon-container bg-primary/10">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                Your Goals
              </CardTitle>
              <CardDescription className="text-base">
                Track progress and manage your financial objectives
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                {activeGoals} Active
              </Badge>
              <Button variant="outline" size="sm" className="btn-outline-premium">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <CreateGoalForm />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>

          {/* Add New Goal Card */}
          <div className="mt-6">
            <CreateGoalForm
              trigger={
                <Card className="border-dashed border-2 border-primary/30 hover:border-primary/50 cursor-pointer transition-all duration-200 hover:shadow-md">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="icon-container bg-primary/10 mb-4">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">Create New Goal</h3>
                    <p className="text-sm text-muted-foreground">
                      Set a new financial target and track your progress
                    </p>
                  </CardContent>
                </Card>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      <Card className="premium-card hover-lift">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <div className="icon-container bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            AI Goal Insights
          </CardTitle>
          <CardDescription className="text-base">
            Smart recommendations to accelerate your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <div className="icon-container bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Optimize Your Hajj Fund</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Increasing your monthly contribution by AED 500 would put you back on track for your 2025 target date.
                  </p>
                  <Button size="sm" variant="outline" className="btn-outline-premium">
                    Adjust Contribution
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="icon-container bg-blue-100 dark:bg-blue-900/30">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Property Investment Opportunity</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're ahead on your property goal! Consider exploring pre-construction deals that might offer better value.
                  </p>
                  <Button size="sm" variant="outline" className="btn-outline-premium">
                    Explore Options
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <div className="icon-container bg-purple-100 dark:bg-purple-900/30">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Emergency Fund Priority</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your emergency fund is progressing excellently. Consider automating transfers to maintain consistency.
                  </p>
                  <Button size="sm" variant="outline" className="btn-outline-premium">
                    Set Automation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}