import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getOrders } from "@/lib/actions/orders"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { OrderActions } from "@/components/order-actions"
import { ArrowLeft } from "lucide-react"

export default async function AdminOrdersPage() {
  const orders = await getOrders()
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au Tableau de Bord
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-foreground">Gestion des Commandes</h1>
            <p className="text-muted-foreground">
              {orders.length} commande{orders.length !== 1 ? "s" : ""} au total
            </p>
          </div>

          {sortedOrders.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">Aucune commande pour le moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg text-foreground">{order.productName}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Commande #{order.id}</p>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">Informations Client</p>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Nom: {order.customerName}</p>
                            <p>Téléphone: {order.phone}</p>
                            <p>Ville: {order.city}</p>
                            <p>Adresse: {order.address}</p>
                          </div>
                        </div>
                        {order.notes && (
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-1">Notes</p>
                            <p className="text-sm text-muted-foreground">{order.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">Détails de la Commande</p>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Quantité: {order.quantity}</p>
                            <p>
                              Total: <span className="font-semibold text-primary">{order.totalPrice} DH</span>
                            </p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString("fr-FR")}</p>
                          </div>
                        </div>

                        <OrderActions orderId={order.id} currentStatus={order.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
