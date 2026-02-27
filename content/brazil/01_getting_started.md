# Getting started — Brazil

## Base URL

- **Sandbox:** `https://br-sandbox.dinaria.com/v1`
- **Production:** `https://br.dinaria.com/v1`

Use the base URL that matches your integration environment. Sandbox keys work only in sandbox.

## Authentication (API key)

Authenticate every request with your API key in the `Authorization` header:

```http
Authorization: Bearer di_live_xxx
Content-Type: application/json
```

**Best practices**

- Treat your API key as a secret (never expose it in the frontend).
- Rotate the key if you suspect compromise.

## Idempotency

For create operations (e.g. `POST /payments`, `POST /payouts`), send an `Idempotency-Key` header:

```http
Idempotency-Key: <uuid-v4>
```

This prevents duplicate payments when retrying after timeouts.

## Key concepts

### Payments are single-use

A payment represents one checkout attempt. If cancelled or expired, create a new payment.

### Redirects are not confirmation

Redirects to `successUrl` or `cancelUrl` do **not** guarantee final status. Always confirm via webhooks or `GET /payments/{transactionId}`.

### PIX is instant

PIX transfers typically settle in seconds. Your webhook will receive the status shortly after the customer completes the payment.
