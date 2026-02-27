# Payout Overview

A **payout** is a money-out operation: you send funds from your Dinaria merchant balance to an external PIX key or bank account in Brazil.

Typical use cases:
- Pay out a seller or vendor on your platform
- Disburse commissions, winnings, or cashback to end users
- Settle funds to a business partner's account via PIX

---

## How it works

```
POST /payouts
      │
      ▼
[pending]  ← Payout created, balance reserved
      │
      ▼  (background processor)
[processing] ← Submitted to PIX rail
      │
      ├─ success ──► [completed]
      │
      └─ failure ──► retry (up to 3×) ──► [failed] + balance returned
```

1. You call `POST /payouts` with the destination PIX key, amount in BRL, and `rail: PIX`.
2. Dinaria immediately deducts the amount from your merchant balance and creates the payout in **pending** status.
3. The background processor submits the transfer to the PIX network.
4. On success the payout moves to **completed**. On permanent failure the reserved amount is returned to your balance.

---

## Payout statuses

| Status | Meaning |
|--------|---------|
| `pending` | Created and balance reserved. Awaiting processor. |
| `processing` | Submitted to PIX network. |
| `completed` | PIX transfer confirmed. |
| `failed` | All retry attempts exhausted. Balance returned. |

---

## PIX key types

Brazil's PIX rail supports four types of destination keys:

| Type | Format | Example |
|------|--------|---------|
| CPF | 11 digits | `12345678901` |
| CNPJ | 14 digits | `12345678000195` |
| Phone | `+55` + DDD + number | `+5511987654321` |
| Email | Standard email | `joao@example.com` |
| Random key (Chave Aleatória) | UUID format | `123e4567-e89b-12d3-a456-426614174000` |

---

## One-off vs. recurring payouts

| Approach | When to use |
|----------|-------------|
| **Inline destination** | One-off PIX payouts — provide the key directly in the request. |
| **Saved customer** | Recurring payouts to the same person. Create a Customer + Bank Account once. |

See [Create a Payout](create-a-payout) and [Customers](customers) for details.

---

## Authentication

Payouts require a **merchant-scoped API key**:

```
Authorization: Bearer sk_live_<your-merchant-key>
```

---

## Currency & balance

- Currency: **BRL**
- The payout amount is atomically deducted from your merchant balance at creation time.
- If your balance is insufficient the API returns `402 Payment Required` with code `insufficient_balance`.
- On permanent failure the amount is automatically returned to your balance.
