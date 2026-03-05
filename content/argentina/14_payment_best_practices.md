---
title: Payments Best Practices
nav_order: 16
parent: Guides
---
# Payments best practices

This guide describes recommended patterns for integrating with the Payments API in a production-safe way.


## 1) Create payments safely

### Always use idempotency on `POST /payments`
When creating a payment, you should send an `Idempotency-Key` header.

**Why:** if your request times out or you retry due to a transient network error, idempotency prevents creating duplicate payments.

**Recommendation**
- Generate a unique idempotency key per checkout attempt (UUID v4 is fine)
- If you need to retry, **reuse the same key** for the same logical attempt


### Always provide and store `externalId`
Set `externalId` to your internal reference (order/checkout/cart).

**Why:** it simplifies reconciliation, customer support, and debugging.
- You can map your internal order to our `transactionId`
- `externalId` is returned in **retrieve** and **webhooks**


### Attach useful `metadata` (but keep it stable)
Use `metadata` for small internal references and routing information:
- orderId
- cartId
- customerSegment
- channel (web / app)
- campaignId

**Why:** metadata is returned in `GET /payments/{transactionId}` and in webhook payloads.

**Do**
- Keep values short and stable
- Use strings only (key-value)

**Avoid**
- Putting sensitive data (PII, secrets)
- Large objects or changing metadata on every request


## 2) Redirect flow (do not assume success)

### Redirect is not confirmation
A redirect to `successUrl` **does not guarantee** that the payment is confirmed.

**Always confirm using:**
- Webhooks (**recommended**), or
- `GET /payments/{transactionId}` as a fallback (for delayed webhook delivery)

**Why:** redirects can be interrupted, repeated, or manipulated, and the payment may still fail or remain in progress.


## 3) Status handling

### Handle the lifecycle as a state machine
Treat the payment lifecycle as a state machine and build your code around it:

- `started` → payment created
- `inprogress` → customer is completing checkout
- `confirmed` → payment successfully completed (**terminal**)
- `cancelled` → payment cancelled/failed (**terminal**)
- `expired` → payment expired (**terminal**)

**Rule:** once a payment reaches a terminal state, it cannot be reused.

## 4) Webhooks are the source of truth

### Prefer webhooks over polling
Webhooks provide near real-time updates and reduce load vs polling.

**Best practice**
- Use webhooks to transition your internal order state
- Use `GET /payments/{transactionId}` only as a fallback:
  - if webhook delivery is delayed
  - for reconciliation / support workflows


### Assume at-least-once delivery
Webhook deliveries are **at-least-once**. The same event may be delivered more than once.

**Best practice**
- Make your webhook handler idempotent.
- A simple approach is to ensure you do not process the same transition twice (e.g., store the latest known status per `transactionId`).


## 5) Retries & error handling

### Retry only on transient failures
Safe retry conditions (typical):
- Network timeouts
- `429 Too Many Requests`
- `5xx` server errors

**Do not retry** (without fixing your request):
- `4xx` validation errors


### Log and keep `Request-Id`
Store the `Request-Id` response header when available.

**Why:** it makes troubleshooting with support faster.


## 6) Security

### Keep API keys server-side
Never expose secret API keys in:
- browser code
- mobile apps
- public repositories

Store them in a secret manager and rotate periodically.


## 7) Observability (recommended)
Monitor your integration with:
- Payment creation success rate
- Time from `POST /payments` → terminal state
- Webhook delivery latency
- Webhook signature verification failures
- Number of retries
