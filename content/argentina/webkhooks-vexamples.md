---
title: Verification Examples
nav_order: 14
parent: Webhooks
---

# Webhook verification examples

## Node.js

```js
import crypto from "crypto";

function verifyWebhook({ rawBody, headers, webhookSecret }) {
  const timestamp = headers["x-webhook-timestamp"];
  const signatureHeader = headers["x-webhook-signature"];

  const [, receivedSignature] = signatureHeader.split("v1=");
  const signedPayload = `${timestamp}.${rawBody}`;

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(signedPayload)
    .digest("hex");

  if (!crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  )) {
    throw new Error("Invalid signature");
  }
}
```

## Go

```go
import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"errors"
)

func verifyWebhook(rawBody []byte, timestamp string, signature string, secret string) error {
	signedPayload := timestamp + "." + string(rawBody)

	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(signedPayload))
	expected := mac.Sum(nil)

	received, err := hex.DecodeString(signature)
	if err != nil {
		return err
	}

	if !hmac.Equal(expected, received) {
		return errors.New("invalid signature")
	}

	return nil
}
```
