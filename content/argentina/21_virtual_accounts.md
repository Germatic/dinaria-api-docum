# Virtual Accounts

A **Virtual Account** is a customer-level ledger on the Dinaria platform. Every customer has a virtual balance that reflects all their cash-ins and cash-outs, regardless of which merchant they transact with.

---

## Model

```
Dinaria Platform
  └── Account
        └── Merchant  (has virtual balance, ARS)
                └── Customer  (has virtual balance, ARS)
                      ├── Payments received (cash-ins)
                      └── Payouts sent (cash-outs)
```

- A customer is **platform-wide** — they are not owned by any merchant.
- `merchant_id` lives on each **payment** and **payout** record, not on the customer.
- The `lastMerchantId` field on a customer is purely **indicatory** — the merchant from the most recent operation.
- **All real funds** are held in Dinaria's single Argentine CBU. Customer and merchant balances are virtual ledger entries.

---

## Balance updates

| Event | Customer balance | Merchant balance |
|-------|-----------------|-----------------|
| Cash-in confirmed | ➕ Credited | ➕ Credited |
| Payout created | ➖ Reserved | ➖ Reserved |
| Payout completed | no further change | no further change |
| Payout failed (permanent) | ➕ Returned | ➕ Returned |

Both balances always move together.

---

## Auto-creation on first cash-in

When a CBU transfer arrives and the sender's CUIT is not yet in the system:

1. Dinaria **auto-creates** the customer from the transfer data (name, CUIT, CBU).
2. Sets `lastMerchantId` to the merchant that received the payment.
3. Credits the customer's virtual balance immediately.

You can also create customers manually via `POST /customers` before any transaction.

---

## Receiving funds — reference code (Argentina)

All Argentine deposits arrive at **Dinaria's single CBU**. A reference code embedded in the transfer description (concepto) tells the platform which customer to credit.

**Flow:**
1. Call `GET /customers/{id}/deposit-details` to get the CBU and reference.
2. Show the customer: *"Transfer ARS to CBU 4310… and include REF-abc in the description."*
3. Customer sends the bank transfer.
4. Dinaria matches the reference and credits the customer's virtual account.

If no reference is present, the deposit is attributed to the merchant's default balance.

---

## Quick-start

```
1. POST /customers                              → Create customer (or auto-created on first cash-in)
2. GET  /customers/{id}/deposit-details         → Get CBU + reference to show the customer
3. [customer sends CBU transfer with reference]
4. GET  /customers/{id}/balance                 → Confirm balance credited
5. GET  /customers/{id}/payments                → See the cash-in record
6. POST /payouts                                → Send money out to customer's CBU
7. GET  /customers/{id}/payouts                 → Track payout status
```
