import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data/products"
import { ArrowLeft } from "lucide-react"

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au Tableau de Bord
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-foreground">Gestion des Produits</h1>
            <p className="text-muted-foreground">
              {products.length} produit{products.length !== 1 ? "s" : ""} dans le catalogue
            </p>
          </div>

          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-32 aspect-square rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-xl mb-2 text-foreground">{product.name}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{product.category}</Badge>
                            {product.inStock ? (
                              <Badge variant="default">En Stock</Badge>
                            ) : (
                              <Badge variant="destructive">Rupture de Stock</Badge>
                            )}
                            {product.featured && <Badge variant="secondary">Vedette</Badge>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{product.price} DH</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                      <div className="flex gap-3 pt-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/products/${product.id}`}>Voir le Produit</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
