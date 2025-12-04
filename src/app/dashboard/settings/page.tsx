"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  CreditCard,
  Smartphone,
  Zap,
  Save,
  RefreshCw,
  ChevronRight,
  ArrowLeft
} from "lucide-react"
import { ProfileForm } from "@/components/settings/profile-form"
import { SecuritySettings } from "@/components/settings/security-settings"
import { PreferencesForm } from "@/components/settings/preferences-form"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ThemeSettings } from "@/components/settings/theme-settings"
import { AIAssistantSettings } from "@/components/settings/ai-assistant-settings"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [desktopActiveSection, setDesktopActiveSection] = useState<string>('profile')

  const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Personal information', component: ProfileForm },
    { id: 'security', label: 'Security', icon: Shield, description: 'Password & privacy', component: SecuritySettings },
    { id: 'preferences', label: 'Preferences', icon: Settings, description: 'App behavior', component: PreferencesForm },
    { id: 'theme', label: 'Appearance', icon: Palette, description: 'Theme & display', component: ThemeSettings },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts & updates', component: NotificationSettings },
    { id: 'ai', label: 'AI Assistant', icon: Zap, description: 'Smart features', component: AIAssistantSettings }
  ]

  // Observer for desktop scroll-based navigation
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return // Only for desktop

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace('section-', '')
            setDesktopActiveSection(sectionId)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    settingsSections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (sectionId: string) => {
    // For mobile, set active section to show single section view
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setActiveSection(sectionId)
    } else {
      // For desktop, don't set activeSection to avoid hiding the layout
      setActiveSection(null)
    }

    setDesktopActiveSection(sectionId)
    setShowMobileMenu(false)

    // For desktop, scroll to the section
    if (typeof window !== 'undefined') {
      const element = document.getElementById(`section-${sectionId}`)
      if (element && window.innerWidth >= 1024) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }

  const renderActiveComponent = () => {
    const section = settingsSections.find(s => s.id === activeSection)
    if (!section) return null
    const Component = section.component
    return <Component />
  }
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-3 sm:px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account preferences and application settings
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Reset to Defaults
          </Button>
          <Button size="sm" className="text-xs sm:text-sm">
            <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Mobile single section view */}
      {activeSection && (
        <div className="lg:hidden">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(null)}
              className="text-xs p-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              {(() => {
                const section = settingsSections.find(s => s.id === activeSection)
                return section ? (
                  <>
                    <section.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{section.label}</span>
                  </>
                ) : null
              })()}
            </div>
          </div>
          {renderActiveComponent()}
        </div>
      )}

      {/* Main settings layout - always visible on desktop, only visible on mobile when no active section */}
      <div className={`${activeSection ? 'hidden lg:block' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-sm sm:text-base">Settings Menu</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Choose a category to configure</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-1 sm:space-y-2">
                  {settingsSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSectionClick(item.id)}
                      className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-colors text-left ${desktopActiveSection === item.id
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'hover:bg-accent/50'
                        }`}
                    >
                      <item.icon className={`h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-primary`} />
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-xs sm:text-sm truncate ${desktopActiveSection === item.id ? 'text-primary' : ''
                          }`}>{item.label}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.description}</div>
                      </div>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground lg:hidden" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content - Desktop */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div id="section-profile" className={`transition-all duration-300 ${desktopActiveSection === 'profile' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
              <ProfileForm />
            </div>

            <div id="section-security" className={`transition-all duration-300 ${desktopActiveSection === 'security' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
              <SecuritySettings />
            </div>

            <div id="section-preferences" className={`transition-all duration-300 ${desktopActiveSection === 'preferences' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
              <PreferencesForm />
            </div>

            <div id="section-theme" className={`transition-all duration-300 ${desktopActiveSection === 'theme' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
              <ThemeSettings />
            </div>

            <div id="section-notifications" className={`transition-all duration-300 ${desktopActiveSection === 'notifications' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
              <NotificationSettings />
            </div>

            <div id="section-ai" className={`transition-all duration-300 ${desktopActiveSection === 'ai' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
              <AIAssistantSettings />
            </div>
          </div>
        </div>

        {/* Quick Settings Overview */}
        <Card className="mt-6">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Settings Overview
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Quick view of your current configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Account Info */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-medium text-xs sm:text-sm flex items-center gap-2">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  Account
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Profile:</span>
                    <span className="font-medium">Areeb Hafeel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Location:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Dubai, UAE</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-[9px] sm:text-xs">
                        UAE
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                </div>
              </div>

              {/* App Settings */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-medium text-xs sm:text-sm flex items-center gap-2">
                  <Smartphone className="h-3 w-3 sm:h-4 sm:w-4" />
                  Application
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="font-medium">Dark</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-medium">AED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-medium">English</span>
                  </div>
                </div>
              </div>

              {/* AI & Features */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-medium text-xs sm:text-sm flex items-center gap-2">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                  Smart Features
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">AI Assistant:</span>
                    <Badge variant="secondary" className="text-[9px] sm:text-xs">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Predictions:</span>
                    <Badge variant="secondary" className="text-[9px] sm:text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Notifications:</span>
                    <Badge variant="secondary" className="text-[9px] sm:text-xs">On</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}