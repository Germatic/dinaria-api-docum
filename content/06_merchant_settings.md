---
layout: default
title: Merchant Settings
nav_order: 6
---

# Merchant Settings

`PUT /merchants/{merchantId}/settings`

Configure per-merchant behaviour for incoming payment matching and unmatched transfer handling.

---

## Request

```
PUT /merchants/{merchantId}/settings
Authorization: Bearer <api_key>
Content-Type: application/json
```

Both fields are optional — send only the ones you want to change.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `defaultExpirationHours` | number | `12` | How many hours an unmatched incoming transfer is held before being automatically refunded. Must be greater than 0. |
| `refundPolicy` | string | `"on_reception"` | `"on_reception"` — refund immediately when no matching order is found.<br>`"on_expiration"` — hold the transfer and retry matching for up to `defaultExpirationHours`, then refund. |

---

## Examples

**Set a 24-hour hold window**

```json
{ "defaultExpirationHours": 24 }
```

**Switch to on-expiration policy**

```json
{
  "refundPolicy": "on_expiration",
  "defaultExpirationHours": 6
}
```

**Revert to immediate refunds**

```json
{ "refundPolicy": "on_reception" }
```

---

## Response

```json
{
  "merchantId": "your_merchant_id",
  "defaultExpirationHours": 24,
  "refundPolicy": "on_expiration"
}
```

---

## Error responses

| Status | Code | Cause |
|--------|------|-------|
| `400` | `invalid_request` | `defaultExpirationHours` ≤ 0, or unknown `refundPolicy` value. |
| `401` | `unauthorized` | Missing or invalid API key. |
| `404` | `not_found` | Merchant not found or does not belong to your account. |

---

## Notes

- This endpoint requires an **account-level API key**. Merchant-scoped keys do not have access to settings.
- Settings take effect immediately on the next reconciler cycle.
- `defaultExpirationHours` and `refundPolicy` govern **incoming transfers with no matching order** — they do not affect payment orders created via `POST /payments`. Payment orders remain in `started` status until matched or explicitly cancelled.
