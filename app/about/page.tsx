import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Star, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-accent/5 via-background to-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-center text-foreground text-balance">
              À Propos de FatinShoes
            </h1>
            <p className="text-lg text-muted-foreground text-center leading-relaxed mb-12">
              Votre destination pour des chaussures de qualité premium au Maroc
            </p>

            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                Bienvenue chez FatinShoes, votre boutique en ligne spécialisée dans la vente de chaussures élégantes
                et de qualité supérieure. Nous sommes passionnés par la mode et nous nous engageons à offrir à nos
                clients marocains les meilleures chaussures pour tous les styles et occasions.
              </p>

              <div className="grid md:grid-cols-3 gap-8 my-12">
                <div className="text-center p-6 bg-card rounded-lg hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Passion</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nous aimons ce que nous faisons et sélectionnons chaque paire avec soin
                  </p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Star className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Qualité</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tous nos produits sont rigoureusement testés pour leur qualité et confort
                  </p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Service</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Notre équipe est à votre écoute via WhatsApp pour une expérience exceptionnelle
                  </p>
                </div>
              </div>

              <p className="leading-relaxed">
                Chaque paire de chaussures de notre collection est choisie pour sa qualité, son élégance et son
                confort. Nous travaillons directement avec des fournisseurs de confiance pour vous garantir des
                produits authentiques, durables et confortables.
              </p>

              <p className="leading-relaxed">
                Notre mission est simple : rendre les chaussures de qualité accessibles à tous au Maroc. Que vous
                recherchiez des sneakers pour le quotidien, des talons pour une occasion spéciale, des boots élégants,
                ou des sandales confortables, nous avons la paire parfaite pour vous.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
