"use client"

import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"

export default function ErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="text-6xl font-bold text-destructive mb-4">Oops!</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Something Went Wrong</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-card border border-border/40 text-foreground rounded-lg hover:border-primary/50 transition font-semibold"
            >
              Go Back
            </button>
            <button
              onClick={() => router.push("/startupnest")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
