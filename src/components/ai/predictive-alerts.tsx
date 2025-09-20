"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Calendar,
  DollarSign,
  Zap,
  Sun,
  BookOpen
} from "lucide-react"

interface PredictiveAlert {
  id: string
  type: 'budget-overspend' | 'goal-delay' | 'seasonal-spike' | 'cash-flow' | 'opportunity'
  severity: 'info' | 'warning' | 'critical'
  title: string
  message: string
  prediction: string
  amount?: number
  timeframe: string
  confidence: number
  category: string
  isUAESpecific: boolean
  actions: string[]
}

const mockPredictiveAlerts: PredictiveAlert[] = [
  {
    id: "alert-1",
    type: "budget-overspend",
    severity: "warning",
    title: "Dining Budget Alert",
    message: "You're likely to exceed your dining budget by AED 300 this month",
    prediction: "Based on your current spending pattern (AED 41.50/day), you'll spend AED 1,285 vs budgeted AED 1,000",
    amount: 300,
    timeframe: "Next 15 days",
    confidence: 0.87,
    category: "Food & Dining",
    isUAESpecific: false,
    actions: ["Adjust Budget", "View Alternatives", "Set Daily Limit"]
  },
  {
    id: "alert-2",
    type: "seasonal-spike",
    severity: "info",
    title: "Summer DEWA Bill Prediction",
    message: "Your electricity bill will likely increase by 60% next month",
    prediction: "Based on UAE summer patterns and your cooling usage, expect AED 420 vs usual AED 260",
    amount: 160,
    timeframe: "June-September",
    confidence: 0.94,
    category: "Utilities",
    isUAESpecific: true,
    actions: ["Energy Tips", "Budget Adjustment", "AC Optimization"]
  },
  {
    id: "alert-3",
    type: "goal-delay",
    severity: "warning",
    title: "Hajj Savings Behind Schedule",
    message: "Your Hajj goal may be delayed by 4 months at current savings rate",
    prediction: "You're saving AED 800/month but need AED 1,300/month to reach AED 20,000 by target date",
    amount: 500,
    timeframe: "Next 6 months",
    confidence: 0.91,
    category: "Goals",
    isUAESpecific: true,
    actions: ["Increase Savings", "Extend Timeline", "Islamic Investment"]
  },
  {
    id: "alert-4",
    type: "cash-flow",
    severity: "critical",
    title: "School Fees Cash Flow Alert",
    message: "Potential AED 5,000 shortfall for September school fees",
    prediction: "Based on current spending and income patterns, insufficient funds for annual school fee payment",
    amount: 5000,
    timeframe: "September 2024",
    confidence: 0.82,
    category: "Education",
    isUAESpecific: true,
    actions: ["Payment Plan", "Emergency Fund", "Reduce Spending"]
  },
  {
    id: "alert-5",
    type: "seasonal-spike",
    severity: "info",
    title: "Ramadan Spending Forecast",
    message: "Expect 35% increase in food and charity expenses during Ramadan",
    prediction: "Historical data shows AED 1,200 extra spending on Iftar groceries, gifts, and Zakat al-Fitr",
    amount: 1200,
    timeframe: "Ramadan 2024",
    confidence: 0.89,
    category: "Seasonal",
    isUAESpecific: true,
    actions: ["Ramadan Budget", "Charity Tracker", "Meal Planning"]
  },
  {
    id: "alert-6",
    type: "opportunity",
    severity: "info",
    title: "Investment Opportunity Window",
    message: "You have AED 3,500 excess savings ready for investment",
    prediction: "Your emergency fund is sufficient, and cash flow allows for additional AED 1,500/month investment",
    amount: 3500,
    timeframe: "Available now",
    confidence: 0.85,
    category: "Investment",
    isUAESpecific: false,
    actions: ["Sukuk Options", "Equity Funds", "Conservative Plan"]
  }
]

export function PredictiveAlerts() {
  const [alerts, setAlerts] = useState<PredictiveAlert[]>(mockPredictiveAlerts)
  const [showAll, setShowAll] = useState(false)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'warning': return <TrendingUp className="h-4 w-4 text-yellow-600" />
      case 'info': return <Info className="h-4 w-4 text-primary" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive'
      case 'warning': return 'default'
      case 'info': return 'secondary'
      default: return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'budget-overspend': return <DollarSign className="h-4 w-4" />
      case 'seasonal-spike': return <Sun className="h-4 w-4" />
      case 'goal-delay': return <TrendingDown className="h-4 w-4" />
      case 'cash-flow': return <Calendar className="h-4 w-4" />
      case 'opportunity': return <Zap className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const visibleAlerts = showAll ? alerts : alerts.slice(0, 3)
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length
  const warningAlerts = alerts.filter(alert => alert.severity === 'warning').length

  return (
    <Card className="premium-card hover-lift border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="icon-container bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg font-bold">Predictive Insights</CardTitle>
            {criticalAlerts > 0 && (
              <Badge variant="destructive" className="text-xs">
                {criticalAlerts} Critical
              </Badge>
            )}
            {warningAlerts > 0 && (
              <Badge variant="default" className="text-xs">
                {warningAlerts} Warning
              </Badge>
            )}
          </div>
          {alerts.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `View All (${alerts.length})`}
            </Button>
          )}
        </div>
        <CardDescription className="text-base">
          AI-powered financial predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {visibleAlerts.map((alert) => (
            <Alert key={alert.id} variant={getSeverityColor(alert.severity) as any}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center gap-2 mt-0.5">
                    {getSeverityIcon(alert.severity)}
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTitle className="text-sm font-semibold">
                        {alert.title}
                      </AlertTitle>
                      {alert.isUAESpecific && (
                        <Badge size="sm" className="bg-primary/10 text-primary hover:bg-primary/10">
                          UAE
                        </Badge>
                      )}
                      <Badge size="sm" variant="outline">
                        {Math.round(alert.confidence * 100)}% confident
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm">
                      <div className="space-y-1">
                        <p><strong>{alert.message}</strong></p>
                        <p className="text-muted-foreground">{alert.prediction}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>📅 {alert.timeframe}</span>
                          <span>📊 {alert.category}</span>
                          {alert.amount && (
                            <span className="font-medium">
                              {alert.type === 'opportunity' ? '+' : ''}AED {alert.amount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </AlertDescription>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {alert.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 ml-2"
                  onClick={() => dismissAlert(alert.id)}
                >
                  ×
                </Button>
              </div>
            </Alert>
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No predictive alerts at this time</p>
            <p className="text-sm">Your finances are on track!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}