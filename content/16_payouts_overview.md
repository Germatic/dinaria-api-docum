---
title: Payouts Overview
nav_order: 1
parent: Money Out
---

# Payouts Overview

A payout sends money from your Dinaria merchant balance to a recipient via the local payment rail.

---

## How payouts work

1. You call `POST /payouts` with the amount, currency, and destination.
2. The merchant's balance is **reserved immediately** — the funds are not available until the payout is completed or cancelled.
3. A background processor submits the transfer to the payment network asynchronously.
4. The payout moves through the following states:

```
pending → processing → completed
                     → failed
pending → cancelled  (if you cancel before processing starts)
```

---

## Destination

Every payout requires a `destination` object that identifies the recipient and how to reach them.

```json
{
  "destination": {
    "identifierType": "pix_key_cpf",
    "identifierValue": "12345678901",
    "name": "João Silva"
  }
}
```

The `identifierType` tells the platform which rail and key type to use.

---

## Argentina (ARS) — CBU/CVU bank transfer

Funds are sent via the COELSA clearing network to the recipient's CBU or CVU.

| `identifierType` | `identifierValue` | Notes |
|---|---|---|
| `cbu` | 22-digit CBU or CVU number | e.g. `0070327530004025541644` |
| `alias_cbu` | CBU alias | e.g. `mialiascbu` — auto-resolved to real CBU + CUIT before sending |

- `taxId` (CUIT) is **optional** — if omitted, the platform resolves it from the CBU automatically automatically.
- `name` is **optional** — auto-resolved from CBU if omitted.
- Processing is **synchronous**: the platform confirms the transfer with the banking network. Status goes directly from `pending` to `completed`.

### Example (ARS)

```json
{
  "amount": "1500.00",
  "currency": "ARS",
  "destination": {
    "identifierType": "cbu",
    "identifierValue": "0070327530004025541644",
    "name": "Ana Martínez"
  }
}
```

---

## Brazil (BRL) — PIX instant transfer

Funds are sent via PIX to the recipient's registered PIX key.

| `identifierType` | `identifierValue` | `taxId` required? |
|---|---|---|
| `pix_key_cpf` | CPF (11 digits), e.g. `12345678901` | No — inferred from `identifierValue` |
| `pix_key_cnpj` | CNPJ (14 digits), e.g. `58084921000160` | No — inferred from `identifierValue` |
| `pix_key_email` | Email address registered as PIX key | **Yes** |
| `pix_key_phone` | Phone number registered as PIX key | **Yes** |
| `pix_key_random` | Random UUID PIX key (EVP) | **Yes** |

**Important:** the `identifierValue` must be the recipient's **registered PIX key** — not just their tax ID. A CNPJ is only usable as a PIX key if the recipient has explicitly registered it as one in their bank.

- Processing is **asynchronous**: the payout moves to `processing` after submission, then to `completed` once the payment network confirms.
- The platform polls the payment network every ~10 seconds to detect completion automatically.

### Example (BRL)

```json
{
  "amount": "150.00",
  "currency": "BRL",
  "destination": {
    "identifierType": "pix_key_cpf",
    "identifierValue": "12345678901",
    "name": "João Silva"
  }
}
```

---

## Payout states

| Status | Meaning |
|--------|---------|
| `pending` | Queued. Balance reserved. Not yet submitted to the payment network. |
| `processing` | Submitted to the payment network (BRL/PIX only). Awaiting final confirmation. |
| `completed` | Transfer confirmed by the payment network. Terminal. |
| `failed` | Permanently rejected after max retry attempts. Balance restored. Terminal. |
| `cancelled` | Cancelled by you before the processor picked it up. Balance restored. Terminal. |

---

## Merchant balance

The merchant's `balance` is a virtual ledger of funds Dinaria holds on your behalf.

| Event | Balance change |
|-------|---------------|
| Payment confirmed (customer pays in) | `+ payment.amount` |
| `POST /payouts` accepted | `- payout.amount` (reserved immediately) |
| Payout permanently failed (3 attempts) | `+ payout.amount` (restored) |
| Payout cancelled | `+ payout.amount` (restored) |
| Payout completed | no change (already deducted at creation) |

A payout request returns `402 insufficient_balance` if your balance is below the payout amount at creation time.

---

## See also

- [Create a Payout](17_payouts_create.md)
- [Retrieve & List Payouts](18_payouts_retrieve.md)
