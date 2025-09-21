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
import { BudgetOverview } from "@/components/budgets/budget-overview"
import { BudgetChart } from "@/components/budgets/budget-chart"
import { AIBudgetRecommendations } from "@/components/budgets/ai-budget-recommendations"
import { CreateBudgetWizard } from "@/components/budgets/create-budget-wizard"
import { BudgetCard } from "@/components/budgets/budget-card"

export default function BudgetsPage() {
  return (
    <div className="space-y-6 px-6">

      {/* Budget Overview Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BudgetOverview />
          </div>
          <div>
            <AIBudgetRecommendations />
          </div>
        </div>
      </div>

      {/* Budget Analytics Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BudgetChart />

          {/* Quick Budget Stats */}
          <Card className="bg-card border shadow-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  Budget Summary
                </CardTitle>
                <CardDescription className="text-base">Current month overview</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <CreateBudgetWizard />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="text-2xl font-bold text-primary mb-1">AED 8,450</div>
                <div className="text-sm text-muted-foreground">Total Budget</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl border border-secondary">
                <div className="text-2xl font-bold text-secondary-foreground mb-1">AED 6,230</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
            </div>

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

            <Button variant="outline" className="w-full mt-4 ">
              View All Categories
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Budget Management Section */}
      <Card className="bg-card border shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            Active Budgets
          </CardTitle>
          <CardDescription className="text-base">
            Manage your spending limits and track progress
          </CardDescription>
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