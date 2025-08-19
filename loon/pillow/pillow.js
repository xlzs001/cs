//进入软件后即可正常解锁，非一次性解锁，使用期间需保持插件始终开启。如有异常卸载重装后再次尝试。
#!name=RevenueCat Unlock
#!desc=重定向并解锁 RevenueCat 订阅
#!author=zY
#!version=1.0

[URL Rewrite]
# 重定向 RevenueCat/rc-backup 的订阅验证请求
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/[^/]+$) https://revenue-cat.tistzach.workers.dev header

[Script]
# 修改订阅信息，有效期至 2099-12-31
http-response ^https:\/\/revenue-cat\.tistzach\.workers\.dev requires-body=1,script-update-interval=0,timeout=30,script-name=RevenueCat

[Script Content]
# ============ RevenueCat 解锁脚本 ============
!name=RevenueCat
let obj = JSON.parse($response.body);

if (obj.subscriber) {
  let subs = obj.subscriber.subscriptions;
  let ent = obj.subscriber.entitlements;
  let date = "2099-12-31T23:59:59Z";

  if (subs) {
    for (let key in subs) {
      subs[key].expires_date = date;
      subs[key].original_purchase_date = "2020-01-01T00:00:00Z";
      subs[key].purchase_date = "2020-01-01T00:00:00Z";
    }
  }

  if (ent) {
    for (let key in ent) {
      ent[key].expires_date = date;
      ent[key].original_purchase_date = "2020-01-01T00:00:00Z";
      ent[key].purchase_date = "2020-01-01T00:00:00Z";
    }
  }
}

$done({ body: JSON.stringify(obj) });
# ============================================
[MITM]
hostname = %APPEND% api.revenuecat.com, api.rc-backup.com, revenue-cat.tistzach.workers.dev
