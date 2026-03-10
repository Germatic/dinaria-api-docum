---
title: Quickstart First Payment
nav_order: 4
parent: Guides
---

# Quickstart: your first payment

This quickstart creates a payment, redirects the customer to complete it, and validates the final status.

## 1) Create a payment

Send `amount`, `currency`, `externalId`, `customer`, and optionally `metadata`.

The payment method is determined automatically based on the `currency` you send and the services activated for your account — no extra configuration needed.

```bash
curl -X POST "https://pay.dinaria.com/payments" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 2b1a2b0a-4b2b-4e6a-9c61-7b1b5a7a2f11" \
  -d '{
    "externalId": "ORD-1001",
    "amount": "100.50",
    "currency": "ARS",
    "successUrl": "https://merchant.example/success",
    "cancelUrl": "https://merchant.example/cancel",
    "metadata": {
      "orderId": "ORD-1001"
    },
    "customer": {
      "name": "Juan Pérez",
      "documentNumber": "20123456789"
    }
  }'
```

**Response**
- Store `transactionId`
- Use `actionUrl` or `qrData` depending on the payment method (see note below)

```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "externalId": "ORD-1001",
  "status": "started",
  "amount": "100.50",
  "currency": "ARS",
  "metadata": {
    "orderId": "ORD-1001"
  }
}
```

> **Note:** Response fields may differ depending on the country and services contracted.

## 3) Redirect the customer

Redirect to `actionUrl`.

> Do not treat redirects as final confirmation.

## 4) Confirm final status

Confirm using:
- webhooks (recommended), or
- `GET /payments/{transactionId}`
