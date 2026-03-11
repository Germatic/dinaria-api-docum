---
title: Retrieve & List Payouts
nav_order: 3
parent: Money Out
---

# Retrieve & List Payouts

---

## Retrieve a payout

`GET /payouts/{payoutId}`

Returns the current state of a payout.

```http
GET /payouts/5caa9072-4500-4bfd-b800-c31a63f3d404
Authorization: Bearer di_live_<your-merchant-key>
```

### Response — ARS completed

```json
{
  "id": "1078d6c2-a452-44fb-94f4-525390231ce2",
  "accountId": "paypaga",
  "merchantId": "paypaga_merch_1",
  "amount": "1500.00",
  "currency": "ARS",
  "destination": {
    "identifierType": "cbu",
    "identifierValue": "0070327530004025541644",
    "taxId": "20221370075",
    "taxIdCountry": "AR",
    "name": "Gerardo Ratto"
  },
  "status": "completed",
  "bankSystemTrxId": "3D5W612E65ZJKDJW2GXYVR",
  "attempts": 1,
  "createdAt": "2026-03-10T15:00:00Z",
  "submittedAt": "2026-03-10T15:00:05Z",
  "completedAt": "2026-03-10T15:00:08Z"
}
```

### Response — BRL completed

```json
{
  "id": "5caa9072-4500-4bfd-b800-c31a63f3d404",
  "accountId": "bpn1",
  "merchantId": "bpn1_merch1",
  "amount": "2.00",
  "currency": "BRL",
  "destination": {
    "identifierType": "pix_key_cpf",
    "identifierValue": "71888025131",
    "taxId": "71888025131",
    "taxIdCountry": "BR",
    "name": "Luis Palima"
  },
  "status": "completed",
  "bankSystemTrxId": "bccfccf4-3a3c-49bd-9d0d-4d6182b3de11",
  "attempts": 1,
  "createdAt": "2026-03-11T23:01:17Z",
  "submittedAt": "2026-03-11T23:01:32Z",
  "completedAt": "2026-03-11T23:01:44Z"
}
```

---

## List payouts

`GET /payouts`

Returns your payouts, most recent first.

```http
GET /payouts?status=pending&limit=20
Authorization: Bearer di_live_<your-merchant-key>
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `pending`, `processing`, `completed`, `failed`, `cancelled` |
| `limit` | integer | Max results (1–200, default 50) |
| `startingAfter` | string | Cursor for pagination — pass the `id` of the last item in the previous page |

### Response

```json
{
  "object": "list",
  "data": [ ... ],
  "hasMore": false
}
```

---

## Cancel a payout

`POST /payouts/{payoutId}/cancel`

Cancels a payout that is still in **`pending`** status — before the processor submits it to the payment network. Once it reaches `processing` or `completed`, cancellation is not possible.

```http
POST /payouts/5caa9072-4500-4bfd-b800-c31a63f3d404/cancel
Authorization: Bearer di_live_<your-merchant-key>
```

On success the payout moves to `cancelled` and the reserved amount is immediately returned to your merchant balance.

**Error responses:**

| Status | Code | Cause |
|--------|------|-------|
| `404` | `not_found` | Payout not found. |
| `409` | `not_cancelable` | Payout is not in `pending` status. |

---

## Payout response fields

| Field | Description |
|-------|-------------|
| `id` | Unique payout identifier (UUID — no prefix). |
| `accountId` | Account that owns this payout. |
| `merchantId` | Merchant the payout was created for. |
| `amount` | Payout amount as a decimal string. |
| `currency` | `ARS` or `BRL`. |
| `destination` | Object with `identifierType`, `identifierValue`, `taxId`, `taxIdCountry`, `name`. |
| `status` | See status table below. |
| `bankSystemTrxId` | Banking/payment network transaction ID, set on completion. **ARS**: COELSA clearing ID. **BRL**: Transfero payment group ID. |
| `errorMessage` | Present when `status` is `failed`. Describes the rejection reason. |
| `attempts` | Number of submission attempts made. Max 3 before permanent failure. |
| `externalId` | Your reference, if provided at creation. |
| `createdAt` | When the payout was created. |
| `submittedAt` | When the payout was first submitted to the payment network. |
| `completedAt` | When the transfer was confirmed. |

### Status values

| Status | Description |
|--------|-------------|
| `pending` | Queued. Balance reserved. Not yet submitted. |
| `processing` | Submitted to the payment network (BRL only). Awaiting confirmation. |
| `completed` | Transfer confirmed. Terminal. |
| `failed` | Permanently rejected after 3 attempts. Balance restored. Terminal. |
| `cancelled` | Cancelled before processing. Balance restored. Terminal. |
