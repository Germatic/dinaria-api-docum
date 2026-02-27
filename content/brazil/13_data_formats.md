# Data formats — Brazil

## Currency

**BRL** — Brazilian Real (ISO 4217)

## Document numbers

| Type | Format    | Example          |
|------|-----------|------------------|
| CPF  | 11 digits | `12345678901`    |
| CNPJ | 14 digits | `12345678000199` |

No dots or dashes; digits only.

## PIX keys

Recipients are identified by one of:

- **CPF** — 11 digits
- **CNPJ** — 14 digits
- **Email** — valid email format
- **Phone** — E.164 format (e.g. `+5511999999999`)
- **Random** — alphanumeric key assigned by the recipient

## Amounts

Decimal string, e.g. `"100.50"`. Two decimal places for BRL.

---

## Data formats (ISO standards)

### Country
ISO 3166-1 alpha-2 (e.g. `US`, `BR`, `UY`).

### State / region
Recommended: ISO 3166-2 (e.g. `BR-SP`, `BR-RJ`). If the merchant does not know the ISO code, send a commonly used region name.

### City
Free-text string (no universally practical standard for city codes).

### Currency
ISO 4217 (e.g. `BRL`, `USD`).
