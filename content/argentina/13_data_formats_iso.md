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

## Data formats (ISO standards)

### Country
ISO 3166-1 alpha-2 (e.g. `AR`, `UY`, `MX`).

### State / region
Recommended: ISO 3166-2 (e.g. `AR-B`, `AR-C`). If the merchant does not know the ISO code, send a commonly used region name.

### City
Free-text string (no universally practical standard for city codes).

### Currency
ISO 4217 (e.g. `ARS`, `USD`).
