"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  PieChart as PieChartIcon,
  Calendar,
  ChevronDown
} from "lucide-react"

interface BudgetData {
  category: string
  budget: number
  spent: number
  remaining: number
  percentage: number
  icon: string
}

const mockBudgetData: BudgetData[] = [
  {
    category: "Food & Dining",
    budget: 2000,
    spent: 1850,
    remaining: 150,
    percentage: 93,
    icon: "🍽️"
  },
  {
    category: "Transportation",
    budget: 1200,
    spent: 980,
    remaining: 220,
    percentage: 82,
    icon: "🚗"
  },
  {
    category: "Shopping",
    budget: 1500,
    spent: 890,
    remaining: 610,
    percentage: 59,
    icon: "🛍️"
  },
  {
    category: "Utilities",
    budget: 600,
    spent: 450,
    remaining: 150,
    percentage: 75,
    icon: "⚡"
  },
  {
    category: "Entertainment",
    budget: 800,
    spent: 320,
    remaining: 480,
    percentage: 40,
    icon: "🎬"
  },
  {
    category: "Healthcare",
    budget: 400,
    spent: 180,
    remaining: 220,
    percentage: 45,
    icon: "⚕️"
  }
]

const monthlyTrend = [
  { month: 'Aug', budget: 8200, spent: 7850, saved: 350 },
  { month: 'Sep', budget: 8300, spent: 8100, saved: 200 },
  { month: 'Oct', budget: 8400, spent: 7950, saved: 450 },
  { month: 'Nov', budget: 8450, spent: 8200, saved: 250 },
  { month: 'Dec', budget: 8500, spent: 8350, saved: 150 },
  { month: 'Jan', budget: 8450, spent: 6230, saved: 2220 }
]

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))', 'hsl(var(--border))']

export function BudgetChart() {
  const [chartType, setChartType] = useState<'bar' | 'trend' | 'pie'>('bar')

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockBudgetData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="category"
          className="text-xs fill-muted-foreground"
          tick={{ fontSize: 12 }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name) => [
            `AED ${value.toLocaleString()}`,
            name === 'budget' ? 'Budget' : name === 'spent' ? 'Spent' : 'Remaining'
          ]}
        />
        <Bar dataKey="budget" fill="hsl(var(--muted))" name="budget" />
        <Bar dataKey="spent" fill="hsl(var(--primary))" name="spent" />
      </BarChart>
    </ResponsiveContainer>
  )

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyTrend}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs fill-muted-foreground"
        />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name) => [
            `AED ${value.toLocaleString()}`,
            name === 'budget' ? 'Budget' : name === 'spent' ? 'Spent' : 'Saved'
          ]}
        />
        <Line
          type="monotone"
          dataKey="budget"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="budget"
        />
        <Line
          type="monotone"
          dataKey="spent"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          name="spent"
        />
        <Line
          type="monotone"
          dataKey="saved"
          stroke="hsl(var(--secondary))"
          strokeWidth={2}
          name="saved"
        />
      </LineChart>
    </ResponsiveContainer>
  )

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={mockBudgetData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="spent"
        >
          {mockBudgetData.map((entry, index) => (
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
          formatter={(value) => [`AED ${value.toLocaleString()}`, 'Spent']}
        />
      </PieChart>
    </ResponsiveContainer>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {chartType === 'bar' && <BarChart3 className="h-5 w-5 text-primary" />}
              {chartType === 'trend' && <TrendingUp className="h-5 w-5 text-primary" />}
              {chartType === 'pie' && <PieChartIcon className="h-5 w-5 text-primary" />}
              Budget Analytics
            </CardTitle>
            <CardDescription>
              {chartType === 'bar' && 'Budget vs actual spending by category'}
              {chartType === 'trend' && 'Monthly spending trends and savings'}
              {chartType === 'pie' && 'Spending distribution across categories'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'trend' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('trend')}
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="w-full">
            {chartType === 'bar' && renderBarChart()}
            {chartType === 'trend' && renderTrendChart()}
            {chartType === 'pie' && renderPieChart()}
          </div>

          {/* Chart Legend/Summary */}
          {chartType === 'pie' && (
            <div className="grid grid-cols-2 gap-2">
              {mockBudgetData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs">{item.category}</span>
                </div>
              ))}
            </div>
          )}

          {/* AI Insights */}
          <div className="p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">AI Insights</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              {chartType === 'bar' && (
                <>
                  <p>• Food & Dining is 93% of budget - highest risk category</p>
                  <p>• Entertainment has AED 480 unused - consider reallocation</p>
                  <p>• Transportation spending is optimal at 82% of budget</p>
                </>
              )}
              {chartType === 'trend' && (
                <>
                  <p>• January shows significant savings increase (+88% vs December)</p>
                  <p>• Spending pattern suggests good budget control this month</p>
                  <p>• Projected to save AED 2,220 if current pace continues</p>
                </>
              )}
              {chartType === 'pie' && (
                <>
                  <p>• Food & Dining represents 30% of total spending</p>
                  <p>• Transportation and Shopping are balanced at 16% and 14%</p>
                  <p>• Healthcare spending is efficiently low at 3%</p>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}