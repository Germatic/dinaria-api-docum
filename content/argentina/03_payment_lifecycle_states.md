---
title: Payment Lifecycle States
nav_order: 5
parent: Guides
---

# Payment lifecycle & states

Payments move through the following states:

## started
Payment created successfully.

## inprogress
Customer is completing the payment.

## confirmed
Payment completed successfully.

## cancelled
Payment was cancelled or failed.

## expired
Payment expired before completion.

## Typical transitions

```text
started -> inprogress -> confirmed
                      -> cancelled
                      -> expired
```

## Recommended handling

| Status       | Recommended action |
|--------------|--------------------|
| started      | Redirect customer to `actionUrl` |
| inprogress   | Wait / listen to webhooks |
| confirmed    | Fulfill order |
| cancelled    | Allow retry (create a new payment) |
| expired      | Create a new payment |

## Golden rule
Redirects are not confirmation. Always confirm final status using webhooks or retrieve payment.
