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
  CheckCircle
} from "lucide-react"

interface BudgetCategory {
  id: string
  name: string
  icon: string
  suggested: number
  description: string
  aiRecommendation?: string
}

interface BudgetTemplate {
  id: string
  name: string
  description: string
  categories: BudgetCategory[]
  totalBudget: number
  uaeSpecific: boolean
}

const mockCategories: BudgetCategory[] = [
  {
    id: "food",
    name: "Food & Dining",
    icon: "🍽️",
    suggested: 2000,
    description: "Groceries, restaurants, cafes",
    aiRecommendation: "Based on your spending history, AED 2000 covers your typical dining patterns"
  },
  {
    id: "transport",
    name: "Transportation",
    icon: "🚗",
    suggested: 1200,
    description: "Gas, Metro, Careem, parking",
    aiRecommendation: "UAE residents typically spend 12-15% of income on transportation"
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
    suggested: 1500,
    description: "Clothing, electronics, personal items",
    aiRecommendation: "Your shopping frequency suggests AED 1500 monthly budget"
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "⚡",
    suggested: 600,
    description: "DEWA, internet, phone bills",
    aiRecommendation: "Summer months may require 25% higher allocation for AC costs"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎬",
    suggested: 800,
    description: "Movies, activities, subscriptions",
    aiRecommendation: "Entertainment spending typically increases during UAE seasons"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "⚕️",
    suggested: 400,
    description: "Medical, pharmacy, insurance",
    aiRecommendation: "Conservative allocation for unexpected medical expenses"
  }
]

const mockTemplates: BudgetTemplate[] = [
  {
    id: "standard",
    name: "Standard UAE Resident",
    description: "Balanced budget for typical UAE lifestyle",
    totalBudget: 8500,
    uaeSpecific: true,
    categories: mockCategories
  },
  {
    id: "family",
    name: "Family with Children",
    description: "Budget including education and childcare costs",
    totalBudget: 12000,
    uaeSpecific: true,
    categories: [
      ...mockCategories,
      {
        id: "education",
        name: "Education",
        icon: "🎓",
        suggested: 2500,
        description: "School fees, books, activities"
      },
      {
        id: "childcare",
        name: "Childcare",
        icon: "👶",
        suggested: 1500,
        description: "Nursery, babysitting, child activities"
      }
    ]
  },
  {
    id: "savings",
    name: "High Savings Focus",
    description: "Aggressive savings with reduced discretionary spending",
    totalBudget: 6500,
    uaeSpecific: false,
    categories: mockCategories.map(cat => ({
      ...cat,
      suggested: Math.round(cat.suggested * 0.7)
    }))
  }
]

interface CreateBudgetWizardProps {
  trigger?: React.ReactNode
}

export function CreateBudgetWizard({ trigger }: CreateBudgetWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<BudgetTemplate | null>(null)
  const [budgetName, setBudgetName] = useState("")
  const [totalIncome, setTotalIncome] = useState("")
  const [budgetPeriod, setBudgetPeriod] = useState("monthly")
  const [customCategories, setCustomCategories] = useState<BudgetCategory[]>([])
  const [open, setOpen] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleTemplateSelect = (template: BudgetTemplate) => {
    setSelectedTemplate(template)
    setCustomCategories(template.categories)
  }

  const updateCategoryAmount = (categoryId: string, amount: number) => {
    setCustomCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, suggested: amount } : cat
      )
    )
  }

  const totalBudgetAmount = customCategories.reduce((sum, cat) => sum + cat.suggested, 0)
  const incomeNumber = parseInt(totalIncome) || 0
  const budgetToIncomeRatio = incomeNumber > 0 ? (totalBudgetAmount / incomeNumber) * 100 : 0

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Choose a Budget Template</h3>
              <p className="text-sm text-muted-foreground">
                Start with a pre-built template or create from scratch
              </p>
            </div>

            <div className="grid gap-4">
              {mockTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{template.name}</h4>
                        {template.uaeSpecific && (
                          <Badge size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            UAE
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">AED {template.totalBudget.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{template.categories.length} categories</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-lg border border-dashed border-primary/30 text-center">
                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-primary">Start from Scratch</h4>
                <p className="text-sm text-muted-foreground">Create a custom budget</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Budget Details</h3>
              <p className="text-sm text-muted-foreground">
                Set up your budget name and income information
              </p>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget-name">Budget Name</Label>
                <Input
                  id="budget-name"
                  placeholder="e.g., January 2024 Budget"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total-income">Monthly Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="total-income"
                    type="number"
                    placeholder="15000"
                    className="pl-9"
                    value={totalIncome}
                    onChange={(e) => setTotalIncome(e.target.value)}
                  />
                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">AED</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget-period">Budget Period</Label>
                <Select value={budgetPeriod} onValueChange={setBudgetPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {incomeNumber > 0 && (
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertTitle>AI Insight</AlertTitle>
                  <AlertDescription>
                    Based on your AED {incomeNumber.toLocaleString()} income, the recommended budget allocation is 70-80% for expenses, 20% for savings.
                    Your current template allocates {budgetToIncomeRatio.toFixed(1)}% of your income.
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
              <h3 className="text-lg font-semibold mb-2">Customize Categories</h3>
              <p className="text-sm text-muted-foreground">
                Adjust amounts for each spending category
              </p>
            </div>

            <div className="space-y-4">
              {customCategories.map((category) => (
                <div key={category.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="relative">
                        <Input
                          type="number"
                          value={category.suggested}
                          onChange={(e) => updateCategoryAmount(category.id, parseInt(e.target.value) || 0)}
                          className="w-24 text-right pr-12"
                        />
                        <span className="absolute right-3 top-3 text-xs text-muted-foreground">AED</span>
                      </div>
                    </div>
                  </div>

                  {category.aiRecommendation && (
                    <div className="flex items-start gap-2 p-2 bg-muted/50 rounded text-sm">
                      <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{category.aiRecommendation}</span>
                    </div>
                  )}
                </div>
              ))}

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between font-medium">
                  <span>Total Budget</span>
                  <span>AED {totalBudgetAmount.toLocaleString()}</span>
                </div>
                {incomeNumber > 0 && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {budgetToIncomeRatio.toFixed(1)}% of your income
                  </div>
                )}
              </div>
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
                Review your budget setup before creating
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Budget Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <div className="font-medium">{budgetName || "Untitled Budget"}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Period:</span>
                      <div className="font-medium capitalize">{budgetPeriod}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Budget:</span>
                      <div className="font-medium">AED {totalBudgetAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Categories:</span>
                      <div className="font-medium">{customCategories.length}</div>
                    </div>
                  </div>

                  {incomeNumber > 0 && (
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertTitle>Budget Health Check</AlertTitle>
                      <AlertDescription>
                        Your budget uses {budgetToIncomeRatio.toFixed(1)}% of your income, leaving{' '}
                        {(100 - budgetToIncomeRatio).toFixed(1)}% for savings and unexpected expenses.
                        {budgetToIncomeRatio > 80 ? " Consider reducing some categories." : " Great balance!"}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Top Categories</h4>
                {customCategories
                  .sort((a, b) => b.suggested - a.suggested)
                  .slice(0, 3)
                  .map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium">AED {category.suggested.toLocaleString()}</span>
                    </div>
                  ))}
              </div>
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
            Create Budget
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Create New Budget
          </DialogTitle>
          <DialogDescription>
            Set up a new budget with AI-powered recommendations
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
                    // Handle budget creation
                    console.log('Creating budget:', {
                      name: budgetName,
                      period: budgetPeriod,
                      income: totalIncome,
                      categories: customCategories
                    })
                    setOpen(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Create Budget
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}