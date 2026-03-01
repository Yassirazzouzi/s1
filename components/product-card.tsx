"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${product.name} ${isLiked ? "retiré de" : "ajouté à"} vos favoris`,
    })
  }

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/products/${product.id}`)
  }

  const originalPrice = Math.round(product.price * 1.25)
  const hasDiscount = product.featured

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Sale Badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-destructive text-destructive-foreground px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
              -20%
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-foreground/70 flex items-center justify-center backdrop-blur-sm">
              <span className="text-background font-semibold text-xs sm:text-sm px-4 py-2 bg-foreground/80 rounded-full">
                Rupture de Stock
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isLiked
                ? "bg-destructive text-destructive-foreground"
                : "bg-background/90 text-foreground sm:opacity-0 sm:group-hover:opacity-100"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </button>

          {/* Action Buttons */}
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-9 sm:h-10 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
            <button
              onClick={handleViewProduct}
              className="bg-background/90 text-foreground hover:bg-background h-9 sm:h-10 w-9 sm:w-10 rounded-lg flex items-center justify-center transition-colors shadow-lg"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="font-medium text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-primary font-bold text-sm sm:text-base">{product.price} dh</span>
            {hasDiscount && (
              <span className="text-muted-foreground line-through text-xs sm:text-sm">{originalPrice} dh</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
