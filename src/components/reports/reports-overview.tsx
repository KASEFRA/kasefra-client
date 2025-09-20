"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Zap,
  DollarSign
} from "lucide-react"

interface FinancialSnapshot {
  totalIncome: number
  totalExpenses: number
  totalSavings: number
  netWorth: number
  budgetUtilization: number
  goalProgress: number
  monthlyTrend: 'up' | 'down' | 'stable'
  savingsRate: number
}

const mockSnapshot: FinancialSnapshot = {
  totalIncome: 15500,
  totalExpenses: 8700,
  totalSavings: 6800,
  netWorth: 145200,
  budgetUtilization: 73,
  goalProgress: 68,
  monthlyTrend: 'up',
  savingsRate: 44
}

const monthlyTrends = [
  { month: 'Aug', income: 15200, expenses: 9100, savings: 6100, netWorth: 132000 },
  { month: 'Sep', income: 15500, expenses: 9300, savings: 6200, netWorth: 135800 },
  { month: 'Oct', income: 15300, expenses: 8900, savings: 6400, netWorth: 138900 },
  { month: 'Nov', income: 15600, expenses: 8600, savings: 7000, netWorth: 142100 },
  { month: 'Dec', income: 15400, expenses: 8800, savings: 6600, netWorth: 143700 },
  { month: 'Jan', income: 15500, expenses: 8700, savings: 6800, netWorth: 145200 }
]

const keyInsights = [
  {
    type: 'positive',
    title: 'Savings Rate Improvement',
    description: 'Your savings rate increased to 44%, exceeding the recommended 20% target',
    impact: '+5.2% vs last month',
    icon: TrendingUp
  },
  {
    type: 'neutral',
    title: 'Expense Control',
    description: 'Monthly expenses decreased by AED 100, showing good budget discipline',
    impact: 'Within budget limits',
    icon: CheckCircle
  },
  {
    type: 'warning',
    title: 'Dining Spending',
    description: 'Restaurant expenses are 23% above category average for UAE residents',
    impact: 'Consider optimization',
    icon: AlertTriangle
  },
  {
    type: 'positive',
    title: 'Goal Achievement',
    description: 'Emergency fund goal is 94% complete, ahead of schedule',
    impact: '2 months early',
    icon: Target
  }
]

export function ReportsOverview() {
  const snapshot = mockSnapshot
  const yearOverYearGrowth = ((snapshot.netWorth - 125000) / 125000 * 100).toFixed(1)

  return (
    <Card className="bg-card border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Financial Overview
            </CardTitle>
            <CardDescription>
              Your complete financial picture for January 2024
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Updated Today
            </Badge>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Change Period
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-lg font-bold text-primary">AED {snapshot.totalIncome.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Income</div>
            <div className="text-xs text-secondary mt-1">This Month</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-lg font-bold text-accent">AED {snapshot.totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Expenses</div>
            <div className="text-xs text-accent mt-1">-{((snapshot.totalExpenses / 9300) * 100 - 100).toFixed(1)}% vs last month</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-lg font-bold text-secondary">AED {snapshot.totalSavings.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Savings</div>
            <div className="text-xs text-secondary mt-1">+{((snapshot.totalSavings / 6600) * 100 - 100).toFixed(1)}% vs last month</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-lg font-bold text-primary">AED {(snapshot.netWorth / 1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">Net Worth</div>
            <div className="text-xs text-secondary mt-1">+{yearOverYearGrowth}% YoY</div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Performance Metrics</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Utilization</span>
                  <span className="font-medium">{snapshot.budgetUtilization}%</span>
                </div>
                <Progress value={snapshot.budgetUtilization} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  AED {(snapshot.totalExpenses * 0.27).toFixed(0)} remaining this month
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Goal Progress</span>
                  <span className="font-medium">{snapshot.goalProgress}%</span>
                </div>
                <Progress value={snapshot.goalProgress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  3 of 5 goals on track for completion
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Savings Rate</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{snapshot.savingsRate}%</span>
                    <TrendingUp className="h-3 w-3 text-secondary" />
                  </div>
                </div>
                <Progress value={Math.min(snapshot.savingsRate * 2, 100)} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Above recommended 20% target
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm">6-Month Trend</h4>
            <div className="space-y-3">
              {monthlyTrends.slice(-3).map((month, index) => (
                <div key={month.month} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <div className="font-medium text-sm">{month.month} 2024</div>
                    <div className="text-xs text-muted-foreground">
                      Net Worth: AED {(month.netWorth / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-secondary">
                      AED {month.savings.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Saved</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Full History
            </Button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">AI Financial Insights</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-background">
                <div className={`p-1 rounded ${
                  insight.type === 'positive' ? 'bg-secondary/20' :
                  insight.type === 'warning' ? 'bg-accent/20' : 'bg-primary/20'
                }`}>
                  <insight.icon className={`h-4 w-4 ${
                    insight.type === 'positive' ? 'text-secondary' :
                    insight.type === 'warning' ? 'text-accent' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">{insight.title}</div>
                  <div className="text-xs text-muted-foreground mb-2">{insight.description}</div>
                  <Badge
                    size="sm"
                    variant={insight.type === 'positive' ? 'secondary' : insight.type === 'warning' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {insight.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <Button size="sm" variant="outline" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            View Income Report
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <BarChart3 className="h-3 w-3 mr-1" />
            Expense Analysis
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Target className="h-3 w-3 mr-1" />
            Goal Performance
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Net Worth Trends
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}