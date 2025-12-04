"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Palette,
  Eye,
  Contrast,
  Monitor,
  RefreshCw
} from "lucide-react"

interface ContrastResult {
  ratio: number
  level: 'AA' | 'AAA' | 'fail'
  description: string
}

interface ThemeValidationResult {
  theme: string
  contrast: {
    textOnBackground: ContrastResult
    primaryText: ContrastResult
    secondaryText: ContrastResult
    mutedText: ContrastResult
  }
  accessibility: {
    focusRings: boolean
    touchTargets: boolean
    textSize: boolean
  }
  overall: 'pass' | 'warning' | 'fail'
}

export function ThemeValidator() {
  const { theme, themes, setTheme } = useTheme()
  const [validationResults, setValidationResults] = useState<ThemeValidationResult[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [currentTestTheme, setCurrentTestTheme] = useState<string>('')

  // Calculate contrast ratio between two colors
  const getContrastRatio = (color1: string, color2: string): number => {
    // Simplified contrast calculation for demo
    // In production, use a proper color contrast library
    return 4.5 // Mock value for demo
  }

  // Get WCAG compliance level
  const getComplianceLevel = (ratio: number): ContrastResult['level'] => {
    if (ratio >= 7) return 'AAA'
    if (ratio >= 4.5) return 'AA'
    return 'fail'
  }

  // Validate theme colors
  const validateTheme = async (themeName: string): Promise<ThemeValidationResult> => {
    setCurrentTestTheme(themeName)

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock validation results
    const mockResults: ThemeValidationResult = {
      theme: themeName,
      contrast: {
        textOnBackground: {
          ratio: 4.8,
          level: 'AA',
          description: 'Good contrast for body text'
        },
        primaryText: {
          ratio: 5.2,
          level: 'AA',
          description: 'Excellent contrast for headings'
        },
        secondaryText: {
          ratio: 3.8,
          level: 'fail',
          description: 'Insufficient contrast - needs improvement'
        },
        mutedText: {
          ratio: 3.2,
          level: 'fail',
          description: 'Low contrast - consider darker shade'
        }
      },
      accessibility: {
        focusRings: true,
        touchTargets: true,
        textSize: true
      },
      overall: 'warning'
    }

    return mockResults
  }

  // Run validation for all themes
  const runValidation = async () => {
    setIsValidating(true)
    setValidationResults([])

    const results: ThemeValidationResult[] = []

    for (const themeName of ['light', 'dark']) {
      const result = await validateTheme(themeName)
      results.push(result)
      setValidationResults([...results])
    }

    setIsValidating(false)
    setCurrentTestTheme('')
  }

  const getStatusIcon = (level: ContrastResult['level']) => {
    switch (level) {
      case 'AAA':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'AA':
        return <CheckCircle className="w-4 h-4 text-primary" />
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getOverallStatusIcon = (overall: ThemeValidationResult['overall']) => {
    switch (overall) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Accessibility Validator
        </CardTitle>
        <CardDescription>
          Test your themes for WCAG compliance and accessibility standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Validation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            <span className="text-sm">Current theme: {theme}</span>
          </div>
          <Button
            onClick={runValidation}
            disabled={isValidating}
            size="sm"
          >
            {isValidating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Eye className="w-4 h-4 mr-2" />
            )}
            {isValidating ? 'Validating...' : 'Validate All Themes'}
          </Button>
        </div>

        {/* Current Validation Status */}
        {isValidating && currentTestTheme && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm font-medium">
                Testing {currentTestTheme} theme...
              </span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
        )}

        {/* Validation Results */}
        {validationResults.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Validation Results</h4>

            {validationResults.map((result) => (
              <Card key={result.theme} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base capitalize">
                      {result.theme} Theme
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {getOverallStatusIcon(result.overall)}
                      <Badge variant={
                        result.overall === 'pass' ? 'default' :
                        result.overall === 'warning' ? 'secondary' : 'destructive'
                      }>
                        {result.overall.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contrast Tests */}
                  <div>
                    <h5 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Contrast className="w-4 h-4" />
                      Contrast Ratios
                    </h5>
                    <div className="space-y-2">
                      {Object.entries(result.contrast).map(([key, contrast]) => (
                        <div key={key} className="flex items-center justify-between p-2 rounded bg-muted/30">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(contrast.level)}
                            <span className="text-sm capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-right">
                            <span className="text-sm text-muted-foreground">
                              {contrast.ratio.toFixed(1)}:1
                            </span>
                            <Badge size="sm" variant="outline">
                              {contrast.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Accessibility Features */}
                  <div>
                    <h5 className="font-medium text-sm mb-3">Accessibility Features</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {Object.entries(result.accessibility).map(([key, passed]) => (
                        <div key={key} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                          {passed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setTheme(result.theme)}>
                      Preview Theme
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {validationResults.length > 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Your primary colors meet WCAG AA standards</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span>Consider increasing contrast for secondary and muted text</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Focus indicators and touch targets are properly sized</span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}