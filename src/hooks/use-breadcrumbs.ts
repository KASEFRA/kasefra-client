import { usePathname } from "next/navigation"
import { useMemo } from "react"
import {
  Home,
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  PieChart,
  Target,
  FileText,
  Settings,
  Bot,
  User,
  CreditCard,
  Bell,
  Shield,
  Plus,
  Edit
} from "lucide-react"
import type { BreadcrumbItem } from "@/components/ui/breadcrumb"

const routeConfig: Record<string, { title: string; icon?: any }> = {
  '/dashboard': { title: 'Dashboard', icon: LayoutDashboard },
  '/dashboard/accounts': { title: 'Accounts', icon: Wallet },
  '/dashboard/accounts/add': { title: 'Add Account', icon: Plus },
  '/dashboard/transactions': { title: 'Transactions', icon: ArrowLeftRight },
  '/dashboard/transactions/add': { title: 'Add Transaction', icon: Plus },
  '/dashboard/budgets': { title: 'Budgets', icon: PieChart },
  '/dashboard/budgets/create': { title: 'Create Budget', icon: Plus },
  '/dashboard/goals': { title: 'Goals', icon: Target },
  '/dashboard/goals/create': { title: 'Create Goal', icon: Plus },
  '/dashboard/reports': { title: 'Reports', icon: FileText },
  '/dashboard/ai': { title: 'AI Assistant', icon: Bot },
  '/dashboard/settings': { title: 'Settings', icon: Settings },
  '/dashboard/settings/profile': { title: 'Profile', icon: User },
  '/dashboard/settings/account': { title: 'Account', icon: CreditCard },
  '/dashboard/settings/notifications': { title: 'Notifications', icon: Bell },
  '/dashboard/settings/security': { title: 'Security', icon: Shield },
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname()

  return useMemo(() => {
    if (!pathname || pathname === '/') {
      return [{ title: 'Home', href: '/', icon: Home }]
    }

    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always start with Home for non-root paths
    if (pathname !== '/') {
      breadcrumbs.push({ title: 'Home', href: '/', icon: Home })
    }

    // Build breadcrumbs from path segments
    let currentPath = ''

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Check if this is a dynamic route parameter (like [id])
      if (segment.match(/^\[.*\]$/) || segment.match(/^\d+$/)) {
        // For dynamic routes, try to get a meaningful title
        const parentPath = currentPath.replace(`/${segment}`, '')
        const parentConfig = routeConfig[parentPath]

        if (parentConfig) {
          breadcrumbs.push({
            title: `${parentConfig.title} Details`,
            href: currentPath,
            icon: Edit
          })
        }
        return
      }

      const config = routeConfig[currentPath]

      if (config) {
        // Don't add href for the last segment (current page)
        const isLast = index === pathSegments.length - 1

        breadcrumbs.push({
          title: config.title,
          href: isLast ? undefined : currentPath,
          icon: config.icon
        })
      } else {
        // Fallback for unmapped routes
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
        const isLast = index === pathSegments.length - 1

        breadcrumbs.push({
          title,
          href: isLast ? undefined : currentPath
        })
      }
    })

    return breadcrumbs
  }, [pathname])
}

export function useBreadcrumbsWithCustomTitle(customTitle?: string): BreadcrumbItem[] {
  const defaultBreadcrumbs = useBreadcrumbs()

  return useMemo(() => {
    if (!customTitle || defaultBreadcrumbs.length === 0) {
      return defaultBreadcrumbs
    }

    // Replace the last breadcrumb title with custom title
    const breadcrumbs = [...defaultBreadcrumbs]
    const lastIndex = breadcrumbs.length - 1

    if (lastIndex >= 0) {
      breadcrumbs[lastIndex] = {
        ...breadcrumbs[lastIndex],
        title: customTitle
      }
    }

    return breadcrumbs
  }, [defaultBreadcrumbs, customTitle])
}