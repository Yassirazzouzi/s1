import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "FatinAccessories - Accessoires Élégants au Maroc",
  description:
    "Découvrez notre collection d'accessoires élégants - bijoux, sacs, lunettes et plus encore. Livraison partout au Maroc.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${cormorant.variable} font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
