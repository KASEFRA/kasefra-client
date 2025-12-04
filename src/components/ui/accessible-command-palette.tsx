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
import { useFocusManagement, useScreenReader } from "@/hooks/use-focus-management"

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

interface AccessibleCommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccessibleCommandPalette({ open, onOpenChange }: AccessibleCommandPaletteProps) {
  const [search, setSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [announceResults, setAnnounceResults] = React.useState(false)
  const router = useRouter()
  const { announce } = useScreenReader()
  const { containerRef } = useFocusManagement(open, {
    restoreFocus: true,
    autoFocus: true,
    trapFocus: true
  })

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

  // Announce search results for screen readers
  React.useEffect(() => {
    if (announceResults && search) {
      const resultCount = filteredItems.length
      const message = resultCount === 0
        ? "No results found"
        : `${resultCount} result${resultCount === 1 ? '' : 's'} found`
      announce(message, 'polite')
      setAnnounceResults(false)
    }
  }, [filteredItems.length, search, announceResults, announce])

  const handleSelect = (item: CommandItem) => {
    if (item.action) {
      item.action()
      announce(`Executing ${item.title}`, 'polite')
    } else if (item.href) {
      router.push(item.href)
      announce(`Navigating to ${item.title}`, 'polite')
    }
    onOpenChange(false)
    setSearch("")
    setSelectedIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.min(selectedIndex + 1, filteredItems.length - 1)
      setSelectedIndex(newIndex)

      // Announce the newly focused item
      if (filteredItems[newIndex]) {
        announce(`${filteredItems[newIndex].title}. ${filteredItems[newIndex].subtitle}`, 'polite')
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.max(selectedIndex - 1, 0)
      setSelectedIndex(newIndex)

      if (filteredItems[newIndex]) {
        announce(`${filteredItems[newIndex].title}. ${filteredItems[newIndex].subtitle}`, 'polite')
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onOpenChange(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setSelectedIndex(0)
    setAnnounceResults(true)
  }

  // Reset when opening/closing
  React.useEffect(() => {
    if (open) {
      announce("Command palette opened. Start typing to search for pages and actions.", 'polite')
    } else {
      setSearch("")
      setSelectedIndex(0)
    }
  }, [open, announce])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden p-0 shadow-2xl max-w-2xl"
        ref={containerRef}
        role="dialog"
        aria-label="Command Palette"
        aria-describedby="command-palette-description"
      >
        {/* Screen reader description */}
        <div id="command-palette-description" className="sr-only">
          Use this command palette to quickly navigate to pages or execute actions.
          Type to search, use arrow keys to navigate, and press Enter to select.
        </div>

        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
          <Input
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, actions, and more..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 focus:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Search command palette"
            aria-autocomplete="list"
            aria-controls="command-results"
            aria-activedescendant={filteredItems[selectedIndex] ? `command-item-${selectedIndex}` : undefined}
            role="combobox"
            aria-expanded="true"
          />
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3" />
              K
            </kbd>
          </div>
        </div>

        <div
          className="max-h-96 overflow-y-auto"
          id="command-results"
          role="listbox"
          aria-label="Command palette results"
        >
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="p-2">
              <div
                className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                role="group"
                aria-label={categoryLabels[category as keyof typeof categoryLabels]}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </div>
              <div className="space-y-1" role="group">
                {items.map((item) => {
                  const globalIndex = filteredItems.indexOf(item)
                  const isSelected = globalIndex === selectedIndex

                  return (
                    <div
                      key={item.id}
                      id={`command-item-${globalIndex}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-describedby={`command-item-desc-${globalIndex}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={cn(
                        "flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      )}
                      tabIndex={-1}
                    >
                      <item.icon className="mr-3 h-4 w-4 shrink-0" aria-hidden="true" />
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
                          <div
                            id={`command-item-desc-${globalIndex}`}
                            className="text-xs text-muted-foreground truncate"
                          >
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="ml-2 h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-14 px-6 text-center text-sm" role="status" aria-live="polite">
              <Search className="mx-auto h-6 w-6 text-muted-foreground/60" aria-hidden="true" />
              <p className="mt-4 font-medium">No results found</p>
              <p className="text-muted-foreground">
                Try searching for pages, actions, or help topics
              </p>
            </div>
          )}
        </div>

        <div className="border-t px-3 py-2 text-xs text-muted-foreground" role="status">
          <span aria-label="Keyboard navigation instructions">
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
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}