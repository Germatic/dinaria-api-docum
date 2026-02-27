# Customer Payments

`GET /customers/{customerId}/payments`

Returns all payments (cash-ins) associated with a customer, ordered by most recent first.

---

## Request

```http
GET /customers/cust_12345/payments?status=confirmed&limit=20
Authorization: Bearer sk_live_<your-merchant-key>
```

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter: `started`, `confirmed`, `cancelled`, `expired` |
| `limit` | integer | Max results (1–200, default 50) |
| `startingAfter` | string | Cursor for pagination (payment `transactionId`) |

---

## Response

```json
[
  {
    "transactionId": "trx_abc123",
    "externalId": "ORD-1001",
    "status": "confirmed",
    "amount": "1500.00",
    "currency": "ARS",
    "creationDate": "2026-02-25T11:58:00Z",
    "confirmationDate": "2026-02-25T12:00:00Z",
    "paymentMethods": ["DINACBU"],
    "customer": {
      "fullName": "Gerardo Ratto",
      "documentNumber": "20221370075"
    }
  }
]
```

---

## Notes

- Only payments where `customer_id` matches the given customer are returned.
- A customer may have payments across multiple merchants — all are included.
- Use `status=confirmed` to see only successfully completed cash-ins.
- For balance impact, only `confirmed` payments credit the customer's virtual account.
