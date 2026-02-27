# Webhooks

Webhooks allow your system to receive asynchronous notifications when a payment
changes status.

They are the primary and most reliable way to track payment outcomes, including
confirmations, cancellations, and expirations.

Because webhook delivery is asynchronous and at-least-once, your integration
must verify signatures and handle events idempotently.
