"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, Area, AreaChart, ComposedChart } from 'recharts'
import { BarChart3, TrendingUp } from 'lucide-react'

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

interface ChartDataPoint {
  period: string
  income: number
  expenses: number
  net: number
}

interface BigAnalyticsChartProps {
  selectedPeriod: TimePeriod
  data: ChartDataPoint[]
}

export function BigAnalyticsChart({ selectedPeriod, data }: BigAnalyticsChartProps) {
  const getPeriodLabel = (period: TimePeriod) => {
    switch (period) {
      case 'daily': return 'Daily'
      case 'weekly': return 'Weekly'
      case 'monthly': return 'Monthly'
      case 'quarterly': return 'Quarterly'
      case 'yearly': return 'Yearly'
      default: return 'Monthly'
    }
  }

  const getChartDescription = (period: TimePeriod) => {
    switch (period) {
      case 'daily': return 'Income vs expenses over the last 30 days'
      case 'weekly': return 'Weekly financial performance over 12 weeks'
      case 'monthly': return 'Monthly financial trends over the year'
      case 'quarterly': return 'Quarterly performance analysis'
      case 'yearly': return 'Annual financial growth over 5 years'
      default: return 'Financial performance analysis'
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground capitalize">
                    {entry.dataKey}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  AED {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    const chartProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    }

    switch (selectedPeriod) {
      case 'daily':
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
            <XAxis
              dataKey="period"
              className="text-muted-foreground"
              fontSize={12}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={formatCurrency}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--destructive))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--destructive))', strokeWidth: 2 }}
            />
          </LineChart>
        )

      case 'weekly':
      case 'quarterly':
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
            <XAxis
              dataKey="period"
              className="text-muted-foreground"
              fontSize={12}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={formatCurrency}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="income"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Bar
              dataKey="expenses"
              fill="hsl(var(--destructive))"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        )

      case 'yearly':
        return (
          <AreaChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
            <XAxis
              dataKey="period"
              className="text-muted-foreground"
              fontSize={12}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={formatCurrency}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.3}
            />
          </AreaChart>
        )

      default: // monthly
        return (
          <ComposedChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
            <XAxis
              dataKey="period"
              className="text-muted-foreground"
              fontSize={12}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              className="text-muted-foreground"
              fontSize={12}
              tickFormatter={formatCurrency}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="income"
              fill="hsl(var(--primary))"
              radius={[6, 6, 0, 0]}
              opacity={0.7}
            />
            <Bar
              dataKey="expenses"
              fill="hsl(var(--muted-foreground))"
              radius={[6, 6, 0, 0]}
              opacity={0.7}
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke="hsl(var(--secondary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 5 }}
            />
          </ComposedChart>
        )
    }
  }

  return (
    <Card className="premium-card hover-lift border-0 shadow-xl bg-gradient-to-br from-card via-card to-muted/10">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="icon-container bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              {getPeriodLabel(selectedPeriod)} Financial Analytics
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {getChartDescription(selectedPeriod)}
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-sm text-muted-foreground">Expenses</span>
            </div>
            {selectedPeriod === 'monthly' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-sm text-muted-foreground">Net Flow</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full transition-all duration-700 ease-in-out">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}