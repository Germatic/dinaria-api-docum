---
title: Retrieve & List Payouts
nav_order: 3
parent: Payouts
---

# Retrieve & List Payouts

---

## Retrieve a payout

`GET /payouts/{payoutId}`

Returns the current state of a payout.

```http
GET /payouts/po_9f3c2a1b-7d5e-4c3a-b1d2-9e4f5a6b7c8d
Authorization: Bearer sk_live_<your-merchant-key>
```

### Response

```json
{
  "id": "po_9f3c2a1b-7d5e-4c3a-b1d2-9e4f5a6b7c8d",
  "merchantId": "merchant1",
  "amount": "1500.00",
  "currency": "ARS",
  "destinationCbu": "0070327530004025541644",
  "destinationName": "Gerardo Ratto",
  "status": "completed",
  "coinagTrxId": "TRX-20260225-00123",
  "attempts": 1,
  "submittedAt": "2026-02-25T12:00:15Z",
  "completedAt": "2026-02-25T12:00:18Z",
  "createdAt": "2026-02-25T12:00:00Z"
}
```

---

## List payouts

`GET /payouts`

Returns your payouts, most recent first. Use query parameters to filter.

```http
GET /payouts?status=pending&limit=20
Authorization: Bearer sk_live_<your-merchant-key>
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `pending`, `completed`, `failed` |
| `externalId` | string | Filter by your own reference ID |
| `limit` | integer | Max results (1–200, default 50) |
| `startingAfter` | string | Cursor for pagination (payout ID) |

---

## Cancel a payout

`POST /payouts/{payoutId}/cancel`

Attempts to cancel a payout. Only payouts still in **`pending`** status (not yet submitted to the CBU rail) can be cancelled. Once submitted, cancellation is not possible.

```http
POST /payouts/po_9f3c2a1b-7d5e-4c3a-b1d2-9e4f5a6b7c8d/cancel
Authorization: Bearer sk_live_<your-merchant-key>
```

On success the payout moves to `cancelled` and the reserved amount is returned to your merchant balance.

---

## Payout response fields

| Field | Description |
|-------|-------------|
| `id` | Unique payout identifier. |
| `status` | Current status: `pending`, `completed`, `failed`. |
| `coinagTrxId` | CBU transfer transaction ID (set after submission). |
| `attempts` | Number of submission attempts made. |
| `submittedAt` | Timestamp when the transfer was first submitted. |
| `completedAt` | Timestamp when the transfer was confirmed. |
| `errorMessage` | Populated on `failed` payouts; describes the failure reason. |
| `createdAt` | Timestamp when the payout was created. |
