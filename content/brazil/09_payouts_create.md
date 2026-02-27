# Create a Payout

`POST /payouts`

Creates a payout and immediately reserves the amount from your merchant balance. The actual PIX transfer is processed asynchronously.

---

## Request

```http
POST /payouts
Authorization: Bearer sk_live_<your-merchant-key>
Content-Type: application/json
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | string | ✅ | Decimal amount in BRL, e.g. `"250.00"` |
| `currency` | string | ✅ | Must be `BRL` for Brazil payouts |
| `rail` | string | ✅ | Must be `PIX` |
| `destination.pixKey` | string | ✅ | PIX key: CPF, CNPJ, phone, email, or random key |
| `destination.holderName` | string | — | Recipient full name or business name |
| `destination.country` | string | ✅ | `BR` |
| `customerId` | string | — | Link this payout to a saved [Customer](customers) |

---

## Examples

### One-off payout using a CPF PIX key

```json
{
  "amount": "250.00",
  "currency": "BRL",
  "rail": "PIX",
  "destination": {
    "country": "BR",
    "currency": "BRL",
    "rail": "PIX",
    "accountType": "other",
    "holderName": "João Silva",
    "accountNumber": "12345678901"
  }
}
```

### One-off payout using an email PIX key

```json
{
  "amount": "500.00",
  "currency": "BRL",
  "rail": "PIX",
  "destination": {
    "country": "BR",
    "currency": "BRL",
    "rail": "PIX",
    "accountType": "other",
    "holderName": "João Silva",
    "accountNumber": "joao.silva@example.com"
  }
}
```

### Payout linked to a saved customer

```json
{
  "amount": "1200.00",
  "currency": "BRL",
  "rail": "PIX",
  "customerId": "cust_br_abc123",
  "bankAccountId": "ba_pix_99887"
}
```

---

## Response

```json
{
  "id": "po_br_7f4d1c2a-8e6f-4b3d-c2e1-af5b6c7d8e9f",
  "merchantId": "merchant_br_001",
  "amount": "250.00",
  "currency": "BRL",
  "rail": "PIX",
  "status": "pending",
  "attempts": 0,
  "createdAt": "2026-02-25T12:00:00Z"
}
```

The payout is returned in `pending` status. Use the `id` to [track its status](retrieve-list-payouts).

---

## Error responses

| Status | Code | Cause |
|--------|------|-------|
| `400` | `invalid_request` | Missing or malformed field (e.g. invalid PIX key format). |
| `401` | `unauthorized` | Missing or invalid API key. |
| `403` | `forbidden` | API key is not merchant-scoped. |
| `402` | `insufficient_balance` | BRL balance is too low for this payout. |
| `422` | `validation_failed` | PIX key format invalid or recipient not found. |
| `500` | `internal_error` | Unexpected server error. Retry with an idempotency key. |

---

## Idempotency

Include an `Idempotency-Key` header to safely retry without creating duplicate payouts:

```http
Idempotency-Key: payout-br-2026-02-25-order-2001
```
