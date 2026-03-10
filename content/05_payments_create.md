---
title: Create Payments
nav_order: 7
parent: Guides
---

# Create a payment

Use this endpoint to create a payment and start a redirect-based checkout flow.

## Endpoint
```
POST /payments
```

## Headers
```http
Authorization: Bearer <api_key>
Content-Type: application/json
Idempotency-Key: <uuid>
```

## Important notes
- Payments are single-use. Create a new payment for each attempt.
- Redirects to `successUrl` or `cancelUrl` do not guarantee final payment status.
  Always confirm using webhooks or `GET /payments/{transactionId}`.

## merchantId
`merchantId` is resolved server-side from your API key — **do not send it in the request body**.

Your API key is scoped to a single merchant. The platform injects the correct `merchantId` automatically. If you send a `merchantId` that does not match your key's scope, the request is rejected with `403 Forbidden`.

## Request fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | string | ✅ | Decimal string, e.g. `"100.50"` |
| `currency` | string | ✅ | ISO 4217 code — `ARS` (Argentina) or `BRL` (Brazil) |
| `customer` | object | ✅ | See Customer object below |
| `externalId` | string | — | Your internal order/checkout reference |
| `metadata` | object | — | Free-form key-value pairs, returned in webhooks |
| `successUrl` | string | — | Redirect URL on payment success |
| `cancelUrl` | string | — | Redirect URL on payment cancel/expiry |

### Customer object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full name of the payer |
| `documentNumber` | string | ✅ | Tax ID — CUIT/DNI for ARS, CPF/CNPJ for BRL |
| `documentType` | string | — | `CUIT`, `DNI`, `CPF`, or `CNPJ` (inferred if omitted) |
| `email` | string | — | Payer email |

## Example request

```json
{
  "amount": "100.50",
  "currency": "ARS",
  "externalId": "ORD-1001",
  "customer": {
    "name": "Juan Pérez",
    "documentNumber": "20123456789"
  },
  "metadata": {
    "orderId": "ORD-1001"
  }
}
```

## Example response
```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "externalId": "ORD-1001",
  "status": "started",
  "amount": "100.50",
  "currency": "ARS",
  "actionUrl": "https://pay.dinaria.com/checkout/f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "metadata": {
    "orderId": "ORD-1001"
  }
}
```

> **Note:** The response fields may differ depending on the country and services contracted. For example, PIX payments (BRL) return a `qrData` field with the payment code, while bank transfer payments (ARS) return a `paymentData` object with CBU and reference details.
