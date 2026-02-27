# Retrieve a payment — Brazil

`GET /payments/{transactionId}`

Returns the full payment object including status, amount, and metadata.

Use this to:

- Reconcile payments if webhooks are delayed
- Check status after a customer redirect
- Support audits and operations

Do not poll aggressively. Webhooks are the recommended way to track final status.
