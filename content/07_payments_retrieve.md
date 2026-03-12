---
title: Retrieve Payments
nav_order: 9
parent: Guides
---

# Retrieve payments

Two endpoints are available depending on whether you need a single payment or a paginated list.

---

## Retrieve a single payment

```
GET /payments/{transactionId}
```

Returns the full payment object for a given `transactionId`.

### Example request
```bash
curl "https://pay.dinaria.com/payments/f90c7c31-7a38-46dc-99ba-188a4c99da29" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Example response
```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "merchantId": "acme_merch1",
  "externalId": "ORD-1001",
  "status": "confirmed",
  "amount": "100.50",
  "currency": "ARS",
  "createdAt": "2026-03-11T22:57:40Z",
  "paymentData": {
    "type": "transfer_to_cbu",
    "cbu": "4310009922100000122004",
    "reference": "9032000000000000023"
  }
}
```

---

## List payments

```
GET /payments
```

Returns a paginated list of pay-in orders for your merchant, newest first.

### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter by status: `started`, `confirmed`, `cancelled`, `expired` |
| `currency` | string | Filter by currency: `BRL`, `ARS` |
| `limit` | integer | Results per page. Min 1, max 200, default 50 |
| `startingAfter` | string | Cursor — `transactionId` of the last item on the previous page |
| `merchantId` | string | Account/operator keys only — narrow to a specific merchant |

### Pagination

The response includes `hasMore: true` when more records exist. To fetch the next page, pass the `transactionId` of the last item as `startingAfter`:

```bash
# Page 1
curl "https://pay.dinaria.com/payments?limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Page 2 — pass last transactionId from page 1
curl "https://pay.dinaria.com/payments?limit=50&startingAfter=f90c7c31-7a38-46dc-99ba-188a4c99da29" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Access scoping

| Key type | Scope |
|---|---|
| Merchant-scoped | Returns only that merchant's payments. `merchantId` param is ignored. |
| Account-scoped | Returns payments for all merchants under the account. Use `?merchantId=` to narrow. |
| Operator | Returns all payments. Use `?merchantId=` to filter. |

### Example response

```json
{
  "object": "list",
  "hasMore": true,
  "data": [
    {
      "transactionId": "a3f7c821-4b2e-4c1a-9d3f-7e8b9c0d1e2f",
      "merchantId": "acme_merch1",
      "amount": "150.00",
      "currency": "BRL",
      "status": "confirmed",
      "createdAt": "2026-03-11T22:57:40Z",
      "paymentData": {
        "type": "pix_transfer",
        "pixKey": "bc8ba248-fb33-4022-bea1-c9fab2efd341",
        "pixKeyType": "random",
        "reference": "a3f7c821-4b2e-4c1a-9d3f-7e8b9c0d1e2f"
      }
    }
  ]
}
```

---

## Best practices
- Prefer **webhooks** for real-time status updates — only use polling as a fallback.
- For polling a single payment, use `GET /payments/{transactionId}`.
- For reconciliation or exporting history, use `GET /payments` with `?status=confirmed` and paginate through all pages.
