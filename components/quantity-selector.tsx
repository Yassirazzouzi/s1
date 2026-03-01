"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({ quantity, onQuantityChange, min = 1, max = 10 }: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-foreground mr-4">Quantité</span>
      <div className="flex items-center border border-border rounded-md">
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Diminuer la quantité"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <button
          onClick={increase}
          disabled={quantity >= max}
          className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Augmenter la quantité"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
