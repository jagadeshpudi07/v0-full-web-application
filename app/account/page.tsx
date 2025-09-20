import { AccountDashboard } from "@/components/auth/account-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AccountDashboard />
      </main>
      <Footer />
    </div>
  )
}
