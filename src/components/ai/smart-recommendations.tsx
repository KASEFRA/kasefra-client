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
    <Card className="premium-card hover-lift border-0 shadow-md">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
          <div className="icon-container bg-primary/10">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          Smart Recommendations
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          AI-powered financial optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="p-3 sm:p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1 shrink-0">
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h4 className="font-medium text-xs sm:text-sm">{recommendation.title}</h4>
                      {recommendation.uaeSpecific && (
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10 w-fit text-xs">
                          UAE
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{recommendation.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recommendation.timeToImplement}
                      </span>
                      <Badge className={`${getDifficultyColor(recommendation.difficulty)} text-xs`}>
                        {recommendation.difficulty}
                      </Badge>
                      <span className="text-green-600 font-medium">
                        Save AED {recommendation.potentialSaving.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col justify-between sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Priority: {recommendation.priority}/10
                  </div>
                  <Button size="sm" variant="outline" className="h-7 sm:h-8 px-3 text-xs">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
          <Button variant="ghost" className="w-full text-xs sm:text-sm">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}