# Accounts & Balance

Your **Dinaria account** holds the prefunded balance used to fund payouts. Before sending a payout, the requested amount is checked and reserved against this balance.

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
      "accountId": "acc_ars_001",
      "type": "prefunded",
      "currency": "ARS",
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
| `currency` | Currency held in this account (e.g. `ARS`). |
| `isDefault` | Whether this is the default account for the currency. |
| `status` | `active` or `inactive`. |

---

## Retrieve account balance

`GET /accounts/{accountId}/balance`

Returns the detailed balance breakdown for an account.

```http
GET /accounts/acc_ars_001/balance
Authorization: Bearer sk_live_<your-merchant-key>
```

### Response

```json
{
  "accountId": "acc_ars_001",
  "currency": "ARS",
  "available": "125000.00",
  "pending": "3500.00",
  "reserved": "8000.00",
  "updatedAt": "2026-02-25T12:00:00Z"
}
```

### Balance fields

| Field | Description |
|-------|-------------|
| `available` | Funds you can use for new payouts right now. |
| `pending` | Funds tied to payouts in `pending` or `processing` status. |
| `reserved` | Funds reserved for other purposes (e.g. holds). |
| `updatedAt` | When the balance was last recalculated. |

---

## Balance behavior with payouts

When you create a payout:

1. The requested amount is deducted from `available` immediately.
2. It moves to `pending` while the transfer is in progress.
3. On **completion** the amount leaves your account permanently.
4. On **permanent failure** (after all retries) the amount is returned to `available`.

This ensures your balance always reflects the real state of your funds.

---

## Topping up

To add funds to your account, contact [support@dinaria.com](mailto:support@dinaria.com) or use the Dinaria merchant admin panel to initiate a deposit via CBU transfer to the platform's deposit account.
