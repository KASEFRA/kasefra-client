"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { mockChartData } from "@/lib/mock-data"

export function SpendingTrendsChart() {
  return (
    <Card className="premium-card hover-lift border-0 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold">Monthly Spending Trends</CardTitle>
        <CardDescription className="text-base">Your spending patterns over the last 4 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartData.incomeVsExpenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
              <XAxis
                dataKey="month"
                className="text-muted-foreground"
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                className="text-muted-foreground"
                fontSize={12}
                tickFormatter={(value) => `${value/1000}k`}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `AED ${value.toLocaleString()}`,
                  name === 'expenses' ? 'Expenses' : 'Income'
                ]}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar
                dataKey="income"
                fill="hsl(var(--primary))"
                name="income"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                fill="hsl(var(--muted-foreground))"
                name="expenses"
                radius={[6, 6, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}