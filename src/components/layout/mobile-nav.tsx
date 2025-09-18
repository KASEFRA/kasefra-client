"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  Settings,
  Plus
} from "lucide-react"

const mobileNavigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Add",
    href: "/dashboard/transactions/add",
    icon: Plus,
    special: true,
  },
  {
    name: "Budgets",
    href: "/dashboard/budgets",
    icon: PieChart,
  },
  {
    name: "Goals",
    href: "/dashboard/goals",
    icon: Target,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t backdrop-blur-lg bg-card/95 lg:hidden">
      <div className="grid grid-cols-5 h-16">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href))

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center h-full space-y-1 text-xs font-medium transition-colors touch-manipulation",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                  item.special && "relative"
                )}
              >
                {item.special ? (
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg -mt-6">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                ) : (
                  <>
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive && "text-primary"
                    )} />
                    <span className={cn(
                      "transition-colors",
                      isActive && "text-primary"
                    )}>
                      {item.name}
                    </span>
                  </>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}