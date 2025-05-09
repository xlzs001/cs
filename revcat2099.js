// 确保响应体不为空
if ($response.body) {
    try {
        // 尝试解析响应体
        var obj = JSON.parse($response.body);

        // 设置模拟订阅信息
        obj = {
          "request_date": new Date().toISOString(),
          "request_date_ms": Date.now(),
          "subscriber": {
            "entitlements": {
              "premium": {
                "expires_date": "2099-12-31T23:59:59Z",
                "product_identifier": "com.neybox.pillow.premium.year",
                "purchase_date": "2023-01-01T00:00:00Z"
              }
            },
            "subscriptions": {
              "com.neybox.pillow.premium.year": {
                "expires_date": "2099-12-31T23:59:59Z",
                "purchase_date": "2023-01-01T00:00:00Z",
                "ownership_type": "PURCHASED",
                "store": "app_store"
              }
            }
          }
        };

        // 返回修改后的响应
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.error("JSON 解析失败: ", e);
        $done();
    }
} else {
    console.error("响应体为空");
    $done();
}
