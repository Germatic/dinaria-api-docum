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
curl -X GET "https://pay.dinaria.com/payments/f90c7c31-7a38-46dc-99ba-188a4c99da29" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Example response
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

## Best practices
- Prefer webhooks for final state.
- Do not poll aggressively.
