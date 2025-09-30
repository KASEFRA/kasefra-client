import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Building2, Landmark, CreditCard, TrendingUp, Banknote } from "lucide-react"

interface BankAvatarProps {
  bankName: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const bankStyles = {
  "Emirates NBD": {
    bg: "bg-red-500",
    text: "text-white",
    initials: "EN",
    icon: Building2
  },
  "Abu Dhabi Commercial Bank": {
    bg: "bg-blue-600",
    text: "text-white",
    initials: "AD",
    icon: Landmark
  },
  "First Abu Dhabi Bank": {
    bg: "bg-green-600",
    text: "text-white",
    initials: "FA",
    icon: CreditCard
  },
  "EFG Hermes": {
    bg: "bg-purple-600",
    text: "text-white",
    initials: "EF",
    icon: TrendingUp
  },
  "HSBC UAE": {
    bg: "bg-red-600",
    text: "text-white",
    initials: "HS",
    icon: Banknote
  }
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base"
}

export function BankAvatar({ bankName, size = "md", className }: BankAvatarProps) {
  const bankStyle = bankStyles[bankName as keyof typeof bankStyles] || {
    bg: "bg-gray-500",
    text: "text-white",
    initials: bankName.substring(0, 2).toUpperCase(),
    icon: Building2
  }

  const IconComponent = bankStyle.icon
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarFallback
        className={cn(
          bankStyle.bg,
          bankStyle.text,
          "font-semibold flex items-center justify-center"
        )}
      >
        <IconComponent className={iconSize} />
      </AvatarFallback>
    </Avatar>
  )
}