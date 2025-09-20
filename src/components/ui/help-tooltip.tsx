"use client"

import * as React from "react"
import { HelpCircle, Info, Lightbulb, AlertCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HelpTooltipProps {
  content: React.ReactNode
  title?: string
  type?: 'help' | 'info' | 'tip' | 'warning'
  side?: 'top' | 'right' | 'bottom' | 'left'
  children?: React.ReactNode
  className?: string
  asChild?: boolean
}

const iconMap = {
  help: HelpCircle,
  info: Info,
  tip: Lightbulb,
  warning: AlertCircle
}

const colorMap = {
  help: "text-muted-foreground hover:text-primary",
  info: "text-primary-500 hover:text-primary-600",
  tip: "text-yellow-500 hover:text-yellow-600",
  warning: "text-orange-500 hover:text-orange-600"
}

export function HelpTooltip({
  content,
  title,
  type = 'help',
  side = 'top',
  children,
  className,
  asChild = false
}: HelpTooltipProps) {
  const Icon = iconMap[type]

  const trigger = children || (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-5 w-5 p-0 rounded-full",
        colorMap[type],
        className
      )}
      asChild={asChild}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {trigger}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="max-w-xs p-3"
          sideOffset={8}
        >
          {title && (
            <div className="font-medium mb-1 text-sm">
              {title}
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            {content}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface FeatureTooltipProps {
  feature: string
  description: string
  shortcut?: string
  isNew?: boolean
  children: React.ReactNode
}

export function FeatureTooltip({
  feature,
  description,
  shortcut,
  isNew,
  children
}: FeatureTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-sm p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{feature}</span>
              {isNew && (
                <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
            {shortcut && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Shortcut:</span>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                  {shortcut}
                </kbd>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface UAESpecificTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
}

export function UAESpecificTooltip({ children, content }: UAESpecificTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3">
          <div className="flex items-start gap-2">
            <div className="text-lg">🇦🇪</div>
            <div className="space-y-1">
              <div className="font-medium text-sm text-primary">
                UAE Specific
              </div>
              <div className="text-sm text-muted-foreground">
                {content}
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}