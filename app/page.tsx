import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ReviewsSection } from "@/components/reviews-section"
import { getFeaturedProducts, products } from "@/lib/data/products"
import { ArrowRight, Heart, Sparkles, Star, Truck, Shield, Gift } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const allProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />


      <main className="flex-1">
        <section className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/elegant-white-sneakers-premium.jpg"
              alt="FatinShoes Collection Premium"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-foreground/30" />
          </div>

          {/* Floating Card Overlay with unique styling */}
          <div className="relative z-10 bg-background/95 backdrop-blur-sm rounded-3xl px-8 sm:px-12 md:px-16 py-10 sm:py-14 md:py-16 mx-4 text-center max-w-md sm:max-w-lg shadow-2xl border border-accent/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              Nouvelle Collection
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground text-balance leading-tight">
              Chaussures Élégantes
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 sm:mb-10 leading-relaxed">
              Des chaussures stylées et intemporelles qui reflètent votre style unique
            </p>

            <Link href="/products">
              <AnimatedButton
                effect="fill"
                size="lg"
                className="px-10 sm:px-12 py-6 sm:py-7 text-sm sm:text-base font-semibold rounded-xl"
              >
                Découvrir
              </AnimatedButton>
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/80 z-10">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-background/80 to-transparent animate-pulse" />
          </div>
        </section>

        <section className="py-6 sm:py-8 bg-muted border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-5 w-5 text-accent" />
                <span className="text-xs sm:text-sm font-medium">Livraison Gratuite</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-xs sm:text-sm font-medium">Paiement Sécurisé</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gift className="h-5 w-5 text-accent" />
                <span className="text-xs sm:text-sm font-medium">Emballage Cadeau</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="text-xs sm:text-sm font-medium">Qualité Premium</span>
              </div>
            </div>
          </div>
        </section>

        {/* Nouveautés Section */}
        <section className="py-14 sm:py-18 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
                FRAÎCHEMENT ARRIVÉS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Nouveautés</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-14">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <AnimatedButton
                asChild
                effect="slide"
                className="px-10 sm:px-12 py-5 sm:py-6 text-sm font-semibold rounded-lg w-full sm:w-auto"
              >
                <Link href="/products" className="flex items-center justify-center">Tout afficher</Link>
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* Story Section with unique grid */}
        <section className="py-14 sm:py-18 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                  NOTRE HISTOIRE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Avec FatinShoes
                  <br />
                  <span className="text-accent">Marchez avec style et confiance.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-lg">
                  Découvrez notre collection exclusive de chaussures élégantes qui vous accompagnent à chaque étape de
                  votre vie. Chaque paire est sélectionnée avec soin pour vous offrir le confort et la qualité que vous
                  méritez.
                </p>
                <AnimatedButton
                  asChild
                  effect="glow"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-sm font-semibold rounded-lg w-full sm:w-auto"
                >
                  <Link href="/products" className="flex items-center justify-center">
                    Explorer la Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </AnimatedButton>
              </div>

              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/elegant-gold-necklace-on-woman-neck-close-up.jpg"
                    alt="Collection"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Nouveau
                  </div>
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8 shadow-xl">
                  <Image
                    src="/woman-on-beach-sunset-wearing-jewelry-elegant.jpg"
                    alt="Collection"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Valentine/Special Collection Banner */}
        <section className="py-14 sm:py-18 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-4 items-stretch">
              {/* Image Side */}
              <div className="relative aspect-square lg:aspect-auto min-h-[40px] rounded-3xl overflow-hidden shadow-2xl group h-full">
                <Image
                  src="/elegant-white-sneakers-premium.jpg"
                  alt="Collection Spéciale"
                  fill
                  className="object-contain object-center lg:object-cover group-hover:scale-105 transition-transform duration-700 p-4 lg:p-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-background">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 fill-background" />
                    <span className="text-base sm:text-xl font-serif italic">Style</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mb-1 sm:mb-2">Comfort</h3>
                  <p className="text-lg sm:text-2xl font-serif italic">Elegance</p>
                  <p className="text-xs sm:text-base mt-2 sm:mt-4 opacity-90 max-w-xs">
                    Chaque pas est une déclaration de style et de confiance!
                  </p>
                </div>
              </div>

              {/* Text Side */}
              <div className="flex flex-col justify-center bg-gradient-to-br from-background to-background/50 rounded-3xl p-8 sm:p-12 md:p-14 shadow-lg border border-border">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 w-fit">
                  COLLECTION SPÉCIALE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                  Pov: Vous Marchez Avec Style
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-base sm:text-lg max-w-md">
                  "Trouvez les chaussures parfaites – explorez notre collection exclusive de chaussures premium pour tous les styles."
                </p>
                <Link href="/products" className="w-full sm:w-fit mt-2">
                  <AnimatedButton effect="shimmer" className="w-full sm:w-fit px-8 py-6 text-sm font-semibold rounded-lg">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Collection Spéciale
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-14 sm:py-18 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
                LES PLUS POPULAIRES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Nos Coups de Cœur
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-14">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <AnimatedButton
                asChild
                effect="bounce"
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-10 sm:px-12 py-5 sm:py-6 text-sm font-semibold rounded-lg bg-transparent w-full sm:w-auto"
              >
                <Link href="/products" className="flex items-center justify-center">
                  Voir Toute la Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </AnimatedButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
