"use client"

import { useRef, useCallback, useEffect } from "react"

interface TouchGestureConfig {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onDoubleTap?: () => void
  threshold?: number
  preventScroll?: boolean
}

interface TouchPoint {
  x: number
  y: number
  timestamp: number
}

export function useTouchGestures(config: TouchGestureConfig) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onDoubleTap,
    threshold = 50,
    preventScroll = false
  } = config

  const touchStart = useRef<TouchPoint | null>(null)
  const lastTap = useRef<number>(0)
  const initialDistance = useRef<number>(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventScroll) {
      e.preventDefault()
    }

    const touch = e.touches[0]
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }

    // Handle pinch gesture setup
    if (e.touches.length === 2 && onPinch) {
      const distance = Math.sqrt(
        Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
      )
      initialDistance.current = distance
    }
  }, [preventScroll, onPinch])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (preventScroll) {
      e.preventDefault()
    }

    // Handle pinch gesture
    if (e.touches.length === 2 && onPinch && initialDistance.current > 0) {
      const currentDistance = Math.sqrt(
        Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
        Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
      )
      const scale = currentDistance / initialDistance.current
      onPinch(scale)
    }
  }, [preventScroll, onPinch])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    const deltaTime = Date.now() - touchStart.current.timestamp

    // Handle double tap
    if (onDoubleTap && deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      const now = Date.now()
      if (now - lastTap.current < 300) {
        onDoubleTap()
        lastTap.current = 0
        return
      }
      lastTap.current = now
    }

    // Handle swipe gestures
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown()
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp()
        }
      }
    }

    touchStart.current = null
    initialDistance.current = 0
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onDoubleTap])

  const attachGestures = useCallback((element: HTMLElement | null) => {
    if (!element) return () => {}

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll })
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll])

  return { attachGestures }
}

// Hook for pull-to-refresh functionality
export function usePullToRefresh(onRefresh: () => void | Promise<void>) {
  const isRefreshing = useRef(false)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current

    // Only trigger if scrolled to top and pulling down
    if (window.scrollY === 0 && deltaY > 0) {
      e.preventDefault()

      // Add visual feedback here if needed
      if (deltaY > 80 && !isRefreshing.current) {
        // Could trigger haptic feedback on supported devices
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }
      }
    }
  }, [])

  const handleTouchEnd = useCallback(async () => {
    const deltaY = currentY.current - startY.current

    if (window.scrollY === 0 && deltaY > 80 && !isRefreshing.current) {
      isRefreshing.current = true
      try {
        await onRefresh()
      } finally {
        isRefreshing.current = false
      }
    }

    startY.current = 0
    currentY.current = 0
  }, [onRefresh])

  const attachPullToRefresh = useCallback((element: HTMLElement | null) => {
    if (!element) return () => {}

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return { attachPullToRefresh, isRefreshing: isRefreshing.current }
}