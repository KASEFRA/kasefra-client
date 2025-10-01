"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  PieChart,
  Calendar,
  DollarSign,
  Settings
} from "lucide-react"
import { CreateBudgetWizard } from "@/components/budgets/create-budget-wizard"
import { BudgetCard } from "@/components/budgets/budget-card"
import { BudgetChart } from "@/components/budgets/budget-chart"

export default function BudgetsPage() {
  return (
    <div className="space-y-8 px-6">

      {/* Budget Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 8,450</div>
            <p className="text-xs text-muted-foreground">
              October 2025 budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 6,230</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">AED 2,220</div>
            <p className="text-xs text-muted-foreground">
              Available to spend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
            <p className="text-xs text-muted-foreground">
              Of monthly budget used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress and Analytics - 50/50 Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Progress Overview */}
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">Budget Progress</CardTitle>
            <CardDescription>
              October 2025 spending overview
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <CreateBudgetWizard />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Overall Progress</span>
                <span className="text-primary">74% of budget used</span>
              </div>
              <Progress value={74} className="h-3" />
            </div>

            {/* Top Categories */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-foreground">Top Spending Categories</h4>
              {[
                { name: "Food & Dining", spent: 1850, budget: 2000, percentage: 93 },
                { name: "Transportation", spent: 980, budget: 1200, percentage: 82 },
                { name: "Utilities", spent: 450, budget: 600, percentage: 75 }
              ].map((category) => (
                <div key={category.name} className="space-y-2 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">AED {category.spent.toLocaleString()}</span>
                      <Badge
                        variant={category.percentage > 90 ? "destructive" : category.percentage > 75 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Budget Analytics Chart */}
        <BudgetChart />
      </div>

      {/* Budget Management Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">Active Budgets</CardTitle>
            <CardDescription>
              Manage your spending limits and track progress
            </CardDescription>
          </div>
          <CreateBudgetWizard />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: "1",
                name: "Food & Dining",
                budget: 2000,
                spent: 1850,
                icon: "🍽️",
                category: "Food & Dining",
                lastUpdated: "2024-01-23",
                recommendations: [
                  "Consider cooking at home 2 more days per week to save AED 200",
                  "Your dining expenses peak on weekends - budget accordingly"
                ]
              },
              {
                id: "2",
                name: "Transportation",
                budget: 1200,
                spent: 980,
                icon: "🚗",
                category: "Transportation",
                lastUpdated: "2024-01-23",
                recommendations: [
                  "Metro usage is cost-effective - current spending is optimal",
                  "Gas prices may increase next quarter - consider budgeting AED 100 extra"
                ]
              },
              {
                id: "3",
                name: "Shopping",
                budget: 1500,
                spent: 890,
                icon: "🛍️",
                category: "Shopping",
                lastUpdated: "2024-01-23",
                recommendations: [
                  "You have AED 610 unused in this category",
                  "Consider moving AED 200 to Entertainment for better balance"
                ]
              },
              {
                id: "4",
                name: "Utilities",
                budget: 600,
                spent: 450,
                icon: "⚡",
                category: "Utilities",
                lastUpdated: "2024-01-23",
                recommendations: [
                  "DEWA bills typically increase 25% in summer months",
                  "Your AC usage optimization is working well"
                ]
              },
              {
                id: "5",
                name: "Entertainment",
                budget: 800,
                spent: 320,
                icon: "🎬",
                category: "Entertainment",
                lastUpdated: "2024-01-23",
                recommendations: [
                  "You're under-spending on entertainment by 60%",
                  "Consider increasing this budget for better work-life balance"
                ]
              },
              {
                id: "6",
                name: "Healthcare",
                budget: 400,
                spent: 180,
                icon: "⚕️",
                category: "Healthcare",
                lastUpdated: "2024-01-23",
                recommendations: [
                  "Healthcare spending is efficiently low",
                  "Keep emergency fund for unexpected medical expenses"
                ]
              }
            ].map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onUpdate={(id, newBudget) => {
                  console.log(`Update budget ${id} to AED ${newBudget}`)
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}