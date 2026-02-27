# Virtual Accounts

A **Virtual Account** is a customer-level ledger on the Dinaria platform. Every customer has a virtual balance that reflects all their cash-ins and cash-outs in BRL, regardless of which merchant they transact with.

---

## Model

```
Dinaria Platform
  └── Account
        └── Merchant  (has virtual balance, BRL)
                └── Customer  (has virtual balance, BRL)
                      ├── Payments received (PIX cash-ins)
                      └── Payouts sent (PIX cash-outs)
```

- A customer is **platform-wide** — they are not owned by any merchant.
- `merchant_id` lives on each **payment** and **payout** record, not on the customer.
- The `lastMerchantId` field on a customer is purely **indicatory** — the merchant from the most recent operation.
- **All real funds** are held in Dinaria's single Brazilian account. Customer and merchant balances are virtual ledger entries.

---

## Balance updates

| Event | Customer balance | Merchant balance |
|-------|-----------------|-----------------|
| Cash-in confirmed (PIX received) | ➕ Credited | ➕ Credited |
| Payout created | ➖ Reserved | ➖ Reserved |
| Payout completed | no further change | no further change |
| Payout failed (permanent) | ➕ Returned | ➕ Returned |

Both balances always move together.

---

## Auto-creation on first cash-in

When a PIX transfer arrives and the sender's CPF/CNPJ is not yet in the system:

1. Dinaria **auto-creates** the customer from the transfer data (name, CPF/CNPJ, PIX key).
2. Sets `lastMerchantId` to the merchant that received the payment.
3. Credits the customer's virtual balance immediately.

You can also create customers manually via `POST /customers` before any transaction.

---

## Receiving funds — reference code (Brazil)

All PIX deposits arrive at **Dinaria's single PIX key**. A reference code in the PIX message (mensagem) tells the platform which customer to credit.

**Flow:**
1. Call `GET /customers/{id}/deposit-details` to get the PIX key and reference.
2. Show the customer: *"Send BRL via PIX to pagamentos@dinaria.com and include REF-abc in the PIX message."*
3. Customer sends the PIX transfer.
4. Dinaria matches the reference and credits the customer's virtual account within seconds.

If no reference is present, the deposit is attributed to the merchant's default balance.

---

## Quick-start

```
1. POST /customers                              → Create customer (or auto-created on first PIX)
2. GET  /customers/{id}/deposit-details         → Get PIX key + reference to show the customer
3. [customer sends PIX with reference in mensagem]
4. GET  /customers/{id}/balance                 → Confirm balance credited
5. GET  /customers/{id}/payments                → See the cash-in record
6. POST /payouts                                → Send money out via PIX to customer
7. GET  /customers/{id}/payouts                 → Track payout status
```
