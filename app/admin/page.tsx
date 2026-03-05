import Link from "next/link"
import { Header } from "@/components/header"

export const dynamic = 'force-dynamic'
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getOrders } from "@/lib/actions/orders"
import { products } from "@/lib/data/products"
import { Package, ShoppingBag, AlertCircle, TrendingUp } from "lucide-react"
import { logoutAction } from "./login/actions"

export default async function AdminDashboardPage() {
  const orders = await getOrders()
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
  const inStockProducts = products.filter((p) => p.inStock).length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-foreground">Tableau de Bord Admin</h1>
              <p className="text-muted-foreground">Gérez vos produits et commandes</p>
            </div>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Déconnexion
              </Button>
            </form>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Commandes</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Commandes En Attente</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{pendingOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenu Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalRevenue} DH</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Produits En Stock</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {inStockProducts}/{products.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Gestion des Commandes</CardTitle>
                <CardDescription>Visualisez et gérez toutes les commandes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/orders">Voir les Commandes</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Gestion des Produits</CardTitle>
                <CardDescription>Gérez votre catalogue de produits</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/admin/products">Voir les Produits</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
