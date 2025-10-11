"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Zap,
  Brain,
  MessageSquare,
  TrendingUp,
  Bell,
  Target,
  Shield,
  Save,
  RefreshCw
} from "lucide-react"

interface AIAssistantPreferences {
  enabled: boolean
  proactiveInsights: boolean
  budgetAlerts: boolean
  goalReminders: boolean
  spendingAnalysis: boolean
  investmentSuggestions: boolean
  uaeSpecificAdvice: boolean
  islamicFinanceMode: boolean
  confidenceThreshold: number
  responseTone: 'professional' | 'friendly' | 'concise'
  notificationFrequency: 'realtime' | 'daily' | 'weekly'
  learningMode: boolean
  dataSharing: boolean
  autoCategorizationConfidence: number
}

const mockAIPreferences: AIAssistantPreferences = {
  enabled: true,
  proactiveInsights: true,
  budgetAlerts: true,
  goalReminders: true,
  spendingAnalysis: true,
  investmentSuggestions: false,
  uaeSpecificAdvice: true,
  islamicFinanceMode: true,
  confidenceThreshold: 80,
  responseTone: 'friendly',
  notificationFrequency: 'daily',
  learningMode: true,
  dataSharing: false,
  autoCategorizationConfidence: 85
}

export function AIAssistantSettings() {
  const [preferences, setPreferences] = useState<AIAssistantPreferences>(mockAIPreferences)
  const [hasChanges, setHasChanges] = useState(false)

  const handlePreferenceChange = (key: keyof AIAssistantPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log('Saving AI preferences:', preferences)
    setHasChanges(false)
    // Here you would typically make an API call to save the AI preferences
  }

  const handleReset = () => {
    setPreferences(mockAIPreferences)
    setHasChanges(false)
  }

  return (
    <Card>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Zap className="h-5 w-5 text-primary" />
              AI Assistant Settings
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              Customize your smart financial assistant experience
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
        {/* Master Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 rounded-lg border-2 border-primary/20 bg-primary/5">
          <div className="space-y-2 flex-1">
            <Label htmlFor="aiEnabled" className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Assistant
            </Label>
            <div className="text-sm sm:text-base text-muted-foreground">
              Enable or disable all AI-powered features
            </div>
          </div>
          <Switch
            id="aiEnabled"
            checked={preferences.enabled}
            onCheckedChange={(checked) => handlePreferenceChange('enabled', checked)}
            className="self-start sm:self-center"
          />
        </div>

        {preferences.enabled && (
          <>
            {/* AI Features */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Smart Features
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="proactiveInsights" className="text-base font-medium">Proactive Insights</Label>
                    <div className="text-sm text-muted-foreground">
                      Get smart suggestions without asking
                    </div>
                  </div>
                  <Switch
                    id="proactiveInsights"
                    checked={preferences.proactiveInsights}
                    onCheckedChange={(checked) => handlePreferenceChange('proactiveInsights', checked)}
                    className="self-start sm:self-center"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="budgetAlerts" className="text-base font-medium">Budget Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      AI-powered overspending predictions
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
                      Smart notifications for your financial goals
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
                    <Label htmlFor="spendingAnalysis" className="text-base font-medium">Spending Analysis</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatic transaction categorization and insights
                    </div>
                  </div>
                  <Switch
                    id="spendingAnalysis"
                    checked={preferences.spendingAnalysis}
                    onCheckedChange={(checked) => handlePreferenceChange('spendingAnalysis', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="investmentSuggestions" className="text-base">Investment Suggestions</Label>
                    <div className="text-sm text-muted-foreground">
                      AI recommendations for investment opportunities
                    </div>
                  </div>
                  <Switch
                    id="investmentSuggestions"
                    checked={preferences.investmentSuggestions}
                    onCheckedChange={(checked) => handlePreferenceChange('investmentSuggestions', checked)}
                  />
                </div>
              </div>
            </div>

            {/* UAE & Islamic Finance Features */}
            <div className="p-4 bg-primary/10 dark:bg-primary/10/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                  UAE
                </Badge>
                <h4 className="font-medium text-sm">UAE-Specific AI Features</h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
                  <div className="space-y-0.5">
                    <Label htmlFor="uaeAdvice" className="text-base">UAE Financial Advice</Label>
                    <div className="text-sm text-muted-foreground">
                      Local banking, regulations, and market insights
                    </div>
                  </div>
                  <Switch
                    id="uaeAdvice"
                    checked={preferences.uaeSpecificAdvice}
                    onCheckedChange={(checked) => handlePreferenceChange('uaeSpecificAdvice', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-background">
                  <div className="space-y-0.5">
                    <Label htmlFor="islamicFinance" className="text-base">Islamic Finance Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Shariah-compliant financial recommendations only
                    </div>
                  </div>
                  <Switch
                    id="islamicFinance"
                    checked={preferences.islamicFinanceMode}
                    onCheckedChange={(checked) => handlePreferenceChange('islamicFinanceMode', checked)}
                  />
                </div>
              </div>
            </div>

            {/* AI Behavior Settings */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Behavior
              </h4>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="confidenceThreshold">Confidence Threshold: {preferences.confidenceThreshold}%</Label>
                  <Slider
                    id="confidenceThreshold"
                    min={50}
                    max={95}
                    step={5}
                    value={[preferences.confidenceThreshold]}
                    onValueChange={([value]) => handlePreferenceChange('confidenceThreshold', value)}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    Minimum confidence required before AI shows suggestions
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="autoCategorizationConfidence">Auto-categorization Threshold: {preferences.autoCategorizationConfidence}%</Label>
                  <Slider
                    id="autoCategorizationConfidence"
                    min={60}
                    max={99}
                    step={5}
                    value={[preferences.autoCategorizationConfidence]}
                    onValueChange={([value]) => handlePreferenceChange('autoCategorizationConfidence', value)}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    Confidence required to automatically categorize transactions
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responseTone">Response Tone</Label>
                    <Select
                      value={preferences.responseTone}
                      onValueChange={(value: 'professional' | 'friendly' | 'concise') => handlePreferenceChange('responseTone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="concise">Concise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notificationFrequency">Notification Frequency</Label>
                    <Select
                      value={preferences.notificationFrequency}
                      onValueChange={(value: 'realtime' | 'daily' | 'weekly') => handlePreferenceChange('notificationFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily Summary</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Learning */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy & Learning
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="learningMode" className="text-base">Learning Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow AI to learn from your behavior to improve suggestions
                    </div>
                  </div>
                  <Switch
                    id="learningMode"
                    checked={preferences.learningMode}
                    onCheckedChange={(checked) => handlePreferenceChange('learningMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSharing" className="text-base">Anonymous Data Sharing</Label>
                    <div className="text-sm text-muted-foreground">
                      Share anonymized data to help improve AI for all users
                    </div>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={preferences.dataSharing}
                    onCheckedChange={(checked) => handlePreferenceChange('dataSharing', checked)}
                  />
                </div>
              </div>
            </div>

            {/* AI Statistics */}
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-sm mb-3">AI Performance</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">94%</div>
                  <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">1,247</div>
                  <div className="text-xs text-muted-foreground">Insights Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">AED 4.2K</div>
                  <div className="text-xs text-muted-foreground">Potential Savings</div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}