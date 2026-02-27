# Retrieve & List Payouts

---

## Retrieve a payout

`GET /payouts/{payoutId}`

Returns the current state of a payout.

```http
GET /payouts/po_br_7f4d1c2a-8e6f-4b3d-c2e1-af5b6c7d8e9f
Authorization: Bearer sk_live_<your-merchant-key>
```

### Response

```json
{
  "id": "po_br_7f4d1c2a-8e6f-4b3d-c2e1-af5b6c7d8e9f",
  "merchantId": "merchant_br_001",
  "amount": "250.00",
  "currency": "BRL",
  "rail": "PIX",
  "status": "completed",
  "attempts": 1,
  "submittedAt": "2026-02-25T12:00:12Z",
  "completedAt": "2026-02-25T12:00:14Z",
  "createdAt": "2026-02-25T12:00:00Z"
}
```

PIX transfers are near-instant — a `completed` payout typically arrives within seconds.

---

## List payouts

`GET /payouts`

Returns your payouts, most recent first.

```http
GET /payouts?status=pending&limit=20
Authorization: Bearer sk_live_<your-merchant-key>
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter: `pending`, `completed`, `failed` |
| `externalId` | string | Filter by your own reference ID |
| `limit` | integer | Max results (1–200, default 50) |
| `startingAfter` | string | Cursor for pagination (payout ID) |

---

## Cancel a payout

`POST /payouts/{payoutId}/cancel`

Only payouts in **`pending`** status (not yet submitted to PIX) can be cancelled. Once submitted to PIX, cancellation is not possible.

```http
POST /payouts/po_br_7f4d1c2a-8e6f-4b3d-c2e1-af5b6c7d8e9f/cancel
Authorization: Bearer sk_live_<your-merchant-key>
```

On success the payout moves to `cancelled` and the reserved amount is returned to your merchant balance.

---

## Payout response fields

| Field | Description |
|-------|-------------|
| `id` | Unique payout identifier. |
| `status` | `pending`, `completed`, or `failed`. |
| `rail` | `PIX` for Brazil payouts. |
| `attempts` | Number of submission attempts made. |
| `submittedAt` | Timestamp when the PIX transfer was first submitted. |
| `completedAt` | Timestamp when the PIX transfer was confirmed. |
| `errorMessage` | Populated on `failed` payouts; describes the failure reason. |
| `createdAt` | Timestamp when the payout was created. |
