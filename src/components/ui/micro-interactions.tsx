"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-focus-management"

// Animated Button Component
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children: React.ReactNode
}

export function AnimatedButton({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: AnimatedButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  const buttonVariants = {
    idle: { scale: 1, y: 0 },
    hover: prefersReducedMotion ? {} : { scale: 1.02, y: -1 },
    tap: prefersReducedMotion ? {} : { scale: 0.98, y: 0 }
  }

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-primary text-primary-foreground shadow hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90': variant === 'destructive',
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80': variant === 'secondary',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'text-primary underline-offset-4 hover:underline': variant === 'link',
        },
        {
          'h-9 px-4 py-2': size === 'default',
          'h-8 rounded-md px-3 text-xs': size === 'sm',
          'h-10 rounded-md px-8': size === 'lg',
          'h-9 w-9': size === 'icon',
        },
        className
      )}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.15, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Loading Spinner with Animation
export function LoadingSpinner({ size = 'default', className }: { size?: 'sm' | 'default' | 'lg', className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <motion.div
      className={cn(
        "border-2 border-gray-300 border-t-primary rounded-full",
        sizeClasses[size],
        className
      )}
      animate={prefersReducedMotion ? {} : { rotate: 360 }}
      transition={prefersReducedMotion ? {} : {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

// Staggered List Animation
interface StaggeredListProps {
  children: React.ReactNode[]
  className?: string
  delay?: number
}

export function StaggeredList({ children, className, delay = 0.1 }: StaggeredListProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : delay
      }
    }
  }

  const itemVariants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    visible: prefersReducedMotion ? {} : {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Slide In Animation
interface SlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  className?: string
}

export function SlideIn({ children, direction = 'up', delay = 0, className }: SlideInProps) {
  const prefersReducedMotion = useReducedMotion()

  const directionVariants = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 }
  }

  const variants = {
    hidden: prefersReducedMotion ? {} : {
      opacity: 0,
      ...directionVariants[direction]
    },
    visible: prefersReducedMotion ? {} : {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

// Scale In Animation
interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: prefersReducedMotion ? {} : {
      opacity: 0,
      scale: 0.8
    },
    visible: prefersReducedMotion ? {} : {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

// Pulse Animation
interface PulseProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function Pulse({ children, className, duration = 2 }: PulseProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={prefersReducedMotion ? {} : {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Hover Scale Effect
interface HoverScaleProps {
  children: React.ReactNode
  scale?: number
  className?: string
}

export function HoverScale({ children, scale = 1.05, className }: HoverScaleProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      whileHover={prefersReducedMotion ? {} : { scale }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Page Transition Wrapper
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    initial: prefersReducedMotion ? {} : {
      opacity: 0,
      y: 20
    },
    animate: prefersReducedMotion ? {} : {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: prefersReducedMotion ? {} : {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

// Notification Toast Animation
interface NotificationToastProps {
  isVisible: boolean
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

export function NotificationToast({ isVisible, children, className, onClose }: NotificationToastProps) {
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    if (isVisible && onClose) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: prefersReducedMotion ? { opacity: 1 } : {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: prefersReducedMotion ? { opacity: 0 } : {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed bottom-4 right-4 z-50 max-w-sm",
            className
          )}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Ripple Effect for Buttons
export function useRipple() {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])

  const addRipple = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }, [])

  const rippleElements = ripples.map(ripple => (
    <motion.span
      key={ripple.id}
      className="absolute rounded-full bg-white/30 pointer-events-none"
      style={{
        left: ripple.x - 10,
        top: ripple.y - 10,
        width: 20,
        height: 20
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  ))

  return { addRipple, rippleElements }
}