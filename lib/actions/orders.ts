"use server"

import type { Order, OrderFormData, CartItem } from "../types"
import { getProductById } from "../data/products"
import { appendToGoogleSheet } from "../google-sheets"

// In a real app, this would be stored in a database
const orders: Order[] = []

export async function createOrder(
  productId: string,
  formData: OrderFormData,
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const product = getProductById(productId)

    if (!product) {
      return { success: false, error: "Produit non trouvé" }
    }

    if (!product.inStock) {
      return { success: false, error: "Produit en rupture de stock" }
    }

    const order: Order = {
      id: `ORD-${Date.now()}`,
      productId,
      productName: product.name,
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      quantity: formData.quantity,
      totalPrice: product.price * formData.quantity,
      status: "pending",
      createdAt: new Date(),
      notes: formData.notes,
    }

    orders.push(order)

    await appendToGoogleSheet({
      orderId: order.id,
      productName: order.productName,
      customerName: order.customerName,
      phone: order.phone,
      city: order.city,
      address: order.address,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      notes: order.notes,
    })

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("[v0] Error creating order:", error)
    return { success: false, error: "Erreur lors de la création de la commande" }
  }
}

export async function createMultiProductOrder(
  cartItems: CartItem[],
  formData: Omit<OrderFormData, "quantity">,
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    if (cartItems.length === 0) {
      return { success: false, error: "Panier vide" }
    }

    // Verify all products exist and are in stock
    for (const item of cartItems) {
      const product = getProductById(item.product.id)
      if (!product) {
        return { success: false, error: `Produit ${item.product.name} non trouvé` }
      }
      if (!product.inStock) {
        return { success: false, error: `Produit ${item.product.name} en rupture de stock` }
      }
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
      notes: formData.notes,
    }

    orders.push(order)

    // Send each product as a separate row to Google Sheets for easier tracking
    for (const item of order.items) {
      await appendToGoogleSheet({
        orderId: order.id,
        productName: item.productName,
        customerName: order.customerName,
        phone: order.phone,
        city: order.city,
        address: order.address,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        notes: order.notes,
      })
    }

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("[v0] Error creating multi-product order:", error)
    return { success: false, error: "Erreur lors de la création de la commande" }
  }
}

export async function getOrders(): Promise<Order[]> {
  return orders
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
): Promise<{ success: boolean; error?: string }> {
  try {
    const order = orders.find((o) => o.id === orderId)

    if (!order) {
      return { success: false, error: "Commande non trouvée" }
    }

    order.status = status

    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating order:", error)
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}
