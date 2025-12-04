"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { CommandPalette } from "@/components/ui/command-palette"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useCommandPalette } from "@/hooks/use-command-palette"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isOpen, setIsOpen } = useCommandPalette()

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem("kasefra-user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
      <CommandPalette open={isOpen} onOpenChange={setIsOpen} />
    </SidebarProvider>
  )
}