---
title: Payout Flow
nav_order: 1
parent: Money Out
---

# Payout Flow

A payout represents money leaving Dinaria.

High-level flow:

1. Choose a **source account** (or rely on default)
2. Provide a **beneficiary** (saved or inline)
3. Handle **FX** (if needed)
4. Create the payout and monitor status via webhooks

## Source account

- Use `sourceAccountId` to choose which operating account to debit.
- If omitted, Dinaria uses your **default operating account** for the relevant currency.

## Beneficiary

Provide either:

- `beneficiaryId` (saved), or
- `beneficiary` (inline)

## Customer (originator)

For payouts you may provide either:

- `customerId`, or
- `customer` inline

This is useful when your payout requires originator information for compliance, receipts, or settlement.

## FX

See: [FX Handling](32_fx.md)

## Monitoring

Payouts emit webhooks such as:

- `payout.created`
- `payout.succeeded`
- `payout.failed`

See: [Webhook Event Types](35_webhook_event_types.md)


### Example: PIX payout (proxy_key)

```json
{
  "amount": "250.00",
  "currency": "BRL",
  "beneficiary": { "firstName": "João", "lastName": "Silva" },
  "destination": {
    "type": "proxy_key",
    "scheme": "PIX",
    "keyType": "EMAIL",
    "key": "joao@exemplo.com"
  }
}
```


### Example: Saved beneficiary + bank account

1) Create beneficiary → get `beneficiaryId`  
2) Add bank account → get `bankAccountId`  
3) Create payout:

```json
{
  "amount": "250.00",
  "currency": "USD",
  "beneficiaryId": "bnf_12345",
  "bankAccountId": "ba_67890"
}
```

### Example: Saved beneficiary + PIX key (proxy key)

1) Create beneficiary → get `beneficiaryId`  
2) Add proxy key → get `proxyKeyId`  
3) Create payout:

```json
{
  "amount": "250.00",
  "currency": "BRL",
  "beneficiaryId": "bnf_12345",
  "proxyKeyId": "pk_12345"
}
```

