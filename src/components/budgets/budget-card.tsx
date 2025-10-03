"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  Edit,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
  Zap,
  CheckCircle,
  MoreHorizontal,
  Eye,
  Bell,
  History,
  Copy,
  Download,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BudgetItem {
  id: string
  name: string
  budget: number
  spent: number
  icon: string
  category: string
  lastUpdated: string
  aiInsights?: string[]
  recommendations?: string[]
}

interface BudgetCardProps {
  budget: BudgetItem
  onUpdate?: (id: string, newBudget: number) => void
}

export function BudgetCard({ budget, onUpdate }: BudgetCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editAmount, setEditAmount] = useState(budget.budget.toString())
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const remaining = budget.budget - budget.spent
  const percentage = (budget.spent / budget.budget) * 100
  const isOverBudget = budget.spent > budget.budget
  const isNearLimit = percentage > 80 && !isOverBudget

  const getStatusColor = () => {
    if (isOverBudget) return "destructive"
    if (isNearLimit) return "default"
    if (percentage < 50) return "secondary"
    return "default"
  }

  const getStatusText = () => {
    if (isOverBudget) return "Over Budget"
    if (isNearLimit) return "Near Limit"
    if (percentage < 50) return "On Track"
    return "Good"
  }

  const handleSave = () => {
    const newBudget = parseInt(editAmount) || budget.budget
    if (onUpdate) {
      onUpdate(budget.id, newBudget)
    }
    setIsEditing(false)
  }

  const daysInMonth = 31
  const currentDay = 23
  const dailyBudget = budget.budget / daysInMonth
  const dailySpent = budget.spent / currentDay
  const projectedSpend = dailySpent * daysInMonth

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{budget.icon}</span>
            <div>
              <CardTitle className="text-base font-semibold">{budget.name}</CardTitle>
              <CardDescription className="text-sm">
                {isOverBudget ? (
                  <span className="text-destructive font-medium">
                    AED {Math.abs(remaining).toLocaleString()} over budget
                  </span>
                ) : (
                  <span>AED {remaining.toLocaleString()} remaining</span>
                )}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor()} className="text-xs">
              {Math.round(percentage)}%
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>AED {budget.spent.toLocaleString()}</span>
          <span className="text-muted-foreground">of AED {budget.budget.toLocaleString()}</span>
        </div>

        <Progress value={Math.min(percentage, 100)} className="h-2" />

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {Math.round(percentage)}% used
          </div>
          {projectedSpend > budget.budget && (
            <div className="flex items-center gap-1 text-xs text-destructive">
              <AlertTriangle className="h-3 w-3" />
              <span>Projected overspend</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setShowDetailsDialog(true)}
          >
            Details
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">

              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Budget
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Set Alert
              </DropdownMenuItem>
              <DropdownMenuItem>
                <History className="mr-2 h-4 w-4" />
                View History
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Budget
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">{budget.icon}</span>
              {budget.name}
            </DialogTitle>
            <DialogDescription>
              Manage your {budget.category.toLowerCase()} budget
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Budget Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="budget-amount">Monthly Budget</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="budget-amount"
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                      AED
                    </span>
                  </div>
                  <Button size="sm" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              ) : (
                <div className="text-2xl font-bold text-primary">
                  AED {budget.budget.toLocaleString()}
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Spent: AED {budget.spent.toLocaleString()}</span>
                <Badge variant={getStatusColor()} className="text-xs">
                  {getStatusText()}
                </Badge>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.round(percentage)}% used</span>
                <span>
                  {remaining > 0
                    ? `AED ${remaining.toLocaleString()} left`
                    : `AED ${Math.abs(remaining).toLocaleString()} over`
                  }
                </span>
              </div>
            </div>

            {/* AI Insights */}
            <div className="p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">AI Insights</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Daily average:</span>
                  <span className="font-medium">AED {Math.round(dailySpent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Projected month-end:</span>
                  <span className={`font-medium ${projectedSpend > budget.budget ? 'text-destructive' : 'text-secondary'}`}>
                    AED {Math.round(projectedSpend).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Recommended daily limit:</span>
                  <span className="font-medium">AED {Math.round(dailyBudget)}</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            {budget.recommendations && budget.recommendations.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recommendations
                </h4>
                <div className="space-y-2">
                  {budget.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Target className="h-3 w-3 mr-1" />
                Set Alert
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Calendar className="h-3 w-3 mr-1" />
                View History
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}