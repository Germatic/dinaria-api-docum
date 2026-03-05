---
title: Money Movement Model
nav_order: 2
parent: Concepts
---

# Money Movement Model

Dinaria is designed to be easy to integrate while supporting multiple rails and advanced flows.

At a high level:

```text
Payment (money-in) → Account balance → Payout (money-out)
```

## Money-in (Payments)

Payments represent funds coming into Dinaria. Depending on the payment method, the payer may need to complete additional steps.

Dinaria supports two integration modes:

- **Hosted mode (default):** redirect the payer to `actionUrl`.
- **Advanced mode:** use `nextAction` details to render your own UI.

## Funds live in Accounts

Funds are credited into an **operating account**. Your balance is split into `available`, `pending`, and `reserved`.

See: [Accounts & Balance](20_accounts.md)

## Money-out (Payouts)

Payouts debit funds from an operating account and deliver them to a beneficiary via a selected rail.

See: [Payouts Overview](16_payouts_overview.md)

## FX

If the source and destination currencies differ, FX is required. You can lock a rate with a quote or let Dinaria quote automatically.

See: [FX Handling](32_fx.md)

## Cash withdrawals

Cash payouts use agent networks and often require beneficiary identity data.

See: [Cash Withdrawals](34_cash_withdrawals.md)
