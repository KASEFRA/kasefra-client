"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { useState } from "react"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  BarChart3,
  LineChart as LineChartIcon
} from "lucide-react"
import { mockFinancialData } from "@/lib/mock-data"

interface CashFlowData {
  month: string
  income: number
  expenses: number
  netCashFlow: number
  cumulativeCashFlow: number
  categories: {
    fixedExpenses: number
    variableExpenses: number
    savings: number
    investments: number
  }
}

// Use real mock data from the last 6 months
const mockCashFlowData: CashFlowData[] = mockFinancialData.monthly.data.slice(-6).map((data, index) => {
  const monthNames = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  const fixedExpenses = Math.round(data.expenses * 0.65) // 65% fixed
  const variableExpenses = Math.round(data.expenses * 0.35) // 35% variable
  let cumulativeSum = 0

  return {
    month: monthNames[index],
    income: data.income,
    expenses: data.expenses,
    netCashFlow: data.cashflow,
    cumulativeCashFlow: data.networth,
    categories: {
      fixedExpenses,
      variableExpenses,
      savings: Math.round(data.cashflow * 0.7),
      investments: Math.round(data.cashflow * 0.3)
    }
  }
})

export function CashFlowChart() {
  const [chartType, setChartType] = useState<'flow' | 'cumulative' | 'breakdown'>('flow')

  const currentMonth = mockCashFlowData[mockCashFlowData.length - 1]
  const previousMonth = mockCashFlowData[mockCashFlowData.length - 2]
  const cashFlowChange = currentMonth.netCashFlow - previousMonth.netCashFlow
  const cashFlowChangePercent = ((cashFlowChange / previousMonth.netCashFlow) * 100).toFixed(1)

  const averageCashFlow = mockCashFlowData.reduce((sum, item) => sum + item.netCashFlow, 0) / mockCashFlowData.length
  const isAboveAverage = currentMonth.netCashFlow > averageCashFlow

  const renderFlowChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockCashFlowData}>
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
            name === 'income' ? 'Income' : name === 'expenses' ? 'Expenses' : 'Net Cash Flow'
          ]}
        />
        <Bar dataKey="income" fill="hsl(var(--primary))" name="income" />
        <Bar dataKey="expenses" fill="hsl(var(--accent))" name="expenses" />
        <Bar dataKey="netCashFlow" fill="hsl(var(--secondary))" name="netCashFlow" />
      </BarChart>
    </ResponsiveContainer>
  )

  const renderCumulativeChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={mockCashFlowData}>
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
          formatter={(value) => [`AED ${value.toLocaleString()}`, 'Cumulative Cash Flow']}
        />
        <Area
          type="monotone"
          dataKey="cumulativeCashFlow"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.1}
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  const renderBreakdownChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockCashFlowData}>
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
            name === 'fixedExpenses' ? 'Fixed Expenses' :
            name === 'variableExpenses' ? 'Variable Expenses' :
            name === 'savings' ? 'Savings' : 'Investments'
          ]}
        />
        <Bar dataKey="categories.fixedExpenses" stackId="a" fill="hsl(var(--accent))" />
        <Bar dataKey="categories.variableExpenses" stackId="a" fill="hsl(var(--muted-foreground))" />
        <Bar dataKey="categories.savings" stackId="a" fill="hsl(var(--secondary))" />
        <Bar dataKey="categories.investments" stackId="a" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )

  const getChartInsights = () => {
    switch (chartType) {
      case 'flow':
        return [
          `Average monthly cash flow: AED ${averageCashFlow.toLocaleString()}`,
          `Current month is ${isAboveAverage ? 'above' : 'below'} average by AED ${Math.abs(currentMonth.netCashFlow - averageCashFlow).toLocaleString()}`,
          `Income stability: ${mockCashFlowData.every(m => Math.abs(m.income - 15400) < 300) ? 'Excellent' : 'Variable'}`
        ]
      case 'cumulative':
        return [
          `Total cash flow growth: AED ${(currentMonth.cumulativeCashFlow - mockCashFlowData[0].cumulativeCashFlow).toLocaleString()}`,
          `Monthly growth rate: ${(((currentMonth.cumulativeCashFlow / mockCashFlowData[0].cumulativeCashFlow) ** (1/6) - 1) * 100).toFixed(1)}%`,
          `Projected year-end cash flow: AED ${(currentMonth.cumulativeCashFlow + (averageCashFlow * 11)).toLocaleString()}`
        ]
      case 'breakdown':
        return [
          `Fixed expenses average: ${((currentMonth.categories.fixedExpenses / currentMonth.expenses) * 100).toFixed(0)}% of total expenses`,
          `Savings rate this month: ${((currentMonth.categories.savings / currentMonth.income) * 100).toFixed(0)}%`,
          `Investment allocation: ${((currentMonth.categories.investments / currentMonth.income) * 100).toFixed(0)}% of income`
        ]
      default:
        return []
    }
  }

  return (
    <Card className="bg-card border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Cash Flow Analysis
            </CardTitle>
            <CardDescription>
              {chartType === 'flow' && 'Monthly income vs expenses flow'}
              {chartType === 'cumulative' && 'Cumulative cash flow over time'}
              {chartType === 'breakdown' && 'Expense and savings breakdown'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === 'flow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('flow')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'cumulative' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('cumulative')}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'breakdown' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('breakdown')}
            >
              <Activity className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-primary">
              AED {currentMonth.netCashFlow.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Net Cash Flow</div>
            <div className="flex items-center justify-center gap-1 text-xs mt-1">
              {cashFlowChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-secondary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={cashFlowChange > 0 ? 'text-secondary' : 'text-destructive'}>
                {cashFlowChangePercent}%
              </span>
            </div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-secondary">
              {((currentMonth.netCashFlow / currentMonth.income) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">Cash Flow Ratio</div>
            <div className="text-xs text-secondary mt-1">
              {isAboveAverage ? 'Above Average' : 'Below Average'}
            </div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-accent">
              AED {(currentMonth.cumulativeCashFlow / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Total Assets</div>
            <div className="text-xs text-accent mt-1">6-Month Growth</div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full">
          {chartType === 'flow' && renderFlowChart()}
          {chartType === 'cumulative' && renderCumulativeChart()}
          {chartType === 'breakdown' && renderBreakdownChart()}
        </div>

        {/* Chart Legend for Breakdown */}
        {chartType === 'breakdown' && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { name: 'Fixed Expenses', color: 'hsl(var(--accent))' },
              { name: 'Variable Expenses', color: 'hsl(var(--muted-foreground))' },
              { name: 'Savings', color: 'hsl(var(--secondary))' },
              { name: 'Investments', color: 'hsl(var(--primary))' }
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* AI Insights */}
        <div className="p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Cash Flow Insights</span>
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
      </CardContent>
    </Card>
  )
}