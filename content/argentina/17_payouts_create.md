# Create a Payout

`POST /payouts`

Creates a payout and immediately reserves the amount from your merchant balance. The actual bank transfer is processed asynchronously by the background processor.

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
| `amount` | string | ✅ | Decimal amount, e.g. `"1500.00"` |
| `currency` | string | ✅ | ISO 4217 currency code. Defaults to `ARS`. |
| `destinationCbu` | string | ✅ | CBU or CVU of the recipient (22 digits). |
| `destinationName` | string | — | Recipient full name. Recommended for records. |
| `destinationCuit` | string | — | Recipient CUIT/CUIL. Recommended for compliance. |
| `customerId` | string | — | Link this payout to a saved [Customer](customers). |
| `merchantId` | string | — | Set server-side from your API key. Do not send. |

---

## Examples

### One-off payout to a CBU

```json
{
  "amount": "1500.00",
  "currency": "ARS",
  "destinationCbu": "0070327530004025541644",
  "destinationName": "Gerardo Ratto",
  "destinationCuit": "20221370075"
}
```

### Payout linked to a saved customer

```json
{
  "amount": "5000.00",
  "currency": "ARS",
  "destinationCbu": "0070327530004025541644",
  "destinationName": "Gerardo Ratto",
  "destinationCuit": "20221370075",
  "customerId": "cust_abc123"
}
```

---

## Response

```json
{
  "id": "po_9f3c2a1b-7d5e-4c3a-b1d2-9e4f5a6b7c8d",
  "merchantId": "merchant1",
  "customerId": "cust_abc123",
  "amount": "1500.00",
  "currency": "ARS",
  "destinationCbu": "0070327530004025541644",
  "destinationName": "Gerardo Ratto",
  "destinationCuit": "20221370075",
  "status": "pending",
  "attempts": 0,
  "createdAt": "2026-02-25T12:00:00Z"
}
```

The payout is returned in `pending` status — the transfer has not yet been submitted. Use the `id` to [retrieve the payout](retrieve-list-payouts) and track its status.

---

## Error responses

| Status | Code | Cause |
|--------|------|-------|
| `400` | `invalid_request` | Missing or malformed field (e.g. empty `amount` or `destinationCbu`). |
| `401` | `unauthorized` | Missing or invalid API key. |
| `403` | `forbidden` | API key is not merchant-scoped. |
| `402` | `insufficient_balance` | Merchant balance is too low for this payout amount. |
| `500` | `internal_error` | Unexpected server error. Retry with an idempotency key. |

---

## Idempotency

To safely retry a failed or timed-out request without creating duplicate payouts, include an `Idempotency-Key` header:

```http
Idempotency-Key: payout-2026-02-25-order-1001
```

Reusing the same key with an identical body returns the original payout. Reusing it with a different body returns `409 Conflict`.
