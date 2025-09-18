"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Settings,
  Globe,
  CreditCard,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Save,
  RefreshCw
} from "lucide-react"

interface AppPreferences {
  currency: string
  language: string
  dateFormat: string
  timeFormat: string
  startOfWeek: string
  fiscalYearStart: string
  autoSync: boolean
  offlineMode: boolean
  dataBackup: boolean
  analyticsSharing: boolean
  marketingEmails: boolean
  uaeSpecificFeatures: boolean
  islamicCalendar: boolean
  hajjReminders: boolean
}

const mockPreferences: AppPreferences = {
  currency: "AED",
  language: "en",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "12h",
  startOfWeek: "Sunday",
  fiscalYearStart: "January",
  autoSync: true,
  offlineMode: false,
  dataBackup: true,
  analyticsSharing: false,
  marketingEmails: true,
  uaeSpecificFeatures: true,
  islamicCalendar: true,
  hajjReminders: true
}

const currencies = [
  { code: "AED", name: "UAE Dirham (AED)", flag: "🇦🇪" },
  { code: "USD", name: "US Dollar (USD)", flag: "🇺🇸" },
  { code: "EUR", name: "Euro (EUR)", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound (GBP)", flag: "🇬🇧" },
  { code: "SAR", name: "Saudi Riyal (SAR)", flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal (QAR)", flag: "🇶🇦" }
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦", rtl: true },
  { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
  { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰", rtl: true }
]

export function PreferencesForm() {
  const [preferences, setPreferences] = useState<AppPreferences>(mockPreferences)
  const [hasChanges, setHasChanges] = useState(false)

  const handlePreferenceChange = (key: keyof AppPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log('Saving preferences:', preferences)
    setHasChanges(false)
    // Here you would typically make an API call to save the preferences
  }

  const handleReset = () => {
    setPreferences(mockPreferences)
    setHasChanges(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Application Preferences
            </CardTitle>
            <CardDescription>
              Customize your app experience and regional settings
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-xs">
                Unsaved Changes
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={!hasChanges}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Regional Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Regional & Language Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Primary Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => handlePreferenceChange('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Interface Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      <div className="flex items-center gap-2">
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                        {language.code === 'ar' && (
                          <Badge size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs ml-2">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => handlePreferenceChange('dateFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (UK format)</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US format)</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO format)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeFormat">Time Format</Label>
              <Select
                value={preferences.timeFormat}
                onValueChange={(value) => handlePreferenceChange('timeFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                  <SelectItem value="24h">24-hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Calendar & Financial Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar & Financial Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startOfWeek">Start of Week</Label>
              <Select
                value={preferences.startOfWeek}
                onValueChange={(value) => handlePreferenceChange('startOfWeek', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sunday">Sunday (UAE Standard)</SelectItem>
                  <SelectItem value="Monday">Monday (International)</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
              <Select
                value={preferences.fiscalYearStart}
                onValueChange={(value) => handlePreferenceChange('fiscalYearStart', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January (Calendar Year)</SelectItem>
                  <SelectItem value="April">April (UAE Fiscal Year)</SelectItem>
                  <SelectItem value="October">October (UAE Government)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Data & Sync Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Data & Synchronization
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="autoSync" className="text-base">Auto Sync</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically sync your data across devices
                </div>
              </div>
              <Switch
                id="autoSync"
                checked={preferences.autoSync}
                onCheckedChange={(checked) => handlePreferenceChange('autoSync', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="offlineMode" className="text-base">Offline Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Enable offline functionality for basic features
                </div>
              </div>
              <Switch
                id="offlineMode"
                checked={preferences.offlineMode}
                onCheckedChange={(checked) => handlePreferenceChange('offlineMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="dataBackup" className="text-base">Automatic Backup</Label>
                <div className="text-sm text-muted-foreground">
                  Daily encrypted backups of your financial data
                </div>
              </div>
              <Switch
                id="dataBackup"
                checked={preferences.dataBackup}
                onCheckedChange={(checked) => handlePreferenceChange('dataBackup', checked)}
              />
            </div>
          </div>
        </div>

        {/* UAE-Specific Features */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              UAE
            </Badge>
            <h4 className="font-medium text-sm">UAE-Specific Features</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="uaeFeatures" className="text-base">UAE Localization</Label>
                <div className="text-sm text-muted-foreground">
                  Enable UAE banks, merchants, and local features
                </div>
              </div>
              <Switch
                id="uaeFeatures"
                checked={preferences.uaeSpecificFeatures}
                onCheckedChange={(checked) => handlePreferenceChange('uaeSpecificFeatures', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="islamicCalendar" className="text-base">Islamic Calendar</Label>
                <div className="text-sm text-muted-foreground">
                  Show Hijri dates and Islamic holidays
                </div>
              </div>
              <Switch
                id="islamicCalendar"
                checked={preferences.islamicCalendar}
                onCheckedChange={(checked) => handlePreferenceChange('islamicCalendar', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="hajjReminders" className="text-base">Hajj & Umrah Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Get notified about Hajj seasons and savings goals
                </div>
              </div>
              <Switch
                id="hajjReminders"
                checked={preferences.hajjReminders}
                onCheckedChange={(checked) => handlePreferenceChange('hajjReminders', checked)}
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Privacy & Analytics
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="analyticsSharing" className="text-base">Usage Analytics</Label>
                <div className="text-sm text-muted-foreground">
                  Help improve Kasefra by sharing anonymous usage data
                </div>
              </div>
              <Switch
                id="analyticsSharing"
                checked={preferences.analyticsSharing}
                onCheckedChange={(checked) => handlePreferenceChange('analyticsSharing', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails" className="text-base">Marketing Communications</Label>
                <div className="text-sm text-muted-foreground">
                  Receive tips, updates, and promotional offers
                </div>
              </div>
              <Switch
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}