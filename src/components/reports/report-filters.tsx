"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import {
  Filter,
  Calendar,
  DollarSign,
  Tag,
  TrendingUp,
  X,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Bookmark
} from "lucide-react"

interface FilterOptions {
  dateRange: string
  accountTypes: string[]
  categories: string[]
  amountRange: {
    min: string
    max: string
  }
  transactionTypes: string[]
  timeGrouping: string
}

const accountTypeOptions = [
  { id: 'checking', label: 'Checking Account', count: 156 },
  { id: 'savings', label: 'Savings Account', count: 89 },
  { id: 'credit', label: 'Credit Card', count: 234 },
  { id: 'investment', label: 'Investment Account', count: 67 }
]

const categoryOptions = [
  { id: 'housing', label: 'Housing', count: 45, color: 'hsl(var(--primary))' },
  { id: 'food', label: 'Food & Dining', count: 89, color: 'hsl(var(--secondary))' },
  { id: 'transport', label: 'Transportation', count: 67, color: 'hsl(var(--accent))' },
  { id: 'shopping', label: 'Shopping', count: 123, color: '#22c55e' },
  { id: 'healthcare', label: 'Healthcare', count: 34, color: '#f59e0b' },
  { id: 'entertainment', label: 'Entertainment', count: 78, color: '#8b5cf6' },
  { id: 'utilities', label: 'Utilities', count: 23, color: '#ef4444' },
  { id: 'education', label: 'Education', count: 12, color: '#06b6d4' }
]

const transactionTypeOptions = [
  { id: 'income', label: 'Income', count: 45 },
  { id: 'expense', label: 'Expense', count: 567 },
  { id: 'transfer', label: 'Transfer', count: 89 },
  { id: 'investment', label: 'Investment', count: 23 }
]

const savedFilters = [
  { name: 'Monthly Review', description: 'Last 30 days, all accounts' },
  { name: 'Dining Analysis', description: 'Food & Dining, Last 3 months' },
  { name: 'Investment Tracking', description: 'Investment accounts only' },
  { name: 'UAE Expenses', description: 'AED transactions, excluding transfers' }
]

export function ReportFilters() {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'last-30-days',
    accountTypes: [],
    categories: [],
    amountRange: { min: '', max: '' },
    transactionTypes: [],
    timeGrouping: 'monthly'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleAccountTypeChange = (accountId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      accountTypes: checked
        ? [...prev.accountTypes, accountId]
        : prev.accountTypes.filter(id => id !== accountId)
    }))
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter(id => id !== categoryId)
    }))
  }

  const handleTransactionTypeChange = (typeId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      transactionTypes: checked
        ? [...prev.transactionTypes, typeId]
        : prev.transactionTypes.filter(id => id !== typeId)
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      dateRange: 'last-30-days',
      accountTypes: [],
      categories: [],
      amountRange: { min: '', max: '' },
      transactionTypes: [],
      timeGrouping: 'monthly'
    })
    setSearchTerm('')
  }

  const getActiveFiltersCount = () => {
    return filters.accountTypes.length +
           filters.categories.length +
           filters.transactionTypes.length +
           (filters.amountRange.min || filters.amountRange.max ? 1 : 0)
  }

  const filteredCategories = categoryOptions.filter(cat =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Report Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getActiveFiltersCount()} active
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Customize your financial reports and analytics
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showAdvanced ? 'Simple' : 'Advanced'}
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4" />
            Date Range
          </Label>
          <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filters Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Select value={filters.timeGrouping} onValueChange={(value) => setFilters(prev => ({ ...prev, timeGrouping: value }))}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1">
            <Input
              placeholder="Min AED"
              value={filters.amountRange.min}
              onChange={(e) => setFilters(prev => ({ ...prev, amountRange: { ...prev.amountRange, min: e.target.value } }))}
              className="h-8 text-xs"
            />
            <Input
              placeholder="Max AED"
              value={filters.amountRange.max}
              onChange={(e) => setFilters(prev => ({ ...prev, amountRange: { ...prev.amountRange, max: e.target.value } }))}
              className="h-8 text-xs"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 text-xs pl-7"
            />
          </div>

          <Button size="sm" className="h-8 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Apply Filters
          </Button>
        </div>

        {/* Account Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Account Types</Label>
          <div className="grid grid-cols-2 gap-2">
            {accountTypeOptions.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={account.id}
                    checked={filters.accountTypes.includes(account.id)}
                    onCheckedChange={(checked) => handleAccountTypeChange(account.id, checked as boolean)}
                  />
                  <label htmlFor={account.id} className="text-sm">
                    {account.label}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {account.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4" />
            Categories
            {filters.categories.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.categories.length} selected
              </Badge>
            )}
          </Label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredCategories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <label htmlFor={category.id} className="text-sm truncate">
                    {category.label}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <>
            {/* Transaction Types */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" />
                Transaction Types
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {transactionTypeOptions.map((type) => (
                  <div key={type.id} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={filters.transactionTypes.includes(type.id)}
                        onCheckedChange={(checked) => handleTransactionTypeChange(type.id, checked as boolean)}
                      />
                      <label htmlFor={type.id} className="text-sm">
                        {type.label}
                      </label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {type.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Amount Range (AED)</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="min-amount" className="text-xs text-muted-foreground">Minimum</Label>
                  <Input
                    id="min-amount"
                    placeholder="0"
                    value={filters.amountRange.min}
                    onChange={(e) => setFilters(prev => ({ ...prev, amountRange: { ...prev.amountRange, min: e.target.value } }))}
                  />
                </div>
                <div>
                  <Label htmlFor="max-amount" className="text-xs text-muted-foreground">Maximum</Label>
                  <Input
                    id="max-amount"
                    placeholder="No limit"
                    value={filters.amountRange.max}
                    onChange={(e) => setFilters(prev => ({ ...prev, amountRange: { ...prev.amountRange, max: e.target.value } }))}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Saved Filters */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Bookmark className="h-4 w-4" />
            Saved Filters
          </Label>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {savedFilters.map((filter, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                <div>
                  <div className="font-medium text-sm">{filter.name}</div>
                  <div className="text-xs text-muted-foreground">{filter.description}</div>
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2">
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Active Filters</Label>
              <Button size="sm" variant="ghost" onClick={clearAllFilters}>
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.accountTypes.map(accountId => {
                const account = accountTypeOptions.find(a => a.id === accountId)
                return (
                  <Badge key={accountId} variant="secondary" className="text-xs">
                    {account?.label}
                  </Badge>
                )
              })}
              {filters.categories.map(categoryId => {
                const category = categoryOptions.find(c => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="text-xs">
                    {category?.label}
                  </Badge>
                )
              })}
              {filters.transactionTypes.map(typeId => {
                const type = transactionTypeOptions.find(t => t.id === typeId)
                return (
                  <Badge key={typeId} variant="secondary" className="text-xs">
                    {type?.label}
                  </Badge>
                )
              })}
              {(filters.amountRange.min || filters.amountRange.max) && (
                <Badge variant="secondary" className="text-xs">
                  Amount: {filters.amountRange.min || '0'} - {filters.amountRange.max || '∞'} AED
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* UAE-Specific Quick Filters */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
              UAE
            </Badge>
            <span className="font-medium text-sm">UAE Quick Filters</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="justify-start text-xs">
              Salik Transactions
            </Button>
            <Button size="sm" variant="outline" className="justify-start text-xs">
              DEWA Payments
            </Button>
            <Button size="sm" variant="outline" className="justify-start text-xs">
              Grocery Stores
            </Button>
            <Button size="sm" variant="outline" className="justify-start text-xs">
              Dubai Mall
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}