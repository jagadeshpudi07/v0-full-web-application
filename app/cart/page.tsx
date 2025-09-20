import { ShoppingCartPage } from "@/components/shopping-cart-page"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ShoppingCartPage />
      </main>
      <Footer />
    </div>
  )
}
