# Customer Payouts

`GET /customers/{customerId}/payouts`

Returns all payouts (PIX cash-outs) associated with a customer, ordered by most recent first.

---

## Request

```http
GET /customers/cust_br_12345/payouts?status=completed&limit=20
Authorization: Bearer sk_live_<your-merchant-key>
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter: `pending`, `completed`, `failed`, `cancelled` |
| `limit` | integer | Max results (1–200, default 50) |
| `startingAfter` | string | Cursor for pagination (payout `id`) |

---

## Response

```json
[
  {
    "id": "po_br_7f4d1c2a-8e6f-4b3d-c2e1-af5b6c7d8e9f",
    "merchantId": "merchant_br_001",
    "customerId": "cust_br_12345",
    "amount": "250.00",
    "currency": "BRL",
    "rail": "PIX",
    "destination": {
      "accountNumber": "joao.silva@example.com",
      "holderName": "João Silva",
      "country": "BR"
    },
    "status": "completed",
    "attempts": 1,
    "submittedAt": "2026-02-25T12:00:12Z",
    "completedAt": "2026-02-25T12:00:14Z",
    "createdAt": "2026-02-25T12:00:00Z"
  }
]
```

---

## Notes

- Only payouts where `customer_id` matches the given customer are returned.
- A customer may have payouts across multiple merchants — all are included.
- To send a new payout to this customer, use [`POST /payouts`](create-a-payout) with `customerId`.
- PIX payouts typically complete within seconds — `completedAt` is usually within 2–3 seconds of `submittedAt`.
