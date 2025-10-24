"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { useToast } from "@/lib/hooks/useToast"

export default function LoginPage() {
  const router = useRouter()
  const { success, error } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) newErrors.email = "Email is required"
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format"

    if (!password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("userId", data.userId)
        localStorage.setItem("userName", data.userName)

        success("Login successful! Redirecting...")

        await new Promise((resolve) => setTimeout(resolve, 1200))

        if (data.role === "Mentor") {
          router.push("/startupnest/mentor/home")
        } else {
          router.push("/startupnest/entrepreneur/home")
        }
      } else {
        error(data.message || "Login failed")
      }
    } catch (err) {
      error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-card/50 backdrop-blur border border-border/40 rounded-xl p-8 shadow-2xl hover:border-primary/50 transition-all duration-300">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Welcome Back</h1>
            <p className="text-muted-foreground text-center mb-8">Sign in to your StartupNest account</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-destructive text-sm animate-in fade-in">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Password <span className="text-destructive">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-destructive text-sm animate-in fade-in">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/startupnest/signup")}
                className="text-primary hover:underline font-semibold transition-colors"
              >
                Create your account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
