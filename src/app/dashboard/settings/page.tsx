"use client"

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
  RefreshCw
} from "lucide-react"
import { ProfileForm } from "@/components/settings/profile-form"
import { SecuritySettings } from "@/components/settings/security-settings"
import { PreferencesForm } from "@/components/settings/preferences-form"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ThemeSettings } from "@/components/settings/theme-settings"
import { AIAssistantSettings } from "@/components/settings/ai-assistant-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and application settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings Menu</CardTitle>
              <CardDescription>Choose a category to configure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: User, description: 'Personal information' },
                  { id: 'security', label: 'Security', icon: Shield, description: 'Password & privacy' },
                  { id: 'preferences', label: 'Preferences', icon: Settings, description: 'App behavior' },
                  { id: 'theme', label: 'Appearance', icon: Palette, description: 'Theme & display' },
                  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alerts & updates' },
                  { id: 'ai', label: 'AI Assistant', icon: Zap, description: 'Smart features' }
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <ProfileForm />

          {/* Security Settings */}
          <SecuritySettings />

          {/* App Preferences */}
          <PreferencesForm />

          {/* Theme Settings */}
          <ThemeSettings />

          {/* Notification Settings */}
          <NotificationSettings />

          {/* AI Assistant Settings */}
          <AIAssistantSettings />
        </div>
      </div>

      {/* Quick Settings Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Settings Overview
          </CardTitle>
          <CardDescription>
            Quick view of your current configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Account Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profile:</span>
                  <span className="font-medium">Ahmed Al-Mansouri</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Dubai, UAE</span>
                    <Badge size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                      UAE
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since:</span>
                  <span className="font-medium">January 2024</span>
                </div>
              </div>
            </div>

            {/* App Settings */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Application
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Theme:</span>
                  <span className="font-medium">Dark</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Currency:</span>
                  <span className="font-medium">AED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            </div>

            {/* AI & Features */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Smart Features
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Assistant:</span>
                  <Badge variant="secondary" className="text-xs">Enabled</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Predictions:</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Notifications:</span>
                  <Badge variant="secondary" className="text-xs">On</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}