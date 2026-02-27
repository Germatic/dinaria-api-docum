# Create a payment — Brazil

Create a payment to receive PIX transfers from your customer.

## Request

`POST /payments`

Required fields:

- `amount`, `currency` (BRL)
- `paymentMethods` (e.g. `["pm_pix"]`)
- `successUrl`, `cancelUrl`
- `customer` (documentNumber for CPF/CNPJ when required)

## Response

- `transactionId` — store for status checks
- `actionUrl` — redirect the customer here to complete payment
- `status` — `started` initially

## PIX flow

1. Customer is redirected to `actionUrl`
2. They see PIX QR code or copy-paste instructions
3. They complete the transfer in their bank app
4. Webhook delivers `status: "confirmed"`
