"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MobileHeader } from "@/components/layout/mobile-header"
import { MobileNav } from "@/components/layout/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()

  // Check authentication on mount
  useEffect(() => {
    const user = localStorage.getItem("kasefra-user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile Header */}
      <MobileHeader onMenuOpen={() => setSidebarOpen(true)} />

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onToggleCollapse={toggleSidebarCollapse}
          isCollapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="py-8 pb-20 lg:pb-8">
          <div className="px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}