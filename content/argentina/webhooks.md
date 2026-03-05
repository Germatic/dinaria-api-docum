---
title: Webhooks
nav_order: 8
---

# Webhooks

Webhooks allow your system to receive asynchronous notifications when a payment
changes status.

They are the primary and most reliable way to track payment outcomes, including
confirmations, cancellations, and expirations.

Because webhook delivery is asynchronous and at-least-once, your integration
must verify signatures and handle events idempotently.

## Event types

Dinaria uses a single webhook envelope with a `type` field. Your handler should route behavior based on `type` and deduplicate by `eventId`.

See: [Webhook Event Types](35_webhook_event_types.md)
