"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Target,
  Plus,
  ChevronRight,
  ChevronLeft,
  Zap,
  DollarSign,
  Calendar,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Calculator
} from "lucide-react"

interface GoalTemplate {
  id: string
  name: string
  type: 'savings' | 'debt' | 'purchase'
  targetAmount: number
  timeframe: number // months
  category: string
  icon: string
  description: string
  isUAESpecific: boolean
  uaeCategory?: string
  aiRecommendation: string
}

const uaeGoalTemplates: GoalTemplate[] = [
  {
    id: "hajj",
    name: "Hajj Pilgrimage Fund",
    type: "savings",
    targetAmount: 20000,
    timeframe: 18,
    category: "Religious",
    icon: "🕋",
    description: "Save for the sacred journey to Mecca",
    isUAESpecific: true,
    uaeCategory: "hajj",
    aiRecommendation: "Hajj costs average AED 18,000-22,000 from UAE. Consider inflation at 3% annually."
  },
  {
    id: "property",
    name: "Dubai Property Down Payment",
    type: "purchase",
    targetAmount: 300000,
    timeframe: 36,
    category: "Real Estate",
    icon: "🏠",
    description: "Down payment for Dubai property investment",
    isUAESpecific: true,
    uaeCategory: "property",
    aiRecommendation: "Dubai property requires 20-25% down payment. Market appreciation averages 5% annually."
  },
  {
    id: "education",
    name: "Children's University Fund",
    type: "savings",
    targetAmount: 150000,
    timeframe: 60,
    category: "Education",
    icon: "🎓",
    description: "Higher education fund for your children",
    isUAESpecific: true,
    uaeCategory: "education",
    aiRecommendation: "UAE university costs range AED 40,000-80,000 annually. International universities cost more."
  },
  {
    id: "wedding",
    name: "Traditional Wedding",
    type: "purchase",
    targetAmount: 80000,
    timeframe: 12,
    category: "Personal",
    icon: "💍",
    description: "Celebrate your special day in style",
    isUAESpecific: true,
    uaeCategory: "wedding",
    aiRecommendation: "UAE wedding costs vary by venue and season. Peak season (Oct-Apr) costs 20% more."
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    type: "savings",
    targetAmount: 35000,
    timeframe: 12,
    category: "Emergency",
    icon: "🛡️",
    description: "6 months of living expenses for security",
    isUAESpecific: false,
    aiRecommendation: "UAE residents should maintain higher emergency funds due to visa requirements."
  },
  {
    id: "vacation",
    name: "Family Vacation",
    type: "purchase",
    targetAmount: 15000,
    timeframe: 8,
    category: "Travel",
    icon: "✈️",
    description: "Create memories with your loved ones",
    isUAESpecific: false,
    aiRecommendation: "Family vacation costs depend on destination. European trips average AED 12,000-18,000."
  }
]

interface CreateGoalFormProps {
  trigger?: React.ReactNode
}

export function CreateGoalForm({ trigger }: CreateGoalFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null)
  const [customGoal, setCustomGoal] = useState({
    name: "",
    type: "savings" as const,
    targetAmount: "",
    targetDate: "",
    monthlyIncome: "",
    currentSavings: ""
  })
  const [open, setOpen] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const calculateAI = () => {
    const target = selectedTemplate?.targetAmount || parseInt(customGoal.targetAmount) || 0
    const current = parseInt(customGoal.currentSavings) || 0
    const income = parseInt(customGoal.monthlyIncome) || 0
    const remaining = target - current

    // AI calculations
    const recommendedSavingsRate = 0.2 // 20% of income
    const maxMonthlySavings = income * recommendedSavingsRate
    const monthsToTarget = remaining > 0 ? Math.ceil(remaining / maxMonthlySavings) : 0
    const targetDate = new Date()
    targetDate.setMonth(targetDate.getMonth() + monthsToTarget)

    return {
      recommendedMonthly: Math.round(maxMonthlySavings),
      monthsToTarget,
      projectedDate: targetDate.toLocaleDateString('en-AE'),
      successProbability: income > 0 ? Math.min(95, 60 + (income / 1000) * 2) : 70
    }
  }

  const aiCalculations = calculateAI()

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Choose Your Goal</h3>
              <p className="text-sm text-muted-foreground">
                Start with a UAE-specific template or create a custom goal
              </p>
            </div>

            <div className="grid gap-3">
              {uaeGoalTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{template.name}</h4>
                          {template.isUAESpecific && (
                            <Badge size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                              UAE
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>AED {template.targetAmount.toLocaleString()}</span>
                          <span>•</span>
                          <span>{template.timeframe} months</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-lg border border-dashed border-primary/30 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-primary">Custom Goal</h4>
                <p className="text-sm text-muted-foreground">Create your own financial objective</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Goal Details</h3>
              <p className="text-sm text-muted-foreground">
                Customize your goal parameters
              </p>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder={selectedTemplate?.name || "My Financial Goal"}
                  value={customGoal.name}
                  onChange={(e) => setCustomGoal(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-type">Goal Type</Label>
                  <Select value={customGoal.type} onValueChange={(value: any) => setCustomGoal(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="debt">Debt Payoff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Date</Label>
                  <Input
                    id="target-date"
                    type="date"
                    value={customGoal.targetDate}
                    onChange={(e) => setCustomGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder={selectedTemplate?.targetAmount.toString() || "50000"}
                    className="pl-9"
                    value={customGoal.targetAmount}
                    onChange={(e) => setCustomGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  />
                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">AED</span>
                </div>
              </div>

              {selectedTemplate?.aiRecommendation && (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>AI Insight</AlertTitle>
                  <AlertDescription className="text-sm">
                    {selectedTemplate.aiRecommendation}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Financial Profile</h3>
              <p className="text-sm text-muted-foreground">
                Help AI calculate your optimal contribution plan
              </p>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-income">Monthly Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthly-income"
                    type="number"
                    placeholder="15000"
                    className="pl-9"
                    value={customGoal.monthlyIncome}
                    onChange={(e) => setCustomGoal(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                  />
                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">AED</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-savings">Current Savings (for this goal)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-savings"
                    type="number"
                    placeholder="0"
                    className="pl-9"
                    value={customGoal.currentSavings}
                    onChange={(e) => setCustomGoal(prev => ({ ...prev, currentSavings: e.target.value }))}
                  />
                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">AED</span>
                </div>
              </div>

              {parseInt(customGoal.monthlyIncome) > 0 && (
                <Alert>
                  <Calculator className="h-4 w-4" />
                  <AlertTitle>AI Calculation</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Recommended monthly saving:</span>
                        <span className="font-medium">AED {aiCalculations.recommendedMonthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projected completion:</span>
                        <span className="font-medium">{aiCalculations.projectedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success probability:</span>
                        <span className="font-medium">{aiCalculations.successProbability}%</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Review & Create</h3>
              <p className="text-sm text-muted-foreground">
                Review your goal setup before creating
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-xl">{selectedTemplate?.icon || "🎯"}</span>
                    Goal Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <div className="font-medium">{customGoal.name || selectedTemplate?.name}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <div className="font-medium capitalize">{customGoal.type}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Amount:</span>
                      <div className="font-medium">AED {(parseInt(customGoal.targetAmount) || selectedTemplate?.targetAmount || 0).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Date:</span>
                      <div className="font-medium">{customGoal.targetDate || 'To be calculated'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>AI Optimization Plan</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly contribution needed:</span>
                      <span className="font-medium">AED {aiCalculations.recommendedMonthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time to complete:</span>
                      <span className="font-medium">{aiCalculations.monthsToTarget} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success probability:</span>
                      <span className={`font-medium ${aiCalculations.successProbability >= 80 ? 'text-secondary' : aiCalculations.successProbability >= 60 ? 'text-accent' : 'text-destructive'}`}>
                        {aiCalculations.successProbability}%
                      </span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Goal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Create New Goal
          </DialogTitle>
          <DialogDescription>
            Set up a new financial goal with AI-powered recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={currentStep === 1 && !selectedTemplate}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    console.log('Creating goal:', {
                      template: selectedTemplate,
                      custom: customGoal,
                      ai: aiCalculations
                    })
                    setOpen(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Create Goal
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}