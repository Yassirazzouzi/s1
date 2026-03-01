import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-background">
              FATIN<span className="font-light">SHOES</span>
            </h3>
            <p className="text-sm text-background/70 leading-relaxed mb-6">
              Votre destination pour des chaussures élégantes et de qualité au Maroc. Livraison gratuite partout au Maroc.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background">Boutique</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-background/70 hover:text-accent transition-colors">
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Sneakers"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Sneakers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Talons"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Talons
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Boots"
                  className="text-background/70 hover:text-accent transition-colors"
                >
                  Boots
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background">Information</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-background/70 hover:text-accent transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://wa.me/212660628321" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="text-background/70">Politique de Confidentialité</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span>0660628321</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span>contact@fatinaccessories.ma</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Livraison partout au Maroc</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

        <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} FatinShoes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
