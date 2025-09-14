"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  Zap,
  CheckCircle
} from "lucide-react"

interface BudgetRecommendation {
  id: string
  type: 'optimization' | 'savings' | 'reallocation' | 'alert'
  title: string
  description: string
  impact: string
  savings: number
  effort: 'easy' | 'medium' | 'hard'
  priority: 'high' | 'medium' | 'low'
  category: string
  aiConfidence: number
}

const mockRecommendations: BudgetRecommendation[] = [
  {
    id: "1",
    type: "optimization",
    title: "Reduce Dining Out Frequency",
    description: "You're spending AED 62/day on dining. Cooking at home 2 more days per week could save significant money.",
    impact: "Save AED 480/month",
    savings: 480,
    effort: "easy",
    priority: "high",
    category: "Food & Dining",
    aiConfidence: 92
  },
  {
    id: "2",
    type: "reallocation",
    title: "Reallocate Entertainment Budget",
    description: "You're under-spending on Entertainment by 60%. Consider moving AED 200 from Shopping to Entertainment.",
    impact: "Better budget balance",
    savings: 0,
    effort: "easy",
    priority: "medium",
    category: "Budget Allocation",
    aiConfidence: 85
  },
  {
    id: "3",
    type: "savings",
    title: "DEWA Usage Optimization",
    description: "Your electricity usage is 15% higher than similar households. AC optimization could reduce utility costs.",
    impact: "Save AED 85/month",
    savings: 85,
    effort: "medium",
    priority: "medium",
    category: "Utilities",
    aiConfidence: 78
  },
  {
    id: "4",
    type: "alert",
    title: "Transportation Budget Increase",
    description: "Gas prices increased 8% this quarter. Consider increasing your transportation budget by AED 100.",
    impact: "Avoid overspending",
    savings: 0,
    effort: "easy",
    priority: "low",
    category: "Transportation",
    aiConfidence: 88
  }
]

export function AIBudgetRecommendations() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="h-4 w-4" />
      case 'savings': return <DollarSign className="h-4 w-4" />
      case 'reallocation': return <Target className="h-4 w-4" />
      case 'alert': return <Calendar className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'easy': return 'bg-secondary text-secondary-foreground'
      case 'medium': return 'bg-accent text-accent-foreground'
      case 'hard': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground'
      case 'medium': return 'bg-accent text-accent-foreground'
      case 'low': return 'bg-secondary text-secondary-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Budget Coach
        </CardTitle>
        <CardDescription>
          Personalized recommendations to optimize your spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                      {getTypeIcon(recommendation.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm leading-tight">
                        {recommendation.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge size="sm" className={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority}
                        </Badge>
                        <Badge size="sm" className={getEffortColor(recommendation.effort)}>
                          {recommendation.effort}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {recommendation.savings > 0 && (
                      <div className="text-sm font-medium text-secondary">
                        +AED {recommendation.savings}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {recommendation.aiConfidence}% confident
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground pl-10">
                  {recommendation.description}
                </p>

                {/* Impact */}
                <div className="flex items-center justify-between pl-10">
                  <div className="flex items-center gap-1 text-xs text-secondary">
                    <CheckCircle className="h-3 w-3" />
                    <span>{recommendation.impact}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {recommendation.category}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pl-10">
                  <Button size="sm" variant="outline" className="text-xs h-7 px-3">
                    Apply
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 px-3">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">Potential Monthly Savings</span>
            <span className="text-lg font-bold text-secondary">
              AED {mockRecommendations.reduce((sum, rec) => sum + rec.savings, 0).toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            By implementing these AI-powered recommendations, you could optimize your budget significantly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            View All Recommendations
          </Button>
          <Button size="sm" className="flex-1">
            <Zap className="h-3 w-3 mr-1" />
            Auto-Optimize
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}