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
import { CreateGoalForm } from "@/components/goals/create-goal-form"
import { GoalCard } from "@/components/goals/goal-card"

const mockGoals = [
  {
    id: "goal-1",
    name: "Hajj Pilgrimage Fund",
    type: "savings" as const,
    targetAmount: 20000,
    currentAmount: 8500,
    targetDate: "2026-10-15",
    currency: "AED",
    category: "Religious",
    icon: "🕋",
    isUAESpecific: true,
    uaeCategory: "hajj" as const,
    monthlyContribution: 800,
    aiPredictions: {
      successProbability: 0.72,
      projectedCompletionDate: "2026-1-15",
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
    targetDate: "2027-01-31",
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
    targetDate: "2030-10-01",
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
    targetDate: "2025-12-31",
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
    targetDate: "2026-03-15",
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
    <div className="space-y-8 px-6">

      {/* Goals Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{activeGoals}</div>
            <p className="text-xs text-muted-foreground">
              {mockGoals.filter(g => g.aiPredictions.successProbability > 0.8).length} on track
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              AED {(totalTargetAmount / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">
              AED {(totalCurrentAmount / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              {overallProgress.toFixed(1)}% of total target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{overallProgress.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals Grid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">Your Goals</CardTitle>
            <CardDescription>
              Track progress and manage your financial objectives
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {activeGoals} Active
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <CreateGoalForm />
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
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 mb-4">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">Create New Goal</h3>
                    <p className="text-xs text-muted-foreground">
                      Set a new financial target and track your progress
                    </p>
                  </CardContent>
                </Card>
              }
            />
          </div>
        </CardContent>
      </Card>


    </div>
  )
}