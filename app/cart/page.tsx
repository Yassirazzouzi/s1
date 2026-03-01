"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-foreground">Votre Panier est Vide</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Découvrez nos produits et ajoutez vos favoris au panier
              </p>
              <Link href="/products">
                <AnimatedButton effect="fill" size="lg" className="px-8 py-6 rounded-xl w-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Découvrir les Produits
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Votre Panier</h1>
            <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
              {items.length} article{items.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex gap-4 sm:gap-6">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-3">{item.product.category}</p>
                      <p className="text-xl font-bold text-primary">{item.product.price} DH</p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-1 sm:gap-2 bg-muted rounded-lg p-1">
                        <button
                          className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-background transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 1)}
                          className="w-12 h-8 text-center border-0 bg-transparent p-0"
                        />
                        <button
                          className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-background transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <button
                onClick={clearCart}
                className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-destructive border border-dashed border-border rounded-xl hover:border-destructive/50 transition-colors"
              >
                Vider le Panier
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sm:p-8 sticky top-24 shadow-lg border-primary/10">
                <h2 className="font-serif text-2xl font-bold mb-6 text-foreground">Récapitulatif</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">{item.product.price * item.quantity} DH</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-semibold">{totalPrice} DH</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-primary font-medium">Gratuite</span>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">{totalPrice} DH</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <AnimatedButton effect="shimmer" className="w-full py-6 rounded-xl text-base" size="lg">
                    Passer la Commande
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>

                <Link href="/products">
                  <AnimatedButton
                    effect="bounce"
                    variant="outline"
                    className="w-full mt-3 py-5 rounded-xl bg-transparent border-2"
                  >
                    Continuer mes Achats
                  </AnimatedButton>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
