# Customer Payouts

`GET /customers/{customerId}/payouts`

Returns all payouts (CBU cash-outs) associated with a customer, ordered by most recent first.

---

## Request

```http
GET /customers/cust_12345/payouts?status=completed&limit=20
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
    "id": "po_9f3c2a1b-7d5e-4c3a-b1d2-9e4f5a6b7c8d",
    "merchantId": "merchant1",
    "customerId": "cust_12345",
    "amount": "1500.00",
    "currency": "ARS",
    "destinationCbu": "0070327530004025541644",
    "destinationName": "Gerardo Ratto",
    "destinationCuit": "20221370075",
    "status": "completed",
    "coinagTrxId": "TRX-20260225-00123",
    "attempts": 1,
    "submittedAt": "2026-02-25T12:00:15Z",
    "completedAt": "2026-02-25T12:00:18Z",
    "createdAt": "2026-02-25T12:00:00Z"
  }
]
```

---

## Notes

- Only payouts where `customer_id` matches the given customer are returned.
- A customer may have payouts across multiple merchants — all are included.
- To send a new payout to this customer, use [`POST /payouts`](create-a-payout) with `customerId`.
- `coinagTrxId` is the CBU transfer ID assigned by the Coinag/COELSA rail on acceptance.
