"use client"

import * as React from "react"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { TrendingUp, TrendingDown } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { mockFinancialData, type DataType } from "@/lib/mock-data"

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly'

interface NetWorthChartProps {
  className?: string
}

// Chart configuration for different data types
const chartConfig = {
  networth: {
    label: "Net Worth",
    color: "var(--chart-1)",
  },
  spending: {
    label: "Spending",
    color: "var(--chart-2)",
  },
  income: {
    label: "Income",
    color: "var(--chart-3)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-4)",
  },
  cashflow: {
    label: "Cash Flow",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function NetWorthChart({ className }: NetWorthChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('monthly')
  const [selectedDataType, setSelectedDataType] = useState<DataType>('networth')

  const currentData = mockFinancialData[selectedPeriod]

  // Map data types to chart color variables
  const getChartColorVar = (dataType: DataType) => {
    switch (dataType) {
      case 'networth': return 'hsl(var(--chart-1))'
      case 'spending': return 'hsl(var(--chart-2))'
      case 'income': return 'hsl(var(--chart-3))'
      case 'expenses': return 'hsl(var(--chart-4))'
      case 'cashflow': return 'hsl(var(--chart-5))'
      default: return 'hsl(var(--chart-1))'
    }
  }

  // Get current value based on selected data type
  const getCurrentValue = () => {
    const latestData = currentData.data[currentData.data.length - 1]
    switch (selectedDataType) {
      case 'networth': return latestData.networth
      case 'spending': return latestData.spending
      case 'income': return latestData.income
      case 'expenses': return latestData.expenses
      case 'cashflow': return latestData.cashflow
      default: return latestData.networth
    }
  }

  const getCurrentChange = () => {
    if (currentData.data.length < 2) return { change: 0, changePercent: 0 }

    const latest = currentData.data[currentData.data.length - 1]
    const previous = currentData.data[currentData.data.length - 2]

    let currentVal, previousVal

    switch (selectedDataType) {
      case 'networth':
        currentVal = latest.networth
        previousVal = previous.networth
        break
      case 'spending':
        currentVal = latest.spending
        previousVal = previous.spending
        break
      case 'income':
        currentVal = latest.income
        previousVal = previous.income
        break
      case 'expenses':
        currentVal = latest.expenses
        previousVal = previous.expenses
        break
      case 'cashflow':
        currentVal = latest.cashflow
        previousVal = previous.cashflow
        break
      default:
        currentVal = latest.networth
        previousVal = previous.networth
    }

    const change = currentVal - previousVal
    const changePercent = (change / previousVal) * 100

    return { change, changePercent }
  }

  const currentValue = getCurrentValue()
  const { change, changePercent } = getCurrentChange()
  const isPositiveChange = change >= 0

  const getDataTypeLabel = (type: DataType) => {
    switch (type) {
      case 'networth': return 'Net Worth'
      case 'spending': return 'Spending'
      case 'income': return 'Income'
      case 'expenses': return 'Expenses'
      case 'cashflow': return 'Cash Flow'
      case 'all': return 'All Metrics'
      default: return 'Net Worth'
    }
  }

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    switch (selectedPeriod) {
      case 'daily':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      case 'weekly':
        return `Week ${Math.ceil(date.getDate() / 7)}`
      case 'monthly':
        return date.toLocaleDateString('en-US', { month: 'short' })
      case 'yearly':
        return date.getFullYear().toString()
      default:
        return dateStr
    }
  }

  const renderChart = () => {
    if (selectedDataType === 'all') {
      // Multi-line chart for all metrics
      return (
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] sm:h-[300px] w-full">
          <LineChart data={currentData.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatDate}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatDate(value)}
                  formatter={(value, name) => [
                    `AED ${Number(value).toLocaleString()}`,
                    chartConfig[name as keyof typeof chartConfig]?.label || name
                  ]}
                />
              }
            />
            <Line
              dataKey="networth"
              type="monotone"
              stroke={getChartColorVar('networth')}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke={getChartColorVar('income')}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expenses"
              type="monotone"
              stroke={getChartColorVar('expenses')}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="cashflow"
              type="monotone"
              stroke={getChartColorVar('cashflow')}
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      )
    }

    // Single metric area chart
    return (
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] sm:h-[300px] w-full">
        <AreaChart data={currentData.data}>
          <defs>
            <linearGradient id={`fill${selectedDataType}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={getChartColorVar(selectedDataType)}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={getChartColorVar(selectedDataType)}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={formatDate}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => formatDate(value)}
                formatter={(value) => [
                  `AED ${Number(value).toLocaleString()}`,
                  getDataTypeLabel(selectedDataType)
                ]}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey={selectedDataType}
            type="natural"
            fill={`url(#fill${selectedDataType})`}
            stroke={getChartColorVar(selectedDataType)}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 space-y-0 border-b py-4 px-4 sm:px-6">
        <div className="grid flex-1 gap-1 w-full sm:w-auto">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-xl sm:text-2xl">
            <span className="font-bold">AED {currentValue.toLocaleString()}</span>
            {change !== 0 && (
              <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                {isPositiveChange ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveChange ? '+' : ''}AED {Math.abs(change).toLocaleString()} ({changePercent.toFixed(1)}%)
                </span>
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-sm">
            {getDataTypeLabel(selectedDataType)} - {currentData.period}
          </CardDescription>
        </div>

        {/* Dual Dropdown System */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={selectedDataType} onValueChange={(value: DataType) => setSelectedDataType(value)}>
            <SelectTrigger className="w-full sm:w-[140px] rounded-lg" aria-label="Select data type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="networth" className="rounded-lg">Net Worth</SelectItem>
              <SelectItem value="spending" className="rounded-lg">Spending</SelectItem>
              <SelectItem value="income" className="rounded-lg">Income</SelectItem>
              <SelectItem value="expenses" className="rounded-lg">Expenses</SelectItem>
              <SelectItem value="cashflow" className="rounded-lg">Cash Flow</SelectItem>
              <SelectItem value="all" className="rounded-lg">All</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={(value: TimePeriod) => setSelectedPeriod(value)}>
            <SelectTrigger className="w-full sm:w-[120px] rounded-lg" aria-label="Select time period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="daily" className="rounded-lg">Daily</SelectItem>
              <SelectItem value="weekly" className="rounded-lg">Weekly</SelectItem>
              <SelectItem value="monthly" className="rounded-lg">Monthly</SelectItem>
              <SelectItem value="yearly" className="rounded-lg">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-2 sm:pb-6">
        <div className="w-full overflow-x-auto">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  )
}