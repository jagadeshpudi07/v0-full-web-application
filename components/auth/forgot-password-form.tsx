"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuthStore } from "@/lib/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export function ForgotPasswordForm() {
  const { resetPassword, isLoading } = useAuthStore()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    const result = await resetPassword(email)

    if (result.success) {
      setMessage("Password reset instructions have been sent to your email address.")
      setIsSubmitted(true)
    } else {
      setError(result.error || "Failed to send reset email")
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
              <CardDescription>We've sent password reset instructions to {email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                <p>Didn't receive the email? Check your spam folder or</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                    setMessage("")
                  }}
                >
                  try again
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Forgot password?</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
