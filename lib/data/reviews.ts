import type { Review } from "../types"

export const reviews: Review[] = [
  {
    id: "1",
    customerName: "Wiam",
    avatar: "/moroccan-woman-avatar.jpg",
    rating: 5,
    comment: "J'aime beaucoup la qualité et le confort de ces sneakers, merci sbardiltkvibe!",
    date: "2024-11-20",
  },
  {
    id: "2",
    customerName: "Fatima",
    avatar: "/elegant-woman-avatar.jpg",
    rating: 5,
    comment: "Livraison rapide et chaussures conformes à la description. Très satisfaite!",
    date: "2024-11-18",
  },
  {
    id: "3",
    customerName: "Sara",
    avatar: "/young-woman-avatar-smile.jpg",
    rating: 5,
    comment: "Les talons sont magnifiques et super confortables. Je recommande vivement sbardiltkvibe",
    date: "2024-11-15",
  },
  {
    id: "4",
    customerName: "Nadia",
    avatar: "/professional-woman-avatar.png",
    rating: 5,
    comment: "Qualité exceptionnelle des chaussures, je suis une cliente fidèle maintenant",
    date: "2024-11-10",
  },
]

export function getReviewsForProduct(): Review[] {
  return reviews
}
