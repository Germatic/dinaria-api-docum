---
title: Security
nav_order: 13
parent: Webhooks
---

# Webhook security & signature verification

All webhook events sent by our platform are signed to allow merchants to verify
their authenticity and integrity.

Before processing any webhook event, **always verify the signature**.

## Headers

| Header | Description |
|------|-------------|
| `X-Webhook-Timestamp` | Unix timestamp (seconds) |
| `X-Webhook-Signature` | Signature header |

Example:

```http
X-Webhook-Timestamp: 1737000000
X-Webhook-Signature: t=1737000000,v1=9d0c...ab12
```

## Signature generation

Signed payload:

```
<timestamp>.<raw_body>
```

Signature:

```
HMAC_SHA256(webhookSecret, signed_payload)
```

## Verification rules
- Use the raw request body
- Enforce a timestamp tolerance of ±5 minutes
- Use constant-time comparison
- Reject the webhook if verification fails

