"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { QuantitySelector } from "@/components/quantity-selector"
import type { Product } from "@/lib/types"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleOrderNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    router.push("/checkout")
  }

  if (!product.inStock) {
    return (
      <div className="p-6 bg-muted rounded-lg text-center">
        <p className="text-lg font-semibold text-foreground mb-2">Produit Indisponible</p>
        <p className="text-sm text-muted-foreground">Ce produit sera bientôt de retour en stock</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-colors"
      >
        Ajouter au panier
      </button>

      {/* Order Now Button */}
      <button
        onClick={handleOrderNow}
        className="w-full py-4 bg-[#1a1a1a] text-white font-semibold rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag className="h-5 w-5" />
        Order Now - Cash on Delivery
      </button>
    </div>
  )
}
