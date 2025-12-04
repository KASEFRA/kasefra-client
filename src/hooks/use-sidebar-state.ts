"use client"

import { useState, useEffect, useCallback } from "react"

interface SidebarState {
  isOpen: boolean
  isCollapsed: boolean
  isMobile: boolean
}

const SIDEBAR_STORAGE_KEY = "kasefra-sidebar-state"

export function useSidebarState() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      if (saved) {
        const state: SidebarState = JSON.parse(saved)
        setIsCollapsed(state.isCollapsed || false)
      }
    } catch (error) {
      console.warn('Failed to load sidebar state:', error)
    }
  }, [])

  // Save state to localStorage
  const saveState = useCallback((newState: Partial<SidebarState>) => {
    try {
      const currentState = {
        isOpen,
        isCollapsed,
        isMobile
      }
      const updatedState = { ...currentState, ...newState }
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(updatedState))
    } catch (error) {
      console.warn('Failed to save sidebar state:', error)
    }
  }, [isOpen, isCollapsed, isMobile])

  // Toggle sidebar open/close (mobile)
  const toggleOpen = useCallback(() => {
    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)
    saveState({ isOpen: newIsOpen })
  }, [isOpen, saveState])

  // Toggle sidebar collapsed/expanded (desktop)
  const toggleCollapsed = useCallback(() => {
    const newIsCollapsed = !isCollapsed
    setIsCollapsed(newIsCollapsed)
    saveState({ isCollapsed: newIsCollapsed })
  }, [isCollapsed, saveState])

  // Close sidebar (mobile)
  const close = useCallback(() => {
    setIsOpen(false)
    saveState({ isOpen: false })
  }, [saveState])

  // Open sidebar (mobile)
  const open = useCallback(() => {
    setIsOpen(true)
    saveState({ isOpen: true })
  }, [saveState])

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        if (isMobile) {
          toggleOpen()
        } else {
          toggleCollapsed()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobile, toggleOpen, toggleCollapsed])

  return {
    isOpen,
    isCollapsed,
    isMobile,
    toggleOpen,
    toggleCollapsed,
    close,
    open,
    setIsOpen,
    setIsCollapsed
  }
}