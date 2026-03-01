import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, Home } from "lucide-react"

interface OrderConfirmationPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { id } = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader className="space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="font-serif text-3xl text-foreground">Commande Confirmée!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg text-foreground">Merci pour votre commande</p>
                {id && (
                  <p className="text-sm text-muted-foreground">
                    Numéro de commande: <span className="font-semibold text-foreground">{id}</span>
                  </p>
                )}
              </div>

              <div className="bg-muted/50 rounded-lg p-6 text-left space-y-3">
                <h3 className="font-semibold text-foreground mb-4">Prochaines Étapes:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nous allons vous contacter par téléphone pour confirmer votre commande
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Votre commande sera préparée et expédiée sous 24-48h
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Vous recevrez votre commande sous 2-3 jours ouvrables
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Paiement à la livraison - vous payez lors de la réception
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Retour à l'Accueil
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/products">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Continuer mes Achats
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                Pour toute question, contactez-nous au +212 6XX-XXXXXX
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
