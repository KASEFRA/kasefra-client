"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileTextIcon,
  GoalIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  PieChartIcon,
  SettingsIcon,
  TrendingUpIcon,
  WalletIcon,
  BrainIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Munsif",
    email: "munsif@kasefra.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Accounts",
      url: "/dashboard/accounts",
      icon: WalletIcon,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: CreditCardIcon,
    },
    {
      title: "Budgets",
      url: "/dashboard/budgets",
      icon: PieChartIcon,
    },
    {
      title: "Goals",
      url: "/dashboard/goals",
      icon: GoalIcon,
    },
    {
      title: "Investments",
      url: "/dashboard/investments",
      icon: TrendingUpIcon,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: BarChartIcon,
    },
    {
      title: "AI Assistant",
      url: "/dashboard/ai",
      icon: BrainIcon,
    },
  ],
  navClouds: [
    {
      title: "Banking",
      icon: WalletIcon,
      isActive: true,
      url: "/dashboard/accounts",
      items: [
        {
          title: "All Accounts",
          url: "/dashboard/accounts",
        },
        {
          title: "Credit Cards",
          url: "/dashboard/accounts?type=credit",
        },
        {
          title: "Savings",
          url: "/dashboard/accounts?type=savings",
        },
      ],
    },
    {
      title: "Analytics",
      icon: TrendingUpIcon,
      url: "/dashboard/reports",
      items: [
        {
          title: "Spending Analysis",
          url: "/dashboard/reports?type=spending",
        },
        {
          title: "Income Trends",
          url: "/dashboard/reports?type=income",
        },
        {
          title: "Net Worth",
          url: "/dashboard/reports?type=networth",
        },
      ],
    },
    {
      title: "Financial Planning",
      icon: GoalIcon,
      url: "/dashboard/goals",
      items: [
        {
          title: "Savings Goals",
          url: "/dashboard/goals?type=savings",
        },
        {
          title: "Investment Goals",
          url: "/dashboard/goals?type=investment",
        },
        {
          title: "Debt Goals",
          url: "/dashboard/goals?type=debt",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/dashboard/help",
      icon: HelpCircleIcon,
    },
  ],
  documents: [
    {
      name: "Financial Reports",
      url: "/dashboard/reports",
      icon: FileTextIcon,
    },
    {
      name: "Export Data",
      url: "/dashboard/reports?export=true",
      icon: FileTextIcon,
    },
    {
      name: "Account Statements",
      url: "/dashboard/accounts",
      icon: FileTextIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <Image
                  src="/logo.png"
                  alt="Kasefra Logo"
                  width={240}
                  height={120}
                  className="h-auto w-24 rounded"
                />

              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
