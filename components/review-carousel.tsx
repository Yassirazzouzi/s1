"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import type { Review } from "@/lib/types"

interface ReviewCarouselProps {
  reviews: Review[]
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const currentReview = reviews[currentIndex]

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={prevReview}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Avis précédent"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={currentReview.avatar || "/placeholder.svg?height=50&width=50&query=person avatar"}
            alt={currentReview.customerName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground line-clamp-1">{currentReview.comment}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{currentReview.customerName}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < currentReview.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={nextReview}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Avis suivant"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots indicator */}
      <div className="flex gap-1.5 ml-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-foreground" : "bg-gray-300"
            }`}
            aria-label={`Aller à l'avis ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
