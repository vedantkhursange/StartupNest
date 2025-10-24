"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"

export default function StartupNestLanding() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    if (token && role) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold text-primary">StartupNest</div>
              <div className="flex gap-4">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      localStorage.clear()
                      router.push("/startupnest/login")
                    }}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/startupnest/login")}
                      className="px-6 py-2 text-foreground hover:text-primary transition"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push("/startupnest/signup")}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-heading">
              Welcome to <span className="text-primary">StartupNest</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-subheading">
              Connect innovative entrepreneurs with experienced mentors. Turn startup dreams into reality with smart
              funding and mentorship.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in-buttons">
              {!isLoggedIn && (
                <>
                  <button
                    onClick={() => router.push("/startupnest/signup")}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => router.push("/startupnest/login")}
                    className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition font-semibold"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:border-primary/50 transition">
              <h3 className="text-xl font-bold text-foreground mb-3">For Entrepreneurs</h3>
              <p className="text-muted-foreground">
                Submit your startup ideas, get mentorship, and secure funding from experienced investors.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:border-primary/50 transition">
              <h3 className="text-xl font-bold text-foreground mb-3">For Mentors</h3>
              <p className="text-muted-foreground">
                Create funding opportunities, review startup submissions, and build your portfolio of successful
                ventures.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:border-primary/50 transition">
              <h3 className="text-xl font-bold text-foreground mb-3">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Track submission status, get instant notifications, and stay connected throughout the incubation
                process.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
