"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Minus, Plus, Share, Truck, Shield, RotateCcw } from "lucide-react"
import { useCartStore } from "@/lib/cart-store" // Added cart functionality

// Mock product data - in real app this would come from API
const productData = {
  1: {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    images: [
      "/premium-wireless-headphones-product-photo.jpg",
      "/placeholder.svg?height=500&width=500&text=Headphones+2",
      "/placeholder.svg?height=500&width=500&text=Headphones+3",
      "/placeholder.svg?height=500&width=500&text=Headphones+4",
    ],
    category: "Electronics",
    brand: "AudioTech",
    isNew: false,
    isSale: true,
    inStock: true,
    stockCount: 15,
    description:
      "Experience premium audio quality with our flagship wireless headphones featuring advanced noise cancellation technology, premium materials, and exceptional comfort for all-day listening.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Quick charge: 5 min = 2 hours playback",
      "Multi-device pairing",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      "Battery Life": "30 hours (ANC on), 40 hours (ANC off)",
    },
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: [],
    tags: ["wireless", "noise-cancelling", "premium"],
  },
}

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { addItem } = useCartStore() // Added cart functionality
  const product = productData[Number.parseInt(productId) as keyof typeof productData]
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stockCount, prev + change)))
  }

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
        brand: product.brand,
        color: selectedColor,
        inStock: product.inStock,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
              {product.isNew && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
              {product.isSale && <Badge variant="destructive">Sale</Badge>}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-balance">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.isSale && (
                <Badge variant="destructive">Save ${(product.originalPrice! - product.price).toFixed(2)}</Badge>
              )}
            </div>

            <p className="text-muted-foreground text-pretty">{product.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-4">{product.stockCount} in stock</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="outline" size="lg" className="w-full bg-transparent">
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <p className="text-muted-foreground">Reviews feature coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Shipping & Returns Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Free standard shipping on orders over $50</li>
                      <li>• Express shipping available for $9.99</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Returns</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 30-day return policy</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return shipping</li>
                      <li>• Refunds processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
