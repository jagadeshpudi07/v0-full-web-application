"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()

    if (!isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, router, redirectTo, checkAuth])

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
