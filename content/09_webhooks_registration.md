---
title: Registration
nav_order: 11
parent: Webhooks
---

# Registering (configuration)

Use this endpoint to register the URL where payment status updates will be delivered.

This is a **configuration** endpoint called by the merchant.


## Endpoint
```
POST /webhooks/payments
```

## Example request
```json
{
  "webhookUrl": "https://merchant.example/webhooks/payments"
}
```

## Notes
- Call once during setup, and again if your URL changes.
- This endpoint does **not** deliver events.

## Webhook secret (shown once)

When registering a webhook endpoint, the API returns a `webhookSecret`.

```json
{
  "webhookUrl": "https://merchant.example/webhooks/payments",
  "webhookSecret": "whsec_9f3c2a1b7d5e4c3a...",
  "createdAt": "2026-01-16T18:00:00Z"
}
```

### Important
- The `webhookSecret` is shown **only once**
- It cannot be retrieved again
- Store it securely (for example, in a secret manager)

You will use this secret to verify webhook signatures.
