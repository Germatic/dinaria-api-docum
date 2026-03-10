---
title: Data Formats
nav_order: 7
---

# Data formats — Argentina

## Currency

**ARS** — Argentine Peso (ISO 4217)

## Document numbers

| Type      | Format                    | Example          |
|-----------|---------------------------|------------------|
| DNI       | 7–8 digits                | `12345678`       |
| CUIT/CUIL | 11 digits (XX-XXXXXXXX-X) | `20-12345678-9`  |

No spaces; use hyphens for CUIT/CUIL as shown.

## Bank account identifiers

| Type | Format    | Description                                  |
|------|-----------|----------------------------------------------|
| CBU  | 22 digits | Issued by banks (Clave Bancaria Uniforme)     |
| CVU  | 22 digits | Issued by virtual wallets (e.g. Mercado Pago) |

Digits only; no spaces or dashes.

## Payment destination

When creating a payout, provide either a CBU or CVU:

```json
{
  "destination": {
    "cbu": "0000003100012345678901"
  }
}
```

## Amounts

Decimal string, e.g. `"100.50"`. Two decimal places for ARS.

---

# Data formats — Brazil

## Currency

**BRL** — Brazilian Real (ISO 4217)

## Document numbers

| Type  | Format                      | Example              |
|-------|-----------------------------|----------------------|
| CPF   | 11 digits (XXX.XXX.XXX-XX)  | `123.456.789-09`     |
| CNPJ  | 14 digits (XX.XXX.XXX/XXXX-XX) | `58.084.921/0001-60` |

Digits only when sending via API; formatting punctuation is accepted but stripped internally.

## Payment keys (PIX)

PIX keys are used to receive payments. Supported key types:

| Type        | Example                                |
|-------------|----------------------------------------|
| CPF         | `12345678909`                          |
| CNPJ        | `58084921000160`                       |
| Phone       | `+5511999999999`                       |
| Email       | `payer@example.com`                    |
| Random key  | `bc8ba248-fb33-4022-bea1-c9fab2efd341` |

## Payment method

BRL payments use PIX via a static deposit key. The API response includes a `paymentData` object with the PIX key to send funds to and the `transactionId` as the payment reference.

```json
{
  "transactionId": "f90c7c31-7a38-46dc-99ba-188a4c99da29",
  "status": "started",
  "amount": "100.00",
  "currency": "BRL",
  "paymentData": {
    "type": "pix_transfer",
    "pixKey": "bc8ba248-fb33-4022-bea1-c9fab2efd341",
    "pixKeyType": "random",
    "reference": "f90c7c31-7a38-46dc-99ba-188a4c99da29"
  }
}
```

The payer opens their bank app, selects PIX, enters the key, and sends exactly the requested amount. Payment confirmation arrives via webhook once the transfer is matched.

## Amounts

Decimal string, e.g. `"100.50"`. Two decimal places for BRL.

---

# Data formats (ISO standards)

### Country
ISO 3166-1 alpha-2 (e.g. `AR`, `UY`, `MX`).

### State / region
Recommended: ISO 3166-2 (e.g. `AR-B`, `AR-C`). If the merchant does not know the ISO code, send a commonly used region name.

### City
Free-text string (no universally practical standard for city codes).

### Currency
ISO 4217 (e.g. `ARS`, `USD`).
