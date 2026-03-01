"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface SimilarProductsProps {
  products: Product[]
  currentProductId: string
}

export function SimilarProducts({ products, currentProductId }: SimilarProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()

  // Filter out current product and get similar ones
  const similarProducts = products.filter((p) => p.id !== currentProductId).slice(0, 8)

  // Number of visible items based on screen
  const itemsToShow = 4

  const maxIndex = Math.max(0, similarProducts.length - itemsToShow)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  if (similarProducts.length === 0) return null

  return (
    <section className="mt-16 lg:mt-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Produits Similaires</h2>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Précédent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Suivant"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {similarProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 px-2">
              <Link href={`/products/${product.id}`} className="group block">
                {/* Product Image */}
                <div className="relative aspect-square bg-[#f8f8f8] rounded-sm overflow-hidden mb-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">-24%</span>
                    </div>
                  )}

                  {/* Quick Add Button - appears on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-full py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-black transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Ajout rapide
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-sm">{product.price.toFixed(2)} dh</span>
                    {product.featured && (
                      <span className="text-muted-foreground text-xs line-through">
                        {(product.price * 1.24).toFixed(2)} dh
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/products"
          className="px-8 py-3 bg-[#1a1a1a] text-white font-medium rounded-sm hover:bg-black transition-colors"
        >
          Tout afficher
        </Link>
      </div>
    </section>
  )
}
