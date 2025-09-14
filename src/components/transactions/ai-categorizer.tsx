"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, Check, X, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Transaction {
  id: string
  description: string
  merchant: string
  amount: number
  category: string
  confidence?: number
  suggestedCategory?: string
}

interface AiCategorizerProps {
  transactions: Transaction[]
  onCategorize: (transactionId: string, category: string) => void
}

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Bills & Utilities",
  "Healthcare",
  "Entertainment",
  "Travel",
  "Education",
  "Groceries",
  "Gas",
  "Income",
  "Transfer",
  "Other"
]

export function AiCategorizer({ transactions, onCategorize }: AiCategorizerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestions, setSuggestions] = useState<Transaction[]>([])
  const [learningStats, setLearningStats] = useState({
    totalCategorized: 156,
    userCorrections: 12,
    accuracyImprovement: 8.5,
    lastLearningUpdate: new Date().toISOString()
  })
  const { toast } = useToast()

  // Mock AI categorization logic
  const analyzeTransactions = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const transactionsWithSuggestions = transactions
      .filter(t => t.category === "Other" || !t.category)
      .map(transaction => {
        // Simple rule-based categorization for demo
        const description = transaction.description.toLowerCase()
        const merchant = transaction.merchant.toLowerCase()
        
        let suggestedCategory = "Other"
        let confidence = 0.5
        
        // Food & Dining
        if (merchant.includes("restaurant") || merchant.includes("cafe") || 
            description.includes("food") || merchant.includes("mcdonald") ||
            merchant.includes("starbucks") || merchant.includes("pizza")) {
          suggestedCategory = "Food & Dining"
          confidence = 0.85
        }
        // Transportation
        else if (merchant.includes("uber") || merchant.includes("taxi") || 
                 merchant.includes("metro") || description.includes("transport")) {
          suggestedCategory = "Transportation"
          confidence = 0.90
        }
        // Shopping
        else if (merchant.includes("amazon") || merchant.includes("mall") ||
                 merchant.includes("store") || description.includes("shopping")) {
          suggestedCategory = "Shopping"
          confidence = 0.80
        }
        // Groceries
        else if (merchant.includes("carrefour") || merchant.includes("lulu") ||
                 merchant.includes("grocery") || merchant.includes("supermarket")) {
          suggestedCategory = "Groceries"
          confidence = 0.88
        }
        // Bills & Utilities
        else if (merchant.includes("dewa") || merchant.includes("etisalat") ||
                 description.includes("bill") || description.includes("utility")) {
          suggestedCategory = "Bills & Utilities"
          confidence = 0.92
        }
        // Gas
        else if (merchant.includes("adnoc") || merchant.includes("eppco") ||
                 description.includes("fuel") || description.includes("gas")) {
          suggestedCategory = "Gas"
          confidence = 0.95
        }
        // Income
        else if (transaction.amount > 0) {
          suggestedCategory = "Income"
          confidence = 0.70
        }
        
        return {
          ...transaction,
          suggestedCategory,
          confidence
        }
      })
      .filter(t => t.confidence > 0.6) // Only show high-confidence suggestions
    
    setSuggestions(transactionsWithSuggestions)
    setIsAnalyzing(false)
    
    toast({
      title: "AI Analysis Complete",
      description: `Found ${transactionsWithSuggestions.length} categorization suggestions`,
    })
  }

  const acceptSuggestion = (transactionId: string, category: string, isUserCorrection: boolean = false) => {
    onCategorize(transactionId, category)
    setSuggestions(suggestions.filter(s => s.id !== transactionId))

    // Simulate learning feedback
    if (isUserCorrection) {
      setLearningStats(prev => ({
        ...prev,
        userCorrections: prev.userCorrections + 1,
        accuracyImprovement: prev.accuracyImprovement + 0.2,
        lastLearningUpdate: new Date().toISOString()
      }))

      toast({
        title: "Learning from Your Input",
        description: `AI model updated with your correction to ${category}. Accuracy improved!`,
      })
    } else {
      setLearningStats(prev => ({
        ...prev,
        totalCategorized: prev.totalCategorized + 1
      }))

      toast({
        title: "Category Updated",
        description: `Transaction categorized as ${category}`,
      })
    }
  }

  const rejectSuggestion = (transactionId: string) => {
    setSuggestions(suggestions.filter(s => s.id !== transactionId))
  }

  const acceptAllSuggestions = () => {
    suggestions.forEach(suggestion => {
      if (suggestion.suggestedCategory) {
        onCategorize(suggestion.id, suggestion.suggestedCategory)
      }
    })
    setSuggestions([])
    
    toast({
      title: "All Suggestions Applied",
      description: "All AI suggestions have been applied to your transactions",
    })
  }

  const getConfidenceColor = (confidence: number): "default" | "secondary" | "destructive" | "outline" => {
    if (confidence >= 0.9) return "default" // High confidence - primary theme color
    if (confidence >= 0.8) return "secondary" // Good confidence - secondary theme color
    if (confidence >= 0.7) return "outline" // Medium confidence - outline style
    return "destructive" // Low confidence - warning style
  }

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return "High"
    if (confidence >= 0.8) return "Good"
    if (confidence >= 0.7) return "Medium"
    return "Low"
  }

  const uncategorizedCount = transactions.filter(t => t.category === "Other" || !t.category).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle>AI Transaction Categorizer</CardTitle>
          </div>
          <Button 
            onClick={analyzeTransactions}
            disabled={isAnalyzing || uncategorizedCount === 0}
            size="sm"
          >
            {isAnalyzing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isAnalyzing ? "Analyzing..." : "Analyze Transactions"}
          </Button>
        </div>
        <CardDescription>
          {uncategorizedCount > 0
            ? `${uncategorizedCount} transactions need categorization`
            : "All transactions are categorized"
          }
        </CardDescription>

        {/* Learning Statistics */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{learningStats.totalCategorized} categorized</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>{learningStats.userCorrections} corrections learned</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>{learningStats.accuracyImprovement.toFixed(1)}% accuracy gain</span>
          </div>
        </div>
      </CardHeader>
      
      {suggestions.length > 0 && (
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">AI Suggestions</h3>
            <Button onClick={acceptAllSuggestions} size="sm" variant="outline">
              Accept All ({suggestions.length})
            </Button>
          </div>
          
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{suggestion.description}</span>
                    <Badge variant={getConfidenceColor(suggestion.confidence!)}>
                      {getConfidenceText(suggestion.confidence!)} ({Math.round(suggestion.confidence! * 100)}%)
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.merchant}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Suggested:</span>
                    <Badge variant="outline">{suggestion.suggestedCategory}</Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={suggestion.suggestedCategory}
                    onValueChange={(value) => {
                      const isCorrection = value !== suggestion.suggestedCategory
                      acceptSuggestion(suggestion.id, value, isCorrection)
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => acceptSuggestion(suggestion.id, suggestion.suggestedCategory!)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => rejectSuggestion(suggestion.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}