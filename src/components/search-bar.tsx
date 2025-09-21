"use client"

import { Button } from "@/components/ui/button"
import { Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  onClick: () => void
  className?: string
}

export function SearchBar({ onClick, className }: SearchBarProps) {
  return (
    <>
      {/* Desktop Search Bar */}
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full max-w-sm justify-start bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56",
          className
        )}
        onClick={onClick}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 sm:hidden"
        onClick={onClick}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </>
  )
}