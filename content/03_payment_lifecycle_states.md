---
title: Payment Lifecycle States
nav_order: 5
parent: Guides
---

# Payment lifecycle & states

Payments move through the following states:

## started
Payment created successfully. Awaiting customer action.

## confirmed
Payment completed successfully. Funds received.

## cancelled
Payment was cancelled or failed.

## expired
Payment expired before the customer completed it.

## Typical transitions

```text
started → confirmed
        → cancelled
        → expired
```

## Recommended handling

| Status      | Recommended action |
|-------------|--------------------|
| `started`   | For ARS: redirect customer to `actionUrl`. For BRL: display PIX key from `paymentData`. |
| `confirmed` | Fulfill the order — this is a terminal state. |
| `cancelled` | Allow retry (create a new payment). |
| `expired`   | Create a new payment. |

## Golden rule
Redirects are not confirmation. Always confirm final status using webhooks or `GET /payments/{transactionId}`.
