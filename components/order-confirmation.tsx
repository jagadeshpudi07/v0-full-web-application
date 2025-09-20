"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export function OrderConfirmation() {
  const orderNumber = "MS" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
        </div>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-semibold">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-semibold">{estimatedDelivery}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <p className="font-medium">Order Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email confirmation with your order details shortly.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    We'll prepare your items for shipment within 1-2 business days.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-left">
                  <p className="font-medium">Shipping Updates</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              Track Your Order
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              customer support team
            </Link>{" "}
            or call 1-800-MODERN-1
          </p>
        </div>
      </div>
    </div>
  )
}
