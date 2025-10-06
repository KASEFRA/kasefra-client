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

const COLORS = [
  'hsl(var(--chart-1))',  // Primary purple - vibrant in both modes
  'hsl(var(--chart-2))',  // Success green - visible in both modes
  'hsl(var(--chart-3))',  // Warning amber - clear in both modes
  'hsl(var(--chart-4))',  // Destructive red - strong in both modes
  'hsl(var(--chart-5))',  // Muted grey - softer contrast
  'hsl(var(--primary))'   // Fallback to primary purple
]

export function BudgetChart() {
  const [chartType, setChartType] = useState<'bar' | 'trend' | 'pie'>('bar')

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={mockBudgetData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={70}
        />
        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px'
          }}
          labelStyle={{
            color: 'hsl(var(--popover-foreground))',
            fontSize: '11px',
            fontWeight: '600',
            marginBottom: '4px'
          }}
          itemStyle={{
            color: 'hsl(var(--popover-foreground))',
            fontSize: '11px',
            padding: '2px 0'
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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={monthlyTrend}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px'
          }}
          labelStyle={{
            color: 'hsl(var(--popover-foreground))',
            fontSize: '11px',
            fontWeight: '600',
            marginBottom: '4px'
          }}
          itemStyle={{
            color: 'hsl(var(--popover-foreground))',
            fontSize: '11px',
            padding: '2px 0'
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
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={mockBudgetData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={2}
          dataKey="spent"
        >
          {mockBudgetData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px'
          }}
          labelStyle={{
            color: 'hsl(var(--popover-foreground))',
            fontSize: '11px',
            fontWeight: '600',
            marginBottom: '4px'
          }}
          itemStyle={{
            color: 'hsl(var(--popover-foreground))',
            fontSize: '11px',
            padding: '2px 0'
          }}
          formatter={(value) => [`AED ${value.toLocaleString()}`, 'Spent']}
        />
      </PieChart>
    </ResponsiveContainer>
  )

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              {chartType === 'bar' && <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />}
              {chartType === 'trend' && <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />}
              {chartType === 'pie' && <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />}
              <span className="truncate">Budget Analytics</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {chartType === 'bar' && 'Budget vs actual spending'}
              {chartType === 'trend' && 'Monthly trends'}
              {chartType === 'pie' && 'Spending distribution'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="h-7 sm:h-8 px-2 sm:px-3"
            >
              <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={chartType === 'trend' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('trend')}
              className="h-7 sm:h-8 px-2 sm:px-3"
            >
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={chartType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('pie')}
              className="h-7 sm:h-8 px-2 sm:px-3"
            >
              <PieChartIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Chart */}
          <div className="w-full h-[250px] sm:h-[300px]">
            {chartType === 'bar' && renderBarChart()}
            {chartType === 'trend' && renderTrendChart()}
            {chartType === 'pie' && renderPieChart()}
          </div>

          {/* Chart Legend/Summary */}
          {chartType === 'pie' && (
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {mockBudgetData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-[10px] sm:text-xs text-foreground truncate">{item.category}</span>
                </div>
              ))}
            </div>
          )}

          {/* AI Insights */}
          <div className="p-2 sm:p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="font-medium text-xs sm:text-sm">AI Insights</span>
            </div>
            <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs text-muted-foreground">
              {chartType === 'bar' && (
                <>
                  <p>• Food & Dining is 93% of budget - highest risk</p>
                  <p>• Entertainment has AED 480 unused</p>
                  <p>• Transportation spending is optimal at 82%</p>
                </>
              )}
              {chartType === 'trend' && (
                <>
                  <p>• January shows significant savings increase</p>
                  <p>• Spending pattern suggests good control</p>
                  <p>• Projected to save AED 2,220</p>
                </>
              )}
              {chartType === 'pie' && (
                <>
                  <p>• Food & Dining represents 30% of spending</p>
                  <p>• Transportation and Shopping balanced</p>
                  <p>• Healthcare spending efficiently low at 3%</p>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}