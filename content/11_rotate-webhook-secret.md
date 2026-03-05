---
title: Rotate Secret
nav_order: 15
parent: Webhooks
---

# Rotate webhook secret

You can rotate your webhook signing secret at any time.

This is useful for:
- Security best practices
- Secret compromise
- Compliance requirements

```
POST /webhooks/payments/rotate-secret
```

## Response example

```json
{
  "webhookUrl": "https://merchant.example/webhooks/payments",
  "webhookSecret": "whsec_2b91d0f6a1d34f0b...",
  "rotatedAt": "2026-01-16T18:10:00Z",
  "previousSecretExpiresAt": "2026-01-17T18:10:00Z"
}
```

## Notes
- The new `webhookSecret` is shown **only once**
- Update your stored secret immediately
- If `previousSecretExpiresAt` is present, the previous secret may be accepted
  until that time

