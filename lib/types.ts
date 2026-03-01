export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
  featured?: boolean
  originalPrice?: number
  discount?: number
  features?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: Array<{
    productId: string
    productName: string
    price: number
    quantity: number
  }>
  customerName: string
  phone: string
  city: string
  address: string
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  notes?: string
}

export interface OrderFormData {
  customerName: string
  phone: string
  city: string
  address: string
  quantity: number
  notes?: string
}

export interface Review {
  id: string
  customerName: string
  avatar?: string
  rating: number
  comment: string
  date: string
}
