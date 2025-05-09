const TARGET_EXPIRE = "2099-12-31T23:59:59Z";
const DEBUG_MODE = true;

function log(message) {
  if (DEBUG_MODE) console.log(`[RevCat2099] ${new Date().toISOString()} | ${message}`);
}

function deepModify(body) {
  try {
    const now = new Date();
    const timestamp = Math.floor(now.getTime());
    const isoDate = now.toISOString().replace(/\.\d+Z$/, "Z");

    // 深度修改时间系统
    const timeFields = [
      'request_date', 
      'request_date_ms',
      'subscriber.original_purchase_date',
      'subscriber.last_seen',
      'subscriber.subscriptions["com.neybox.pillow.premium.year"].purchase_date',
      'subscriber.subscriptions["com.neybox.pillow.premium.year"].original_purchase_date',
      'subscriber.entitlements.premium.purchase_date'
    ];

    timeFields.forEach(path => {
      const keys = path.split('.').map(key => key.replace(/\["|"\]/g, ''));
      let obj = body;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
        if (!obj) return; // 防止路径错误导致崩溃
      }
      const lastKey = keys[keys.length - 1];
      obj[lastKey] = lastKey.endsWith('_ms') ? timestamp : isoDate;
    });

    // 修改到期时间
    body.subscriber.subscriptions['com.neybox.pillow.premium.year'].expires_date = TARGET_EXPIRE;
    body.subscriber.entitlements.premium.expires_date = TARGET_EXPIRE;

    // 清理订阅状态
    delete body.subscriber.subscriptions['com.neybox.pillow.premium.year'].unsubscribe_detected_at;
    delete body.subscriber.subscriptions['com.neybox.pillow.premium.year'].billing_issues_detected_at;

    return body;
  } catch (e) {
    log(`修改失败: ${e.stack}`);
    return body;
  }
}

function modifyResponse(res) {
  try {
    log(`开始处理 ${res.url || "(未知URL)"}`);

    if (res.headers['Content-Encoding'] === 'br') {
      res.body = $brotli.decode(res.body);
      log(`Brotli解压完成，原始长度: ${res.body.length}`);
      delete res.headers['Content-Encoding'];
    }

    const originalBody = JSON.parse(res.body);
    const modifiedBody = deepModify(originalBody);

    // 清理验证头
    const removeHeaders = [
      'x-signature',
      'x-revenuecat-etag',
      'cf-ray',
      'x-amzn-trace-id',
      'x-request-id'
    ];
    removeHeaders.forEach(h => delete res.headers[h]);

    res.headers['x-revenuecat-request-time'] = Date.now().toString();
    res.headers['Date'] = new Date().toUTCString();
    res.headers['Content-Type'] = 'application/json';

    const finalBody = JSON.stringify(modifiedBody);
    res.body = $brotli.encode(finalBody);
    res.headers['Content-Encoding'] = 'br';
    res.headers['Content-Length'] = res.body.byteLength.toString();

    log(`修改完成，新到期时间: ${TARGET_EXPIRE}`);
    return { status: 200, headers: res.headers, body: res.body };

  } catch (e) {
    log(`全局错误: ${e.stack}`);
    return res;
  }
}

$done(modifyResponse($response));
