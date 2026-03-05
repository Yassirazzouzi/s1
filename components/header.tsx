"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "Accueil", href: "/", active: true },
  { name: "Nouveautés", href: "/products" },
  { name: "Sneakers", href: "/products?category=Sneakers" },
  { name: "Talons", href: "/products?category=Talons" },
  { name: "Boots", href: "/products?category=Boots" },
  { name: "Sandales", href: "/products?category=Sandales" },
  { name: "Tous les Produits", href: "/products" },
  { name: "À Propos", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="bg-foreground text-background overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-flex py-2">
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ LIVRAISON GRATUITE</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ QUALITÉ PREMIUM</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ WHATSAPP: 0713239720</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ RETOUR FACILE</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ LIVRAISON GRATUITE</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ QUALITÉ PREMIUM</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ WHATSAPP: 0713239720</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ RETOUR FACILE</span>
          <span className="mx-8 text-xs sm:text-sm font-medium tracking-wide">✓ LIVRAISON GRATUITE</span>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4">
          {/* Left - Search */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-transparent hover:text-primary"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              SBARDILTK<span className="font-light">VIBE</span>
            </h1>
          </Link>

          {/* Right - User & Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground hover:bg-transparent hover:text-primary"
            >
              <User className="h-5 w-5" />
            </Button>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-transparent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-border py-4 px-4">
            <div className="container mx-auto">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      <nav className="hidden md:block border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-1 lg:gap-2 py-3 flex-wrap">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={cat.href}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all rounded-full ${
                    cat.active ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 text-center">
        <p className="text-sm font-semibold tracking-wide">✨ CHAUSSURES PREMIUM AU MAROC ✨</p>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className={`block px-4 py-3 text-sm font-medium transition-all rounded-lg ${
                      cat.active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  )
}
