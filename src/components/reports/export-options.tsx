"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import {
  Download,
  FileText,
  FileSpreadsheet,
  Image,
  Mail,
  Share,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react"

interface ExportSettings {
  format: string
  dateRange: string
  includeCharts: boolean
  includeTransactions: boolean
  includeSummary: boolean
  includeAnalytics: boolean
  emailDelivery: boolean
  scheduledExport: boolean
}

const exportFormats = [
  { value: 'pdf', label: 'PDF Report', icon: FileText, description: 'Professional report with charts and analysis' },
  { value: 'excel', label: 'Excel Spreadsheet', icon: FileSpreadsheet, description: 'Raw data for further analysis' },
  { value: 'csv', label: 'CSV Data', icon: FileSpreadsheet, description: 'Transaction data only' },
  { value: 'png', label: 'Chart Images', icon: Image, description: 'High-resolution chart exports' }
]

const dateRangeOptions = [
  { value: 'current-month', label: 'Current Month' },
  { value: 'last-month', label: 'Last Month' },
  { value: 'last-3-months', label: 'Last 3 Months' },
  { value: 'last-6-months', label: 'Last 6 Months' },
  { value: 'last-year', label: 'Last Year' },
  { value: 'year-to-date', label: 'Year to Date' },
  { value: 'all-time', label: 'All Time' }
]

const templateOptions = [
  {
    name: 'Executive Summary',
    description: 'High-level overview for stakeholders',
    includes: ['Summary', 'Key Metrics', 'Trends'],
    recommended: 'Monthly reviews'
  },
  {
    name: 'Detailed Analysis',
    description: 'Comprehensive financial breakdown',
    includes: ['All Charts', 'Transaction Details', 'Category Analysis'],
    recommended: 'Quarterly analysis'
  },
  {
    name: 'Tax Preparation',
    description: 'UAE tax and compliance focused',
    includes: ['Income Summary', 'Deductible Expenses', 'Zakat Calculation'],
    recommended: 'Year-end filing'
  },
  {
    name: 'Budget Review',
    description: 'Budget vs actual performance',
    includes: ['Budget Comparison', 'Variance Analysis', 'Recommendations'],
    recommended: 'Monthly planning'
  }
]

export function ExportOptions() {
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'pdf',
    dateRange: 'current-month',
    includeCharts: true,
    includeTransactions: true,
    includeSummary: true,
    includeAnalytics: true,
    emailDelivery: false,
    scheduledExport: false
  })

  const [isExporting, setIsExporting] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsExporting(false)
    // Handle actual export logic here
  }

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName)
    // Auto-configure settings based on template
    switch (templateName) {
      case 'Executive Summary':
        setSettings(prev => ({
          ...prev,
          includeCharts: true,
          includeTransactions: false,
          includeSummary: true,
          includeAnalytics: true
        }))
        break
      case 'Detailed Analysis':
        setSettings(prev => ({
          ...prev,
          includeCharts: true,
          includeTransactions: true,
          includeSummary: true,
          includeAnalytics: true
        }))
        break
      case 'Tax Preparation':
        setSettings(prev => ({
          ...prev,
          format: 'excel',
          includeCharts: false,
          includeTransactions: true,
          includeSummary: true,
          includeAnalytics: false
        }))
        break
      case 'Budget Review':
        setSettings(prev => ({
          ...prev,
          includeCharts: true,
          includeTransactions: false,
          includeSummary: true,
          includeAnalytics: true
        }))
        break
    }
  }

  const getSelectedFormat = () => exportFormats.find(f => f.value === settings.format)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export Financial Report
          </DialogTitle>
          <DialogDescription>
            Export your financial data in various formats with customizable options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Templates */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Report Templates</Label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {templateOptions.map((template) => (
                <div
                  key={template.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate === template.name
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTemplateSelect(template.name)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-sm">{template.name}</div>
                    {selectedTemplate === template.name && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {template.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.includes.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-primary">
                    Recommended: {template.recommended}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <div
                  key={format.value}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    settings.format === format.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSettings(prev => ({ ...prev, format: format.value }))}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <format.icon className="h-4 w-4" />
                    <div className="font-medium text-sm">{format.label}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Date Range
            </Label>
            <Select value={settings.dateRange} onValueChange={(value) => setSettings(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Include Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Include in Export</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-summary"
                    checked={settings.includeSummary}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeSummary: checked as boolean }))}
                  />
                  <label htmlFor="include-summary" className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-3 w-3" />
                    Financial Summary
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-charts"
                    checked={settings.includeCharts}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeCharts: checked as boolean }))}
                  />
                  <label htmlFor="include-charts" className="flex items-center gap-2 text-sm">
                    <BarChart3 className="h-3 w-3" />
                    Charts & Graphs
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-transactions"
                    checked={settings.includeTransactions}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeTransactions: checked as boolean }))}
                  />
                  <label htmlFor="include-transactions" className="flex items-center gap-2 text-sm">
                    <FileText className="h-3 w-3" />
                    Transaction Details
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-analytics"
                    checked={settings.includeAnalytics}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeAnalytics: checked as boolean }))}
                  />
                  <label htmlFor="include-analytics" className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-3 w-3" />
                    AI Analytics
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Delivery Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-delivery"
                  checked={settings.emailDelivery}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailDelivery: checked as boolean }))}
                />
                <label htmlFor="email-delivery" className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3" />
                  Send to email after export
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scheduled-export"
                  checked={settings.scheduledExport}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, scheduledExport: checked as boolean }))}
                />
                <label htmlFor="scheduled-export" className="flex items-center gap-2 text-sm">
                  <Clock className="h-3 w-3" />
                  Set up recurring export
                </label>
              </div>
            </div>
          </div>

          {/* UAE-Specific Options */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                UAE
              </Badge>
              <span className="font-medium text-sm">UAE Compliance Features</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="zakat-calc" />
                <label htmlFor="zakat-calc" className="text-sm">
                  Include Zakat calculation worksheet
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vat-summary" />
                <label htmlFor="vat-summary" className="text-sm">
                  VAT summary for business expenses
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="currency-aed" defaultChecked />
                <label htmlFor="currency-aed" className="text-sm">
                  Show amounts in AED
                </label>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Export Summary</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-medium">{getSelectedFormat()?.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Date Range:</span>
                <span className="font-medium">
                  {dateRangeOptions.find(d => d.value === settings.dateRange)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Components:</span>
                <span className="font-medium">
                  {[
                    settings.includeSummary && 'Summary',
                    settings.includeCharts && 'Charts',
                    settings.includeTransactions && 'Transactions',
                    settings.includeAnalytics && 'Analytics'
                  ].filter(Boolean).length} sections
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Size:</span>
                <span className="font-medium">
                  {settings.format === 'pdf' ? '2.5 MB' :
                   settings.format === 'excel' ? '1.8 MB' :
                   settings.format === 'csv' ? '0.3 MB' : '5.2 MB'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share Settings
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setSelectedTemplate('')}>
                Reset
              </Button>
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="min-w-[120px]"
              >
                {isExporting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}