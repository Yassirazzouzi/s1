"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { reviews } from "@/lib/data/reviews"

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-14 sm:py-18 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
            TÉMOIGNAGES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Ce que disent nos clientes
          </h2>
        </div>

        {/* Reviews Grid for Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-muted rounded-2xl p-6 relative group hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image
                    src={review.avatar || "/placeholder.svg?height=50&width=50&query=woman avatar"}
                    alt={review.customerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.customerName}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="bg-muted rounded-2xl p-6 mx-4">
            <Quote className="absolute top-4 right-8 h-8 w-8 text-primary/20" />

            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                <Image
                  src={reviews[currentIndex].avatar || "/placeholder.svg?height=50&width=50&query=woman avatar"}
                  alt={reviews[currentIndex].customerName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">{reviews[currentIndex].customerName}</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < reviews[currentIndex].rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">"{reviews[currentIndex].comment}"</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Aller à l'avis ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
              aria-label="Avis suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
