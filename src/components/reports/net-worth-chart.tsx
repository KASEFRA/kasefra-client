"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useState } from "react"
import {
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  DollarSign,
  Home,
  Car,
  Briefcase
} from "lucide-react"

interface NetWorthData {
  month: string
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  assets: {
    cash: number
    savings: number
    investments: number
    property: number
    vehicle: number
    other: number
  }
  liabilities: {
    mortgage: number
    carLoan: number
    creditCard: number
    personalLoan: number
  }
}

const mockNetWorthData: NetWorthData[] = [
  {
    month: 'Aug',
    totalAssets: 135000,
    totalLiabilities: 10000,
    netWorth: 125000,
    assets: { cash: 25000, savings: 45000, investments: 15000, property: 35000, vehicle: 12000, other: 3000 },
    liabilities: { mortgage: 0, carLoan: 8000, creditCard: 1500, personalLoan: 500 }
  },
  {
    month: 'Sep',
    totalAssets: 142300,
    totalLiabilities: 9500,
    netWorth: 132800,
    assets: { cash: 27000, savings: 48000, investments: 16500, property: 35000, vehicle: 12500, other: 3300 },
    liabilities: { mortgage: 0, carLoan: 7500, creditCard: 1300, personalLoan: 700 }
  },
  {
    month: 'Oct',
    totalAssets: 148400,
    totalLiabilities: 9000,
    netWorth: 139400,
    assets: { cash: 28500, savings: 52000, investments: 18000, property: 35000, vehicle: 11900, other: 3000 },
    liabilities: { mortgage: 0, carLoan: 7000, creditCard: 1200, personalLoan: 800 }
  },
  {
    month: 'Nov',
    totalAssets: 153100,
    totalLiabilities: 8500,
    netWorth: 144600,
    assets: { cash: 30000, savings: 55000, investments: 19500, property: 35000, vehicle: 10600, other: 3000 },
    liabilities: { mortgage: 0, carLoan: 6500, creditCard: 1000, personalLoan: 1000 }
  },
  {
    month: 'Dec',
    totalAssets: 160200,
    totalLiabilities: 9000,
    netWorth: 151200,
    assets: { cash: 32000, savings: 58000, investments: 21000, property: 35000, vehicle: 11200, other: 3000 },
    liabilities: { mortgage: 0, carLoan: 6000, creditCard: 1500, personalLoan: 1500 }
  },
  {
    month: 'Jan',
    totalAssets: 167000,
    totalLiabilities: 9800,
    netWorth: 157200,
    assets: { cash: 35000, savings: 62000, investments: 22500, property: 35000, vehicle: 9500, other: 3000 },
    liabilities: { mortgage: 0, carLoan: 5500, creditCard: 1800, personalLoan: 2500 }
  }
]

const ASSET_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--muted-foreground))',
  '#22c55e',
  '#f59e0b'
]

export function NetWorthChart() {
  const [chartType, setChartType] = useState<'trend' | 'assets' | 'comparison'>('trend')

  const currentData = mockNetWorthData[mockNetWorthData.length - 1]
  const previousData = mockNetWorthData[mockNetWorthData.length - 2]
  const growthAmount = currentData.netWorth - previousData.netWorth
  const growthRate = ((growthAmount / previousData.netWorth) * 100).toFixed(1)

  // Calculate year-over-year growth
  const yearAgoNetWorth = 125000 // Mock value
  const yoyGrowth = ((currentData.netWorth - yearAgoNetWorth) / yearAgoNetWorth * 100).toFixed(1)

  // Asset allocation data for pie chart
  const assetData = Object.entries(currentData.assets).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    percentage: ((value / currentData.totalAssets) * 100).toFixed(1)
  }))

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={mockNetWorthData}>
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
            name === 'totalAssets' ? 'Total Assets' :
            name === 'totalLiabilities' ? 'Total Liabilities' : 'Net Worth'
          ]}
        />
        <Area
          type="monotone"
          dataKey="totalAssets"
          stackId="1"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.1}
        />
        <Area
          type="monotone"
          dataKey="netWorth"
          stroke="hsl(var(--secondary))"
          fill="hsl(var(--secondary))"
          fillOpacity={0.2}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="totalLiabilities"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  const renderAssetsChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={assetData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
        >
          {assetData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={ASSET_COLORS[index % ASSET_COLORS.length]} />
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

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockNetWorthData}>
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
            name === 'totalAssets' ? 'Assets' : 'Liabilities'
          ]}
        />
        <Bar dataKey="totalAssets" fill="hsl(var(--secondary))" name="totalAssets" />
        <Bar dataKey="totalLiabilities" fill="hsl(var(--destructive))" name="totalLiabilities" />
      </BarChart>
    </ResponsiveContainer>
  )

  const getChartInsights = () => {
    switch (chartType) {
      case 'trend':
        return [
          `Net worth increased by AED ${growthAmount.toLocaleString()} (${growthRate}%) this month`,
          `Year-over-year growth: ${yoyGrowth}% (AED ${(currentData.netWorth - yearAgoNetWorth).toLocaleString()})`,
          `Asset to liability ratio: ${(currentData.totalAssets / currentData.totalLiabilities).toFixed(1)}:1`
        ]
      case 'assets':
        const topAsset = assetData.reduce((max, asset) => asset.value > max.value ? asset : max)
        const diversificationScore = assetData.length > 4 ? 'Well diversified' : 'Consider diversification'
        return [
          `Largest asset category: ${topAsset.name} (${topAsset.percentage}%)`,
          `Liquid assets (Cash + Savings): ${((currentData.assets.cash + currentData.assets.savings) / currentData.totalAssets * 100).toFixed(1)}%`,
          `Portfolio diversification: ${diversificationScore}`
        ]
      case 'comparison':
        const avgAssetGrowth = (currentData.totalAssets - mockNetWorthData[0].totalAssets) / mockNetWorthData.length
        const debtReduction = mockNetWorthData[0].totalLiabilities - currentData.totalLiabilities
        return [
          `Average monthly asset growth: AED ${avgAssetGrowth.toLocaleString()}`,
          `Total debt reduction: AED ${debtReduction.toLocaleString()} (${((debtReduction / mockNetWorthData[0].totalLiabilities) * 100).toFixed(1)}%)`,
          `Debt-to-asset ratio: ${((currentData.totalLiabilities / currentData.totalAssets) * 100).toFixed(1)}%`
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
              <TrendingUp className="h-5 w-5 text-primary" />
              Net Worth Analysis
            </CardTitle>
            <CardDescription>
              {chartType === 'trend' && 'Net worth growth over time'}
              {chartType === 'assets' && 'Asset allocation breakdown'}
              {chartType === 'comparison' && 'Assets vs liabilities comparison'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === 'trend' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('trend')}
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'assets' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('assets')}
            >
              <PieChartIcon className="h-4 w-4" />
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
            <div className="text-lg font-bold text-secondary">
              AED {(currentData.netWorth / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Net Worth</div>
            <div className="flex items-center justify-center gap-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+{growthRate}%</span>
            </div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-primary">
              AED {(currentData.totalAssets / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Total Assets</div>
            <div className="text-xs text-primary mt-1">
              {assetData.length} Categories
            </div>
          </div>

          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-destructive">
              AED {(currentData.totalLiabilities / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">Total Liabilities</div>
            <div className="text-xs text-destructive mt-1">
              {((currentData.totalLiabilities / currentData.totalAssets) * 100).toFixed(0)}% of Assets
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full">
          {chartType === 'trend' && renderTrendChart()}
          {chartType === 'assets' && renderAssetsChart()}
          {chartType === 'comparison' && renderComparisonChart()}
        </div>

        {/* Asset Breakdown for Pie Chart */}
        {chartType === 'assets' && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {assetData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ASSET_COLORS[index % ASSET_COLORS.length] }}
                  />
                  <span className="text-xs">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">AED {item.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* UAE-Specific Insights */}
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs">
              UAE
            </Badge>
            <span className="font-medium text-sm">UAE Market Context</span>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Home className="h-3 w-3 mt-1 text-primary" />
              <span>UAE property values increased 8.2% YoY in Dubai market</span>
            </div>
            <div className="flex items-start gap-2">
              <Car className="h-3 w-3 mt-1 text-primary" />
              <span>Vehicle depreciation rate in UAE: 15-20% annually</span>
            </div>
            <div className="flex items-start gap-2">
              <Briefcase className="h-3 w-3 mt-1 text-primary" />
              <span>Your net worth is above UAE expat median by 23%</span>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Net Worth Insights</span>
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