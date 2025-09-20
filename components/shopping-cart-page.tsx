"use client"

import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function ShoppingCartPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getTax, getShipping, getTotalPrice } =
    useCartStore()

  const [isClearing, setIsClearing] = useState(false)

  const handleClearCart = async () => {
    setIsClearing(true)
    // Add a small delay for better UX
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 500)
  }

  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
          </div>
          <Link href="/products">
            <Button size="lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Items</h2>
            <Button variant="outline" size="sm" onClick={handleClearCart} disabled={isClearing}>
              {isClearing ? "Clearing..." : "Clear Cart"}
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.color}-${item.size}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{item.brand}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {item.color && (
                              <Badge variant="outline" className="text-xs">
                                {item.color}
                              </Badge>
                            )}
                            {item.size && (
                              <Badge variant="outline" className="text-xs">
                                {item.size}
                              </Badge>
                            )}
                            {!item.inStock && (
                              <Badge variant="destructive" className="text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                            disabled={!item.inStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          Item total:{" "}
                          <span className="font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products" className="block">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Security Badges */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
