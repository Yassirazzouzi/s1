"use server"

import type { Order, OrderFormData, CartItem } from "../types"
import { getProductById } from "../data/products"
import { appendToGoogleSheet } from "../google-sheets"
import { revalidatePath } from "next/cache"

import { promises as fs } from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const ordersFilePath = path.join(dataDirectory, 'orders.json');

// Helper to ensure the directory and file exist, then read the items
async function getOrdersData(): Promise<Order[]> {
  try {
    await fs.mkdir(dataDirectory, { recursive: true });
    try {
      const fileData = await fs.readFile(ordersFilePath, 'utf8');
      return JSON.parse(fileData) as Order[];
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(ordersFilePath, '[]', 'utf8');
        return [];
      }
      throw error;
    }
  } catch (error) {
    console.error('Error reading orders data:', error);
    return [];
  }
}

// Helper to write items back to the JSON file
async function saveOrdersData(orders: Order[]) {
  try {
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving orders data:', error);
  }
}

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
      items: [
        {
          productId,
          productName: product.name,
          price: product.price,
          quantity: formData.quantity,
        }
      ],
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      totalPrice: product.price * formData.quantity,
      status: "pending",
      createdAt: new Date(),
      notes: formData.notes,
    }

    const orders = await getOrdersData();
    orders.push(order);
    await saveOrdersData(orders);

    await appendToGoogleSheet({
      orderId: order.id,
      productName: product.name,
      customerName: order.customerName,
      phone: order.phone,
      city: order.city,
      address: order.address,
      quantity: formData.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      notes: order.notes,
    })

    revalidatePath('/admin', 'layout')

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

    const orders = await getOrdersData()
    orders.push(order)
    await saveOrdersData(orders)

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

    revalidatePath('/admin', 'layout')

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("[v0] Error creating multi-product order:", error)
    return { success: false, error: "Erreur lors de la création de la commande" }
  }
}

export async function getOrders(): Promise<Order[]> {
  const orders = await getOrdersData();
  // Ensure the createdAt is parsed back to a Date object if it was serialized as a string
  return orders.map(order => ({
    ...order,
    createdAt: new Date(order.createdAt)
  }));
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
): Promise<{ success: boolean; error?: string }> {
  try {
    const orders = await getOrdersData()
    const orderIndex = orders.findIndex((o) => o.id === orderId)

    if (orderIndex === -1) {
      return { success: false, error: "Commande non trouvée" }
    }

    orders[orderIndex].status = status
    await saveOrdersData(orders)

    revalidatePath('/admin', 'layout')

    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating order:", error)
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}
