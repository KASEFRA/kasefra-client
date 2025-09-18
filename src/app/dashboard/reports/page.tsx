"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  Download,
  Share,
  Calendar,
  Filter,
  Eye,
  FileText,
  PieChart,
  Activity,
  DollarSign
} from "lucide-react"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { CashFlowChart } from "@/components/reports/cash-flow-chart"
import { NetWorthChart } from "@/components/reports/net-worth-chart"
import { SpendingPatternsChart } from "@/components/reports/spending-patterns-chart"
import { ReportFilters } from "@/components/reports/report-filters"
import { ExportOptions } from "@/components/reports/export-options"

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive financial insights and performance tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <ExportOptions />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">AED 145.2K</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+8.2%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">AED 15.5K</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Consistent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">AED 8.7K</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-accent">-12%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              <PieChart className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">44%</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-secondary" />
              <span className="text-secondary">Above target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Overview */}
      <ReportsOverview />

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart />
        <NetWorthChart />
      </div>

      {/* Spending Analysis */}
      <SpendingPatternsChart />

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-5 w-5 text-primary" />
              Financial Performance
            </CardTitle>
            <CardDescription>
              Income, expenses, and savings analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { name: "Monthly Income Report", status: "Available", date: "Jan 2024" },
                { name: "Expense Breakdown", status: "Available", date: "Jan 2024" },
                { name: "Savings Analysis", status: "Available", date: "Jan 2024" },
                { name: "Cash Flow Statement", status: "Available", date: "Jan 2024" }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="h-6 px-2">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              View All Reports
            </Button>
          </CardContent>
        </Card>

        {/* Investment Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Investment Tracking
            </CardTitle>
            <CardDescription>
              Portfolio performance and analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { name: "Portfolio Overview", status: "Available", growth: "+5.2%" },
                { name: "Asset Allocation", status: "Available", growth: "Balanced" },
                { name: "Performance Report", status: "Available", growth: "+8.1%" },
                { name: "Risk Analysis", status: "Coming Soon", growth: "N/A" }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.growth}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === "Available" ? "secondary" : "outline"} className="text-xs">
                      {report.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2"
                      disabled={report.status !== "Available"}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" disabled>
              View Investment Reports
            </Button>
          </CardContent>
        </Card>

        {/* UAE-Specific Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5 text-accent" />
              UAE Market Reports
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                UAE
              </Badge>
            </CardTitle>
            <CardDescription>
              Local market insights and compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { name: "Emirates NBD Analysis", status: "Available", insight: "Low fees" },
                { name: "DEWA Usage Report", status: "Available", insight: "Efficient" },
                { name: "Zakat Calculator", status: "Available", insight: "AED 2.1K" },
                { name: "Hajj Savings Progress", status: "Available", insight: "42%" }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.insight}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="h-6 px-2">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              View UAE Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Filters */}
      <ReportFilters />
    </div>
  )
}