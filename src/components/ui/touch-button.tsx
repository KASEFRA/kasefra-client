"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface TouchButtonProps extends ButtonProps {
  touchOptimized?: boolean
  minTouchTarget?: boolean
}

const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ touchOptimized = true, minTouchTarget = true, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          touchOptimized && [
            "touch-manipulation",
            "active:scale-95",
            "transition-transform duration-100",
            "select-none"
          ],
          minTouchTarget && "min-h-[44px] min-w-[44px]",
          className
        )}
        {...props}
      />
    )
  }
)

TouchButton.displayName = "TouchButton"

export { TouchButton }