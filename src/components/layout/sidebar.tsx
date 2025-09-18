"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  PieChart,
  Target,
  FileText,
  Settings,
  Bot,
  Wallet
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: Wallet,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
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
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    name: "AI Assistant",
    href: "/dashboard/ai",
    icon: Bot,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  isOpen?: boolean
  isCollapsed?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, isCollapsed = false, onClose }: SidebarProps) {
  const pathname = usePathname()

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
          "fixed inset-y-0 left-0 z-50 transform bg-card/95 backdrop-blur-xl border-r border-border/30 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <TooltipProvider>
            {/* Logo */}
            <div className={cn("flex h-16 items-center", isCollapsed ? "px-4 justify-center" : "px-6")}>
              <div className="flex items-center space-x-2">
                {isCollapsed ? (
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                ) : (
                  <Image
                    src="/logo.png"
                    alt="Kasefra Logo"
                    width={140}
                    height={60}
                    className="rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className={cn("flex-1 py-6 space-y-1", isCollapsed ? "px-2" : "px-4")}>
              {navigation.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href))

                const buttonContent = (
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full h-9 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                      isCollapsed ? "justify-center px-2" : "justify-start px-3",
                      isActive && "bg-primary/15 text-primary shadow-sm hover:bg-primary/20"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Button>
                )

                return (
                  <Link key={item.name} href={item.href}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {buttonContent}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      buttonContent
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* User info */}
          <div className={cn("p-4", isCollapsed && "px-2")}>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">AM</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">Ahmed Al Mansouri</p>
                    <p className="text-xs text-muted-foreground">ahmed@example.com</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">AM</span>
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
            )}
            </div>
          </TooltipProvider>
        </div>
      </aside>
    </>
  )
}