"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  PieChart,
  Target,
  AlertTriangle,
  Download,
  RefreshCw
} from "lucide-react"
import { getAIResponse } from "@/lib/mock-data/ai-responses"
import { SmartRecommendations } from "@/components/ai/smart-recommendations"
import { FinancialHealthScore } from "@/components/ai/financial-health-score"
import { PredictiveAlerts } from "@/components/ai/predictive-alerts"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  isTyping?: boolean
  actions?: string[]
  followUp?: string
  relatedCharts?: string[]
  confidence?: number
}

const conversationStarters = [
  {
    icon: <PieChart className="h-4 w-4" />,
    title: "How much did I spend on dining this month?",
    category: "Spending Analysis"
  },
  {
    icon: <Target className="h-4 w-4" />,
    title: "When should I pay Zakat?",
    category: "UAE Financial"
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: "How much should I save for Hajj?",
    category: "Goals"
  },
  {
    icon: <AlertTriangle className="h-4 w-4" />,
    title: "My DEWA bill is unusually high this month",
    category: "UAE Bills"
  },
  {
    icon: <Bot className="h-4 w-4" />,
    title: "What's my financial health score?",
    category: "Health Check"
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "Best Islamic investment options in UAE",
    category: "Investments"
  }
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI financial assistant for UAE residents. I can help you with spending analysis, Zakat calculations, Hajj savings, DEWA bills, Islamic investments, and much more. What would you like to know about your finances today?",
      isBot: true,
      timestamp: new Date(),
      actions: ["spending-analysis", "zakat-help", "hajj-planning", "bill-optimization"]
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeWidget, setActiveWidget] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (query?: string) => {
    const messageText = query || inputValue.trim()
    if (!messageText || isTyping) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: "AI is analyzing your financial data...",
      isBot: true,
      timestamp: new Date(),
      isTyping: true
    }

    setMessages(prev => [...prev, typingMessage])

    // Simulate AI processing
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping))

      const aiResponse = getAIResponse(messageText)

      if (aiResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.response,
          isBot: true,
          timestamp: new Date(),
          actions: aiResponse.actions,
          followUp: aiResponse.followUp,
          relatedCharts: aiResponse.relatedCharts,
          confidence: aiResponse.confidence
        }
        setMessages(prev => [...prev, botMessage])

        // Add follow-up if available
        if (aiResponse.followUp) {
          setTimeout(() => {
            const followUpMessage: Message = {
              id: (Date.now() + 2).toString(),
              content: aiResponse.followUp!,
              isBot: true,
              timestamp: new Date()
            }
            setMessages(prev => [...prev, followUpMessage])
          }, 2000)
        }
      }

      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStarterClick = (starter: typeof conversationStarters[0]) => {
    handleSendMessage(starter.title)
  }

  const handleActionClick = (action: string) => {
    const actionQueries: Record<string, string> = {
      'spending-analysis': 'Show me my spending breakdown',
      'zakat-help': 'Help me calculate my Zakat',
      'hajj-planning': 'Help me plan for Hajj savings',
      'bill-optimization': 'How can I optimize my bills?',
      'set-budget': 'Help me set a budget',
      'view-breakdown': 'Show detailed breakdown',
      'create-goal': 'Create a savings goal',
      'view-savings-plan': 'Show my savings plan'
    }

    const query = actionQueries[action] || action.replace('-', ' ')
    handleSendMessage(query)
  }

  const toggleWidget = (widget: string) => {
    setActiveWidget(activeWidget === widget ? null : widget)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Main Chat Interface - Full Width */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <Card className="bg-card border shadow-sm h-[600px] flex flex-col bg-gradient-to-br from-card via-card to-muted/20">

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 1 && (
                <div className="text-center py-12">
                  <div className="mb-8">
                    <div className="w-16 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full mx-auto mb-6"></div>
                    <p className="text-muted-foreground text-sm">
                      Ask me anything about your UAE finances
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                    {conversationStarters.map((starter, index) => (
                      <div
                        key={index}
                        className="group cursor-pointer p-4 rounded-xl bg-gradient-to-br from-muted/30 via-muted/20 to-transparent border border-border/30 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:via-primary/3 hover:to-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        onClick={() => handleStarterClick(starter)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                            {starter.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-sm group-hover:text-primary transition-colors duration-300">{starter.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{starter.category}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] space-y-3 ${message.isBot ? 'items-start' : 'items-end'}`}>
                    <div className={`p-4 rounded-2xl backdrop-blur-sm ${
                      message.isBot
                        ? message.isTyping
                          ? 'bg-gradient-to-br from-muted/60 to-muted/40 text-muted-foreground animate-pulse border border-border/30'
                          : 'bg-gradient-to-br from-muted/80 via-muted/60 to-muted/40 text-foreground border border-border/20 shadow-sm'
                        : 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg shadow-primary/20'
                    }`}>
                      {message.isTyping ? (
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-sm">{message.content}</span>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm leading-relaxed">{message.content}</div>
                          {message.confidence && (
                            <div className="mt-2 pt-2 border-t border-current/20">
                              <div className="flex items-center gap-2 text-xs opacity-70">
                                <Sparkles className="h-3 w-3" />
                                <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Action buttons for bot messages */}
                    {message.isBot && message.actions && !message.isTyping && (
                      <div className="flex flex-wrap gap-2">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-3 "
                            onClick={() => handleActionClick(action)}
                          >
                            {action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Related charts indicator */}
                    {message.isBot && message.relatedCharts && message.relatedCharts.length > 0 && !message.isTyping && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <PieChart className="h-3 w-3" />
                        <span>Related charts available</span>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString('en-AE', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Enhanced Input Area */}
            <div className="p-6">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 rounded-2xl border border-border/20 backdrop-blur-sm">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your finances..."
                    className="border-0 bg-transparent focus:bg-transparent pr-12 text-sm placeholder:text-muted-foreground/60"
                    disabled={isTyping}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Sleek AI Widget Toggle Buttons */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => toggleWidget('health')}
              className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeWidget === 'health'
                  ? 'bg-gradient-to-r from-success/20 to-success/30 text-success border border-success/30 shadow-lg shadow-success/10'
                  : 'bg-gradient-to-r from-muted/30 to-muted/20 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Health</span>
              </div>
            </button>
            <button
              onClick={() => toggleWidget('recommendations')}
              className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeWidget === 'recommendations'
                  ? 'bg-gradient-to-r from-primary/20 to-primary/30 text-primary border border-primary/30 shadow-lg shadow-primary/10'
                  : 'bg-gradient-to-r from-muted/30 to-muted/20 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Tips</span>
              </div>
            </button>
            <button
              onClick={() => toggleWidget('predictions')}
              className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeWidget === 'predictions'
                  ? 'bg-gradient-to-r from-accent/20 to-accent/30 text-accent-foreground border border-accent/30 shadow-lg shadow-accent/10'
                  : 'bg-gradient-to-r from-muted/30 to-muted/20 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Insights</span>
              </div>
            </button>
          </div>

          {/* AI Widget Display Area */}
          {activeWidget === 'health' && <FinancialHealthScore />}
          {activeWidget === 'recommendations' && <SmartRecommendations />}
          {activeWidget === 'predictions' && <PredictiveAlerts />}
        </div>
      </div>
    </div>
  )
}