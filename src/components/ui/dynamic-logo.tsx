"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface DynamicLogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
  priority?: boolean
}

export function DynamicLogo({
  width = 240,
  height = 120,
  className,
  alt = "Kasefra Logo",
  priority = false
}: DynamicLogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Handle hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which logo to use
  const getLogoSrc = () => {
    // During SSR or before hydration, default to light logo
    if (!mounted) {
      return "/logo.png"
    }

    // Use resolvedTheme which handles 'system' preference
    const currentTheme = resolvedTheme || theme

    switch (currentTheme) {
      case 'dark':
        return "/logo-dark.png"
      case 'light':
      default:
        return "/logo.png"
    }
  }

  return (
    <Image
      src={getLogoSrc()}
      alt={alt}
      width={width}
      height={height}
      className={cn("transition-opacity duration-200", className)}
      priority={priority}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  )
}