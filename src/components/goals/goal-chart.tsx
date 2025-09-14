"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from 'recharts'
import { useState } from "react"
import {
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  Target,
  Calendar
} from "lucide-react"

interface Goal {
  id: string
  name: string
  type: 'savings' | 'debt' | 'purchase'
  targetAmount: number
  currentAmount: number
  targetDate: string
  currency: string
  category: string
  icon: string
  isUAESpecific: boolean
  uaeCategory?: string
  monthlyContribution: number
  aiPredictions: {
    successProbability: number
    projectedCompletionDate: string
    recommendedMonthlyAmount: number
    monthsAhead: number
  }
  insights: string[]
}

interface GoalChartProps {
  goals: Goal[]
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--destructive))'
]

export function GoalChart({ goals }: GoalChartProps) {
  const [chartType, setChartType] = useState<'progress' | 'timeline' | 'distribution'>('progress')

  // Progress data for bar chart
  const progressData = goals.map(goal => ({
    name: goal.name.length > 15 ? goal.name.substring(0, 15) + '...' : goal.name,
    fullName: goal.name,
    current: goal.currentAmount,
    target: goal.targetAmount,
    progress: (goal.currentAmount / goal.targetAmount) * 100,
    icon: goal.icon
  }))

  // Distribution data for pie chart
  const distributionData = goals.map(goal => ({
    name: goal.name,
    value: goal.currentAmount,
    category: goal.category,
    icon: goal.icon
  }))

  // Timeline data for line chart
  const timelineData = goals.map((goal, index) => {
    const monthsToTarget = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))
    return {
      name: goal.name.length > 10 ? goal.name.substring(0, 10) + '...' : goal.name,
      fullName: goal.name,
      monthsLeft: Math.max(0, monthsToTarget),
      progress: (goal.currentAmount / goal.targetAmount) * 100,
      successRate: goal.aiPredictions.successProbability * 100
    }
  }).sort((a, b) => a.monthsLeft - b.monthsLeft)

  const renderProgressChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={progressData} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis type="number" className="text-xs fill-muted-foreground" />
        <YAxis
          dataKey="name"
          type="category"
          width={80}
          className="text-xs fill-muted-foreground"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name, props) => [
            name === 'current' ? `AED ${value.toLocaleString()} (Current)` : `AED ${value.toLocaleString()} (Target)`,
            props.payload.fullName
          ]}
        />
        <Bar dataKey="current" fill="hsl(var(--primary))" name="current" />
        <Bar dataKey="target" fill="hsl(var(--muted))" name="target" />
      </BarChart>
    </ResponsiveContainer>
  )

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={distributionData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {distributionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value) => [`AED ${value.toLocaleString()}`, 'Current Amount']}
        />
      </PieChart>
    </ResponsiveContainer>
  )

  const renderTimelineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={timelineData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          className="text-xs fill-muted-foreground"
        />
        <YAxis
          yAxisId="progress"
          className="text-xs fill-muted-foreground"
          label={{ value: 'Progress %', angle: -90, position: 'insideLeft' }}
        />
        <YAxis
          yAxisId="months"
          orientation="right"
          className="text-xs fill-muted-foreground"
          label={{ value: 'Months Left', angle: 90, position: 'insideRight' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name, props) => [
            name === 'progress' ? `${value.toFixed(1)}% Complete` :
            name === 'monthsLeft' ? `${value} Months Left` :
            `${value}% Success Rate`,
            props.payload.fullName
          ]}
        />
        <Line
          yAxisId="progress"
          type="monotone"
          dataKey="progress"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          name="progress"
        />
        <Line
          yAxisId="months"
          type="monotone"
          dataKey="monthsLeft"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="monthsLeft"
        />
        <Line
          yAxisId="progress"
          type="monotone"
          dataKey="successRate"
          stroke="hsl(var(--accent))"
          strokeWidth={2}
          name="successRate"
        />
      </LineChart>
    </ResponsiveContainer>
  )

  const getChartInsights = () => {
    switch (chartType) {
      case 'progress':
        const avgProgress = progressData.reduce((sum, goal) => sum + goal.progress, 0) / progressData.length
        const bestPerforming = progressData.reduce((best, current) =>
          current.progress > best.progress ? current : best
        )
        return [
          `Average progress across all goals: ${avgProgress.toFixed(1)}%`,
          `Best performing goal: ${bestPerforming.fullName} (${bestPerforming.progress.toFixed(1)}%)`,
          `Total saved: AED ${progressData.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}`
        ]

      case 'distribution':
        const totalSaved = distributionData.reduce((sum, goal) => sum + goal.value, 0)
        const largestGoal = distributionData.reduce((largest, current) =>
          current.value > largest.value ? current : largest
        )
        const percentage = ((largestGoal.value / totalSaved) * 100).toFixed(1)
        return [
          `${largestGoal.name} represents ${percentage}% of total savings`,
          `Most diverse category: ${largestGoal.category}`,
          `Total portfolio value: AED ${totalSaved.toLocaleString()}`
        ]

      case 'timeline':
        const nearestDeadline = timelineData.filter(g => g.monthsLeft > 0)[0]
        const mostLikely = timelineData.reduce((best, current) =>
          current.successRate > best.successRate ? current : best
        )
        return [
          nearestDeadline ? `Next deadline: ${nearestDeadline.fullName} in ${nearestDeadline.monthsLeft} months` : 'No upcoming deadlines',
          `Highest success probability: ${mostLikely.fullName} (${mostLikely.successRate}%)`,
          `Average completion timeline: ${(timelineData.reduce((sum, g) => sum + g.monthsLeft, 0) / timelineData.length).toFixed(1)} months`
        ]

      default:
        return []
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {chartType === 'progress' && <BarChart3 className="h-5 w-5 text-primary" />}
              {chartType === 'distribution' && <PieChartIcon className="h-5 w-5 text-primary" />}
              {chartType === 'timeline' && <TrendingUp className="h-5 w-5 text-primary" />}
              Goal Analytics
            </CardTitle>
            <CardDescription>
              {chartType === 'progress' && 'Current vs target amounts'}
              {chartType === 'distribution' && 'Savings distribution breakdown'}
              {chartType === 'timeline' && 'Timeline and success predictions'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === 'progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('progress')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'distribution' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('distribution')}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'timeline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('timeline')}
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="w-full">
            {chartType === 'progress' && renderProgressChart()}
            {chartType === 'distribution' && renderDistributionChart()}
            {chartType === 'timeline' && renderTimelineChart()}
          </div>

          {/* Chart Legend for Distribution */}
          {chartType === 'distribution' && (
            <div className="grid grid-cols-1 gap-2">
              {distributionData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-3 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="flex items-center gap-1">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="ml-auto font-medium">
                    AED {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* AI Insights */}
          <div className="p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Chart Insights</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              {getChartInsights().map((insight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}