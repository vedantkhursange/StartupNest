"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Menu, X } from "lucide-react"

export default function EntrepreneurHome() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [showLogoutAlert, setShowLogoutAlert] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const name = localStorage.getItem("userName")

    if (!token || role !== "Entrepreneur") {
      router.push("/startupnest/login")
    } else {
      setUserName(name || "")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/startupnest/login")
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">StartupNest</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-6 items-center">
                <button
                  onClick={() => router.push("/startupnest/entrepreneur/home")}
                  className="text-foreground hover:text-primary transition text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => router.push("/startupnest/entrepreneur/opportunities")}
                  className="text-foreground hover:text-primary transition text-sm"
                >
                  Mentor Opportunities
                </button>
                <button
                  onClick={() => router.push("/startupnest/entrepreneur/my-submissions")}
                  className="text-foreground hover:text-primary transition text-sm"
                >
                  My Submissions
                </button>
                <div className="text-xs sm:text-sm text-muted-foreground">Entrepreneur: {userName}</div>
                <button
                  onClick={() => setShowLogoutAlert(true)}
                  className="px-3 sm:px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition text-sm"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-foreground hover:text-primary transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 space-y-2 pb-4 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => {
                    router.push("/startupnest/entrepreneur/home")
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition text-sm hover:bg-card/50 rounded"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    router.push("/startupnest/entrepreneur/opportunities")
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition text-sm hover:bg-card/50 rounded"
                >
                  Mentor Opportunities
                </button>
                <button
                  onClick={() => {
                    router.push("/startupnest/entrepreneur/my-submissions")
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition text-sm hover:bg-card/50 rounded"
                >
                  My Submissions
                </button>
                <div className="px-4 py-2 text-xs text-muted-foreground">Entrepreneur: {userName}</div>
                <button
                  onClick={() => {
                    setShowLogoutAlert(true)
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">Welcome, {userName}!</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12">
              Find mentors, submit your startup ideas, and secure funding
            </p>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div
                onClick={() => router.push("/startupnest/entrepreneur/opportunities")}
                className="p-6 sm:p-8 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:border-primary/50 transition cursor-pointer hover:scale-105 transform"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Explore Opportunities</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Browse mentor funding opportunities and submit your ideas
                </p>
              </div>

              <div
                onClick={() => router.push("/startupnest/entrepreneur/my-submissions")}
                className="p-6 sm:p-8 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:border-primary/50 transition cursor-pointer hover:scale-105 transform"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">My Submissions</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Track your submitted ideas and their status
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent className="max-w-sm mx-4">
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <button onClick={() => setShowLogoutAlert(false)} className="text-foreground hover:text-primary transition">
              <X size={20} />
            </button>
          </div>
          <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
          <div className="flex gap-4 justify-end flex-col sm:flex-row">
            <button
              onClick={() => setShowLogoutAlert(false)}
              className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card/50 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition text-sm"
            >
              Yes, Logout
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
