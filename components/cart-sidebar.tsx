"use client"

import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Minus, Plus, Trash2, X } from "lucide-react"
import Link from "next/link"

export function CartSidebar() {
  const { items, isOpen, toggleCart, closeCart, removeItem, updateQuantity, getTotalItems, getSubtotal } =
    useCartStore()

  const totalItems = getTotalItems()
  const subtotal = getSubtotal()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart ({totalItems})
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button onClick={closeCart}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id, item.color, item.size)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">${item.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-2 w-2" />
                          </Button>
                          <span className="w-6 text-center text-xs">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                          >
                            <Plus className="h-2 w-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Link href="/cart" onClick={closeCart}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground text-center">Shipping and taxes calculated at checkout</p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
