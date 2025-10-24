"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(15, 23, 42, 0.95)",
          color: "#f1f5f9",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "0.5rem",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
        },
        success: {
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            color: "#10b981",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "rgba(15, 23, 42, 0.95)",
          },
        },
        error: {
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            color: "#ef4444",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "rgba(15, 23, 42, 0.95)",
          },
        },
      }}
    />
  )
}
