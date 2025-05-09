[Plugin]
name = Pillow： 睡眠周期跟踪器+解锁订阅
type = script
enabled = true
debug = true
script = https://raw.githubusercontent.com/xlzs001/cs/refs/heads/main/revcat2099.js
使用声明：此脚本仅供学习与交流使用 请勿转载与贩卖！
[MITM]
hostname = api.rc-backup.com, revenuecat.com, api.revenuecat.com

[Script]
http-response ^https:\/\/(api\.rc-backup\.com|api\.revenuecat\.com)\/v1\/(receipts|subscribers) requires-body=1,script-path=https://raw.githubusercontent.com/xlzs001/cs/refs/heads/main/revcat2099.js,timeout=60,engine=auto
