---
title: Cash Withdrawals
nav_order: 2
parent: Money Out
---

# Cash Withdrawals (Cash Payouts)

Cash withdrawals are treated as a **payout rail** that delivers funds through an agent network.

## Flow

1) List agents

`GET /cash/agents` returns available agent networks and their requirements.

2) Create a cash withdrawal

`POST /cash/withdrawals` creates a cash payout.

3) Monitor status

Use webhooks like `cash.withdrawal.created` and `cash.withdrawal.picked_up`.

## Agent requirements

Different agent networks may require different data (for example, identity document fields).

Always check agent requirements first:

- `beneficiaryIdentityRequired`
- `acceptedDocumentTypes`
- `beneficiaryPhoneRequired`

Then include required fields in the beneficiary object.

See: [Participants](31_participants.md)
