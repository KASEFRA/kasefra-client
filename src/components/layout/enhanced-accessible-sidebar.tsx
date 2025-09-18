"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { useFocusManagement, useScreenReader, useSkipLinks } from "@/hooks/use-focus-management"
import { AnimatedButton, SlideIn, StaggeredList, HoverScale, useRipple } from "@/components/ui/micro-interactions"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  FileText,
  Settings,
  Bot,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    shortcut: "D"
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: Wallet,
    shortcut: "A"
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    shortcut: "T"
  },
  {
    name: "Budgets",
    href: "/dashboard/budgets",
    icon: PieChart,
    shortcut: "B"
  },
  {
    name: "Goals",
    href: "/dashboard/goals",
    icon: Target,
    shortcut: "G"
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    shortcut: "R"
  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai",
    icon: Bot,
    badge: "Smart",
    shortcut: "I"
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    shortcut: "S"
  }
]

const quickActions = [
  {
    name: "Add Transaction",
    href: "/dashboard/transactions/add",
    icon: Plus,
    color: "bg-green-500/10 text-green-700 dark:text-green-400",
    shortcut: "N"
  },
  {
    name: "Create Budget",
    href: "/dashboard/budgets/create",
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    shortcut: "C"
  }
]

interface EnhancedAccessibleSidebarProps {
  onClose?: () => void
}

function SidebarToggle() {
  const { isCollapsed, toggleCollapsed, isMobile } = useSidebarState()
  const { announce } = useScreenReader()
  const { addRipple, rippleElements } = useRipple()

  if (isMobile) return null

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e)
    toggleCollapsed()
    announce(isCollapsed ? "Sidebar expanded" : "Sidebar collapsed", 'polite')
  }

  return (
    <AnimatedButton
      variant="outline"
      size="icon"
      className={cn(
        "absolute -right-4 top-8 z-20 h-8 w-8 rounded-full border bg-background shadow-md transition-all duration-200 overflow-hidden",
        "hover:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      onClick={handleToggle}
      aria-label={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
      {rippleElements}
    </AnimatedButton>
  )
}

function NavigationItem({
  item,
  isCollapsed,
  index
}: {
  item: Omit<typeof navigation[0], 'description'>,
  isCollapsed: boolean,
  index: number
}) {
  const pathname = usePathname()
  const { announce } = useScreenReader()
  const { addRipple, rippleElements } = useRipple()

  const isActive = pathname === item.href ||
    (item.href !== "/dashboard" && pathname?.startsWith(item.href))

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRipple(e)
    announce(`Navigating to ${item.name}`, 'polite')
  }

  const content = (
    <AnimatedButton
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start h-12 px-4 rounded-lg transition-all duration-200 group relative overflow-hidden",
        isActive && "bg-primary/10 text-primary hover:bg-primary/20",
        isCollapsed && "h-12 w-12 p-0 justify-center",
        "focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}
      onClick={handleClick}
      aria-label={`${item.name}${item.shortcut ? `. Shortcut: Alt + ${item.shortcut}` : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <item.icon className={cn(
        "h-5 w-5 shrink-0 transition-all duration-200",
        !isCollapsed && "mr-4"
      )} />

      {!isCollapsed && (
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium truncate">{item.name}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {item.badge}
              </Badge>
            )}
          </div>
          {/* Description removed as requested */}
        </div>
      )}

      {rippleElements}
    </AnimatedButton>
  )

  if (isCollapsed) {
    return (
      <SlideIn direction="right" delay={index * 0.05}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={item.href} tabIndex={-1}>
                {content}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <div className="space-y-1">
                <div className="font-medium">{item.name}</div>
                {item.shortcut && (
                  <div className="text-xs text-muted-foreground">
                    Alt + {item.shortcut}
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SlideIn>
    )
  }

  return (
    <SlideIn direction="right" delay={index * 0.05}>
      <Link href={item.href} tabIndex={-1}>
        {content}
      </Link>
    </SlideIn>
  )
}

export function EnhancedAccessibleSidebar({ onClose }: EnhancedAccessibleSidebarProps) {
  const { isOpen, isCollapsed, isMobile } = useSidebarState()
  const pathname = usePathname()
  const { announce } = useScreenReader()

  // Focus management for the sidebar
  const { containerRef } = useFocusManagement(isOpen && isMobile, {
    restoreFocus: true,
    autoFocus: false,
    trapFocus: isMobile
  })

  // Initialize skip links
  useSkipLinks()

  // Keyboard shortcuts for navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const shortcutMap: Record<string, string> = {
          'd': '/dashboard',
          'a': '/dashboard/accounts',
          't': '/dashboard/transactions',
          'b': '/dashboard/budgets',
          'g': '/dashboard/goals',
          'r': '/dashboard/reports',
          'i': '/dashboard/ai',
          's': '/dashboard/settings',
          'n': '/dashboard/transactions/add',
          'c': '/dashboard/budgets/create'
        }

        const route = shortcutMap[e.key.toLowerCase()]
        if (route && pathname !== route) {
          e.preventDefault()
          window.location.href = route
          announce(`Navigating to ${route}`, 'assertive')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pathname, announce])

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        data-skip-link
        className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md transition-transform -translate-y-full focus:translate-y-0"
      >
        Skip to main content
      </a>

      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onTouchStart={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <SlideIn direction="left">
        <aside
          ref={containerRef}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
            // Mobile styles
            isMobile ? [
              "w-72",
              isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            ] : [
              // Desktop styles
              "lg:relative lg:translate-x-0",
              isCollapsed ? "w-[4.5rem]" : "w-72" // 4.5rem = 72px, matches margin
            ]
          )}
          role="navigation"
          aria-label="Main navigation"
          aria-expanded={isMobile ? isOpen : !isCollapsed}
        >
          {/* Toggle button for desktop */}
          <SidebarToggle />

          {/* Logo section */}
          <HoverScale>
            <div className={cn(
              "flex items-center border-b transition-all duration-300",
              isCollapsed ? "h-16 px-6 justify-center" : "h-16 px-6 space-x-3"
            )}>
              <div className="flex items-center space-x-2 min-w-0">
                <Image
                  src="/logo.png"
                  alt="Kasefra Logo"
                  width={isCollapsed ? 38 : 140}
                  height={isCollapsed ? 16 : 80}
                  className="rounded-lg shrink-0 transition-all duration-300"
                />

              </div>
            </div>
          </HoverScale>

          {/* Navigation content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Main navigation */}
            <nav className="space-y-2" role="navigation" aria-label="Main navigation">
              <StaggeredList delay={0.05}>
                {navigation.map((item, index) => (
                  <NavigationItem key={item.name} item={item} isCollapsed={isCollapsed} index={index} />
                ))}
              </StaggeredList>
            </nav>

            {/* Quick actions */}
            {!isCollapsed && (
              <SlideIn direction="up" delay={0.3}>
                <div>
                  <div className="px-4 py-3">
                    <h3
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                      id="quick-actions-heading"
                    >
                      Quick Actions
                    </h3>
                  </div>
                  <div className="space-y-2" role="group" aria-labelledby="quick-actions-heading">
                    <StaggeredList delay={0.1}>
                      {quickActions.map((action) => (
                        <HoverScale key={action.name}>
                          <Link href={action.href} tabIndex={-1}>
                            <AnimatedButton
                              variant="ghost"
                              className="w-full justify-start h-10 px-4 text-sm transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              aria-label={`${action.name}. Shortcut: Alt + ${action.shortcut}`}
                            >
                              <div className={cn(
                                "mr-3 h-6 w-6 rounded-md flex items-center justify-center shrink-0",
                                action.color
                              )}>
                                <action.icon className="h-3 w-3" />
                              </div>
                              <span className="truncate">{action.name}</span>
                            </AnimatedButton>
                          </Link>
                        </HoverScale>
                      ))}
                    </StaggeredList>
                  </div>
                </div>
              </SlideIn>
            )}
          </div>

          {/* User section */}
          <SlideIn direction="up" delay={0.4}>
            <div className="border-t p-4">
              <div className={cn(
                "flex items-center transition-all duration-300",
                isCollapsed ? "justify-center" : "space-x-3"
              )}>
                <div
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0"
                  role="img"
                  aria-label="User avatar"
                >
                  <span className="text-sm font-medium text-primary">AM</span>
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      Ahmed Al Mansouri
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      ahmed@example.com
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SlideIn>

          {/* Keyboard shortcut hint */}
          {!isCollapsed && !isMobile && (
            <SlideIn direction="up" delay={0.5}>
              <div className="border-t px-4 py-2" role="status" aria-label="Keyboard shortcuts available">
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium">
                    Ctrl + B
                  </kbd>
                  <span className="ml-2">to toggle</span>
                </div>
                <div className="text-center text-xs text-muted-foreground mt-1">
                  <span>Alt + letter for quick nav</span>
                </div>
              </div>
            </SlideIn>
          )}
        </aside>
      </SlideIn>
    </>
  )
}