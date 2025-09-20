import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </div>
  )
}
