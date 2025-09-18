"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  ArrowRight,
  Settings,
  Calculator,
  TrendingUp,
  Wallet,
  Target,
  PieChart,
  FileText,
  Bot,
  Plus,
  Command
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  href?: string
  action?: () => void
  icon: React.ComponentType<{ className?: string }>
  keywords: string[]
  category: 'pages' | 'actions' | 'recent' | 'help'
  badge?: string
}

const commandItems: CommandItem[] = [
  // Pages
  {
    id: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Overview of your finances',
    href: '/dashboard',
    icon: TrendingUp,
    keywords: ['dashboard', 'home', 'overview', 'main'],
    category: 'pages'
  },
  {
    id: 'accounts',
    title: 'Accounts',
    subtitle: 'Manage your bank accounts',
    href: '/dashboard/accounts',
    icon: Wallet,
    keywords: ['accounts', 'banks', 'balance', 'money'],
    category: 'pages'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    subtitle: 'View transaction history',
    href: '/dashboard/transactions',
    icon: ArrowRight,
    keywords: ['transactions', 'history', 'payments', 'expenses'],
    category: 'pages'
  },
  {
    id: 'budgets',
    title: 'Budgets',
    subtitle: 'Plan your spending',
    href: '/dashboard/budgets',
    icon: PieChart,
    keywords: ['budgets', 'planning', 'spending', 'limits'],
    category: 'pages'
  },
  {
    id: 'goals',
    title: 'Goals',
    subtitle: 'Track financial goals',
    href: '/dashboard/goals',
    icon: Target,
    keywords: ['goals', 'targets', 'savings', 'dreams'],
    category: 'pages'
  },
  {
    id: 'reports',
    title: 'Reports',
    subtitle: 'Financial analysis and insights',
    href: '/dashboard/reports',
    icon: FileText,
    keywords: ['reports', 'analytics', 'insights', 'analysis'],
    category: 'pages'
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    subtitle: 'Get financial advice',
    href: '/dashboard/ai',
    icon: Bot,
    keywords: ['ai', 'assistant', 'help', 'advice', 'chat'],
    category: 'pages'
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'Account and app preferences',
    href: '/dashboard/settings',
    icon: Settings,
    keywords: ['settings', 'preferences', 'profile', 'configuration'],
    category: 'pages'
  },

  // Quick Actions
  {
    id: 'add-transaction',
    title: 'Add Transaction',
    subtitle: 'Record a new transaction',
    href: '/dashboard/transactions/add',
    icon: Plus,
    keywords: ['add', 'new', 'transaction', 'record', 'expense', 'income'],
    category: 'actions',
    badge: 'Quick'
  },
  {
    id: 'create-budget',
    title: 'Create Budget',
    subtitle: 'Set up a new budget',
    href: '/dashboard/budgets/create',
    icon: Plus,
    keywords: ['create', 'budget', 'new', 'plan'],
    category: 'actions',
    badge: 'Quick'
  },
  {
    id: 'add-goal',
    title: 'Add Goal',
    subtitle: 'Set a new financial goal',
    href: '/dashboard/goals/create',
    icon: Plus,
    keywords: ['add', 'goal', 'target', 'save', 'new'],
    category: 'actions',
    badge: 'Quick'
  },
  {
    id: 'zakat-calculator',
    title: 'Zakat Calculator',
    subtitle: 'Calculate your Zakat amount',
    action: () => console.log('Open Zakat Calculator'),
    icon: Calculator,
    keywords: ['zakat', 'calculator', 'islamic', 'charity', 'uae'],
    category: 'actions',
    badge: 'UAE'
  }
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()

  const filteredItems = React.useMemo(() => {
    if (!search) {
      return commandItems.filter(item => item.category === 'recent' || item.category === 'pages')
    }

    const searchTerm = search.toLowerCase()
    return commandItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.subtitle?.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    )
  }, [search])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}

    filteredItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })

    return groups
  }, [filteredItems])

  const categoryLabels = {
    recent: 'Recent',
    pages: 'Pages',
    actions: 'Actions',
    help: 'Help'
  }

  const handleSelect = (item: CommandItem) => {
    if (item.action) {
      item.action()
    } else if (item.href) {
      router.push(item.href)
    }
    onOpenChange(false)
    setSearch("")
    setSelectedIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex])
      }
    }
  }

  // Reset selection when search changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Reset search when closing
  React.useEffect(() => {
    if (!open) {
      setSearch("")
      setSelectedIndex(0)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl max-w-2xl">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, actions, and more..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 focus:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" />
              K
            </kbd>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="p-2">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </div>
              <div className="space-y-1">
                {items.map((item) => {
                  const globalIndex = filteredItems.indexOf(item)
                  const isSelected = globalIndex === selectedIndex

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors",
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs text-muted-foreground truncate">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-14 px-6 text-center text-sm">
              <Search className="mx-auto h-6 w-6 text-muted-foreground/60" />
              <p className="mt-4 font-medium">No results found</p>
              <p className="text-muted-foreground">
                Try searching for pages, actions, or help topics
              </p>
            </div>
          )}
        </div>

        <div className="border-t px-3 py-2 text-xs text-muted-foreground">
          Use{" "}
          <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium">
            ↑↓
          </kbd>{" "}
          to navigate,{" "}
          <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium">
            Enter
          </kbd>{" "}
          to select,{" "}
          <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium">
            Esc
          </kbd>{" "}
          to close
        </div>
      </DialogContent>
    </Dialog>
  )
}