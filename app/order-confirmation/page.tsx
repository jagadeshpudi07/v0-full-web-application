import { OrderConfirmation } from "@/components/order-confirmation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <OrderConfirmation />
      </main>
      <Footer />
    </div>
  )
}
