"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Map pathnames to readable titles
const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
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
  const title = pageTitles[pathname] || "Dashboard"

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b border-border transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4"
        />
        <h1 className="text-base font-medium text-foreground">{title}</h1>
      </div>
    </header>
  )
}
