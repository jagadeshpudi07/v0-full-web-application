"use client"

import type React from "react"

import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { CreditCard, Truck, Shield, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CheckoutForm {
  // Shipping Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  country: string

  // Payment Information
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string

  // Options
  saveInfo: boolean
  sameAsBilling: boolean
  newsletter: boolean
}

export function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, getTax, getShipping, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    saveInfo: false,
    sameAsBilling: true,
    newsletter: false,
  })

  const subtotal = getSubtotal()
  const tax = getTax()
  const shipping = getShipping()
  const total = getTotalPrice()

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some items to your cart before checking out.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      router.push("/order-confirmation")
    }, 3000)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return form.firstName && form.lastName && form.email && form.address && form.city && form.state && form.zipCode
      case 2:
        return form.cardNumber && form.expiryDate && form.cvv && form.cardName
      default:
        return true
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {step === 1 && "Shipping"}
                    {step === 2 && "Payment"}
                    {step === 3 && "Review"}
                  </span>
                  {step < 3 && <div className="w-12 h-px bg-border ml-4" />}
                </div>
              ))}
            </div>

            <Tabs value={currentStep.toString()} className="w-full">
              {/* Step 1: Shipping Information */}
              <TabsContent value="1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                      <Input
                        id="apartment"
                        value={form.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select value={form.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={form.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={form.saveInfo}
                          onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                        />
                        <span className="text-sm">Save this information for next time</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={form.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                        />
                        <span className="text-sm">Subscribe to our newsletter for exclusive deals</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setCurrentStep(2)} disabled={!isStepValid(1)}>
                    Continue to Payment
                  </Button>
                </div>
              </TabsContent>

              {/* Step 2: Payment Information */}
              <TabsContent value="2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={form.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={form.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        value={form.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        required
                      />
                    </div>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={form.sameAsBilling}
                        onCheckedChange={(checked) => handleInputChange("sameAsBilling", checked as boolean)}
                      />
                      <span className="text-sm">Billing address same as shipping address</span>
                    </label>

                    {/* Security Notice */}
                    <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back to Shipping
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(3)} disabled={!isStepValid(2)}>
                    Review Order
                  </Button>
                </div>
              </TabsContent>

              {/* Step 3: Review Order */}
              <TabsContent value="3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              {item.color && <Badge variant="outline">{item.color}</Badge>}
                              {item.size && <Badge variant="outline">{item.size}</Badge>}
                              <span>Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Shipping & Payment Summary */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            {form.firstName} {form.lastName}
                          </p>
                          <p>{form.address}</p>
                          {form.apartment && <p>{form.apartment}</p>}
                          <p>
                            {form.city}, {form.state} {form.zipCode}
                          </p>
                          <p>{form.email}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>**** **** **** {form.cardNumber.slice(-4)}</p>
                          <p>{form.cardName}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    Back to Payment
                  </Button>
                  <Button type="submit" disabled={isProcessing} className="min-w-32">
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Place Order</span>
                      </div>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
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
                  <span>Subtotal ({items.length} items)</span>
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

              {/* Security Badges */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>SSL Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
