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
- `paymentMethods` must contain payment method **IDs** (not objects).

## Example request
```json
{
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
    "city": "San Francisco"
  }
}
```

## Example response
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
  },
  "paymentMethods": ["pm_card", "pm_wallet"]
}
```
