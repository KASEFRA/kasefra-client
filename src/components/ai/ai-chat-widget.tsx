"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, X, Minimize2 } from "lucide-react"
import { getAIResponse } from "@/lib/mock-data/ai-responses"

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  isTyping?: boolean
  actions?: string[]
  followUp?: string
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI financial assistant. Ask me about spending analysis, UAE-specific advice like Zakat calculations, Hajj savings, DEWA bills, or Islamic investments!",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return

    const userQuery = inputValue.trim()

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userQuery,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: "AI is thinking...",
      isBot: true,
      timestamp: new Date(),
      isTyping: true
    }

    setMessages(prev => [...prev, typingMessage])

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping))

      // Get intelligent AI response
      const aiResponse = getAIResponse(userQuery)

      if (aiResponse) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.response,
          isBot: true,
          timestamp: new Date(),
          actions: aiResponse.actions,
          followUp: aiResponse.followUp
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
          }, 1500)
        }
      }

      setIsTyping(false)
    }, 1500 + Math.random() * 1000) // 1.5-2.5s realistic processing time
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'}`}>
        <CardHeader className="p-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm">AI Assistant</CardTitle>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                Online
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] space-y-2 ${
                    message.isBot ? 'items-start' : 'items-end'
                  }`}>
                    <div className={`p-3 rounded-lg text-sm ${
                      message.isBot
                        ? message.isTyping
                          ? 'bg-muted/60 text-muted-foreground animate-pulse'
                          : 'bg-muted text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {message.isTyping ? (
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="ml-2">Thinking...</span>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>

                    {/* Action buttons for bot messages */}
                    {message.isBot && message.actions && !message.isTyping && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-6 px-2"
                            onClick={() => {
                              // Handle action button clicks
                              setInputValue(action.replace('-', ' '))
                            }}
                          >
                            {action.replace('-', ' ')}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t p-3">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Zakat, DEWA bills, Hajj savings..."
                  className="text-sm"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}