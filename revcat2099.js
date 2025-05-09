var objc = JSON.parse($response.body);

objc = {
  "request_date": "2023-09-26T12:00:00Z",  // 请求时间
  "request_date_ms": 1837536263,  // 毫秒时间戳
  "subscriber": {
    "entitlements": {
      "premium": {
        "expires_date": "2099-12-31T23:59:59Z",  // 订阅到期时间设置为远期
        "grace_period_expires_date": null,
        "product_identifier": "com.neybox.pillow.premium.month",  // 产品ID（订阅类型）
        "purchase_date": "2022-01-01T00:00:00Z"  // 购买日期
      }
    },
    "first_seen": "2023-09-26T12:00:00Z",  // 首次见到时间
    "last_seen": "2023-09-26T12:00:00Z",  // 最后一次访问时间
    "original_app_user_id": "user123",  // 用户ID
    "original_application_version": "1.0",  // 应用版本
    "original_purchase_date": "2022-01-01T00:00:00Z",  // 原始购买日期
    "subscriptions": {
      "com.neybox.pillow.premium.month": {
        "billing_issues_detected_at": null,
        "expires_date": "2099-12-31T23:59:59Z",  // 设置长期有效订阅
        "grace_period_expires_date": null,
        "is_sandbox": false,
        "original_purchase_date": "2022-01-01T00:00:00Z",
        "ownership_type": "PURCHASED",
        "period_type": "active",  // 订阅状态设为 "active"
        "purchase_date": "2022-01-01T00:00:00Z",
        "store": "app_store",
        "unsubscribe_detected_at": null
      }
    }
  }
};

$done({ body: JSON.stringify(objc) });
