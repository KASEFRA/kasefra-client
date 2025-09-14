"use client"

import { useRouter } from "next/navigation"
import { RegisterForm } from "@/components/auth/register-form"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { RegisterForm as RegisterFormType } from "@/types"

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = async (data: RegisterFormType) => {
    // Mock registration - in real app, this would call an API
    console.log("Registration attempt:", data)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock success - create user account
    const newUser = {
      id: "user-" + Date.now(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
    }
    
    // Store user session
    localStorage.setItem("kasefra-user", JSON.stringify(newUser))
    
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
        
        <RegisterForm onSubmit={handleRegister} />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Kasefra. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}