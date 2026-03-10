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
| `defaultExpirationHours` | number | `0` | How many hours an unmatched incoming transfer is held before being automatically refunded. `0` means hold indefinitely — no automatic refund. Must be `0` or greater. |
| `refundPolicy` | string | `"on_reception"` | `"on_reception"` — refund immediately when no matching order is found.<br>`"on_expiration"` — hold the transfer and retry matching. If `defaultExpirationHours` is `0`, holds indefinitely until manually resolved. |

---

## Examples

**Hold indefinitely — never auto-refund (default)**

```json
{ "refundPolicy": "on_expiration", "defaultExpirationHours": 0 }
```

**Set a 24-hour hold window, then auto-refund**

```json
{
  "refundPolicy": "on_expiration",
  "defaultExpirationHours": 24
}
```

**Refund immediately on no match**

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
| `400` | `invalid_request` | `defaultExpirationHours` is negative, or unknown `refundPolicy` value. |
| `401` | `unauthorized` | Missing or invalid API key. |
| `404` | `not_found` | Merchant not found or does not belong to your account. |

---

## Notes

- This endpoint requires an **account-level API key**. Merchant-scoped keys do not have access to settings.
- Settings take effect immediately on the next reconciler cycle.
- `defaultExpirationHours` and `refundPolicy` govern **incoming transfers with no matching order** — they do not affect payment orders created via `POST /payments`. Payment orders remain in `started` status until matched or explicitly cancelled.
