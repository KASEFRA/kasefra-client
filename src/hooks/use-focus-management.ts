"use client"

import { useCallback, useEffect, useRef } from "react"

interface FocusManagementOptions {
  restoreFocus?: boolean
  autoFocus?: boolean
  trapFocus?: boolean
}

export function useFocusManagement(isOpen: boolean, options: FocusManagementOptions = {}) {
  const { restoreFocus = true, autoFocus = true, trapFocus = true } = options
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  // Store the previously focused element when opening
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
    }
  }, [isOpen])

  // Focus management when opening/closing
  useEffect(() => {
    if (isOpen && autoFocus && containerRef.current) {
      // Focus the first focusable element
      const firstFocusable = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement

      if (firstFocusable) {
        firstFocusable.focus()
      }
    } else if (!isOpen && restoreFocus && previousFocusRef.current) {
      // Restore focus to the previously focused element
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [isOpen, autoFocus, restoreFocus])

  // Focus trap implementation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || !trapFocus || !containerRef.current) return

    if (e.key === 'Tab') {
      const focusableElements = containerRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Close on Escape
    if (e.key === 'Escape') {
      e.preventDefault()
      // This would need to be passed as a callback
    }
  }, [isOpen, trapFocus])

  useEffect(() => {
    if (isOpen && trapFocus) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, trapFocus, handleKeyDown])

  return {
    containerRef,
    focusFirst: () => {
      if (containerRef.current) {
        const firstFocusable = containerRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement
        firstFocusable?.focus()
      }
    },
    focusLast: () => {
      if (containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
        lastElement?.focus()
      }
    }
  }
}

// Hook for managing skip links
export function useSkipLinks() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip links on Tab key
      if (e.key === 'Tab') {
        const skipLinks = document.querySelectorAll('[data-skip-link]')
        skipLinks.forEach((link) => {
          (link as HTMLElement).style.transform = 'translateY(0)'
        })
      }
    }

    const handleFocusOut = () => {
      // Hide skip links when focus moves away
      setTimeout(() => {
        const activeElement = document.activeElement
        const isSkipLink = activeElement?.hasAttribute('data-skip-link')

        if (!isSkipLink) {
          const skipLinks = document.querySelectorAll('[data-skip-link]')
          skipLinks.forEach((link) => {
            (link as HTMLElement).style.transform = 'translateY(-100%)'
          })
        }
      }, 100)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [])
}

// Hook for screen reader announcements
export function useScreenReader() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.setAttribute('class', 'sr-only')
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  return { announce }
}

// Hook for reducing motion preferences
export function useReducedMotion() {
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return prefersReducedMotion
}