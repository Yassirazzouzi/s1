"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data/products"
import { cn } from "@/lib/utils"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Collection Complète
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5 text-foreground text-balance">
                Nos Chaussures
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Explorez notre sélection raffinée de chaussures élégantes pour toutes les occasions
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-14">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm",
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:scale-105 border border-border",
                )}
              >
                Tous les Produits
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm",
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground shadow-md shadow-accent/30 scale-105"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:scale-105 border border-border",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
