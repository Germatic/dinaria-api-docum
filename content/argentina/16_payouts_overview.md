# Payout Overview

A **payout** is a money-out operation: you send funds from your Dinaria merchant balance to an external bank account via the CBU/CVU rail.

Typical use cases:
- Pay out a seller or vendor on your platform
- Disburse winnings, commissions, or refunds to end users
- Settle funds to a business partner's bank account

---

## How it works

```
POST /payouts
      │
      ▼
[pending]  ← Payout created, balance reserved
      │
      ▼  (background processor runs every ~15 s)
[processing] ← Submitted to CBU transfer rail
      │
      ├─ success ──► [completed]
      │
      └─ failure ──► retry (up to 3×) ──► [failed] + balance returned
```

1. You call `POST /payouts` with the destination CBU, amount, and currency.
2. Dinaria immediately deducts the amount from your merchant balance and creates the payout in **pending** status.
3. The background processor picks up pending payouts and submits them to the CBU transfer network.
4. On success the payout moves to **completed**. On permanent failure the reserved amount is returned to your balance.

---

## Payout statuses

| Status | Meaning |
|--------|---------|
| `pending` | Created and balance reserved. Awaiting processor. |
| `processing` | Submitted to CBU transfer rail. |
| `completed` | Transfer accepted. Funds are on their way. |
| `failed` | All retry attempts exhausted. Balance returned. |

---

## One-off vs. recurring payouts

| Approach | When to use |
|----------|-------------|
| **Inline destination** | One-off payouts where you provide the CBU directly in the request. |
| **Saved customer** | Recurring payouts to the same person. Create a Customer + Bank Account once, then reference by ID. |

See [Create a Payout](create-a-payout) and [Customers](customers) for details.

---

## Authentication

Payouts require a **merchant-scoped API key** — a generic platform key will be rejected with `403 forbidden`.

```
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## Currency & balance

- Default currency: **ARS**
- The payout amount is atomically deducted from `merchants.balance` at creation time.
- If your balance is insufficient the API returns `402 Payment Required` with code `insufficient_balance`.
- On permanent failure the amount is automatically returned to your balance.
