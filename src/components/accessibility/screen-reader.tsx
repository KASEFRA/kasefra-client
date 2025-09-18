"use client"

import { useEffect, useRef } from "react"

interface ScreenReaderProps {
  children: React.ReactNode
  announce?: string
  priority?: "polite" | "assertive"
}

export function ScreenReaderAnnouncer({ announce, priority = "polite" }: { announce?: string; priority?: "polite" | "assertive" }) {
  const announcerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (announce && announcerRef.current) {
      announcerRef.current.textContent = announce
    }
  }, [announce])

  return (
    <div
      ref={announcerRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  )
}

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </a>
  )
}

interface LiveRegionProps {
  children: React.ReactNode
  priority?: "polite" | "assertive"
  atomic?: boolean
}

export function LiveRegion({ children, priority = "polite", atomic = true }: LiveRegionProps) {
  return (
    <div
      aria-live={priority}
      aria-atomic={atomic}
      role="status"
    >
      {children}
    </div>
  )
}

// Hook for managing focus
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement | null>(null)

  const saveFocus = () => {
    focusRef.current = document.activeElement as HTMLElement
  }

  const restoreFocus = () => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  const moveFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus()
    }
  }

  return { saveFocus, restoreFocus, moveFocus }
}

// Hook for keyboard navigation
export function useKeyboardNavigation(
  onEscape?: () => void,
  onEnter?: () => void,
  onSpace?: () => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onEscape?.()
          break
        case 'Enter':
          onEnter?.()
          break
        case ' ':
          onSpace?.()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onEscape, onEnter, onSpace])
}

// Component for accessible modals
interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md"
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useKeyboardNavigation(onClose)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl"
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-card p-6 rounded-lg shadow-lg ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
        tabIndex={-1}
      >
        <h2 id="modal-title" className="text-lg font-semibold mb-4">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}