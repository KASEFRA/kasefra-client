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
  CheckCircle
} from "lucide-react"

interface SpendingData {
  category: string
  amount: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
  monthlyData: {
    month: string
    amount: number
  }[]
}

const mockSpendingData: SpendingData[] = [
  {
    category: 'Housing',
    amount: 3200,
    percentage: 36.8,
    trend: 'stable',
    trendPercentage: 1.2,
    monthlyData: [
      { month: 'Aug', amount: 3200 },
      { month: 'Sep', amount: 3200 },
      { month: 'Oct', amount: 3200 },
      { month: 'Nov', amount: 3200 },
      { month: 'Dec', amount: 3200 },
      { month: 'Jan', amount: 3200 }
    ]
  },
  {
    category: 'Food & Dining',
    amount: 1850,
    percentage: 21.3,
    trend: 'up',
    trendPercentage: 8.4,
    monthlyData: [
      { month: 'Aug', amount: 1650 },
      { month: 'Sep', amount: 1720 },
      { month: 'Oct', amount: 1580 },
      { month: 'Nov', amount: 1680 },
      { month: 'Dec', amount: 1750 },
      { month: 'Jan', amount: 1850 }
    ]
  },
  {
    category: 'Transportation',
    amount: 1200,
    percentage: 13.8,
    trend: 'down',
    trendPercentage: -5.2,
    monthlyData: [
      { month: 'Aug', amount: 1350 },
      { month: 'Sep', amount: 1280 },
      { month: 'Oct', amount: 1240 },
      { month: 'Nov', amount: 1180 },
      { month: 'Dec', amount: 1220 },
      { month: 'Jan', amount: 1200 }
    ]
  },
  {
    category: 'Shopping',
    amount: 980,
    percentage: 11.3,
    trend: 'up',
    trendPercentage: 15.2,
    monthlyData: [
      { month: 'Aug', amount: 850 },
      { month: 'Sep', amount: 920 },
      { month: 'Oct', amount: 880 },
      { month: 'Nov', amount: 750 },
      { month: 'Dec', amount: 1200 },
      { month: 'Jan', amount: 980 }
    ]
  },
  {
    category: 'Healthcare',
    amount: 650,
    percentage: 7.5,
    trend: 'stable',
    trendPercentage: 2.1,
    monthlyData: [
      { month: 'Aug', amount: 600 },
      { month: 'Sep', amount: 680 },
      { month: 'Oct', amount: 720 },
      { month: 'Nov', amount: 580 },
      { month: 'Dec', amount: 620 },
      { month: 'Jan', amount: 650 }
    ]
  },
  {
    category: 'Entertainment',
    amount: 820,
    percentage: 9.4,
    trend: 'down',
    trendPercentage: -12.8,
    monthlyData: [
      { month: 'Aug', amount: 950 },
      { month: 'Sep', amount: 880 },
      { month: 'Oct', amount: 920 },
      { month: 'Nov', amount: 780 },
      { month: 'Dec', amount: 850 },
      { month: 'Jan', amount: 820 }
    ]
  }
]

const CATEGORY_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--muted-foreground))',
  '#22c55e',
  '#f59e0b'
]

const CATEGORY_ICONS = {
  'Housing': Home,
  'Food & Dining': Utensils,
  'Transportation': Car,
  'Shopping': ShoppingCart,
  'Healthcare': Heart,
  'Entertainment': Plane
}

export function SpendingPatternsChart() {
  const [chartType, setChartType] = useState<'breakdown' | 'trends' | 'comparison'>('breakdown')

  const totalSpending = mockSpendingData.reduce((sum, item) => sum + item.amount, 0)

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
            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
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
          formatter={(value, name) => [`AED ${value.toLocaleString()}`, name]}
        />
        {mockSpendingData.slice(0, 3).map((category, index) => (
          <Line
            key={category.category}
            type="monotone"
            dataKey="amount"
            data={category.monthlyData}
            stroke={CATEGORY_COLORS[index]}
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

  const getSpendingInsights = () => {
    const highestCategory = mockSpendingData.reduce((max, cat) => cat.amount > max.amount ? cat : max)
    const increasingSpending = mockSpendingData.filter(cat => cat.trend === 'up')
    const decreasingSpending = mockSpendingData.filter(cat => cat.trend === 'down')

    return [
      `Highest spending category: ${highestCategory.category} (${highestCategory.percentage}% of total)`,
      `${increasingSpending.length} categories increased, ${decreasingSpending.length} categories decreased this month`,
      `Food & Dining spending is 23% above UAE average - consider meal planning`
    ]
  }

  return (
    <Card className="bg-card border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Spending Patterns
            </CardTitle>
            <CardDescription>
              {chartType === 'breakdown' && 'Expense breakdown by category'}
              {chartType === 'trends' && '6-month spending trends'}
              {chartType === 'comparison' && 'Category comparison analysis'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === 'breakdown' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('breakdown')}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'trends' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('trends')}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'comparison' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('comparison')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-primary">
              AED {totalSpending.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Spending</div>
            <div className="text-xs text-primary mt-1">This Month</div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-secondary">
              {mockSpendingData.length}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
            <div className="text-xs text-secondary mt-1">Tracked</div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-accent">
              AED {(totalSpending / mockSpendingData[0].monthlyData.length).toFixed(0)}
            </div>
            <div className="text-sm text-muted-foreground">Daily Average</div>
            <div className="text-xs text-accent mt-1">Per Day</div>
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
                  <div key={category.category} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                      />
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{category.category}</span>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <div className="text-sm font-medium">AED {category.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{category.percentage}% of total</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {category.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-destructive" />
                        ) : category.trend === 'down' ? (
                          <TrendingDown className="h-3 w-3 text-secondary" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-primary" />
                        )}
                        <span className={`text-xs ${
                          category.trend === 'up' ? 'text-destructive' :
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
              <span>Housing costs are 12% below Dubai average for your area</span>
            </div>
            <div className="flex items-start gap-2">
              <Utensils className="h-3 w-3 mt-1 text-primary" />
              <span>Restaurant spending 23% above UAE resident average</span>
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
            {getSpendingInsights().map((insight, index) => (
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
              <span className="font-medium text-sm text-secondary">Optimization Opportunities</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• Consider meal planning to reduce dining expenses</div>
              <div>• Bundle entertainment subscriptions for savings</div>
              <div>• Use grocery delivery to avoid impulse purchases</div>
            </div>
          </div>

          <div className="p-3 rounded-lg border bg-accent/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <span className="font-medium text-sm text-accent">Budget Alerts</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>• Shopping budget exceeded by 15%</div>
              <div>• Food spending trending upward (+8.4%)</div>
              <div>• Entertainment within healthy range</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}