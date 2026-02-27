# PIX payment flow

Brazil payments use a PIX-based flow. The customer scans a QR code or copies a PIX key to complete the payment.

## How the PIX flow works
1. Merchant creates a payment (`POST /payments`)
2. API returns `actionUrl` and a PIX QR code payload
3. Merchant displays the QR code or PIX copy-paste key to the customer
4. Customer completes the payment in their banking app
5. Customer is redirected back to `successUrl` or notified in-app

## Important
Completion of the QR scan does **not** guarantee final payment status.
Always confirm final state using:
- Webhooks (recommended), or
- `GET /payments/{transactionId}`

## PIX key types
| Type | Format |
|------|--------|
| CPF | 11-digit individual taxpayer number |
| CNPJ | 14-digit company taxpayer number |
| Phone | +55XXXXXXXXXXX |
| Email | user@example.com |
| Random | UUID-style random key |
