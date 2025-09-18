"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Filter, 
  Search, 
  Download, 
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockTransactions, mockAccounts } from "@/lib/mock-data"
import { AiCategorizer } from "@/components/transactions/ai-categorizer"
import Link from "next/link"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState(mockTransactions)
  const [showAiCategorizer, setShowAiCategorizer] = useState(false)
  
  const itemsPerPage = 20

  // Get unique categories
  const categories = Array.from(new Set(mockTransactions.map(t => t.category)))

  // Handle AI categorization
  const handleCategorize = (transactionId: string, category: string) => {
    setTransactions(prevTransactions => 
      prevTransactions.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, category }
          : transaction
      )
    )
  }

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesAccount = selectedAccount === "all" || transaction.accountId === selectedAccount
      const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
      const matchesType = selectedType === "all" || transaction.type === selectedType

      return matchesSearch && matchesAccount && matchesCategory && matchesType
    })

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      if (sortBy === "date") {
        aValue = new Date(a.date).getTime()
        bValue = new Date(b.date).getTime()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [searchQuery, selectedAccount, selectedCategory, selectedType, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Calculate statistics
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const getAccountName = (accountId: string) => {
    const account = mockAccounts.find(acc => acc.id === accountId)
    return account ? account.name : "Unknown Account"
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'expense': return 'bg-red-100 text-red-800 hover:bg-red-100'
      case 'transfer': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedAccount("all")
    setSelectedCategory("all")
    setSelectedType("all")
    setCurrentPage(1)
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            Track and manage all your financial transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="btn-outline-premium"
            onClick={() => setShowAiCategorizer(!showAiCategorizer)}
          >
            AI Categorize
          </Button>
          <Button variant="outline" size="sm" className="btn-outline-premium">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="btn-premium">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="metrics-grid-3">
        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Income</CardTitle>
            <div className="icon-container bg-emerald-100 dark:bg-emerald-900/20">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {totalIncome.toLocaleString('en-AE', {
                style: 'currency',
                currency: 'AED'
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              From {filteredTransactions.filter(t => t.type === 'income').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Expenses</CardTitle>
            <div className="icon-container bg-red-100 dark:bg-red-900/20">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {totalExpenses.toLocaleString('en-AE', {
                style: 'currency',
                currency: 'AED'
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              From {filteredTransactions.filter(t => t.type === 'expense').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card hover-lift border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Net Flow</CardTitle>
            <div className="icon-container bg-blue-100 dark:bg-blue-900/20">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold mb-2 ${totalIncome - totalExpenses >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {(totalIncome - totalExpenses).toLocaleString('en-AE', {
                style: 'currency',
                currency: 'AED'
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredTransactions.length} transactions shown
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Categorizer */}
      {showAiCategorizer && (
        <AiCategorizer 
          transactions={transactions}
          onCategorize={handleCategorize}
        />
      )}

      {/* Transactions Table with Integrated Filters */}
      <Card className="premium-card hover-lift border-0 shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Transactions</CardTitle>
                <CardDescription className="text-base">
                  Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
                </CardDescription>
              </div>
            </div>
            
            {/* Integrated Filters */}
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Account Filter */}
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  {mockAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-32">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {setSortBy("date"); setSortOrder("desc")}}>
                    Date (Newest)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {setSortBy("date"); setSortOrder("asc")}}>
                    Date (Oldest)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {setSortBy("amount"); setSortOrder("desc")}}>
                    Amount (High to Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {setSortBy("amount"); setSortOrder("asc")}}>
                    Amount (Low to High)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Filters */}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {paginatedTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Account</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-right py-3 px-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4">
                        <Link 
                          href={`/dashboard/transactions/${transaction.id}`}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {transaction.date}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Link 
                          href={`/dashboard/transactions/${transaction.id}`}
                          className="hover:text-primary"
                        >
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{transaction.merchant}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {getAccountName(transaction.accountId)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getTransactionTypeColor(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount.toLocaleString('en-AE', {
                            style: 'currency',
                            currency: transaction.currency
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found matching your filters</p>
              <Button variant="outline" onClick={clearFilters} className="mt-2">
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}