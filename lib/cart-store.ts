"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  color?: string
  size?: string
  quantity: number
  inStock: boolean
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number, color?: string, size?: string) => void
  updateQuantity: (id: number, quantity: number, color?: string, size?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  toggleCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
        )

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += 1
          set({ items: updatedItems })
        } else {
          // Add new item
          set({ items: [...items, { ...newItem, quantity: 1 }] })
        }
      },

      removeItem: (id, color, size) => {
        const items = get().items.filter((item) => !(item.id === id && item.color === color && item.size === size))
        set({ items })
      },

      updateQuantity: (id, quantity, color, size) => {
        if (quantity <= 0) {
          get().removeItem(id, color, size)
          return
        }

        const items = get().items.map((item) =>
          item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item,
        )
        set({ items })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal()
        const tax = get().getTax()
        const shipping = get().getShipping()
        return subtotal + tax + shipping
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTax: () => {
        const subtotal = get().getSubtotal()
        return subtotal * 0.08 // 8% tax rate
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal >= 50 ? 0 : 9.99 // Free shipping over $50
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "cart-storage",
    },
  ),
)
