# Create a payment

Use this endpoint to create a payment and start a redirect-based checkout flow.

## Endpoint
```
POST /payments
```

## Headers
```http
Authorization: Bearer <api_key>
Content-Type: application/json
Idempotency-Key: <uuid>
```

## Important notes
- Payments are single-use. Create a new payment for each attempt.
- Redirects to `successUrl` or `cancelUrl` do not guarantee final payment status.
  Always confirm using webhooks or `GET /payments/{transactionId}`.
- `paymentMethods` must contain payment method **IDs** (not objects).

## Request fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | string | ✅ | Decimal amount, e.g. `"1500.00"` |
| `currency` | string | ✅ | ISO 4217 code, e.g. `"ARS"` |
| `externalId` | string | — | Your own order reference |
| `merchantId` | string | — | Target merchant. Set automatically from merchant-scoped key |
| `paymentMethods` | array | — | Payment method IDs |
| `successUrl` | string | — | Redirect on success |
| `cancelUrl` | string | — | Redirect on cancellation |
| `metadata` | object | — | Arbitrary key-value pairs |
| `customer` | object | — | Customer identity (see below) |
| `allowOverUnder` | boolean | — | Accept incoming transfers that differ slightly from the expected amount. Default: `false`. |

### `allowOverUnder`

When `true`, the reconciler will match an incoming Coinag transfer to this order even if the received amount is slightly above or below `amount` — useful when payers may round or banks apply small fees. Without this flag, only exact-amount matches are accepted.

## Example request
```json
{
  "externalId": "ORD-1001",
  "amount": "1500.00",
  "currency": "ARS",
  "successUrl": "https://merchant.example/success",
  "cancelUrl": "https://merchant.example/cancel",
  "allowOverUnder": true,
  "metadata": {
    "orderId": "ORD-1001"
  },
  "customer": {
    "firstName": "Juan",
    "lastName": "García",
    "email": "juan@example.com",
    "cuit": "20123456789"
  }
}
```

## Example response
```json
{
  "transactionId": "trx_123456",
  "externalId": "ORD-1001",
  "status": "started",
  "amount": "100.50",
  "currency": "USD",
  "actionUrl": "https://pay.tuservicio.com/checkout/trx_123456",
  "metadata": {
    "orderId": "ORD-1001",
    "cartId": "CART-7788"
  },
  "paymentMethods": ["pm_card", "pm_wallet"]
}
```
