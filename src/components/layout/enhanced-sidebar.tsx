"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  FileText,
  Settings,
  Bot,
  Wallet,
  ChevronDown,
  ChevronRight,
  Plus,
  TrendingUp,
  CreditCard,
  Banknote,
  Receipt,
  Calculator,
  User,
  Bell,
  Shield,
  Zap
} from "lucide-react"

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavigationItem[]
  description?: string
}

const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,

  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: Wallet,
    children: [
      {
        name: "All Accounts",
        href: "/dashboard/accounts",
        icon: Wallet
      },
      {
        name: "Add Account",
        href: "/dashboard/accounts/add",
        icon: Plus
      },
      {
        name: "Account Analysis",
        href: "/dashboard/accounts/analysis",
        icon: TrendingUp
      }
    ]
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    children: [
      {
        name: "All Transactions",
        href: "/dashboard/transactions",
        icon: Receipt
      },
      {
        name: "Add Transaction",
        href: "/dashboard/transactions/add",
        icon: Plus
      },
      {
        name: "Categories",
        href: "/dashboard/transactions/categories",
        icon: PieChart
      }
    ]
  },
  {
    name: "Budgets",
    href: "/dashboard/budgets",
    icon: PieChart,
    children: [
      {
        name: "Active Budgets",
        href: "/dashboard/budgets",
        icon: PieChart
      },
      {
        name: "Create Budget",
        href: "/dashboard/budgets/create",
        icon: Plus
      }
    ]
  },
  {
    name: "Goals",
    href: "/dashboard/goals",
    icon: Target,
    children: [
      {
        name: "My Goals",
        href: "/dashboard/goals",
        icon: Target
      },
      {
        name: "Add Goal",
        href: "/dashboard/goals/create",
        icon: Plus
      }
    ]
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,

  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai",
    icon: Bot,
    badge: "Smart",

  }
]

const settingsNavigation: NavigationItem[] = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "App preferences",
    children: [
      {
        name: "Profile",
        href: "/dashboard/settings/profile",
        icon: User
      },
      {
        name: "Account",
        href: "/dashboard/settings/account",
        icon: CreditCard
      },
      {
        name: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell
      },
      {
        name: "Security",
        href: "/dashboard/settings/security",
        icon: Shield
      }
    ]
  }
]

const quickActions = [
  {
    name: "Add Transaction",
    href: "/dashboard/transactions/add",
    icon: Plus,
    color: "bg-green-500/10 text-green-700 dark:text-green-400"
  },
  {
    name: "Zakat Calculator",
    href: "/dashboard/tools/zakat",
    icon: Calculator,
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-400"
  },
  {
    name: "AI Insights",
    href: "/dashboard/ai",
    icon: Zap,
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400"
  }
]

interface EnhancedSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

function NavigationGroup({
  items,
  title,
  className
}: {
  items: NavigationItem[]
  title?: string
  className?: string
}) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname?.startsWith(href))
  }

  const isParentActive = (item: NavigationItem) => {
    if (isActive(item.href)) return true
    if (item.children) {
      return item.children.some(child => isActive(child.href))
    }
    return false
  }

  return (
    <div className={className}>
      {title && (
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expandedItems.includes(item.name)
          const parentActive = isParentActive(item)

          return (
            <div key={item.name}>
              {/* Parent Item */}
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className="flex-1"
                >
                  <Button
                    variant={parentActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-11 px-3 rounded-lg touch-manipulation group",
                      parentActive && "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </Button>
                </Link>

                {/* Expand/Collapse Button */}
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-11 w-8 p-0 hover:bg-accent"
                    onClick={() => toggleExpanded(item.name)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>

              {/* Child Items */}
              {hasChildren && isExpanded && (
                <div className="ml-6 mt-1 space-y-1 border-l border-border/50 pl-3">
                  {item.children!.map((child) => (
                    <Link key={child.name} href={child.href}>
                      <Button
                        variant={isActive(child.href) ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start h-9 px-3 text-sm rounded-md touch-manipulation",
                          isActive(child.href) && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                      >
                        <child.icon className="mr-2 h-4 w-4" />
                        {child.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function EnhancedSidebar({ isOpen = true, onClose }: EnhancedSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onTouchStart={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-card border-r transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Kasefra Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <h1 className="font-bold text-lg">Kasefra</h1>
                <p className="text-xs text-muted-foreground">Smart Finance</p>
              </div>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {/* Main Navigation */}
            <NavigationGroup items={navigation} />

            {/* Quick Actions */}
            <div>
              <div className="px-1 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-1">
                {quickActions.map((action) => (
                  <Link key={action.name} href={action.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-9 px-3 text-sm touch-manipulation"
                    >
                      <div className={cn("mr-2 h-6 w-6 rounded-md flex items-center justify-center", action.color)}>
                        <action.icon className="h-3 w-3" />
                      </div>
                      {action.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Settings */}
            <NavigationGroup items={settingsNavigation} title="Account" />
          </div>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">AM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Ahmed Al Mansouri
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  ahmed@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}