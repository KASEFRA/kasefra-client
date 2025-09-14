"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Clock, DollarSign, TrendingUp } from "lucide-react"
import { mockSmartRecommendations } from "@/lib/mock-data"

export function SmartRecommendations() {
  const recommendations = mockSmartRecommendations.slice(0, 4) // Show top 4

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'savings': return <DollarSign className="h-4 w-4" />
      case 'investment': return <TrendingUp className="h-4 w-4" />
      case 'bill': return <Clock className="h-4 w-4" />
      case 'lifestyle': return <Lightbulb className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-secondary text-secondary-foreground'
      case 'medium': return 'bg-accent text-accent-foreground'
      case 'hard': return 'bg-destructive text-destructive-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Smart Recommendations
        </CardTitle>
        <CardDescription>
          AI-powered suggestions to optimize your finances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{recommendation.title}</h4>
                      {recommendation.uaeSpecific && (
                        <Badge size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          UAE
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recommendation.timeToImplement}
                      </span>
                      <Badge size="sm" className={getDifficultyColor(recommendation.difficulty)}>
                        {recommendation.difficulty}
                      </Badge>
                      <span className="text-green-600 font-medium">
                        Save AED {recommendation.potentialSaving.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Priority: {recommendation.priority}/10
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" className="w-full">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}