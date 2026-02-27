# Accounts & Balance

Your **Dinaria BRL account** holds the prefunded balance used to fund PIX payouts. Before sending a payout, the requested amount is checked and reserved against this balance.

---

## List accounts

`GET /accounts`

Returns all prefunded accounts available to your merchant API key.

```http
GET /accounts
Authorization: Bearer sk_live_<your-merchant-key>
```

### Response

```json
{
  "data": [
    {
      "accountId": "acc_brl_001",
      "type": "prefunded",
      "currency": "BRL",
      "isDefault": true,
      "status": "active",
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

### Account fields

| Field | Description |
|-------|-------------|
| `accountId` | Unique account identifier. Use this as `sourceAccountId` in payouts. |
| `type` | Always `prefunded` — funds must be deposited before payouts can be made. |
| `currency` | `BRL` for your Brazil account. |
| `isDefault` | Whether this is the default account for this currency. |
| `status` | `active` or `inactive`. |

---

## Retrieve account balance

`GET /accounts/{accountId}/balance`

```http
GET /accounts/acc_brl_001/balance
Authorization: Bearer sk_live_<your-merchant-key>
```

### Response

```json
{
  "accountId": "acc_brl_001",
  "currency": "BRL",
  "available": "48000.00",
  "pending": "1500.00",
  "reserved": "0.00",
  "updatedAt": "2026-02-25T12:00:00Z"
}
```

### Balance fields

| Field | Description |
|-------|-------------|
| `available` | Funds you can use for new PIX payouts right now. |
| `pending` | Funds tied to payouts in `pending` or `processing` status. |
| `reserved` | Funds reserved for other purposes. |
| `updatedAt` | When the balance was last recalculated. |

---

## Balance behavior with payouts

When you create a payout:

1. The BRL amount is deducted from `available` immediately.
2. It moves to `pending` while the PIX transfer is in progress.
3. On **completion** the amount leaves your account permanently.
4. On **permanent failure** (after all retries) the amount is returned to `available`.

PIX transfers typically complete within seconds, so `pending` balance clears quickly.

---

## Topping up

To add BRL funds to your account, contact [support@dinaria.com](mailto:support@dinaria.com) or use the Dinaria merchant admin panel to initiate a deposit via PIX to the platform's receiving key.
