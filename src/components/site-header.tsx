"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCommandPalette } from "@/hooks/use-command-palette"
import { mockUser } from "@/lib/mock-data"

// Map pathnames to readable titles
const pageTitles: Record<string, string> = {
  "/dashboard/accounts": "Accounts",
  "/dashboard/transactions": "Transactions",
  "/dashboard/budgets": "Budgets",
  "/dashboard/goals": "Goals",
  "/dashboard/reports": "Reports",
  "/dashboard/ai": "AI Assistant",
  "/dashboard/settings": "Settings",
  "/dashboard/help": "Help",
}

export function SiteHeader() {
  const pathname = usePathname()
  const { open } = useCommandPalette()

  // Special handling for dashboard page - show welcome message instead of title
  const isDashboardHome = pathname === "/dashboard"

  const getHeaderContent = () => {
    if (isDashboardHome) {
      return (
        <div className="flex items-center gap-3">
          <h1 className="text-base font-medium text-foreground">
            Welcome back, {mockUser.name.split(' ')[0]}
          </h1>
        </div>
      )
    }

    const title = pageTitles[pathname] || "Dashboard"
    return <h1 className="text-base font-medium text-foreground">{title}</h1>
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b border-border transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 h-4"
          />
          {getHeaderContent()}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar onClick={open} className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
