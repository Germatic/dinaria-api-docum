---
title: Accounts & Balance
nav_order: 1
parent: Concepts
---

# Accounts & Balance

Dinaria uses **Accounts** to represent where your funds live on the platform.

Most merchants use **Operating Accounts**:

- Payments (money-in) are credited to an operating account
- Payouts (money-out) are debited from an operating account

> **Default behavior**
>
> - If you omit `destinationAccountId` when creating a payment, Dinaria credits your **default operating account** for that currency.
> - If you omit `sourceAccountId` when creating a payout, Dinaria debits your **default operating account**.

---

## Account types

| accountType | When you would use it |
|---|---|
| `operating` | **Default.** Daily money-in and money-out. You can have multiple operating accounts (e.g., Payroll vs Marketplace). |
| `reserve` | Funds held by risk/compliance rules. Typically not used for payouts directly. |
| `fees` | (Optional) Separate bucket for fees/revenue reconciliation. |
| `settlement` | (Optional) Funds in transit to/from external settlement rails. |
| `onchain` | (Optional) Funds represented on blockchain (stablecoins). |

For now, merchants can create **only** `operating` accounts via API.

---

## List accounts

`GET /accounts`

Returns all accounts available to your merchant API key.

```http
GET /accounts
Authorization: Bearer <token>
```

### Response

```json
{
  "data": [
    {
      "accountId": "acc_usd_main",
      "accountType": "operating",
      "currency": "USD",
      "isDefault": true,
      "status": "active",
      "name": "Main USD"
    }
  ]
}
```

---

## Create an operating account

`POST /accounts`

Merchants may create additional **operating** accounts (for example, `Payroll USD`), while other account types are reserved for platform/internal use.

```http
POST /accounts
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "currency": "USD",
  "accountType": "operating",
  "name": "Payroll USD",
  "externalId": "acct-payroll-001",
  "isDefault": false
}
```

### Notes

- Only **one** account can be `isDefault=true` per currency.
- If you create an account with `isDefault=true`, Dinaria will automatically unset the previous default account for that currency.

---

## Retrieve account balance

`GET /accounts/{accountId}/balance`

Balances are split into:

| Field | Meaning |
|---|---|
| `available` | Funds you can use now (e.g., to create payouts). |
| `pending` | Incoming funds not fully settled/confirmed yet. |
| `reserved` | Funds committed to operations in progress (e.g., payouts created but not completed). |

```http
GET /accounts/acc_usd_main/balance
Authorization: Bearer <token>
```

```json
{
  "accountId": "acc_usd_main",
  "currency": "USD",
  "available": "50000.00",
  "pending": "1200.00",
  "reserved": "3000.00",
  "updatedAt": "2026-03-01T12:00:00Z"
}
```
