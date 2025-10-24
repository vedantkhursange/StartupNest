"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { useToast } from "@/lib/hooks/useToast"

export default function SignupPage() {
  const router = useRouter()
  const { success, error } = useToast()
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "Entrepreneur",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRegex = /^[0-9]{10}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!formData.userName) newErrors.userName = "Username is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.mobile) newErrors.mobile = "Mobile number is required"
    else if (!mobileRegex.test(formData.mobile)) newErrors.mobile = "Mobile must be 10 digits"
    if (!formData.password) newErrors.password = "Password is required"
    else if (!passwordRegex.test(formData.password))
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, and number"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
          role: formData.role,
        }),
      })

      if (response.ok) {
        success("Account created successfully! Redirecting to login...")

        await new Promise((resolve) => setTimeout(resolve, 1200))
        router.push("/startupnest/login")
      } else {
        const data = await response.json()
        error(data.message || "Signup failed")
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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-card/50 backdrop-blur border border-border/40 rounded-xl p-8 shadow-2xl hover:border-primary/50 transition-all duration-300">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Create Account</h1>
            <p className="text-muted-foreground text-center mb-8">Join StartupNest today</p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Username <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Your username"
                />
                {errors.userName && <p className="text-destructive text-sm animate-in fade-in">{errors.userName}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-destructive text-sm animate-in fade-in">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Mobile <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="1234567890"
                />
                {errors.mobile && <p className="text-destructive text-sm animate-in fade-in">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Password <span className="text-destructive">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-destructive text-sm animate-in fade-in">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm animate-in fade-in">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  I am a <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/startupnest/login")}
                className="text-primary hover:underline font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
