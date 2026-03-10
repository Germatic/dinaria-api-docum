---
layout: default
title: Merchant Settings
nav_order: 6
---

# Merchant Settings

`PUT /merchants/{merchantId}/settings`

Configure per-merchant behaviour for payment order expiration and unmatched incoming transfer handling.

---

## Request

```
PUT /merchants/{merchantId}/settings
Authorization: Bearer <api_key>
Content-Type: application/json
```

All fields are optional — send only the ones you want to change.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `defaultTransferExpirationHours` | number | `0` | How many hours an **unmatched incoming transfer** (funds received from your provider with no matching order) is held before being automatically refunded. `0` means hold indefinitely. Must be `0` or greater. |
| `defaultOrderExpirationHours` | number | `0` | How many hours a **payment order** (created via `POST /payments`) stays open before expiring. `0` means orders never expire automatically. If the customer passes an explicit `expiration` field on order creation, that value takes precedence. |
| `refundPolicy` | string | `"on_reception"` | Applies to unmatched incoming transfers only. `"on_reception"` — refund immediately when no matching order is found. `"on_expiration"` — hold and retry matching until `defaultTransferExpirationHours` elapses (or indefinitely if `0`). |

---

## Examples

**Set a 48-hour order expiration, hold unmatched transfers for 24 h then refund**

```json
{
  "defaultOrderExpirationHours": 48,
  "defaultTransferExpirationHours": 24,
  "refundPolicy": "on_expiration"
}
```

**Orders expire after 1 hour, unmatched transfers held indefinitely**

```json
{
  "defaultOrderExpirationHours": 1,
  "defaultTransferExpirationHours": 0,
  "refundPolicy": "on_expiration"
}
```

**Refund unmatched transfers immediately, orders never expire**

```json
{ "refundPolicy": "on_reception" }
```

---

## Response

```json
{
  "merchantId": "your_merchant_id",
  "defaultTransferExpirationHours": 24,
  "defaultOrderExpirationHours": 48,
  "refundPolicy": "on_expiration"
}
```

---

## Error responses

| Status | Code | Cause |
|--------|------|-------|
| `400` | `invalid_request` | Any expiration hours field is negative, or unknown `refundPolicy` value. |
| `401` | `unauthorized` | Missing or invalid API key. |
| `404` | `not_found` | Merchant not found or does not belong to your account. |

---

## Notes

- This endpoint requires an **account-level API key**. Merchant-scoped keys do not have access to settings.
- Settings take effect immediately on the next reconciler cycle.
- **`defaultTransferExpirationHours` and `refundPolicy`** govern **incoming transfers with no matching order** (provider side — ARS only today).
- **`defaultOrderExpirationHours`** governs **payment orders created by the customer** (`POST /payments`). An explicit `expiration` value on the order creation request always takes precedence over the merchant default.
