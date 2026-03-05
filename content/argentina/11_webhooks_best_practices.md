---
title: Webhooks Best Practices
nav_order: 16
parent: Webhooks
---

# Webhook best practices

## Security
- Always verify webhook signatures
- Store secrets in a secure secret manager
- Rotate webhook secrets periodically
- Use constant-time signature comparison

## Make webhook handling resilient
- Assume events may be duplicated (at-least-once delivery)
- Assume events may arrive out of order
- Do not block webhook responses with heavy processing

## Idempotency
To ensure idempotent processing, we recommend tracking processed events using a
unique event identifier or a derived event key (for example, transactionId +
event type + timestamp).

Do not assume that transactionId + status is unique, as payments may transition
through multiple states (refunds, reversals) over time.

## Response requirements
- Respond with HTTP 200 quickly
- Process asynchronously (queue/background job)

## Golden rule
Do not rely on redirects for confirmation. Confirm final state using webhooks or retrieve payment.
