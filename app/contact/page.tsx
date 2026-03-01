import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">
              Contactez-Nous
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Notre équipe est à votre disposition pour répondre à vos questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">WhatsApp</CardTitle>
                </div>
                <CardDescription>Nous parlons sur WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <a href="https://wa.me/212660628321" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-accent hover:text-accent/80 transition-colors">
                  +212 6 60 62 83 21
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">Email</CardTitle>
                </div>
                <CardDescription>Envoyez-nous un message</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">contact@fatinaccessories.ma</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">Localisation</CardTitle>
                </div>
                <CardDescription>Nous livrons dans tout le Maroc</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">Maroc - Livraison Gratuite</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">Horaires</CardTitle>
                </div>
                <CardDescription>Service client disponible</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lundi - Samedi: 9h00 - 18h00
                  <br />
                  Dimanche: 10h00 - 14h00
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
