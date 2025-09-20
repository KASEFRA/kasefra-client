"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Plus,
  Search,
  Filter,
  AlertCircle,
  Wifi,
  Database,
  RefreshCw,
  ArrowRight
} from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  variant?: 'default' | 'minimal' | 'card'
}

export function EmptyState({
  title,
  description,
  icon: Icon = FileText,
  action,
  secondaryAction,
  className = "",
  variant = 'default'
}: EmptyStateProps) {
  const content = (
    <div className={`text-center space-y-4 ${className}`}>
      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || "default"}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="ghost"
              size="sm"
            >
              {secondaryAction.label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  )

  if (variant === 'card') {
    return (
      <Card>
        <CardContent className="py-12">
          {content}
        </CardContent>
      </Card>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className="py-8">
        {content}
      </div>
    )
  }

  return (
    <div className="py-12">
      {content}
    </div>
  )
}

// Predefined empty states
export function NoTransactions({ onAddTransaction }: { onAddTransaction?: () => void }) {
  return (
    <EmptyState
      title="No transactions yet"
      description="Start tracking your expenses by adding your first transaction. Connect your bank account or add manually."
      icon={FileText}
      action={onAddTransaction ? {
        label: "Add Transaction",
        onClick: onAddTransaction
      } : undefined}
      secondaryAction={{
        label: "Connect Bank Account",
        onClick: () => console.log("Connect bank")
      }}
      variant="card"
    />
  )
}

export function NoBudgets({ onCreateBudget }: { onCreateBudget?: () => void }) {
  return (
    <EmptyState
      title="No budgets created"
      description="Take control of your finances by creating your first budget. Set spending limits and track your progress."
      icon={Target}
      action={onCreateBudget ? {
        label: "Create Budget",
        onClick: onCreateBudget
      } : undefined}
      variant="card"
    />
  )
}

export function NoGoals({ onCreateGoal }: { onCreateGoal?: () => void }) {
  return (
    <EmptyState
      title="No goals set"
      description="Set financial goals to stay motivated and track your progress towards achieving your dreams."
      icon={Target}
      action={onCreateGoal ? {
        label: "Set Goal",
        onClick: onCreateGoal
      } : undefined}
      variant="card"
    />
  )
}

export function NoSearchResults({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      title="No results found"
      description="We couldn't find any items matching your search criteria. Try adjusting your filters or search terms."
      icon={Search}
      action={onClearFilters ? {
        label: "Clear Filters",
        onClick: onClearFilters,
        variant: "outline"
      } : undefined}
      variant="minimal"
    />
  )
}

export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again.",
  onRetry
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={AlertCircle}
      action={onRetry ? {
        label: "Try Again",
        onClick: onRetry,
        variant: "outline"
      } : undefined}
      className="text-destructive"
      variant="card"
    />
  )
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      title="You're offline"
      description="Check your internet connection and try again. Some features may be limited while offline."
      icon={Wifi}
      action={onRetry ? {
        label: "Retry Connection",
        onClick: onRetry,
        variant: "outline"
      } : undefined}
      variant="card"
    />
  )
}

export function LoadingFailed({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      title="Failed to load data"
      description="There was a problem loading your financial data. Please check your connection and try again."
      icon={Database}
      action={onRetry ? {
        label: "Reload",
        onClick: onRetry
      } : undefined}
      variant="card"
    />
  )
}

// UAE-specific empty states
export function NoUAEBanks({ onConnectBank }: { onConnectBank?: () => void }) {
  return (
    <div className="text-center space-y-4 py-12">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Database className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Connect your UAE bank</h3>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs">
            UAE
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Connect your Emirates NBD, ADCB, FAB, or other UAE bank accounts to automatically import your transactions.
        </p>
      </div>

      {onConnectBank && (
        <Button onClick={onConnectBank}>
          <Plus className="w-4 h-4 mr-2" />
          Connect Bank Account
        </Button>
      )}
    </div>
  )
}