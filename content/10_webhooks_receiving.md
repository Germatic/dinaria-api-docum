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

### Example payload
```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "externalId": "ORD-1001",
  "status": "confirmed",
  "amount": "100.50",
  "currency": "ARS",
  "metadata": {
    "orderId": "ORD-1001"
  }
}
```
