const defaultVersion = "0.0.0";
/**
 * 判定是否在象谱APP内
 */
function isXiangpu() {
    // return navigator.userAgent.indexOf("xiangpu") > -1;
    return window.cordova ? true : false;
}
/**
 * 判定手机系统类型
 */
function phoneType() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
    return isAndroid ? "Android" : "iOS";
}
/**
 * 获取当前APP的版本号
 */
function getAppVersion() {
    let plugin = "AppInfo";
    let method = "getAppVersion";

    return new Promise((resolve, reject) => {
        if (!isXiangpu()) {
            resolve(defaultVersion);
            return;
        }
        // cordova.exec(successFn, failFn, "AppInfo", "getAppVersion", []);
            let flg = false
            cordova.exec(res => {
                console.log("获取到APP的版本号", res);
                flg = true
                resolve(res);
            }, () => {
                console.log("获取APP版本号失败");
                flg = true
                resolve(defaultVersion);
            }, plugin, method, []);

            setTimeout(() => {
                if (flg) {
                    return
                }
                if (!flg) {
                    resolve(defaultVersion);
                }
            }, 300);
        
        // try {
        //     let plugins = cordova.require("cordova/plugin_list").metadata;
        //     alert(JSON.stringify(plugins))
        //     if (!plugins[AppInfo]) {
        //         alert("老版本")
        //         resolve(defaultVersion)
        //     } else {
        //         alert("信版本")
        //         resolve(plugins[AppInfo])
        //     }
        // } catch (error) {
        //     alert("进入catch,调用查看版本插件失败")
        //     resolve(defaultVersion)
        // }
        
    });
}

export default async (key) => {
    let payHigherVersion = 107;
    // let androidPayHigherVersion = parseInt(window.api["android" + key]);
    // let iosPayHigherVersion = parseInt(window.api["ios" + key]);
    // console.log("androidPayHigherVersion", androidPayHigherVersion);
    // console.log("iosPayHigherVersion", iosPayHigherVersion);

    let version = await getAppVersion();
    let versionNumber = Number(version.split(".").join(""));

    console.log("拿到的版本号-judgeAppVersionisHigher", version, versionNumber);
    // if (phoneType() === "Android" && versionNumber >= androidPayHigherVersion) {
    //     return true;
    // }
    // if (phoneType() === "iOS" && versionNumber >= iosPayHigherVersion) {
    //     return true;
    // }
    if (versionNumber >= payHigherVersion) {
        return true;
    }
    return false;
}