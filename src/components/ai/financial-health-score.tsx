"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { mockUser, mockAccounts } from "@/lib/mock-data"

export function FinancialHealthScore() {
  // Calculate financial metrics from actual mock data
  const monthlyIncome = mockUser.financialProfile.monthlyIncome
  const monthlyExpenses = mockUser.financialProfile.monthlyExpenses
  const emergencyFund = mockUser.financialProfile.emergencyFund

  // Calculate savings rate
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100

  // Calculate debt from accounts
  const totalDebt = mockAccounts
    .filter(acc => acc.type === 'credit')
    .reduce((sum, acc) => sum + Math.abs(Math.min(0, acc.balance)), 0)
  const debtRatio = (totalDebt / monthlyIncome) * 100

  // Calculate emergency fund in months
  const emergencyFundMonths = emergencyFund / monthlyExpenses

  // Calculate component scores (0-100)
  const savingsRateScore = Math.min((savingsRate / 20) * 100, 100) // 20% target
  const debtRatioScore = Math.max(100 - (debtRatio / 30) * 100, 0) // <30% good
  const emergencyFundScore = Math.min((emergencyFundMonths / 3) * 100, 100) // 3 months target

  // Calculate overall score (weighted average)
  const overall = Math.round((savingsRateScore * 0.4 + debtRatioScore * 0.3 + emergencyFundScore * 0.3))

  // Create components object
  const components = {
    savingsRate: {
      score: Math.round(savingsRateScore),
      value: Number(savingsRate.toFixed(1)),
      benchmark: 20,
      status: savingsRate >= 20 ? "excellent" : savingsRate >= 15 ? "good" : savingsRate >= 10 ? "fair" : "poor",
    },
    debtRatio: {
      score: Math.round(debtRatioScore),
      value: Number(debtRatio.toFixed(1)),
      benchmark: 30,
      status: debtRatio <= 10 ? "excellent" : debtRatio <= 30 ? "good" : debtRatio <= 50 ? "fair" : "poor",
    },
    emergencyFund: {
      score: Math.round(emergencyFundScore),
      months: Number(emergencyFundMonths.toFixed(1)),
      target: 3,
      status: emergencyFundMonths >= 3 ? "excellent" : emergencyFundMonths >= 2 ? "good" : emergencyFundMonths >= 1 ? "fair" : "poor",
    },
  }

  // Determine trend based on overall score
  const trend = overall >= 80 ? "improving" : overall >= 60 ? "stable" : "declining"

  // Generate recommendations based on scores
  const recommendations = []
  if (emergencyFundScore < 100) {
    const needed = Math.round((3 - emergencyFundMonths) * monthlyExpenses)
    recommendations.push(`Add AED ${needed.toLocaleString()} more to reach your 3-month emergency fund target`)
  }
  if (savingsRateScore < 100) {
    recommendations.push("Consider increasing your savings rate to reach the 20% target for optimal financial health")
  }
  if (debtRatioScore < 100) {
    recommendations.push("Focus on reducing debt to improve your debt-to-income ratio")
  }
  if (overall >= 80) {
    recommendations.push("Excellent financial health - maintain current savings discipline")
  }

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