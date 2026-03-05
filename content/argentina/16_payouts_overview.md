
# Payouts Overview

Payouts move funds from your Dinaria operating account to a recipient.

## Beneficiary

A **Beneficiary** represents the destination of a payout.

It is not tied to a specific rail.

Beneficiaries are used for:

- Bank payouts
- Cash withdrawals
- Wallet payouts (future)

Cash is simply one of the payout rails.

A payout always requires a destination → the beneficiary.

## Rails

The payout rail defines how the funds are delivered:

- Bank
- Cash
- Wallet (future)

Example:

Bank payout → beneficiary receives funds in a bank account  
Cash payout → beneficiary receives funds at an agent location


## Proxy-key rails (e.g., PIX)

Some payout rails route using a **proxy key** rather than full bank coordinates.

Examples include:
- **PIX** (Brazil) using a PIX key (email/phone/CPF/CNPJ/EVP)
- other instant schemes that use aliases or keys

In these cases, use a `destination` of type `proxy_key` and provide:
- `scheme` (e.g., `PIX`)
- `keyType`
- `key`


## Saved Beneficiaries

You may either:

- Send payouts inline (quick setup)
- Or create reusable beneficiaries and attach destinations

Example flow:

1) Create beneficiary
2) Add bank or proxy-key destination
3) Send payout using beneficiaryId

This is recommended for recurring payouts.


## Saved beneficiaries and destinations

For recurring payouts, you can store a beneficiary and attach reusable destinations:

- **Bank accounts**: `POST /beneficiaries/{beneficiaryId}/bank-accounts`
- **Proxy keys** (e.g., PIX key): `POST /beneficiaries/{beneficiaryId}/proxy-keys`

Then, when creating a payout, reference:

- `beneficiaryId` plus `bankAccountId`, or
- `beneficiaryId` plus `proxyKeyId`

You can also send everything inline using `beneficiary` + `destination` for one-off payouts.



---

## Destinations (Where the money goes)

A payout always has:

- **Beneficiary**: who receives the money
- **Destination**: how/where the beneficiary receives it (the rail)

Dinaria supports two destination styles:

### 1) Inline destination (one-off)
You send the destination directly in the payout request.

### 2) Saved destinations (recommended for recurring payouts)
You create a beneficiary and attach one or more destinations, then reference them by ID.

### Destination types

| destination.type | Use case | Notes |
|---|---|---|
| `bank` | Bank deposit | Provide bank account coordinates (varies by country) |
| `proxy_key` | Key/alias based rails (e.g., PIX) | Provide `scheme`, `keyType`, and `key` |
| `cash` | Cash pickup / withdrawal | Uses the cash endpoints (agents + withdrawal creation) |

### Example: proxy_key (PIX)
```json
{
  "destination": {
    "type": "proxy_key",
    "scheme": "PIX",
    "keyType": "EMAIL",
    "key": "joao@exemplo.com"
  }
}
```
