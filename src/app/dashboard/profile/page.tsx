"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  PieChart,
  Calendar,
  Award,
  Building,
  Car,
  Wallet,
  CreditCard,
  TrendingUpIcon
} from "lucide-react"
import {
  mockUser,
  mockAccounts,
  mockInvestments,
  mockGoals,
  mockFinancialData
} from "@/lib/mock-data"

export default function ProfilePage() {
  // Calculate financial metrics
  const totalBankBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0)
  const totalInvestments = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalAssets = totalBankBalance + totalInvestments
  const totalLiabilities = mockAccounts
    .filter(acc => acc.type === 'credit')
    .reduce((sum, acc) => sum + Math.abs(Math.min(0, acc.balance)), 0)

  const netWorth = totalAssets - totalLiabilities
  const latestNetWorthData = mockFinancialData.monthly.data[mockFinancialData.monthly.data.length - 1]
  const monthlyIncome = mockUser.financialProfile.monthlyIncome
  const monthlyExpenses = mockUser.financialProfile.monthlyExpenses
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100

  // Investment allocation
  const investmentsByCategory = {
    stocks: mockInvestments.filter(inv => inv.category === 'stocks').reduce((sum, inv) => sum + inv.currentValue, 0),
    crypto: mockInvestments.filter(inv => inv.category === 'crypto').reduce((sum, inv) => sum + inv.currentValue, 0),
    commodity: mockInvestments.filter(inv => inv.category === 'commodity').reduce((sum, inv) => sum + inv.currentValue, 0),
    'real-estate': mockInvestments.filter(inv => inv.category === 'real-estate').reduce((sum, inv) => sum + inv.currentValue, 0)
  }

  // Goals progress
  const totalGoalsValue = mockGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalGoalsProgress = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const goalsCompletionRate = (totalGoalsProgress / totalGoalsValue) * 100

  // Financial health score calculation
  const healthFactors = {
    savingsRate: Math.min(savingsRate / 20, 1) * 25, // 25 points max
    emergencyFund: Math.min(mockUser.financialProfile.emergencyFund / (monthlyExpenses * 6), 1) * 25, // 25 points max
    debtRatio: (1 - Math.min(mockUser.financialProfile.debtRatio / 50, 1)) * 25, // 25 points max
    diversification: Math.min(Object.keys(investmentsByCategory).filter(cat => investmentsByCategory[cat as keyof typeof investmentsByCategory] > 0).length / 4, 1) * 25 // 25 points max
  }
  const financialHealthScore = Math.round(Object.values(healthFactors).reduce((sum, score) => sum + score, 0))

  const formatCurrency = (amount: number, currency: string = 'AED') => {
    return amount.toLocaleString('en-AE', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'stocks': return 'bg-green-500'
      case 'crypto': return 'bg-orange-500'
      case 'commodity': return 'bg-blue-500'
      case 'real-estate': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Profile</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of your financial journey and wealth building progress
        </p>
      </div>

      {/* Hero Section - Financial Identity */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
                <CardDescription className="text-base">
                  Member since {new Date(mockUser.joinedDate).toLocaleDateString('en-AE', { month: 'long', year: 'numeric' })}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">UAE Resident</Badge>
                  <Badge variant="outline">Premium Member</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(netWorth)}</div>
                <div className="text-sm text-muted-foreground">Net Worth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</div>
                <div className="text-sm text-muted-foreground">Monthly Income</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{savingsRate.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Savings Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Financial Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getHealthScoreColor(financialHealthScore)}`}>
                {financialHealthScore}
              </div>
              <div className="text-sm text-muted-foreground mb-4">out of 100</div>
              <Progress value={financialHealthScore} className="h-2" />
              <div className="text-xs text-muted-foreground mt-2">
                {financialHealthScore >= 80 ? 'Excellent' :
                 financialHealthScore >= 60 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Worth & Assets Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5" />
              Assets Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-primary" />
                <span>Bank Accounts</span>
              </div>
              <span className="font-semibold">{formatCurrency(totalBankBalance)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>Investments</span>
              </div>
              <span className="font-semibold">{formatCurrency(totalInvestments)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-purple-600" />
                <span>Real Estate</span>
              </div>
              <span className="font-semibold">{formatCurrency(850000)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                <Car className="h-4 w-4 text-blue-600" />
                <span>Vehicles</span>
              </div>
              <span className="font-semibold">{formatCurrency(120000)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Assets</span>
                <span className="text-green-600">{formatCurrency(totalAssets + 970000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Investment Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(investmentsByCategory).map(([category, value]) => {
              const percentage = (value / totalInvestments) * 100
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`} />
                      <span className="capitalize">{category.replace('-', ' ')}</span>
                    </div>
                    <span>{formatCurrency(value)} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Goals Progress & Financial Milestones */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Financial Goals Progress
            </CardTitle>
            <CardDescription>
              {mockGoals.length} active goals • {goalsCompletionRate.toFixed(1)}% complete
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockGoals.slice(0, 3).map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const isOnTrack = progress >= 50 // Simple heuristic

              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{goal.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                      </div>
                    </div>
                    <Badge variant={isOnTrack ? "default" : "secondary"}>
                      {progress.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Financial Journey Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <Award className="h-4 w-4 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">First 100K Net Worth</div>
                  <div className="text-sm text-green-600">Achieved in March 2023</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-800">Investment Portfolio Diversified</div>
                  <div className="text-sm text-blue-600">4 asset classes, 11 positions</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                <Building className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-800">Real Estate Investment</div>
                  <div className="text-sm text-purple-600">Property portfolio established</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Monthly Cash Flow Analysis
          </CardTitle>
          <CardDescription>
            Income, expenses, and savings breakdown for financial planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(monthlyIncome)}</div>
              <div className="text-sm text-green-700">Monthly Income</div>
              <div className="text-xs text-green-600 mt-1">Salary + Investments</div>
            </div>
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="text-2xl font-bold text-red-600">{formatCurrency(monthlyExpenses)}</div>
              <div className="text-sm text-red-700">Monthly Expenses</div>
              <div className="text-xs text-red-600 mt-1">Living + Discretionary</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(monthlyIncome - monthlyExpenses)}</div>
              <div className="text-sm text-blue-700">Monthly Savings</div>
              <div className="text-xs text-blue-600 mt-1">{savingsRate.toFixed(1)}% savings rate</div>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(mockUser.financialProfile.emergencyFund)}</div>
              <div className="text-sm text-purple-700">Emergency Fund</div>
              <div className="text-xs text-purple-600 mt-1">{(mockUser.financialProfile.emergencyFund / monthlyExpenses).toFixed(1)} months coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}