import { type NextRequest, NextResponse } from "next/server"
import { invoices } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoice = invoices.find((inv) => inv.id === params.id)

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }

    // Generate PDF content as HTML that can be converted to PDF
    const pdfHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px; }
    .header h1 { font-size: 32px; color: #000; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .badge.paid { background: #dcfce7; color: #166534; }
    .badge.issued { background: #dbeafe; color: #1e40af; }
    .badge.draft { background: #f3f4f6; color: #374151; }
    .info-section { display: flex; gap: 40px; margin-bottom: 30px; }
    .info-block { flex: 1; }
    .info-block h3 { font-size: 14px; margin-bottom: 10px; color: #666; }
    .info-block p { font-size: 13px; line-height: 1.6; }
    .dates { display: flex; gap: 40px; margin-bottom: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; }
    .date-item { flex: 1; }
    .date-item label { font-size: 11px; color: #666; display: block; margin-bottom: 4px; }
    .date-item span { font-size: 14px; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    th { background: #f9fafb; padding: 12px; text-align: left; font-size: 12px; color: #666; border-bottom: 2px solid #e5e7eb; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 300px; margin-top: 20px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
    .totals-row.total { border-top: 2px solid #000; padding-top: 12px; margin-top: 8px; font-size: 18px; font-weight: bold; }
    .notes { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    .notes h4 { font-size: 14px; margin-bottom: 8px; }
    .notes p { font-size: 12px; color: #666; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>${invoice.invoiceNumber}</h1>
      <span class="badge ${invoice.status}">${invoice.status === "paid" ? "Paga" : invoice.status === "issued" ? "Emitida" : "Rascunho"}</span>
    </div>
    <div style="text-align: right;">
      <p style="font-size: 12px; color: #666;">Valor total</p>
      <p style="font-size: 28px; font-weight: bold;">Kz ${invoice.total.toLocaleString()}</p>
    </div>
  </div>

  <div class="info-section">
    <div class="info-block">
      <h3>EMITENTE</h3>
      <p><strong>${invoice.business.name}</strong></p>
      <p>NIF: ${invoice.business.nif}</p>
      <p>${invoice.business.address}</p>
      <p>${invoice.business.phone}</p>
      <p>${invoice.business.email}</p>
    </div>
    <div class="info-block">
      <h3>CLIENTE</h3>
      <p><strong>${invoice.client.name}</strong></p>
      <p>NIF: ${invoice.client.nif}</p>
      <p>${invoice.client.address}</p>
      <p>${invoice.client.phone}</p>
      <p>${invoice.client.email}</p>
    </div>
  </div>

  <div class="dates">
    <div class="date-item">
      <label>Data de emissão</label>
      <span>${new Date(invoice.date).toLocaleDateString("pt-AO")}</span>
    </div>
    <div class="date-item">
      <label>Data de vencimento</label>
      <span>${new Date(invoice.dueDate).toLocaleDateString("pt-AO")}</span>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Descrição</th>
        <th class="text-right">Qtd</th>
        <th class="text-right">Preço Unit.</th>
        <th class="text-right">IVA</th>
        <th class="text-right">Total</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items
        .map(
          (item) => `
        <tr>
          <td>${item.description}</td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">Kz ${item.unitPrice.toLocaleString()}</td>
          <td class="text-right">${item.taxRate}%</td>
          <td class="text-right"><strong>Kz ${item.total.toLocaleString()}</strong></td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row">
      <span>Subtotal</span>
      <span>Kz ${invoice.subtotal.toLocaleString()}</span>
    </div>
    <div class="totals-row">
      <span>IVA</span>
      <span>Kz ${invoice.taxAmount.toLocaleString()}</span>
    </div>
    <div class="totals-row total">
      <span>Total</span>
      <span>Kz ${invoice.total.toLocaleString()}</span>
    </div>
  </div>

  ${
    invoice.notes || invoice.terms
      ? `
  <div class="notes">
    ${invoice.notes ? `<h4>Notas</h4><p>${invoice.notes}</p>` : ""}
    ${invoice.terms ? `<h4 style="margin-top: 20px;">Termos e condições</h4><p>${invoice.terms}</p>` : ""}
  </div>
  `
      : ""
  }
</body>
</html>
    `

    // In a real implementation, you would use a library like puppeteer or jsPDF
    // For now, we'll return the HTML that can be printed to PDF by the browser
    return new NextResponse(pdfHtml, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${invoice.invoiceNumber.replace(/\s+/g, "_")}.html"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
