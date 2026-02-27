# Payments

Payments are the core resource of the Payment API.

A payment represents a transaction initiated by the merchant and completed by the customer through a redirect-based flow.

## Key fields
- `transactionId`: platform-generated payment identifier
- `externalId`: merchant-provided identifier (order/checkout reference)
- `metadata`: payment-level free-form key-value data
- `paymentMethods`: list of payment method **IDs** (strict whitelist)
