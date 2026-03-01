"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { updateOrderStatus } from "@/lib/actions/orders"
import type { Order } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface OrderActionsProps {
  orderId: string
  currentStatus: Order["status"]
}

export function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
  const router = useRouter()
  const [status, setStatus] = useState<Order["status"]>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async () => {
    setIsUpdating(true)

    try {
      const result = await updateOrderStatus(orderId, status)

      if (result.success) {
        router.refresh()
      } else {
        alert(result.error || "Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("[v0] Order update error:", error)
      alert("Une erreur est survenue")
    } finally {
      setIsUpdating(false)
    }
  }

  const hasChanged = status !== currentStatus

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Mettre à Jour le Statut</p>
        <Select value={status} onValueChange={(value) => setStatus(value as Order["status"])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">En Attente</SelectItem>
            <SelectItem value="confirmed">Confirmée</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasChanged && (
        <Button onClick={handleUpdate} disabled={isUpdating} className="w-full" size="sm">
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mise à Jour...
            </>
          ) : (
            "Mettre à Jour"
          )}
        </Button>
      )}
    </div>
  )
}
