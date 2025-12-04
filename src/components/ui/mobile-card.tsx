"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileCardProps extends React.ComponentProps<typeof Card> {
  compact?: boolean
  touchOptimized?: boolean
}

export function MobileCard({
  compact = false,
  touchOptimized = true,
  className,
  children,
  ...props
}: MobileCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200",
        compact && "p-3 sm:p-6",
        touchOptimized && "touch-manipulation active:scale-[0.99] hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

interface MobileCardHeaderProps extends React.ComponentProps<typeof CardHeader> {
  compact?: boolean
}

export function MobileCardHeader({
  compact = false,
  className,
  children,
  ...props
}: MobileCardHeaderProps) {
  return (
    <CardHeader
      className={cn(
        compact ? "pb-2 px-3 pt-3 sm:pb-6 sm:px-6 sm:pt-6" : "",
        className
      )}
      {...props}
    >
      {children}
    </CardHeader>
  )
}

interface MobileCardContentProps extends React.ComponentProps<typeof CardContent> {
  compact?: boolean
}

export function MobileCardContent({
  compact = false,
  className,
  children,
  ...props
}: MobileCardContentProps) {
  return (
    <CardContent
      className={cn(
        compact ? "px-3 pb-3 pt-0 sm:px-6 sm:pb-6" : "",
        className
      )}
      {...props}
    >
      {children}
    </CardContent>
  )
}

interface MobileCardTitleProps extends React.ComponentProps<typeof CardTitle> {
  compact?: boolean
}

export function MobileCardTitle({
  compact = false,
  className,
  children,
  ...props
}: MobileCardTitleProps) {
  return (
    <CardTitle
      className={cn(
        compact ? "text-base sm:text-lg" : "text-lg sm:text-xl",
        className
      )}
      {...props}
    >
      {children}
    </CardTitle>
  )
}

interface MobileCardDescriptionProps extends React.ComponentProps<typeof CardDescription> {
  compact?: boolean
}

export function MobileCardDescription({
  compact = false,
  className,
  children,
  ...props
}: MobileCardDescriptionProps) {
  return (
    <CardDescription
      className={cn(
        compact ? "text-xs sm:text-sm" : "text-sm",
        className
      )}
      {...props}
    >
      {children}
    </CardDescription>
  )
}