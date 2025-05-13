let objc = JSON.parse($response.body);

objc = {
  "request_date": "2023-09-26T12:00:00Z", 
  "request_date_ms": 1837536263000,
  "subscriber": {
    "entitlements": {
      "premium": {
        "expires_date": "2099-12-31T23:59:59Z",
        "grace_period_expires_date": null,
        "product_identifier": "com.neybox.pillow.premium.month",
        "purchase_date": "2022-01-01T00:00:00Z"
      }
    },
    "first_seen": "2023-09-26T12:00:00Z",
    "last_seen": "2023-09-26T12:00:00Z",
    "original_app_user_id": "user123",
    "original_application_version": "1.0",
    "original_purchase_date": "2022-01-01T00:00:00Z",
    "subscriptions": {
      "com.neybox.pillow.premium.month": {
        "billing_issues_detected_at": null,
        "expires_date": "2099-12-31T23:59:59Z",
        "grace_period_expires_date": null,
        "is_sandbox": false,
        "original_purchase_date": "2022-01-01T00:00:00Z",
        "ownership_type": "PURCHASED",
        "period_type": "active",
        "purchase_date": "2022-01-01T00:00:00Z",
        "store": "app_store",
        "unsubscribe_detected_at": null
      }
    }
  }
};

// 输出修改后的响应
$done({ body: JSON.stringify(objc) });
