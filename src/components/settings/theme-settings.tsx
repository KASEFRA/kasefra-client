"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
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
  Palette,
  Sun,
  Moon,
  Monitor,
  Contrast,
  Eye,
  Smartphone,
  Save,
  RefreshCw
} from "lucide-react"

interface ThemePreferences {
  mode: 'light' | 'dark' | 'system'
  highContrast: boolean
  reducedMotion: boolean
  compactMode: boolean
  sidebarPosition: 'left' | 'right'
  colorScheme: 'kasefra' | 'blue' | 'green' | 'purple'
  fontSize: 'small' | 'medium' | 'large'
  autoThemeSwitch: boolean
  scheduleStart: string
  scheduleEnd: string
}

const mockThemePreferences: ThemePreferences = {
  mode: 'dark',
  highContrast: false,
  reducedMotion: false,
  compactMode: false,
  sidebarPosition: 'left',
  colorScheme: 'kasefra',
  fontSize: 'medium',
  autoThemeSwitch: false,
  scheduleStart: '20:00',
  scheduleEnd: '07:00'
}

const colorSchemes = [
  {
    id: 'kasefra',
    name: 'Kasefra Purple',
    description: 'Original brand colors',
    primary: '#272361',
    secondary: '#8355a2',
    preview: 'linear-gradient(45deg, #272361, #8355a2)'
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    description: 'Professional blue theme',
    primary: '#1e40af',
    secondary: '#3b82f6',
    preview: 'linear-gradient(45deg, #1e40af, #3b82f6)'
  },
  {
    id: 'green',
    name: 'Forest Green',
    description: 'Nature-inspired green',
    primary: '#166534',
    secondary: '#22c55e',
    preview: 'linear-gradient(45deg, #166534, #22c55e)'
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Rich purple variant',
    primary: '#581c87',
    secondary: '#a855f7',
    preview: 'linear-gradient(45deg, #581c87, #a855f7)'
  }
]

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const [preferences, setPreferences] = useState<ThemePreferences>(mockThemePreferences)
  const [hasChanges, setHasChanges] = useState(false)

  const handlePreferenceChange = (key: keyof ThemePreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    handlePreferenceChange('mode', newTheme as any)
  }

  const handleSave = () => {
    console.log('Saving theme preferences:', preferences)
    setHasChanges(false)
    // Here you would typically make an API call to save the theme preferences
  }

  const handleReset = () => {
    setPreferences(mockThemePreferences)
    setTheme('dark')
    setHasChanges(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Appearance & Theme
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your Kasefra experience
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
        {/* Theme Mode Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Theme Mode</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Light', icon: Sun, description: 'Bright and clean' },
              { id: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
              { id: 'system', label: 'System', icon: Monitor, description: 'Follows device' }
            ].map((mode) => (
              <div
                key={mode.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                  theme === mode.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handleThemeChange(mode.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <mode.icon className="h-6 w-6" />
                  <div>
                    <div className="font-medium text-sm">{mode.label}</div>
                    <div className="text-xs text-muted-foreground">{mode.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Scheme Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Color Scheme</h4>
          <div className="grid grid-cols-2 gap-4">
            {colorSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                  preferences.colorScheme === scheme.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handlePreferenceChange('colorScheme', scheme.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg border"
                    style={{ background: scheme.preview }}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{scheme.name}</div>
                    <div className="text-xs text-muted-foreground">{scheme.description}</div>
                    {scheme.id === 'kasefra' && (
                      <Badge size="sm" className="bg-primary/10 text-primary hover:bg-primary/10 text-xs mt-1">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto Theme Switching */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Automatic Theme Switching</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="autoSwitch" className="text-base">Schedule-based switching</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically switch between light and dark themes
                </div>
              </div>
              <Switch
                id="autoSwitch"
                checked={preferences.autoThemeSwitch}
                onCheckedChange={(checked) => handlePreferenceChange('autoThemeSwitch', checked)}
              />
            </div>

            {preferences.autoThemeSwitch && (
              <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/50 border">
                <div className="space-y-2">
                  <Label htmlFor="scheduleStart">Dark theme starts</Label>
                  <Select
                    value={preferences.scheduleStart}
                    onValueChange={(value) => handlePreferenceChange('scheduleStart', value)}
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
                  <Label htmlFor="scheduleEnd">Light theme starts</Label>
                  <Select
                    value={preferences.scheduleEnd}
                    onValueChange={(value) => handlePreferenceChange('scheduleEnd', value)}
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
          </div>
        </div>

        {/* Display Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Display Options</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="highContrast" className="text-base flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  High Contrast Mode
                </Label>
                <div className="text-sm text-muted-foreground">
                  Increase contrast for better accessibility
                </div>
              </div>
              <Switch
                id="highContrast"
                checked={preferences.highContrast}
                onCheckedChange={(checked) => handlePreferenceChange('highContrast', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="reducedMotion" className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Reduced Motion
                </Label>
                <div className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </div>
              </div>
              <Switch
                id="reducedMotion"
                checked={preferences.reducedMotion}
                onCheckedChange={(checked) => handlePreferenceChange('reducedMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="compactMode" className="text-base flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Compact Mode
                </Label>
                <div className="text-sm text-muted-foreground">
                  Reduce spacing for more content on screen
                </div>
              </div>
              <Switch
                id="compactMode"
                checked={preferences.compactMode}
                onCheckedChange={(checked) => handlePreferenceChange('compactMode', checked)}
              />
            </div>
          </div>
        </div>

        {/* Layout Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Layout Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sidebarPosition">Sidebar Position</Label>
              <Select
                value={preferences.sidebarPosition}
                onValueChange={(value: 'left' | 'right') => handlePreferenceChange('sidebarPosition', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left (Default)</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Select
                value={preferences.fontSize}
                onValueChange={(value: 'small' | 'medium' | 'large') => handlePreferenceChange('fontSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="p-4 rounded-lg border bg-muted/30">
          <h4 className="font-medium text-sm mb-3">Theme Preview</h4>
          <div className="space-y-3">
            <div className="p-3 rounded border bg-background">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Sample Card</span>
                <Badge>New</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                This is how your interface will look with the current theme settings.
              </div>
              <Button size="sm" className="mr-2">Primary Button</Button>
              <Button size="sm" variant="outline">Secondary Button</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}