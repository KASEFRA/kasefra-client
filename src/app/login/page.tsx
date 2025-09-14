"use client"

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { LoginForm as LoginFormType } from "@/types"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (data: LoginFormType) => {
    // Mock login - in real app, this would call an API
    console.log("Login attempt:", data)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock success - store user session (in real app, handle JWT tokens)
    localStorage.setItem("kasefra-user", JSON.stringify({
      id: "user-123",
      name: "Ahmed Al Mansouri",
      email: data.email,
    }))
    
    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Kasefra</h1>
          <p className="text-muted-foreground">Smart Finance Management for UAE</p>
        </div>
        
        <LoginForm onSubmit={handleLogin} />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Kasefra. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}