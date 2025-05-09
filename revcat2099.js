// Pillow Enhanced Subscription Unlock Script

// 读取原始响应数据
var objc = JSON.parse($response.body);

// 确保原始数据结构存在
if (objc.subscriber && objc.subscriber.subscriptions) {
    // 遍历所有订阅项目
    for (var subscription in objc.subscriber.subscriptions) {
        if (objc.subscriber.subscriptions.hasOwnProperty(subscription)) {
            // 修改到期日期和购买日期
            objc.subscriber.subscriptions[subscription].expires_date = '2099-12-31T23:59:59Z';
            objc.subscriber.subscriptions[subscription].purchase_date = '2025-01-01T00:00:00Z';
        }
    }

    // 确保权限信息也被同步修改
    if (objc.subscriber.entitlements) {
        for (var entitlement in objc.subscriber.entitlements) {
            if (objc.subscriber.entitlements.hasOwnProperty(entitlement)) {
                objc.subscriber.entitlements[entitlement].expires_date = '2099-12-31T23:59:59Z';
                objc.subscriber.entitlements[entitlement].purchase_date = '2025-01-01T00:00:00Z';
            }
        }
    }
}

// 返回修改后的数据
$done({body: JSON.stringify(objc)});
