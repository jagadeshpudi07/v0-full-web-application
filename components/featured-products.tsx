"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

// Mock product data
const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    image: "/premium-wireless-headphones-product-photo.jpg",
    category: "Electronics",
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 892,
    image: "/smart-fitness-watch-product-photo.jpg",
    category: "Wearables",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 456,
    image: "/placeholder-b1fkl.png",
    category: "Home & Office",
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 2103,
    image: "/organic-cotton-t-shirt.jpg",
    category: "Fashion",
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 678,
    image: "/placeholder-h1dcv.png",
    category: "Electronics",
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: "Eco-Friendly Water Bottle",
    price: 24.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 1534,
    image: "/placeholder-lkue3.png",
    category: "Lifestyle",
    isNew: true,
    isSale: false,
  },
]

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Featured Products</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine quality, style, and innovation for the
            modern consumer.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
                    {product.isSale && <Badge variant="destructive">Sale</Badge>}
                  </div>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </Button>

                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="w-full" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
