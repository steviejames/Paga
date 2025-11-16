import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Heading,
} from "@react-email/components"
import * as React from "react"

interface PaymentSuccessEmailProps {
  customerName: string
  chargeAmount: number
  organizationName: string
}

export const PaymentSuccessEmail = ({
  customerName,
  chargeAmount,
  organizationName,
}: PaymentSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Pagamento recebido com sucesso!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Pagamento Confirmado</Heading>
        <Text style={text}>
          Olá {customerName},
        </Text>
        <Text style={text}>
          Recebemos o seu pagamento no valor de{" "}
          {new Intl.NumberFormat("pt-AO", {
            style: "currency",
            currency: "AOA",
          }).format(chargeAmount)}{" "}
          para {organizationName}.
        </Text>
        <Text style={text}>
          Obrigado por sua confiança.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default PaymentSuccessEmail

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Helvetica,Arial,sans-serif",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const h1 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 40px",
  padding: "0 40px",
}
