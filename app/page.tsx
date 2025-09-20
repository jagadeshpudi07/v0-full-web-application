import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
