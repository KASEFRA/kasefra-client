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
  Bell,
  Smartphone,
  Mail,
  MessageSquare,
  TrendingUp,
  Target,
  CreditCard,
  AlertTriangle,
  Save,
  RefreshCw,
  Clock
} from "lucide-react"

interface NotificationPreferences {
  pushNotifications: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  budgetAlerts: boolean
  goalReminders: boolean
  billReminders: boolean
  transactionAlerts: boolean
  securityAlerts: boolean
  marketingEmails: boolean
  weeklyReports: boolean
  monthlyReports: boolean
  aiInsights: boolean
  uaeSpecificAlerts: boolean
  islamicEventReminders: boolean
  hajjSavingsReminders: boolean
  quietHours: boolean
  quietStart: string
  quietEnd: string
  notificationFrequency: 'instant' | 'hourly' | 'daily'
  minimumAmount: number
}

const mockNotificationPreferences: NotificationPreferences = {
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: false,
  budgetAlerts: true,
  goalReminders: true,
  billReminders: true,
  transactionAlerts: true,
  securityAlerts: true,
  marketingEmails: false,
  weeklyReports: true,
  monthlyReports: true,
  aiInsights: true,
  uaeSpecificAlerts: true,
  islamicEventReminders: true,
  hajjSavingsReminders: true,
  quietHours: true,
  quietStart: "22:00",
  quietEnd: "07:00",
  notificationFrequency: 'instant',
  minimumAmount: 50
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(mockNotificationPreferences)
  const [hasChanges, setHasChanges] = useState(false)

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log('Saving notification preferences:', preferences)
    setHasChanges(false)
    // Here you would typically make an API call to save the notification preferences
  }

  const handleReset = () => {
    setPreferences(mockNotificationPreferences)
    setHasChanges(false)
  }

  const handleTestNotification = () => {
    console.log('Sending test notification...')
    // Here you would typically send a test notification
  }

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              Customize how and when you receive alerts and updates
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
            {hasChanges && (
              <Badge variant="outline" className="text-sm self-start sm:self-auto">
                Unsaved Changes
              </Badge>
            )}
            <div className="flex gap-2">
             
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={!hasChanges}
                className="flex-1 sm:flex-none h-9 sm:h-10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasChanges}
                className="flex-1 sm:flex-none h-9 sm:h-10"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
        {/* Delivery Methods */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg sm:text-xl flex items-center gap-2 border-b pb-3 text-foreground">
            <Smartphone className="h-5 w-5 text-primary" />
            Delivery Methods
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-lg border bg-card">
              <div className="space-y-2 flex-1">
                <Label htmlFor="pushNotifications" className="text-base font-semibold flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Push Notifications
                </Label>
                <div className="text-sm text-muted-foreground">
                  Instant alerts on your device
                </div>
              </div>
              <div className="flex justify-end">
                <Switch
                  id="pushNotifications"
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-lg border bg-card">
              <div className="space-y-2 flex-1">
                <Label htmlFor="emailNotifications" className="text-base font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </Label>
                <div className="text-sm text-muted-foreground">
                  Detailed updates via email
                </div>
              </div>
              <div className="flex justify-end">
                <Switch
                  id="emailNotifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-lg border bg-card">
              <div className="space-y-2 flex-1">
                <Label htmlFor="smsNotifications" className="text-base font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS Notifications
                </Label>
                <div className="text-sm text-muted-foreground">
                  Critical alerts via text message
                </div>
              </div>
              <div className="flex justify-end">
                <Switch
                  id="smsNotifications"
                  checked={preferences.smsNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Alerts */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <CreditCard className="h-4 w-4 text-primary" />
            Financial Alerts
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="budgetAlerts" className="text-base font-medium">Budget Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Get notified when approaching budget limits
                </div>
              </div>
              <Switch
                id="budgetAlerts"
                checked={preferences.budgetAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('budgetAlerts', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="goalReminders" className="text-base font-medium">Goal Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Progress updates and milestone notifications
                </div>
              </div>
              <Switch
                id="goalReminders"
                checked={preferences.goalReminders}
                onCheckedChange={(checked) => handlePreferenceChange('goalReminders', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="transactionAlerts" className="text-base font-medium">Transaction Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Notifications for new transactions
                </div>
              </div>
              <Switch
                id="transactionAlerts"
                checked={preferences.transactionAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('transactionAlerts', checked)}
                className="self-start sm:self-center"
              />
            </div>

            {preferences.transactionAlerts && (
              <div className="space-y-2 pl-0 sm:pl-6">
                <Label htmlFor="minimumAmount" className="text-sm font-medium">Minimum Amount (AED)</Label>
                <Select
                  value={preferences.minimumAmount.toString()}
                  onValueChange={(value) => handlePreferenceChange('minimumAmount', parseInt(value))}
                >
                  <SelectTrigger className="w-full h-10 sm:h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All transactions</SelectItem>
                    <SelectItem value="50">AED 50+</SelectItem>
                    <SelectItem value="100">AED 100+</SelectItem>
                    <SelectItem value="500">AED 500+</SelectItem>
                    <SelectItem value="1000">AED 1,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="billReminders" className="text-base font-medium">Bill Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Upcoming due dates and payment reminders
                </div>
              </div>
              <Switch
                id="billReminders"
                checked={preferences.billReminders}
                onCheckedChange={(checked) => handlePreferenceChange('billReminders', checked)}
                className="self-start sm:self-center"
              />
            </div>
          </div>
        </div>

        {/* AI & Insights */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            AI Insights & Reports
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="aiInsights" className="text-base font-medium">AI Insights</Label>
                <div className="text-sm text-muted-foreground">
                  Smart recommendations and spending insights
                </div>
              </div>
              <Switch
                id="aiInsights"
                checked={preferences.aiInsights}
                onCheckedChange={(checked) => handlePreferenceChange('aiInsights', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="weeklyReports" className="text-base font-medium">Weekly Reports</Label>
                <div className="text-sm text-muted-foreground">
                  Summary of spending and budget progress
                </div>
              </div>
              <Switch
                id="weeklyReports"
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="monthlyReports" className="text-base font-medium">Monthly Reports</Label>
                <div className="text-sm text-muted-foreground">
                  Comprehensive financial analysis and trends
                </div>
              </div>
              <Switch
                id="monthlyReports"
                checked={preferences.monthlyReports}
                onCheckedChange={(checked) => handlePreferenceChange('monthlyReports', checked)}
                className="self-start sm:self-center"
              />
            </div>
          </div>
        </div>

        {/* UAE-Specific Notifications */}
        <div className="p-4 sm:p-6 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm self-start">
              UAE Exclusive
            </Badge>
            <h4 className="font-semibold text-base sm:text-lg">UAE-Specific Notifications</h4>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-primary/30 bg-background">
              <div className="space-y-1 flex-1">
                <Label htmlFor="uaeAlerts" className="text-base font-medium">UAE Market Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Banking updates, holiday schedules, market changes
                </div>
              </div>
              <Switch
                id="uaeAlerts"
                checked={preferences.uaeSpecificAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('uaeSpecificAlerts', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-primary/30 bg-background">
              <div className="space-y-1 flex-1">
                <Label htmlFor="islamicEvents" className="text-base font-medium">Islamic Event Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Ramadan, Eid, and other Islamic calendar events
                </div>
              </div>
              <Switch
                id="islamicEvents"
                checked={preferences.islamicEventReminders}
                onCheckedChange={(checked) => handlePreferenceChange('islamicEventReminders', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-primary/30 bg-background">
              <div className="space-y-1 flex-1">
                <Label htmlFor="hajjReminders" className="text-base font-medium">Hajj Savings Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Progress updates for Hajj and Umrah savings goals
                </div>
              </div>
              <Switch
                id="hajjReminders"
                checked={preferences.hajjSavingsReminders}
                onCheckedChange={(checked) => handlePreferenceChange('hajjSavingsReminders', checked)}
                className="self-start sm:self-center"
              />
            </div>
          </div>
        </div>

        {/* Security & System Alerts */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Security & System
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="securityAlerts" className="text-base font-medium">Security Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Login attempts, password changes, suspicious activity
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <Badge variant="secondary" className="text-sm">Always On</Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="marketingEmails" className="text-base font-medium">Marketing Communications</Label>
                <div className="text-sm text-muted-foreground">
                  Product updates, tips, and promotional offers
                </div>
              </div>
              <Switch
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
                className="self-start sm:self-center"
              />
            </div>
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Clock className="h-4 w-4 text-primary" />
            Notification Schedule
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="quietHours" className="text-base font-medium">Quiet Hours</Label>
                <div className="text-sm text-muted-foreground">
                  Pause non-critical notifications during specified hours
                </div>
              </div>
              <Switch
                id="quietHours"
                checked={preferences.quietHours}
                onCheckedChange={(checked) => handlePreferenceChange('quietHours', checked)}
                className="self-start sm:self-center"
              />
            </div>

            {preferences.quietHours && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="space-y-2">
                  <Label htmlFor="quietStart" className="text-sm font-medium">Quiet hours start</Label>
                  <Select
                    value={preferences.quietStart}
                    onValueChange={(value) => handlePreferenceChange('quietStart', value)}
                  >
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quietEnd" className="text-sm font-medium">Quiet hours end</Label>
                  <Select
                    value={preferences.quietEnd}
                    onValueChange={(value) => handlePreferenceChange('quietEnd', value)}
                  >
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-sm font-medium">Notification Frequency</Label>
              <Select
                value={preferences.notificationFrequency}
                onValueChange={(value: 'instant' | 'hourly' | 'daily') => handlePreferenceChange('notificationFrequency', value)}
              >
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}