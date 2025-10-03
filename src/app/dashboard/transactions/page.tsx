"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
  Filter,
  Search,
  Download,
  Plus,
  Calendar,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  List,
  Grid,
  X
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { mockTransactions, mockAccounts } from "@/lib/mock-data"
import { BankAvatar } from "@/components/accounts/bank-avatar"
import { cn } from "@/lib/utils"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<'grouped' | 'table'>('table')

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<string>('all')

  // Get unique values for filters
  const categories = Array.from(new Set(mockTransactions.map(t => t.category)))
  const transactionTypes = ['income', 'expense', 'transfer']
  const dateRanges = [
    { value: 'all', label: 'All time' },
    { value: 'last30', label: 'Last 30 days' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'last3Months', label: 'Last 3 months' }
  ]

  // Apply all filters
  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions.filter(transaction => {
      // Search filter
      const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(transaction.category)

      // Account filter
      const matchesAccount = selectedAccounts.length === 0 || selectedAccounts.includes(transaction.accountId)

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(transaction.type)

      // Date filter
      let matchesDate = true
      const transactionDate = new Date(transaction.date)
      const now = new Date()

      if (dateRange === 'last30') {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        matchesDate = transactionDate >= thirtyDaysAgo
      } else if (dateRange === 'thisMonth') {
        matchesDate = transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear()
      } else if (dateRange === 'last3Months') {
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
        matchesDate = transactionDate >= threeMonthsAgo
      }

      return matchesSearch && matchesCategory && matchesAccount && matchesType && matchesDate
    })

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchQuery, selectedCategories, selectedAccounts, selectedTypes, dateRange])

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const grouped = filteredTransactions.reduce((acc, transaction) => {
      const date = transaction.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(transaction)
      return acc
    }, {} as { [key: string]: typeof mockTransactions })

    // Sort by date (newest first) and return as array
    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
  }, [filteredTransactions])

  // Use filtered transactions for statistics
  const allTransactions = filteredTransactions

  const totalIncome = allTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = allTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const netFlow = totalIncome - totalExpenses

  // Current month calculations (October 2025)
  const currentMonthTransactions = allTransactions.filter(t =>
    new Date(t.date).getMonth() === 9 && new Date(t.date).getFullYear() === 2025
  )
  const monthlySpending = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const largestPurchase = Math.max(...currentMonthTransactions
    .filter(t => t.type === 'expense')
    .map(t => Math.abs(t.amount)), 0)

  const averageTransaction = allTransactions.length > 0
    ? allTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / allTransactions.length
    : 0

  const incomeVsExpenseRatio = totalExpenses > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0


  const formatCurrency = (amount: number) => {
    return Math.abs(amount).toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED'
    })
  }

  const getAccountName = (accountId: string) => {
    const account = mockAccounts.find(acc => acc.id === accountId)
    return account ? account.name : "Unknown Account"
  }

  const getBankName = (accountId: string) => {
    const account = mockAccounts.find(acc => acc.id === accountId)
    return account ? account.bank : "Unknown Bank"
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Income': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Housing': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Utilities': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      'Childcare': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'Shopping': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
      'Transfer': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      'Groceries': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      'Transportation': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Dining': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'Healthcare': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  }

  const DateGroup = ({
    date,
    dayTransactions
  }: {
    date: string
    dayTransactions: typeof mockTransactions
  }) => {
    const dayTotal = dayTransactions.reduce((sum, t) => sum + t.amount, 0)
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    return (
      <Collapsible defaultOpen className="border-b border-border/50 last:border-b-0">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-muted-foreground">{formattedDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-semibold text-lg",
                dayTotal >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {dayTotal >= 0 ? "+" : ""}{formatCurrency(dayTotal)}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-2">
          <Table>
            <TableBody>
              {dayTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50">
                  {/* Description Column */}
                  <TableCell className="py-4 pl-4 sm:pl-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <BankAvatar
                        bankName={getBankName(transaction.accountId)}
                        size="sm"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <span className="font-medium text-sm truncate">{transaction.description}</span>
                          <Badge variant="secondary" className={cn("text-xs w-fit", getCategoryColor(transaction.category))}>
                            {transaction.category}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{transaction.merchant}</div>
                        <div className="text-xs text-muted-foreground truncate hidden sm:block">
                          {getAccountName(transaction.accountId)}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Amount Column */}
                  <TableCell className="text-right py-4 pr-2 sm:pr-4 whitespace-nowrap">
                    <div className={cn(
                      "font-semibold text-sm sm:text-base",
                      transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.amount >= 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // Count active filters
  const activeFiltersCount = selectedCategories.length + selectedAccounts.length + selectedTypes.length + (dateRange !== 'all' ? 1 : 0)

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedAccounts([])
    setSelectedTypes([])
    setDateRange('all')
    setSearchQuery('')
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Insight Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlySpending)}</div>
            <p className="text-xs text-muted-foreground">
              October 2025 expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageTransaction)}</div>
            <p className="text-xs text-muted-foreground">
              Across all transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Largest Purchase</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(largestPurchase)}</div>
            <p className="text-xs text-muted-foreground">
              This month&apos;s biggest expense
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income vs Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              incomeVsExpenseRatio >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {incomeVsExpenseRatio >= 0 ? "+" : ""}{incomeVsExpenseRatio.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Savings rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
            <CardHeader className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between pb-4">
              <div>
                <CardTitle className="text-base sm:text-lg font-semibold">All Transactions</CardTitle>
                <CardDescription className="text-sm">
                  {allTransactions.length} transactions
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Date</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        <Filter className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                        {activeFiltersCount > 0 && (
                          <span className="ml-1 bg-primary text-primary-foreground rounded-full text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel>Filter Transactions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Categories */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">Categories</DropdownMenuLabel>
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category))
                          }
                        }}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}

                    <DropdownMenuSeparator />

                    {/* Transaction Types */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">Types</DropdownMenuLabel>
                    {transactionTypes.map((type) => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type])
                          } else {
                            setSelectedTypes(selectedTypes.filter(t => t !== type))
                          }
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </DropdownMenuCheckboxItem>
                    ))}

                    <DropdownMenuSeparator />

                    {/* Accounts */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">Accounts</DropdownMenuLabel>
                    {mockAccounts.map((account) => (
                      <DropdownMenuCheckboxItem
                        key={account.id}
                        checked={selectedAccounts.includes(account.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAccounts([...selectedAccounts, account.id])
                          } else {
                            setSelectedAccounts(selectedAccounts.filter(a => a !== account.id))
                          }
                        }}
                      >
                        {account.name}
                      </DropdownMenuCheckboxItem>
                    ))}

                    <DropdownMenuSeparator />

                    {/* Date Range */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">Date Range</DropdownMenuLabel>
                    {dateRanges.map((range) => (
                      <DropdownMenuItem
                        key={range.value}
                        onClick={() => setDateRange(range.value)}
                        className={dateRange === range.value ? "bg-accent" : ""}
                      >
                        {range.label}
                      </DropdownMenuItem>
                    ))}

                    {activeFiltersCount > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={clearFilters}>
                          <X className="mr-2 h-4 w-4" />
                          Clear all filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grouped' ? 'table' : 'grouped')}
                  className="w-full sm:w-auto"
                >
                  {viewMode === 'grouped' ? <Grid className="mr-2 h-4 w-4" /> : <List className="mr-2 h-4 w-4" />}
                  {viewMode === 'grouped' ? 'Table view' : 'Grouped view'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {viewMode === 'grouped' ? (
                <>
                  {/* Table Headers */}
                  <div className="border-b border-border/50">
                    <div className="grid grid-cols-2 gap-4 p-4 text-sm font-medium text-muted-foreground">
                      <div className="pl-8">Description</div>
                      <div className="text-right pr-4">Amount</div>
                    </div>
                  </div>

                  {/* Transaction Groups */}
                  {groupedTransactions.map(([date, dayTransactions]) => (
                    <DateGroup
                      key={date}
                      date={date}
                      dayTransactions={dayTransactions}
                    />
                  ))}
                </>
              ) : (
                <>
                  {/* Standard Table View */}
                  <Table>
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Description</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium">Account</th>
                        <th className="text-right py-3 px-4 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-muted/50">
                          <TableCell className="py-3 px-4">
                            <div className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <BankAvatar
                                bankName={getBankName(transaction.accountId)}
                                size="sm"
                              />
                              <div className="flex flex-col">
                                <div className="font-medium text-sm">{transaction.description}</div>
                                <div className="text-xs text-muted-foreground">{transaction.merchant}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <Badge variant="secondary" className={cn("text-xs", getCategoryColor(transaction.category))}>
                              {transaction.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="text-sm">{getAccountName(transaction.accountId)}</div>
                          </TableCell>
                          <TableCell className="text-right py-3 px-4">
                            <div className={cn(
                              "font-semibold",
                              transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                            )}>
                              {transaction.amount >= 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </CardContent>
      </Card>
    </div>
  )
}