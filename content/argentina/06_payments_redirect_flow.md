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
