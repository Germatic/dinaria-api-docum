---
title: Webhook Event Types
nav_order: 20
parent: Webhooks
---

# Webhook Event Types

Dinaria sends webhook events using a single envelope with a `type` field. Your handler should route logic based on `type` and deduplicate by `eventId`.

## Payment events

- `payment.created`
- `payment.status_changed`

## Payout events

- `payout.created`
- `payout.status_changed`
- `payout.succeeded`
- `payout.failed`

## Cash withdrawal events

- `cash.withdrawal.created`
- `cash.withdrawal.status_changed`
- `cash.withdrawal.picked_up`
- `cash.withdrawal.failed`
