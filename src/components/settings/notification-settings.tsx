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
  RefreshCw
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
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Customize how and when you receive alerts and updates
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
              onClick={handleTestNotification}
            >
              Test
            </Button>
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
        {/* Delivery Methods */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Delivery Methods</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications" className="text-base flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Push Notifications
                </Label>
                <div className="text-sm text-muted-foreground">
                  Instant alerts on your device
                </div>
              </div>
              <Switch
                id="pushNotifications"
                checked={preferences.pushNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications" className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </Label>
                <div className="text-sm text-muted-foreground">
                  Detailed updates via email
                </div>
              </div>
              <Switch
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="smsNotifications" className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS Notifications
                </Label>
                <div className="text-sm text-muted-foreground">
                  Critical alerts via text message
                </div>
              </div>
              <Switch
                id="smsNotifications"
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
              />
            </div>
          </div>
        </div>

        {/* Financial Alerts */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Financial Alerts
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="budgetAlerts" className="text-base">Budget Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Get notified when approaching budget limits
                </div>
              </div>
              <Switch
                id="budgetAlerts"
                checked={preferences.budgetAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('budgetAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="goalReminders" className="text-base">Goal Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Progress updates and milestone notifications
                </div>
              </div>
              <Switch
                id="goalReminders"
                checked={preferences.goalReminders}
                onCheckedChange={(checked) => handlePreferenceChange('goalReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="transactionAlerts" className="text-base">Transaction Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Notifications for new transactions
                </div>
              </div>
              <Switch
                id="transactionAlerts"
                checked={preferences.transactionAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('transactionAlerts', checked)}
              />
            </div>

            {preferences.transactionAlerts && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="minimumAmount">Minimum Amount (AED)</Label>
                <Select
                  value={preferences.minimumAmount.toString()}
                  onValueChange={(value) => handlePreferenceChange('minimumAmount', parseInt(value))}
                >
                  <SelectTrigger className="w-full">
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

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="billReminders" className="text-base">Bill Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Upcoming due dates and payment reminders
                </div>
              </div>
              <Switch
                id="billReminders"
                checked={preferences.billReminders}
                onCheckedChange={(checked) => handlePreferenceChange('billReminders', checked)}
              />
            </div>
          </div>
        </div>

        {/* AI & Insights */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            AI Insights & Reports
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="aiInsights" className="text-base">AI Insights</Label>
                <div className="text-sm text-muted-foreground">
                  Smart recommendations and spending insights
                </div>
              </div>
              <Switch
                id="aiInsights"
                checked={preferences.aiInsights}
                onCheckedChange={(checked) => handlePreferenceChange('aiInsights', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyReports" className="text-base">Weekly Reports</Label>
                <div className="text-sm text-muted-foreground">
                  Summary of spending and budget progress
                </div>
              </div>
              <Switch
                id="weeklyReports"
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="monthlyReports" className="text-base">Monthly Reports</Label>
                <div className="text-sm text-muted-foreground">
                  Comprehensive financial analysis and trends
                </div>
              </div>
              <Switch
                id="monthlyReports"
                checked={preferences.monthlyReports}
                onCheckedChange={(checked) => handlePreferenceChange('monthlyReports', checked)}
              />
            </div>
          </div>
        </div>

        {/* UAE-Specific Notifications */}
        <div className="p-4 bg-primary/10 dark:bg-primary/10/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              UAE
            </Badge>
            <h4 className="font-medium text-sm">UAE-Specific Notifications</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="uaeAlerts" className="text-base">UAE Market Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Banking updates, holiday schedules, market changes
                </div>
              </div>
              <Switch
                id="uaeAlerts"
                checked={preferences.uaeSpecificAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('uaeSpecificAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="islamicEvents" className="text-base">Islamic Event Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Ramadan, Eid, and other Islamic calendar events
                </div>
              </div>
              <Switch
                id="islamicEvents"
                checked={preferences.islamicEventReminders}
                onCheckedChange={(checked) => handlePreferenceChange('islamicEventReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
              <div className="space-y-0.5">
                <Label htmlFor="hajjReminders" className="text-base">Hajj Savings Reminders</Label>
                <div className="text-sm text-muted-foreground">
                  Progress updates for Hajj and Umrah savings goals
                </div>
              </div>
              <Switch
                id="hajjReminders"
                checked={preferences.hajjSavingsReminders}
                onCheckedChange={(checked) => handlePreferenceChange('hajjSavingsReminders', checked)}
              />
            </div>
          </div>
        </div>

        {/* Security & System Alerts */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Security & System
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="securityAlerts" className="text-base">Security Alerts</Label>
                <div className="text-sm text-muted-foreground">
                  Login attempts, password changes, suspicious activity
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Always On</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails" className="text-base">Marketing Communications</Label>
                <div className="text-sm text-muted-foreground">
                  Product updates, tips, and promotional offers
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

        {/* Notification Schedule */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Notification Schedule</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="quietHours" className="text-base">Quiet Hours</Label>
                <div className="text-sm text-muted-foreground">
                  Pause non-critical notifications during specified hours
                </div>
              </div>
              <Switch
                id="quietHours"
                checked={preferences.quietHours}
                onCheckedChange={(checked) => handlePreferenceChange('quietHours', checked)}
              />
            </div>

            {preferences.quietHours && (
              <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/50 border">
                <div className="space-y-2">
                  <Label htmlFor="quietStart">Quiet hours start</Label>
                  <Select
                    value={preferences.quietStart}
                    onValueChange={(value) => handlePreferenceChange('quietStart', value)}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="quietEnd">Quiet hours end</Label>
                  <Select
                    value={preferences.quietEnd}
                    onValueChange={(value) => handlePreferenceChange('quietEnd', value)}
                  >
                    <SelectTrigger>
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
              <Label htmlFor="frequency">Notification Frequency</Label>
              <Select
                value={preferences.notificationFrequency}
                onValueChange={(value: 'instant' | 'hourly' | 'daily') => handlePreferenceChange('notificationFrequency', value)}
              >
                <SelectTrigger>
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