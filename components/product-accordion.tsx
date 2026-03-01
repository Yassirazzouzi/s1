"use client"

import type React from "react"

import { useState } from "react"
import { Heart, CreditCard, ChevronDown } from "lucide-react"

interface AccordionItem {
  id: string
  icon: React.ReactNode
  title: string
  content: string
}

const accordionItems: AccordionItem[] = [
  {
    id: "quality",
    icon: <Heart className="h-5 w-5" />,
    title: "qualité et materiaux",
    content:
      "Nos bijoux sont fabriqués en acier inoxydable de premier qualité. Ils sont résistants à l'eau, au parfum et aux crèmes. Hypoallergénique et ne décolorent pas!",
  },
  {
    id: "payment",
    icon: <CreditCard className="h-5 w-5" />,
    title: "paiement et livraison",
    content:
      "Paiement à la livraison (Cash on Delivery) disponible partout au Maroc. Livraison gratuite à partir de 350 DH. Délai de livraison: 2-4 jours ouvrables.",
  },
]

export function ProductAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="border-t border-border">
      {accordionItems.map((item) => (
        <div key={item.id} className="border-b border-border">
          <button
            onClick={() => toggleItem(item.id)}
            className="flex items-center justify-between w-full py-4 text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="font-medium text-foreground">{item.title}</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                openItem === item.id ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openItem === item.id ? "max-h-40 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-sm text-muted-foreground leading-relaxed px-1">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
