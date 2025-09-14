"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Target,
  Calendar,
  Zap
} from "lucide-react"

interface BudgetStatus {
  totalBudget: number
  totalSpent: number
  totalRemaining: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  projectedOverspend: number
  daysRemaining: number
}

const mockBudgetStatus: BudgetStatus = {
  totalBudget: 8450,
  totalSpent: 6230,
  totalRemaining: 2220,
  percentage: 74,
  trend: 'up',
  projectedOverspend: 320,
  daysRemaining: 8
}

const mockAlerts = [
  {
    id: "1",
    type: "warning",
    title: "Dining Budget Alert",
    message: "You're 93% through your dining budget with 8 days left in the month",
    prediction: "AI predicts you'll exceed by AED 150 based on current pace",
    category: "Food & Dining",
    severity: "warning"
  },
  {
    id: "2",
    type: "info",
    title: "Transportation On Track",
    message: "Your transportation spending is well within budget",
    prediction: "AI forecasts AED 220 remaining at month end",
    category: "Transportation",
    severity: "info"
  }
]

export function BudgetOverview() {
  const status = mockBudgetStatus
  const onTrack = status.percentage <= 75 && status.projectedOverspend <= 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Budget Overview
              {onTrack ? (
                <CheckCircle className="h-4 w-4 text-secondary" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-accent" />
              )}
            </CardTitle>
            <CardDescription>January 2024 • {status.daysRemaining} days remaining</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">AED {status.totalBudget.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-secondary">AED {status.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Spent</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="text-2xl font-bold text-accent">AED {status.totalRemaining.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Overall Progress</span>
              <Badge variant={onTrack ? "secondary" : "default"} className="text-xs">
                {onTrack ? "On Track" : "Needs Attention"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {status.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-accent" />
              ) : status.trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-secondary" />
              ) : null}
              <span className="text-sm font-medium">{status.percentage}% used</span>
            </div>
          </div>
          <Progress value={status.percentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>AED {status.totalSpent.toLocaleString()} spent</span>
            <span>AED {status.totalRemaining.toLocaleString()} remaining</span>
          </div>
        </div>

        {/* AI Predictions */}
        <div className="p-4 bg-muted/30 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">AI Budget Forecast</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Projected month-end spending:</span>
              <span className="font-medium">AED {(status.totalSpent + status.projectedOverspend).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Expected variance:</span>
              <span className={`font-medium ${status.projectedOverspend > 0 ? 'text-accent' : 'text-secondary'}`}>
                {status.projectedOverspend > 0 ? '+' : ''}AED {status.projectedOverspend}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Daily budget remaining:</span>
              <span className="font-medium">AED {Math.round(status.totalRemaining / status.daysRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Budget Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Budget Alerts
          </h4>
          {mockAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === 'warning' ? 'default' : 'secondary'}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <AlertTitle className="text-sm font-semibold mb-1">
                    {alert.title}
                  </AlertTitle>
                  <AlertDescription className="text-sm">
                    <p className="mb-1">{alert.message}</p>
                    <p className="text-muted-foreground text-xs">{alert.prediction}</p>
                  </AlertDescription>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Badge size="sm" className="text-xs whitespace-nowrap">
                    {alert.category}
                  </Badge>
                  <Button variant="outline" size="sm" className="text-xs h-6">
                    Fix
                  </Button>
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <Button size="sm" variant="outline" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            Adjust Budget
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Target className="h-3 w-3 mr-1" />
            Set Alert
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}