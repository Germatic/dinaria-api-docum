---
title: Payments Overview
nav_order: 6
parent: Guides
---

# Payments

Payments are the core resource of the Payment API.

A payment represents a transaction initiated by the merchant and completed by the customer through a redirect-based flow.

## Key fields
- `transactionId`: platform-generated payment identifier
- `externalId`: merchant-provided identifier (order/checkout reference)
- `metadata`: payment-level free-form key-value data
- `paymentMethods`: list of payment method **IDs** (strict whitelist)


## Where funds go

Payments are credited to an **operating account**.

- If you include `destinationAccountId`, Dinaria credits that account.
- If you omit `destinationAccountId`, Dinaria credits your **default operating account** for the payment currency.

See: [Accounts & Balance](20_accounts.md)

## Hosted vs Advanced UI (uiMode)

Dinaria supports two integration modes:

- **Hosted mode (default):** redirect the payer to `actionUrl`. Dinaria collects any missing required information and guides the payer to complete the payment.
- **Advanced mode:** set `uiMode=advanced`. If required customer information is missing, Dinaria rejects the request with `CUSTOMER_DATA_REQUIRED` and returns the missing fields so you can collect them in your UI.

### Response fields

- `actionUrl`: hosted URL that allows the payer to complete the payment (redirect/instructions/voucher).
- `nextAction`: action-specific payload for advanced UI integrations (voucher details, transfer instructions, or required customer fields).



## nextAction (Advanced UI)

`nextAction` is optional and is intended for advanced integrations that want to build their own UI instead of redirecting.
Hosted integrations can always use `actionUrl`.

### Types

| type | When you may see it | What to do (advanced UI) |
|---|---|---|
| `redirect_to_url` | Authorization/hosted redirect flows | Redirect to `details.url` |
| `display_qr` | Methods that provide a QR payload (e.g., PIX, UPI, PromptPay) | Render QR from `details.qr.payload` (or use `details.qr.imageUrl`) |
| `display_instructions` | Transfer instructions (CLABE/CVU/IBAN + reference) | Show `details.transfer` and `details.instructions` |
| `display_voucher` | Cash pay-in vouchers (barcode / QR / numeric) | Render voucher and show steps |
| `display_reference` | Reference-only methods | Show `details.reference` and instructions |
| `collect_customer_data` | Hosted flow needs more customer data | Collect the required fields, then retry or continue via hosted flow |
| `none` | No user action needed | Nothing |

### Example: QR-based completion

```json
{
  "nextAction": {
    "type": "display_qr",
    "details": {
      "qr": {
        "payload": "00020126...6304ABCD",
        "format": "EMVCO",
        "expiresAt": "2026-03-01T20:00:00Z"
      },
      "instructions": ["Open your bank app", "Scan the QR", "Confirm the payment"],
      "method": { "scheme": "PIX", "country": "BR" }
    }
  }
}
```

