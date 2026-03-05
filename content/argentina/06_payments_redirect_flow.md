---
title: Payments Redirect Flow
nav_order: 8
parent: Guides
---

# Redirecting the customer

Payments use a redirect-based flow to securely collect payment details.

## How the redirect works
1. Merchant creates a payment (`POST /payments`)
2. API returns `actionUrl`
3. Merchant redirects the customer to `actionUrl`
4. Customer completes the payment
5. Customer is redirected back to `successUrl` or `cancelUrl`

## Important
Redirects do **not** guarantee final payment status.
Always confirm final state using:
- Webhooks (recommended), or
- `GET /payments/{transactionId}`

## Hosted vs Advanced

In hosted mode, your integration can remain minimal:

1. Create a payment
2. Redirect the payer to `actionUrl`
3. Listen for webhook updates (`payment.status_changed`)

For advanced UIs, use the `nextAction` object to render your own experience (voucher, bank instructions, or missing customer fields). `actionUrl` remains available as a universal fallback.
