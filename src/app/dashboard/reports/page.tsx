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
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive financial insights and performance tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <ExportOptions />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/20">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 145.2K</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">+8.2%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 15.5K</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Consistent monthly income</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 8.7K</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-blue-600 font-semibold">-12%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/20">
              <PieChart className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">44%</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-purple-600 font-semibold">Above target</span>
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
        <Card className="bg-card border shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              Financial Performance
            </CardTitle>
            <CardDescription className="text-base">
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
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/40 transition-colors">
                  <div>
                    <div className="font-semibold text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="h-7 px-2 ">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full ">
              View All Reports
            </Button>
          </CardContent>
        </Card>

        {/* Investment Tracking */}
        <Card className="bg-card border shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/20">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              Investment Tracking
            </CardTitle>
            <CardDescription className="text-base">
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
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/40 transition-colors">
                  <div>
                    <div className="font-semibold text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.growth}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === "Available" ? "secondary" : "outline"} className="text-xs">
                      {report.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 "
                      disabled={report.status !== "Available"}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full " disabled>
              View Investment Reports
            </Button>
          </CardContent>
        </Card>

        {/* UAE-Specific Reports */}
        <Card className="bg-card border shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              UAE Market Reports
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                UAE
              </Badge>
            </CardTitle>
            <CardDescription className="text-base">
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
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/40 transition-colors">
                  <div>
                    <div className="font-semibold text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.insight}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="h-7 px-2 ">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full ">
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