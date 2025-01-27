import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from "@/contexts/cart-context"
import { SavedItemsProvider } from "@/contexts/saved-items-context"
import { AuthProvider } from "@/contexts/auth-context"
import { LoadingProvider } from "@/contexts/loading-context"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Comforty",
  description: "Generated by create next app",
  icons: {
    icon: "/images/Logo Icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider>
      <html lang="en">
        <head>
        </head>
        <body className={inter.className}>
          <AuthProvider>
            <LoadingProvider>
              <CartProvider>
                <SavedItemsProvider>
                  {children}
                  <Toaster position="bottom-right" />
                </SavedItemsProvider>
              </CartProvider>
            </LoadingProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

