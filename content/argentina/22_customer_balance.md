# Customer Balance

`GET /customers/{customerId}/balance`

Returns the current virtual balance for a customer in ARS.

---

## Request

```http
GET /customers/cust_12345/balance
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## Response

```json
{
  "customerId": "cust_12345",
  "currency": "ARS",
  "available": "5000.00",
  "pending": "500.00",
  "reserved": "0.00",
  "updatedAt": "2026-02-25T12:00:00Z"
}
```

### Fields

| Field | Description |
|-------|-------------|
| `available` | Funds the customer can use for payouts right now. |
| `pending` | Funds tied to unconfirmed cash-ins or in-flight payouts. |
| `reserved` | Funds reserved for other purposes (e.g. holds). |
| `updatedAt` | Timestamp of the last balance recalculation. |

---

## Balance lifecycle

| Event | Effect on `available` |
|-------|-----------------------|
| CBU transfer confirmed | ➕ Increases |
| Payout created (`pending`) | ➖ Decreases (reserved) |
| Payout completed | No change (already deducted at creation) |
| Payout permanently failed | ➕ Returns the reserved amount |

---

## Error responses

| Status | Code | Cause |
|--------|------|-------|
| `401` | `unauthorized` | Missing or invalid API key. |
| `403` | `forbidden` | Key does not have access to this customer. |
| `404` | `not_found` | Customer not found. |
