"use client"

import toast from "react-hot-toast"

export function useToast() {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    loading: (message: string) => toast.loading(message),
    promise: (promise: Promise<any>, messages: { loading: string; success: string; error: string }) =>
      toast.promise(promise, messages),
  }
}
