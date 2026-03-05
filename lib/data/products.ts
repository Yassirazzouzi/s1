import type { Product } from "../types"

export const products: Product[] = [
  {
    id: "1",
    name: "Sneakers Blanc ",
    description:
      "Sneakers élégantes et confortables en cuir blanc premium. Design épuré et intemporel, parfait pour tous les styles.",
    price: 450,
    image: "/elegant-white-sneakers-premium.jpg",
    category: "Sneakers",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Talons Dorés Glamour",
    description:
      "Talons haut en or mat avec détails scintillants. Confortable et élégant pour les soirées spéciales.",
    price: 580,
    image: "/gold-heels-glamour.jpg",
    category: "Talons",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Samba",
    description:
      "Boots en cuir véritable noir, doublées intérieurement pour plus de confort. Intemporel et polyvalent.",
    price: 650,
    image: "/black-leather-boots.jpg",
    category: "Boots",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Sandales Confort Beige",
    description:
      "Sandales élégantes en cuir beige avec semelle ergonomique. Idéales pour l'été et les occasions casual.",
    price: 380,
    image: "/beige-comfort-sandals.jpg",
    category: "Sandales",
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Mocassins Cuir Marron",
    description: "Mocassins en cuir marron clair, confortables et élégants. Parfait pour le travail ou les sorties.",
    price: 520,
    image: "/brown-leather-loafers.jpg",
    category: "Mocassins",
    inStock: true,
  },
  {
    id: "6",
    name: "Baskets Sport Noir",
    description: "Baskets sportives en textile respirant avec semelle amortissante. Léger et performant.",
    price: 420,
    image: "/black-sport-sneakers.jpg",
    category: "Baskets",
    inStock: true,
  },
  {
    id: "7",
    name: "Escarpins Nude Classique",
    description: "Escarpins classiques en nude avec talon fin. Un incontournable qui allonge les jambes.",
    price: 590,
    image: "/nude-classic-pumps.jpg",
    category: "Talons",
    inStock: true,
  },
  {
    id: "8",
    name: "Chaussures Bateau Blanc",
    description: "Chaussures bateau en toile blanche imperméable. Confortables pour l'été.",
    price: 350,
    image: "/white-boat-shoes.jpg",
    category: "Chaussures Bateau",
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
