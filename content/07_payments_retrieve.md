---
title: Retrieve a Payment
nav_order: 9
parent: Guides
---

# Retrieve a payment

Use this endpoint to retrieve the current state of a payment.
The response returns the full payment object, including `externalId` and `metadata`.

## Endpoint
```
GET /payments/{transactionId}
```

## Example request
```bash
curl -X GET "https://api.tuservicio.com/v1/payments/trx_123456" \
  -H "Authorization: Bearer sk_test_xxx"
```

## Example response
```json
{
  "transactionId": "trx_123456",
  "externalId": "ORD-1001",
  "status": "confirmed",
  "amount": "100.50",
  "currency": "USD",
  "metadata": {
    "orderId": "ORD-1001",
    "cartId": "CART-7788"
  },
  "paymentMethods": ["pm_card"]
}
```

## Best practices
- Prefer webhooks for final state.
- Do not poll aggressively.
