"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  createdAt: string
  emailVerified: boolean
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  checkAuth: () => Promise<void>
}

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

// Mock user data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "demo@modernshop.com",
    password: "password123",
    firstName: "Demo",
    lastName: "User",
    phone: "+1 (555) 123-4567",
    createdAt: "2024-01-01T00:00:00Z",
    emailVerified: true,
  },
]

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock authentication logic
        const user = mockUsers.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          })
          return { success: true }
        } else {
          set({ isLoading: false })
          return { success: false, error: "Invalid email or password" }
        }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user already exists
        const existingUser = mockUsers.find((u) => u.email === data.email)
        if (existingUser) {
          set({ isLoading: false })
          return { success: false, error: "User with this email already exists" }
        }

        // Create new user
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          createdAt: new Date().toISOString(),
          emailVerified: false,
        }

        // Add to mock database
        mockUsers.push({ ...newUser, password: data.password })

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        })
        return { success: true }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateProfile: async (data: Partial<User>) => {
        const currentUser = get().user
        if (!currentUser) {
          return { success: false, error: "Not authenticated" }
        }

        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const updatedUser = { ...currentUser, ...data }

        // Update mock database
        const userIndex = mockUsers.findIndex((u) => u.id === currentUser.id)
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...data }
        }

        set({
          user: updatedUser,
          isLoading: false,
        })
        return { success: true }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = mockUsers.find((u) => u.email === email)

        set({ isLoading: false })

        if (user) {
          return { success: true }
        } else {
          return { success: false, error: "No account found with this email address" }
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        const currentUser = get().user
        if (!currentUser) {
          return { success: false, error: "Not authenticated" }
        }

        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = mockUsers.find((u) => u.id === currentUser.id)

        if (user && user.password === currentPassword) {
          user.password = newPassword
          set({ isLoading: false })
          return { success: true }
        } else {
          set({ isLoading: false })
          return { success: false, error: "Current password is incorrect" }
        }
      },

      checkAuth: async () => {
        // This would typically validate a stored token
        // For now, we'll just check if user exists in store
        const user = get().user
        if (user) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
