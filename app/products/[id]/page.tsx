import { notFound } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProductById, products } from "@/lib/data/products"
import { getReviewsForProduct } from "@/lib/data/reviews"
import { Truck } from "lucide-react"
import { ProductDetailClient } from "@/components/product-detail-client"
import { ReviewCarousel } from "@/components/review-carousel"
import { ProductAccordion } from "@/components/product-accordion"
import { DeliveryMarquee } from "@/components/delivery-marquee"
import { SimilarProducts } from "@/components/similar-products"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

// Calculate delivery dates
function getDeliveryDates() {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() + 2)
  const endDate = new Date(today)
  endDate.setDate(today.getDate() + 4)

  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" }
  const locale = "fr-FR"

  return {
    start: startDate.toLocaleDateString(locale, options),
    end: endDate.toLocaleDateString(locale, options),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)
  const reviews = getReviewsForProduct()
  const deliveryDates = getDeliveryDates()

  if (!product) {
    notFound()
  }

  // Product features for this style
  const productFeatures = [
    { emoji: "✨", text: "Fabriquées en acier inoxydable de premier qualité" },
    { emoji: "💧", text: "Résistantes à l'eau, au parfum et aux crèmes" },
    { emoji: "✨", text: "Hypoallergénique et ne décolorent pas!" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Quality Banner */}
      <div className="bg-[#1a1a1a] text-white text-center py-2 text-sm">1 er qualité au Maroc</div>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image - Left Side */}
            <div className="relative">
              <div className="relative aspect-square bg-[#f5f5f5] rounded-sm overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-2xl">Rupture de Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details - Right Side */}
            <div className="space-y-6">
              {/* Sale Badge */}
              <div className="inline-block">
                <span className="px-4 py-1.5 border-2 border-primary text-primary text-sm font-medium rounded-sm">
                  Sale Ends Midnight
                </span>
              </div>

              {/* Product Name */}
              <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground">{product.name}</h1>

              {/* Price */}
              <p className="text-2xl font-bold text-primary">{product.price.toFixed(2)} dh</p>

              {/* Product Features */}
              <div className="space-y-2">
                {productFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span>{feature.emoji}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Client-side interactive elements */}
              <ProductDetailClient product={product} />

              {/* Delivery Info */}
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Obtenez-le entre <span className="font-semibold text-foreground">{deliveryDates.start}</span> et{" "}
                  <span className="font-semibold text-foreground">{deliveryDates.end}</span>.
                </span>
              </div>

              {/* Customer Review Carousel */}
              <div className="py-4">
                <ReviewCarousel reviews={reviews} />
              </div>

              {/* Accordion Sections */}
              <ProductAccordion />
            </div>
          </div>

          <SimilarProducts products={products} currentProductId={product.id} />
        </div>
      </main>

      {/* Delivery Marquee */}
      <DeliveryMarquee />

      <Footer />
    </div>
  )
}
