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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { useState } from "react"
import {
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Plane,
  Heart,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react"
import {
  reportsSpendingData,
  getSpendingInsights,
  REPORTS_CATEGORY_COLORS,
  type SpendingCategoryData
} from "@/lib/mock-data"

const CATEGORY_ICONS = {
  'Housing': Home,
  'Food & Dining': Utensils,
  'Transportation': Car,
  'Shopping': ShoppingCart,
  'Healthcare': Heart,
  'Utilities': Zap,
  'Entertainment': Plane
}

export function SpendingPatternsChart() {
  const [chartType, setChartType] = useState<'breakdown' | 'trends' | 'comparison'>('breakdown')

  const mockSpendingData = reportsSpendingData
  const totalSpending = mockSpendingData.reduce((sum, item) => sum + item.amount, 0)
  const insights = getSpendingInsights()

  const renderBreakdownChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={mockSpendingData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="amount"
        >
          {mockSpendingData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={REPORTS_CATEGORY_COLORS[index % REPORTS_CATEGORY_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value, name, props) => [
            `AED ${value.toLocaleString()} (${props.payload.percentage}%)`,
            name
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  )

  const renderTrendsChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockSpendingData[0].monthlyData}>
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
        />
        {mockSpendingData.slice(0, 3).map((category, index) => (
          <Line
            key={category.category}
            type="monotone"
            dataKey="amount"
            data={category.monthlyData}
            stroke={REPORTS_CATEGORY_COLORS[index]}
            strokeWidth={2}
            name={category.category}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockSpendingData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="category"
          className="text-xs fill-muted-foreground"
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis className="text-xs fill-muted-foreground" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--card-foreground))'
          }}
          formatter={(value) => [`AED ${value.toLocaleString()}`, 'Amount']}
        />
        <Bar dataKey="amount" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )

  const getTopSpendingCategories = () => {
    return mockSpendingData
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3)
  }

  return (
    <Card className="bg-card border shadow-sm">
      <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="truncate">Spending Patterns</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {chartType === 'breakdown' && 'Expense breakdown by category'}
              {chartType === 'trends' && '6-month spending trends'}
              {chartType === 'comparison' && 'Category comparison analysis'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 justify-start sm:justify-end">
            <Button
              variant={chartType === 'breakdown' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('breakdown')}
              className="h-7 sm:h-8 px-2 sm:px-3"
            >
              <PieChartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={chartType === 'trends' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('trends')}
              className="h-7 sm:h-8 px-2 sm:px-3"
            >
              <LineChartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={chartType === 'comparison' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('comparison')}
              className="h-7 sm:h-8 px-2 sm:px-3"
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="text-sm sm:text-lg font-bold text-primary">
              AED {totalSpending.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-sm text-muted-foreground">Total Spending</div>
            <div className="text-[9px] sm:text-xs text-primary mt-1">This Month</div>
          </div>

          <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="text-sm sm:text-lg font-bold text-secondary">
              {mockSpendingData.length}
            </div>
            <div className="text-[10px] sm:text-sm text-muted-foreground">Categories</div>
            <div className="text-[9px] sm:text-xs text-secondary mt-1">Tracked</div>
          </div>

          <div className="text-center p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="text-sm sm:text-lg font-bold text-accent">
              AED {(totalSpending / mockSpendingData[0].monthlyData.length).toFixed(0)}
            </div>
            <div className="text-[10px] sm:text-sm text-muted-foreground">Daily Average</div>
            <div className="text-[9px] sm:text-xs text-accent mt-1">Per Day</div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full">
          {chartType === 'breakdown' && renderBreakdownChart()}
          {chartType === 'trends' && renderTrendsChart()}
          {chartType === 'comparison' && renderComparisonChart()}
        </div>

        {/* Category Breakdown */}
        {chartType === 'breakdown' && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Category Breakdown</h4>
            <div className="space-y-2">
              {mockSpendingData.map((category, index) => {
                const IconComponent = CATEGORY_ICONS[category.category as keyof typeof CATEGORY_ICONS]
                return (
                  <div key={category.category} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border space-y-2 sm:space-y-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: REPORTS_CATEGORY_COLORS[index % REPORTS_CATEGORY_COLORS.length] }}
                      />
                      <IconComponent className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-sm truncate">{category.category}</span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                      <div className="min-w-0">
                        <div className="text-sm font-medium">AED {category.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{category.percentage}% of total</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {category.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-destructive" />
                        ) : category.trend === 'down' ? (
                          <TrendingDown className="h-3 w-3 text-secondary" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-primary" />
                        )}
                        <span className={`text-xs whitespace-nowrap ${category.trend === 'up' ? 'text-destructive' :
                          category.trend === 'down' ? 'text-secondary' : 'text-primary'
                          }`}>
                          {category.trend === 'stable' ? 'Stable' : `${Math.abs(category.trendPercentage)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* UAE-Specific Insights */}
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs">
              UAE
            </Badge>
            <span className="font-medium text-sm">UAE Spending Comparison</span>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Home className="h-3 w-3 mt-1 text-primary" />
              <span>Housing costs aligned with Dubai Marina average</span>
            </div>
            <div className="flex items-start gap-2">
              <Utensils className="h-3 w-3 mt-1 text-primary" />
              <span>Food & Dining: {insights.overBudgetCount > 0 ? 'Above' : 'Within'} UAE resident average</span>
            </div>
            <div className="flex items-start gap-2">
              <Car className="h-3 w-3 mt-1 text-primary" />
              <span>Transport costs optimized with Salik and fuel efficiency</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Spending Insights</span>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            {insights.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border bg-secondary/5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span className="font-medium text-sm text-secondary">Budget Performance</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• {insights.decreasingCount} categories under budget</div>
              <div>• Total spending: {((insights.totalSpending / 22800) * 100).toFixed(1)}% of income</div>
              <div>• Savings potential: AED {(22800 - insights.totalSpending).toLocaleString()}</div>
            </div>
          </div>

          <div className="p-3 rounded-lg border bg-accent/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <span className="font-medium text-sm text-accent">Areas to Watch</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• {insights.overBudgetCount} categories over budget</div>
              <div>• {insights.increasingCount} categories trending upward</div>
              <div>• Monitor discretionary spending closely</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}