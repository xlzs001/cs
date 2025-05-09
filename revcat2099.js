var response = JSON.parse($response.body);

response.subscriber = {
  "entitlements": {
    "premium": {
      "expires_date": "2099-12-31T23:59:59Z",
      "product_identifier": "com.neybox.pillow.premium.month",
      "purchase_date": "2025-01-01T00:00:00Z"
    }
  },
  "subscriptions": {
    "com.neybox.pillow.premium.month": {
      "expires_date": "2099-12-31T23:59:59Z",
      "purchase_date": "2025-01-01T00:00:00Z"
    }
  }
};

$done({body: JSON.stringify(response)});
