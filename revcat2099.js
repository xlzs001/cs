var response = JSON.parse($response.body);

// 修改订阅数据
if (response.subscriber && response.subscriber.subscriptions) {
    for (var subscription in response.subscriber.subscriptions) {
        if (response.subscriber.subscriptions.hasOwnProperty(subscription)) {
            response.subscriber.subscriptions[subscription].expires_date = '2099-12-31T23:59:59Z';
            response.subscriber.subscriptions[subscription].purchase_date = '2025-01-01T00:00:00Z';
        }
    }
}

// 修改权限信息
if (response.subscriber.entitlements) {
    for (var entitlement in response.subscriber.entitlements) {
        if (response.subscriber.entitlements.hasOwnProperty(entitlement)) {
            response.subscriber.entitlements[entitlement].expires_date = '2099-12-31T23:59:59Z';
            response.subscriber.entitlements[entitlement].purchase_date = '2025-01-01T00:00:00Z';
        }
    }
}

// 返回修改后的数据
$done({body: JSON.stringify(response)});
