---
title: Receiving
nav_order: 12
parent: Webhooks
---

# Receiving payment status updates

Our platform sends HTTP POST requests to your server whenever a payment changes status.

This endpoint is called by **us**, not by the merchant.

## Your endpoint (on your server)
```
POST /webhooks/payments/updates
```

## Verification flow

1. Read raw request body
2. Validate `X-Webhook-Timestamp`
3. Verify `X-Webhook-Signature`
4. Parse JSON payload
5. Process asynchronously
6. Respond with HTTP 200

## Payload
Webhook events include the full payment context needed for reconciliation, including:
- `transactionId`
- `externalId`
- `metadata`
- `paymentMethods` (IDs)

### Example payload
```json
{
  "transactionId": "trx_123456",
  "externalId": "ORD-1001",
  "status": "paid",
  "amount": "100.50",
  "currency": "USD",
  "metadata": {
    "orderId": "ORD-1001",
    "cartId": "CART-7788"
  },
  "paymentMethods": ["pm_card"]
}
```
