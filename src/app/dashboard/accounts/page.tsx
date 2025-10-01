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
        <Button variant="ghost" className="w-full justify-between p-4 h-auto hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <span className="text-lg">{icon}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-muted-foreground">{title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{formatCurrency(total)}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-2">
        <Table>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="hover:bg-muted/50">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3 ml-8">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={cn("font-semibold text-xs", getBankColor(account.bank))}>
                        {getBankInitials(account.bank)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{account.name}</span>
                        <Badge variant="secondary" className={cn("text-xs capitalize", getAccountTypeColor(account.type))}>
                          {account.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{account.bank}</div>
                      <div className="text-xs text-muted-foreground">
                        {account.accountNumber} • Connected {new Date(account.connectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3">
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-right">
                      <div className={cn(
                        "font-semibold",
                        account.type === 'credit' && account.balance < 0 ? "text-red-600" : "text-foreground"
                      )}>
                        {formatCurrency(account.balance)}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <div className="space-y-8 px-6">
      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Accounts List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">All Accounts</CardTitle>
                <CardDescription>
                  {mockAccounts.length} accounts across {new Set(mockAccounts.map(a => a.bank)).size} banks
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh all
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add account
                </Button>
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
                    <Button variant="ghost" className="w-full justify-between p-4 h-auto hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📈</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-muted-foreground">Investments</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{formatCurrency(totalInvestments)}</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-2">
                    <Table>
                      <TableBody>
                        {investmentAccounts.map((account) => (
                          <TableRow key={account.id} className="hover:bg-muted/50">
                            <TableCell className="py-3" colSpan={2}>
                              <div className="flex items-center gap-3 ml-8">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className={cn("font-semibold text-xs", getBankColor(account.bank))}>
                                    {getBankInitials(account.bank)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-sm">{account.name}</span>
                                      <Badge variant="secondary" className={cn("text-xs capitalize", getAccountTypeColor(account.type))}>
                                        {account.type}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                      <div className="text-right">
                                        <div className="font-semibold text-foreground">
                                          {formatCurrency(account.balance)}
                                        </div>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal className="h-4 w-4" />
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
                                  <div className="text-xs text-muted-foreground">{account.bank}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {account.accountNumber} • Connected {new Date(account.connectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </div>

                                  {/* Investment Breakdown */}
                                  <div className="mt-3 space-y-2">
                                    <div className="text-xs font-medium text-muted-foreground">Portfolio Breakdown:</div>
                                    <div className="grid grid-cols-2 gap-2 ml-4">
                                      {Object.entries(investmentsByCategory).map(([category, investments]) => {
                                        const categoryTotal = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
                                        const categoryIcons: Record<string, string> = {
                                          stocks: "📊",
                                          crypto: "₿",
                                          commodity: "🏅",
                                          "real-estate": "🏘️"
                                        };
                                        return (
                                          <div key={category} className="flex items-center justify-between p-2 bg-muted/20 rounded text-xs">
                                            <div className="flex items-center gap-1">
                                              <span>{categoryIcons[category]}</span>
                                              <span className="capitalize font-medium">{category.replace('-', ' ')}</span>
                                            </div>
                                            <span className="font-semibold">{formatCurrency(categoryTotal)}</span>
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Summary</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHideBalances(!hideBalances)}
            >
              {hideBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Cash</div>
                  <div className="text-xs text-muted-foreground">{cashAccounts.length} accounts</div>
                </div>
                <div className="text-sm font-medium">{formatCurrency(totalCash)}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Investments</div>
                  <div className="text-xs text-muted-foreground">{investmentAccounts.length} account</div>
                </div>
                <div className="text-sm font-medium">{formatCurrency(totalInvestments)}</div>
              </div>

              {assetAccounts.length > 0 && (
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Other Assets</div>
                    <div className="text-xs text-muted-foreground">{assetAccounts.length} asset{assetAccounts.length > 1 ? 's' : ''}</div>
                  </div>
                  <div className="text-sm font-medium">{formatCurrency(totalOtherAssets)}</div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Credit Cards</div>
                  <div className="text-xs text-muted-foreground">{creditAccounts.length} account</div>
                </div>
                <div className="text-sm font-medium text-red-600">{formatCurrency(totalDebt)}</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Assets</div>
                <div className="text-sm font-medium">{formatCurrency(totalAssets)}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Liabilities</div>
                <div className="text-sm font-medium text-red-600">{formatCurrency(totalDebt)}</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div className="text-base font-medium">Net Worth</div>
              <div className="text-base font-semibold">{formatCurrency(netWorth)}</div>
            </div>

            <Separator />

            <div className="text-xs text-muted-foreground text-center">
              {mockAccounts.length} accounts across {new Set(mockAccounts.map(a => a.bank)).size} banks
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}