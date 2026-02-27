# Payment lifecycle states — Brazil

| Status     | Description                                      |
|------------|--------------------------------------------------|
| `started`  | Payment created; customer has not paid yet       |
| `confirmed`| PIX transfer received; payment complete          |
| `cancelled`| Customer cancelled or payment was rejected       |
| `expired`  | Payment window closed before completion          |

PIX payments typically move from `started` to `confirmed` within seconds of the customer completing the transfer.
