"use client"

import { useState, useMemo } from "react"
import { useCartStore } from "@/lib/cart-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Search, Filter, Grid, List } from "lucide-react"
import Link from "next/link"

// Mock product data with more comprehensive details
const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1247,
    image: "/premium-wireless-headphones-product-photo.jpg",
    category: "Electronics",
    brand: "AudioTech",
    isNew: false,
    isSale: true,
    inStock: true,
    description: "High-quality wireless headphones with noise cancellation",
    tags: ["wireless", "noise-cancelling", "premium"],
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
    brand: "FitTech",
    isNew: true,
    isSale: false,
    inStock: true,
    description: "Advanced fitness tracking with heart rate monitoring",
    tags: ["fitness", "smart", "health"],
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300&text=Desk+Lamp",
    category: "Home & Office",
    brand: "LightCraft",
    isNew: false,
    isSale: true,
    inStock: true,
    description: "Modern LED desk lamp with adjustable brightness",
    tags: ["led", "adjustable", "modern"],
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
    brand: "EcoWear",
    isNew: false,
    isSale: false,
    inStock: true,
    description: "Sustainable organic cotton t-shirt in multiple colors",
    tags: ["organic", "sustainable", "cotton"],
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 678,
    image: "/placeholder.svg?height=300&width=300&text=Bluetooth+Speaker",
    category: "Electronics",
    brand: "SoundWave",
    isNew: false,
    isSale: true,
    inStock: false,
    description: "Waterproof portable speaker with 12-hour battery life",
    tags: ["bluetooth", "waterproof", "portable"],
  },
  {
    id: 6,
    name: "Eco-Friendly Water Bottle",
    price: 24.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 1534,
    image: "/placeholder.svg?height=300&width=300&text=Water+Bottle",
    category: "Lifestyle",
    brand: "GreenLife",
    isNew: true,
    isSale: false,
    inStock: true,
    description: "Stainless steel water bottle with temperature retention",
    tags: ["eco-friendly", "stainless-steel", "insulated"],
  },
  {
    id: 7,
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 834,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Keyboard",
    category: "Electronics",
    brand: "GameTech",
    isNew: false,
    isSale: true,
    inStock: true,
    description: "RGB mechanical keyboard with customizable switches",
    tags: ["gaming", "mechanical", "rgb"],
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    price: 59.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300&text=Yoga+Mat",
    category: "Fitness",
    brand: "ZenFit",
    isNew: true,
    isSale: false,
    inStock: true,
    description: "Non-slip yoga mat with alignment guides",
    tags: ["yoga", "non-slip", "premium"],
  },
]

const categories = ["All", "Electronics", "Fashion", "Home & Office", "Wearables", "Lifestyle", "Fitness"]
const brands = ["All", "AudioTech", "FitTech", "LightCraft", "EcoWear", "SoundWave", "GreenLife", "GameTech", "ZenFit"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

export function ProductCatalog() {
  const { addItem } = useCartStore() // Added cart functionality
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showOnSale, setShowOnSale] = useState(false)
  const [showInStock, setShowInStock] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesSale = !showOnSale || product.isSale
      const matchesStock = !showInStock || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesSale && matchesStock
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, showOnSale, showInStock, sortBy])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedBrand("All")
    setPriceRange([0, 500])
    setShowOnSale(false)
    setShowInStock(false)
    setSortBy("featured")
  }

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
    })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground text-lg">Discover our complete collection of premium products</p>
      </div>

      {/* Search and Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <span className="text-sm text-muted-foreground">{filteredProducts.length} products found</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="font-medium mb-3">Brand</h4>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-3">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox checked={showOnSale} onCheckedChange={setShowOnSale} />
                  <span className="text-sm">On Sale</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox checked={showInStock} onCheckedChange={setShowInStock} />
                  <span className="text-sm">In Stock</span>
                </label>
              </div>
            </div>
          </Card>
        </aside>

        {/* Products Grid/List */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
                        {product.isSale && <Badge variant="destructive">Sale</Badge>}
                        {!product.inStock && (
                          <Badge variant="outline" className="bg-background">
                            Out of Stock
                          </Badge>
                        )}
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
                      {viewMode === "grid" && (
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            className="w-full"
                            size="sm"
                            disabled={!product.inStock}
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 space-y-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        {viewMode === "list" && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-secondary text-secondary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price and Actions */}
                      <div
                        className={`flex items-center ${viewMode === "list" ? "justify-between" : "flex-col items-start space-y-2"}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-primary">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>

                        {viewMode === "list" && (
                          <Button disabled={!product.inStock} onClick={() => handleAddToCart(product)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
