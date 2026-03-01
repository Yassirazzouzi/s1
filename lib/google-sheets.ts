"use server"

interface SheetRow {
  orderId: string
  productName: string
  customerName: string
  phone: string
  city: string
  address: string
  quantity: number
  totalPrice: number
  status: string
  createdAt: string
  notes?: string
}

export async function appendToGoogleSheet(data: SheetRow): Promise<{ success: boolean; error?: string }> {
  try {
    const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL

    if (!SHEET_URL) {
      console.error("[v0] Google Sheets webhook URL not configured")
      return { success: false, error: "Configuration manquante" }
    }

    const response = await fetch(SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending to Google Sheets:", error)
    return { success: false, error: "Erreur d'enregistrement" }
  }
}
