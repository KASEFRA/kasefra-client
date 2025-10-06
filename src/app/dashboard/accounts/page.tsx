"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Eye,
  EyeOff,
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockAccounts } from "@/lib/mock-data"
import { mockInvestments } from "@/lib/mock-data/investments"
import { cn } from "@/lib/utils"

export default function AccountsPage() {
  const [hideBalances, setHideBalances] = useState(false)

  // Group accounts by category
  const cashAccounts = mockAccounts.filter(account =>
    ['checking', 'savings'].includes(account.type)
  )
  const creditAccounts = mockAccounts.filter(account =>
    account.type === 'credit'
  )
  const investmentAccounts = mockAccounts.filter(account =>
    account.type === 'investment'
  )
  const assetAccounts = mockAccounts.filter(account =>
    account.type === 'asset'
  )

  // Group investments by category for detailed breakdown
  const investmentsByCategory = {
    stocks: mockInvestments.filter(inv => inv.category === 'stocks'),
    crypto: mockInvestments.filter(inv => inv.category === 'crypto'),
    commodity: mockInvestments.filter(inv => inv.category === 'commodity'),
    'real-estate': mockInvestments.filter(inv => inv.category === 'real-estate')
  }

  // Calculate category totals
  const totalCash = cashAccounts.reduce((sum, account) => sum + account.balance, 0)
  const totalDebt = creditAccounts.reduce((sum, account) => sum + Math.abs(account.balance), 0)
  const totalInvestments = investmentAccounts.reduce((sum, account) => sum + account.balance, 0)
  const totalOtherAssets = assetAccounts.reduce((sum, account) => sum + account.balance, 0)
  const totalAssets = totalCash + totalInvestments + totalOtherAssets
  const netWorth = totalAssets - totalDebt

  const formatCurrency = (amount: number) => {
    if (hideBalances) return "••••••"
    return Math.abs(amount).toLocaleString('en-AE', {
      style: 'currency',
      currency: 'AED'
    })
  }

  const getBankInitials = (bankName: string) => {
    const bankStyles = {
      "Emirates NBD": "EN",
      "Abu Dhabi Commercial Bank": "AD",
      "First Abu Dhabi Bank": "FA",
      "EFG Hermes": "EF",
      "HSBC UAE": "HS"
    }
    return bankStyles[bankName as keyof typeof bankStyles] || bankName.substring(0, 2).toUpperCase()
  }

  const getBankColor = (bankName: string) => {
    const bankColors = {
      "Emirates NBD": "bg-red-500 text-white",
      "Abu Dhabi Commercial Bank": "bg-blue-600 text-white",
      "First Abu Dhabi Bank": "bg-green-600 text-white",
      "EFG Hermes": "bg-purple-600 text-white",
      "HSBC UAE": "bg-red-600 text-white"
    }
    return bankColors[bankName as keyof typeof bankColors] || "bg-gray-500 text-white"
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'savings':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'credit':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'investment':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const AccountCategory = ({
    title,
    icon,
    total,
    accounts
  }: {
    title: string
    icon: string
    total: number
    accounts: typeof mockAccounts
  }) => (
    <Collapsible defaultOpen className="border-b border-border/50 last:border-b-0">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-2 sm:p-3 h-auto hover:bg-muted/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base lg:text-lg">{icon}</span>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-medium text-xs sm:text-sm text-muted-foreground">{title}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-semibold text-xs sm:text-sm lg:text-base">{formatCurrency(total)}</span>
            <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-muted-foreground" />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-1 sm:pb-2">
        <Table>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="hover:bg-muted/50">
                <TableCell className="py-1.5 sm:py-2 lg:py-3" colSpan={2}>
                  <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-3 ml-3 sm:ml-4 lg:ml-8">
                    {/* Left side: Avatar and account info */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <Avatar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 shrink-0">
                        <AvatarFallback className={cn("font-semibold text-[9px] sm:text-[10px] lg:text-xs", getBankColor(account.bank))}>
                          {getBankInitials(account.bank)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                          <span className="font-medium text-[10px] sm:text-xs lg:text-sm truncate">{account.name}</span>
                          <Badge variant="secondary" className={cn("text-[8px] sm:text-[10px] lg:text-xs capitalize shrink-0", getAccountTypeColor(account.type))}>
                            {account.type}
                          </Badge>
                        </div>
                        <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground truncate">{account.bank}</div>
                        <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground truncate">
                          {account.accountNumber} • Connected {new Date(account.connectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    {/* Right side: Balance and actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0.5 sm:gap-1 lg:gap-2 shrink-0">
                      <div className={cn(
                        "font-semibold text-[10px] sm:text-xs lg:text-sm whitespace-nowrap",
                        account.type === 'credit' && account.balance < 0 ? "text-red-600" : "text-foreground"
                      )}>
                        {formatCurrency(account.balance)}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Account
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Balance
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-3 sm:px-4 lg:px-6">
      {/* Main Content */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Accounts List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-col space-y-3 pb-3 sm:pb-4 px-3 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-sm sm:text-base lg:text-lg font-semibold">All Accounts</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {mockAccounts.length} accounts across {new Set(mockAccounts.map(a => a.bank)).size} banks
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                    <RefreshCw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Refresh all</span>
                    <span className="sm:hidden">Refresh</span>
                  </Button>
                  <Button size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                    <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Add account</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {cashAccounts.length > 0 && (
                <AccountCategory
                  title="Cash"
                  icon="💰"
                  total={totalCash}
                  accounts={cashAccounts}
                />
              )}

              {creditAccounts.length > 0 && (
                <AccountCategory
                  title="Credit Cards"
                  icon="💳"
                  total={-totalDebt}
                  accounts={creditAccounts}
                />
              )}

              {assetAccounts.length > 0 && (
                <AccountCategory
                  title="Assets"
                  icon="🏨"
                  total={totalOtherAssets}
                  accounts={assetAccounts}
                />
              )}

              {investmentAccounts.length > 0 && (
                <Collapsible defaultOpen className="border-b border-border/50 last:border-b-0">
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-2 sm:p-3 h-auto hover:bg-muted/50">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-sm sm:text-base lg:text-lg">📈</span>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="font-medium text-xs sm:text-sm text-muted-foreground">Investments</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="font-semibold text-xs sm:text-sm lg:text-base">{formatCurrency(totalInvestments)}</span>
                        <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-muted-foreground" />
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-1 sm:pb-2">
                    <Table>
                      <TableBody>
                        {investmentAccounts.map((account) => (
                          <TableRow key={account.id} className="hover:bg-muted/50">
                            <TableCell className="py-1.5 sm:py-2 lg:py-3" colSpan={2}>
                              <div className="flex items-center gap-2 sm:gap-3 ml-3 sm:ml-4 lg:ml-8">
                                <Avatar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8">
                                  <AvatarFallback className={cn("font-semibold text-[9px] sm:text-[10px] lg:text-xs", getBankColor(account.bank))}>
                                    {getBankInitials(account.bank)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-0.5 sm:mb-1 gap-2">
                                    <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 min-w-0 flex-wrap">
                                      <span className="font-medium text-[10px] sm:text-xs lg:text-sm truncate">{account.name}</span>
                                      <Badge variant="secondary" className={cn("text-[8px] sm:text-[10px] lg:text-xs capitalize shrink-0", getAccountTypeColor(account.type))}>
                                        {account.type}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-end gap-0.5 sm:gap-1 lg:gap-2 shrink-0">
                                      <div className="text-right">
                                        <div className="font-semibold text-[10px] sm:text-xs lg:text-sm text-foreground">
                                          {formatCurrency(account.balance)}
                                        </div>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Account
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Sync Balance
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Remove Account
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground truncate">{account.bank}</div>
                                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground truncate">
                                    {account.accountNumber} • Connected {new Date(account.connectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </div>

                                  {/* Investment Breakdown */}
                                  <div className="mt-1.5 sm:mt-2 lg:mt-3 space-y-1 sm:space-y-1.5 lg:space-y-2">
                                    <div className="text-[9px] sm:text-[10px] lg:text-xs font-medium text-muted-foreground">Portfolio Breakdown:</div>
                                    <div className="grid grid-cols-1 gap-1 sm:gap-1.5 lg:gap-2 ml-0 sm:ml-2 lg:ml-4">
                                      {Object.entries(investmentsByCategory).map(([category, investments]) => {
                                        const categoryTotal = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
                                        const categoryIcons: Record<string, string> = {
                                          stocks: "📊",
                                          crypto: "₿",
                                          commodity: "🏅",
                                          "real-estate": "🏘️"
                                        };
                                        return (
                                          <div key={category} className="flex items-center justify-between p-1 sm:p-1.5 lg:p-2 bg-muted/20 rounded">
                                            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                                              <span className="text-[10px] sm:text-xs lg:text-sm shrink-0">{categoryIcons[category]}</span>
                                              <span className="capitalize font-medium text-[9px] sm:text-[10px] lg:text-xs truncate">{category.replace('-', ' ')}</span>
                                            </div>
                                            <span className="font-semibold text-[9px] sm:text-[10px] lg:text-xs shrink-0">{formatCurrency(categoryTotal)}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3 lg:pb-4 px-3 sm:px-6">
            <CardTitle className="text-xs sm:text-sm lg:text-base font-medium">Summary</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-6 sm:h-7 lg:h-8 px-2 sm:px-3"
              onClick={() => setHideBalances(!hideBalances)}
            >
              {hideBalances ? <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" /> : <EyeOff className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />}
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 lg:space-y-4 pb-3 sm:pb-4 px-3 sm:px-6">
            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center gap-2">
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Cash</div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground">{cashAccounts.length} accounts</div>
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-medium shrink-0">{formatCurrency(totalCash)}</div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Investments</div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground">{investmentAccounts.length} account</div>
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-medium shrink-0">{formatCurrency(totalInvestments)}</div>
              </div>

              {assetAccounts.length > 0 && (
                <div className="flex justify-between items-center gap-2">
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Other Assets</div>
                    <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground">{assetAccounts.length} asset{assetAccounts.length > 1 ? 's' : ''}</div>
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm font-medium shrink-0">{formatCurrency(totalOtherAssets)}</div>
                </div>
              )}

              <div className="flex justify-between items-center gap-2">
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Credit Cards</div>
                  <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground">{creditAccounts.length} account</div>
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-medium text-red-600 shrink-0">{formatCurrency(totalDebt)}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center gap-2">
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Assets</div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-medium">{formatCurrency(totalAssets)}</div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">Liabilities</div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-medium text-red-600">{formatCurrency(totalDebt)}</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center gap-2">
              <div className="text-xs sm:text-sm lg:text-base font-medium">Net Worth</div>
              <div className="text-xs sm:text-sm lg:text-base font-semibold">{formatCurrency(netWorth)}</div>
            </div>

            <Separator />

            <div className="text-[9px] sm:text-[10px] lg:text-xs text-muted-foreground text-center">
              {mockAccounts.length} accounts across {new Set(mockAccounts.map(a => a.bank)).size} banks
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}