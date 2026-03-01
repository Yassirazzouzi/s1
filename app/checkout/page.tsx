"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { createMultiProductOrder } from "@/lib/actions/orders"
import { Loader2, ShoppingBag, Truck, Shield, CreditCard } from "lucide-react"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  })

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
              <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">Panier Vide</h1>
              <p className="text-muted-foreground mb-8">Ajoutez des produits à votre panier avant de passer commande</p>
              <Link href="/products">
                <AnimatedButton effect="fill" size="lg" className="px-8 py-6 rounded-xl">
                  Voir les Produits
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createMultiProductOrder(items, formData)

      if (result.success) {
        clearCart()
        router.push(`/order-confirmation?id=${result.orderId}`)
      } else {
        alert(result.error || "Erreur lors de la commande")
      }
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-foreground">Finaliser la Commande</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-serif flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    Informations de Livraison
                  </CardTitle>
                  <CardDescription>Remplissez vos coordonnées pour recevoir votre commande</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="customerName" className="text-sm font-medium">
                        Nom Complet *
                      </Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Entrez votre nom complet"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+212 6XX-XXXXXX"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        Ville *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Casablanca, Rabat, Marrakech..."
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Adresse Complète *
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Rue, numéro, quartier..."
                        rows={3}
                        className="rounded-xl resize-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium">
                        Notes (optionnel)
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Instructions spéciales, préférences..."
                        rows={2}
                        className="rounded-xl resize-none"
                      />
                    </div>

                    <AnimatedButton
                      type="submit"
                      effect="shimmer"
                      className="w-full py-6 rounded-xl text-base mt-6"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Traitement en cours...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-5 w-5" />
                          Confirmer la Commande
                        </>
                      )}
                    </AnimatedButton>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24 shadow-lg border-primary/10">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-semibold">{item.product.price * item.quantity} DH</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-semibold">{totalPrice} DH</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-primary font-medium">Gratuite</span>
                    </div>
                  </div>

                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">{totalPrice} DH</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Paiement à la livraison</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Livraison sous 2-3 jours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
