import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/types"

interface OrderStatusBadgeProps {
  status: Order["status"]
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const variants = {
    pending: { label: "En Attente", variant: "secondary" as const },
    confirmed: { label: "Confirmée", variant: "default" as const },
    shipped: { label: "Expédiée", variant: "default" as const },
    delivered: { label: "Livrée", variant: "default" as const },
    cancelled: { label: "Annulée", variant: "destructive" as const },
  }

  const { label, variant } = variants[status]

  return <Badge variant={variant}>{label}</Badge>
}
