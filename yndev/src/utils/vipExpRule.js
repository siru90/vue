export function vipExpRule(key) {
    switch (key) {
        case 0:
            return {
                "name": "大客户订单",
                "url": "static/image/vip/gouwu.png"
            } 
        case 1:
            return {
                "name": "零售订单",
                "url": "static/image/vip/gouwu.png"
            }
        case 2:
            return {
                "name": "注册",
                "url": "static/image/vip/zhuce.png"
            }
        case 3:
            return {
                "name": "补全注册资料",
                "url": "static/image/vip/buquanziliao.png"
            }
        case 4:
            return {
                "name": "签到",
                "url": "static/image/vip/qiandao.png"
            }
        case 5:
            return {
                "name": "绑定终端",
                "url": "static/image/vip/lianjie.png"
            }    
        default:
            return {
                "name": "",
                "url": ""
            }
    }
}