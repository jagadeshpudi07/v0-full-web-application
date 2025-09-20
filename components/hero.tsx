import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 50,000+ customers</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Discover Premium Products for Your <span className="text-primary">Modern Lifestyle</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Experience the future of online shopping with our curated collection of premium products, lightning-fast
                delivery, and exceptional customer service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <img
                src="/placeholder-0mt7p.png"
                alt="Premium products showcase"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Free Shipping
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
