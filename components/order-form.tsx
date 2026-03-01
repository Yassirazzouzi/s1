"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createOrder } from "@/lib/actions/orders"
import type { Product } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface OrderFormProps {
  product: Product
}

export function OrderForm({ product }: OrderFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  })

  const totalPrice = product.price * quantity

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await createOrder(product.id, {
        ...formData,
        quantity,
      })

      if (result.success) {
        router.push(`/order-confirmation?id=${result.orderId}`)
      } else {
        alert(result.error || "Erreur lors de la commande")
      }
    } catch (error) {
      console.error("[v0] Order submission error:", error)
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-foreground">Formulaire de Commande</CardTitle>
        <CardDescription>Remplissez le formulaire ci-dessous pour commander ce produit</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nom Complet *</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Entrez votre nom complet"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+212 6XX-XXXXXX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ville *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Casablanca, Rabat, Marrakech..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse Complète *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rue, numéro, quartier..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantité *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Instructions spéciales, préférences..."
              rows={2}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-foreground">Total:</span>
              <span className="text-2xl font-bold text-primary">{totalPrice} DH</span>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !product.inStock}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Traitement...
                </>
              ) : (
                "Confirmer la Commande"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Paiement à la livraison - Livraison sous 2-3 jours
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
