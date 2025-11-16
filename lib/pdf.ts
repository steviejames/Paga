import jsPDF from "jspdf"
import "jspdf-autotable"
import { Invoice, Charge, Customer, ChargeItem } from "@prisma/client"

type InvoiceFull = Invoice & {
  charge: Charge & {
    customer: Customer
    items: ChargeItem[]
    organization: { name: string }
  }
}

export function generateInvoicePdf(invoice: InvoiceFull) {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(20)
  doc.text(`Fatura: ${invoice.invoiceNumber}`, 14, 22)
  doc.setFontSize(12)
  doc.text(`De: ${invoice.charge.organization.name}`, 14, 32)
  doc.text(`Para: ${invoice.charge.customer.name}`, 14, 42)
  doc.text(`Data: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 52)

  // Items table
  const tableColumn = ["Item", "Preço Unitário"]
  const tableRows: any[] = []

  invoice.charge.items.forEach((item) => {
    const itemData = [
      item.name,
      new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(item.price),
    ]
    tableRows.push(itemData)
  })

  // @ts-ignore
  doc.autoTable(tableColumn, tableRows, { startY: 60 })

  // Total
  const finalY = (doc as any).lastAutoTable.finalY
  doc.setFontSize(14)
  doc.text(
    `Total: ${new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(invoice.charge.amount)}`,
    14,
    finalY + 10
  )

  // Simulated QR Code
  doc.setFontSize(10)
  doc.text("Simulated AGT QR Code:", 14, finalY + 30)
  doc.rect(14, finalY + 32, 40, 40) // Draw a square for the QR code
  doc.text("QR CODE AREA", 22, finalY + 52)


  doc.save(`fatura-${invoice.invoiceNumber}.pdf`)
}
