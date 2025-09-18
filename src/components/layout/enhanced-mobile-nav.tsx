"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useTouchGestures } from "@/hooks/use-touch-gestures"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  Plus,
  Home
} from "lucide-react"

const mobileNavigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-blue-600"
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    color: "text-green-600"
  },
  {
    name: "Add",
    href: "/dashboard/transactions/add",
    icon: Plus,
    special: true,
    color: "text-white"
  },
  {
    name: "Budgets",
    href: "/dashboard/budgets",
    icon: PieChart,
    color: "text-purple-600"
  },
  {
    name: "Goals",
    href: "/dashboard/goals",
    icon: Target,
    color: "text-orange-600"
  }
]

interface EnhancedMobileNavProps {
  onQuickAdd?: () => void
}

export function EnhancedMobileNav({ onQuickAdd }: EnhancedMobileNavProps) {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Add haptic feedback for supported devices
  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (navigator.vibrate) {
      const patterns = {
        light: 50,
        medium: 100,
        heavy: 200
      }
      navigator.vibrate(patterns[type])
    }
  }

  // Touch gesture configuration
  const { attachGestures } = useTouchGestures({
    onSwipeUp: () => {
      // Quick action on swipe up
      if (onQuickAdd) {
        hapticFeedback('medium')
        onQuickAdd()
      }
    },
    onSwipeLeft: () => {
      // Navigate to next tab
      hapticFeedback('light')
      // Implementation for tab navigation
    },
    onSwipeRight: () => {
      // Navigate to previous tab
      hapticFeedback('light')
      // Implementation for tab navigation
    },
    threshold: 30
  })

  useEffect(() => {
    if (navRef.current) {
      const cleanup = attachGestures(navRef.current)
      return cleanup
    }
  }, [attachGestures])

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname?.startsWith(href))
  }

  return (
    <nav
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t lg:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Swipe indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
      </div>

      <div className="grid grid-cols-5 h-20 px-2">
        {mobileNavigation.map((item, index) => {
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center relative group"
              onClick={() => hapticFeedback('light')}
              onTouchStart={() => hapticFeedback('light')}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 transition-all duration-200 touch-manipulation",
                  "transform group-active:scale-95",
                  active ? "scale-110" : "group-hover:scale-105"
                )}
              >
                {item.special ? (
                  // Special floating action button
                  <div className="relative">
                    <div
                      className={cn(
                        "w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                        "transform -translate-y-2 group-active:scale-95",
                        "shadow-primary/25 ring-4 ring-background"
                      )}
                    >
                      <item.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-active:scale-150 transition-transform duration-300" />
                  </div>
                ) : (
                  <>
                    {/* Icon container */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>

                    {/* Label */}
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors duration-200",
                        active ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </span>

                    {/* Active indicator */}
                    {active && (
                      <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full animate-pulse" />
                    )}
                  </>
                )}
              </div>

              {/* Touch feedback overlay */}
              <div className="absolute inset-0 rounded-xl bg-current opacity-0 group-active:opacity-10 transition-opacity duration-150" />
            </Link>
          )
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-card/95" />

      {/* Visual feedback for gestures */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 opacity-50">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <span>↑</span>
          <span className="text-[10px]">Quick Add</span>
        </div>
      </div>
    </nav>
  )
}

// Hook for managing mobile navigation state
export function useMobileNavigation() {
  const pathname = usePathname()

  const getCurrentSection = () => {
    if (pathname?.startsWith('/dashboard/transactions')) return 'transactions'
    if (pathname?.startsWith('/dashboard/budgets')) return 'budgets'
    if (pathname?.startsWith('/dashboard/goals')) return 'goals'
    if (pathname?.startsWith('/dashboard/accounts')) return 'accounts'
    return 'dashboard'
  }

  const getNextSection = () => {
    const sections = ['dashboard', 'transactions', 'budgets', 'goals']
    const current = getCurrentSection()
    const currentIndex = sections.indexOf(current)
    return sections[(currentIndex + 1) % sections.length]
  }

  const getPreviousSection = () => {
    const sections = ['dashboard', 'transactions', 'budgets', 'goals']
    const current = getCurrentSection()
    const currentIndex = sections.indexOf(current)
    return sections[(currentIndex - 1 + sections.length) % sections.length]
  }

  return {
    currentSection: getCurrentSection(),
    nextSection: getNextSection(),
    previousSection: getPreviousSection()
  }
}