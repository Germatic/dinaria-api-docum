---
title: Quickstart First Payment
nav_order: 4
parent: Guides
---

# Quickstart: your first payment

This quickstart creates a payment, redirects the customer to complete it, and validates the final status.

## 1) (Optional) List payment methods

`paymentMethods` are **IDs**. Use this endpoint to discover the IDs available for a given country/currency.

```bash
curl -X GET "https://api.dinaria.com/v1/payment-methods?country=US&currency=USD" \
  -H "Authorization: Bearer sk_test_xxx"
```

## 2) Create a payment

Send:
- `externalId` (your order/checkout reference)
- `metadata` (payment-level free-form key-values)
- `paymentMethods` (method **IDs**)

```bash
curl -X POST "https://api.dinaria.com/v1/payments" \
  -H "Authorization: Bearer sk_test_xxx" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 2b1a2b0a-4b2b-4e6a-9c61-7b1b5a7a2f11" \
  -d '{
    "externalId": "ORD-1001",
    "amount": "100.50",
    "currency": "USD",
    "paymentMethods": ["pm_card", "pm_wallet"],
    "successUrl": "https://merchant.example/success",
    "cancelUrl": "https://merchant.example/cancel",
    "metadata": {
      "orderId": "ORD-1001",
      "cartId": "CART-7788"
    },
    "customer": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "country": "US",
      "state": "US-CA",
      "city": "San Francisco",
      "address": "Market Street 123",
      "zipcode": "94105"
    }
  }'
```

**Response**
- Store `transactionId`
- Redirect the customer to `actionUrl`

```json
{
  "transactionId": "trx_123456",
  "externalId": "ORD-1001",
  "status": "started",
  "amount": "100.50",
  "currency": "USD",
  "actionUrl": "https://pay.tuservicio.com/checkout/trx_123456",
  "metadata": {
    "orderId": "ORD-1001",
    "cartId": "CART-7788"
  }
}
```

## 3) Redirect the customer

Redirect to `actionUrl`.

> Do not treat redirects as final confirmation.

## 4) Confirm final status

Confirm using:
- webhooks (recommended), or
- `GET /payments/{transactionId}`
