"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ToastProvider } from "@/lib/toast-provider"
import ChatBot from "@/components/chatbot/ChatBot"

export default function StartupNestLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication for protected routes
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    const protectedRoutes = ["/startupnest/mentor", "/startupnest/entrepreneur"]

    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtectedRoute && !token) {
      router.push("/startupnest/login")
    }

    // Redirect to appropriate dashboard if already logged in
    if ((pathname === "/startupnest/login" || pathname === "/startupnest/signup") && token && role) {
      if (role === "Mentor") {
        router.push("/startupnest/mentor/home")
      } else {
        router.push("/startupnest/entrepreneur/home")
      }
    }
  }, [pathname, router])

  return (
    <>
      <ToastProvider />
      <ChatBot />
      {children}
    </>
  )
}
