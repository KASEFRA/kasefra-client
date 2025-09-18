"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { mockFinancialHealthScore } from "@/lib/mock-data"

export function FinancialHealthScore() {
  const { overall, components, trend, recommendations } = mockFinancialHealthScore

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-secondary text-secondary-foreground'
      case 'good': return 'bg-primary text-primary-foreground'
      case 'fair': return 'bg-accent text-accent-foreground'
      case 'poor': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-secondary" />
      case 'declining': return <TrendingDown className="h-4 w-4 text-destructive" />
      default: return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card className="premium-card hover-lift border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <div className="icon-container bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              Financial Health
              {getTrendIcon()}
            </CardTitle>
            <CardDescription className="text-base">AI-powered wellness analysis</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{overall}</div>
            <div className="text-sm text-muted-foreground">out of 100</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Score</span>
            <Badge className={getStatusColor(overall >= 80 ? 'excellent' : overall >= 60 ? 'good' : overall >= 40 ? 'fair' : 'poor')}>
              {overall >= 80 ? 'Excellent' : overall >= 60 ? 'Good' : overall >= 40 ? 'Fair' : 'Poor'}
            </Badge>
          </div>
          <Progress value={overall} className="h-2" />
        </div>

        {/* Component Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold">Score Breakdown</h4>
          
          {/* Savings Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Savings Rate</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{components.savingsRate.value}%</span>
                <Badge size="sm" className={getStatusColor(components.savingsRate.status)}>
                  {components.savingsRate.status}
                </Badge>
              </div>
            </div>
            <Progress value={components.savingsRate.score} className="h-1" />
            <p className="text-xs text-muted-foreground">
              Target: {components.savingsRate.benchmark}% • Score: {components.savingsRate.score}/100
            </p>
          </div>

          {/* Debt Ratio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Debt-to-Income Ratio</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{components.debtRatio.value}%</span>
                <Badge size="sm" className={getStatusColor(components.debtRatio.status)}>
                  {components.debtRatio.status}
                </Badge>
              </div>
            </div>
            <Progress value={components.debtRatio.score} className="h-1" />
            <p className="text-xs text-muted-foreground">
              Target: &lt;{components.debtRatio.benchmark}% • Score: {components.debtRatio.score}/100
            </p>
          </div>

          {/* Emergency Fund */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Emergency Fund</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{components.emergencyFund.months} months</span>
                <Badge size="sm" className={getStatusColor(components.emergencyFund.status)}>
                  {components.emergencyFund.status}
                </Badge>
              </div>
            </div>
            <Progress value={components.emergencyFund.score} className="h-1" />
            <p className="text-xs text-muted-foreground">
              Target: {components.emergencyFund.target} months • Score: {components.emergencyFund.score}/100
            </p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold">AI Recommendations</h4>
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 rounded-lg bg-muted/50">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}