//  此方法用于加载高德api脚本与ui脚本
export const getApiAndUiLibaray = function() {
    return new Promise((resolve, reject) => {
        // 防止多次加载
        if (window.AMap) {
            console.log("amap已加载，无须重复加载")
            resolve("已加载")
            return
        }
        const amapDevConfig = {
            amapApiUrl: "https://webapi.amap.com/maps",
            amapUiUrl: "https://webapi.amap.com/ui/1.0/main.js",
            version: "1.4.2",
            devKey: "9bfe3d8b8882b7d3e4c23e43d38b18ba"
        }
        const apiScript = document.createElement("script")
        const uiScript = document.createElement("script")
        apiScript.src = amapDevConfig.amapApiUrl + `?v=${amapDevConfig.version}&key=${amapDevConfig.devKey}`
        uiScript.src = amapDevConfig.amapUiUrl
        apiScript.onload = () => {
            document.body.appendChild(uiScript)
            console.log("高德地图api脚本加载完成")
        }
        uiScript.onload = () => {
            console.log("高德地图ui脚本加载完成")
            resolve()
        }
        apiScript.onerror = () => {
            reject("高德地图api脚本加载失败")
        }
        uiScript.onerror = () => {
            reject("高德地图ui脚本加载失败")
        }
        document.body.appendChild(apiScript)
    }) 
} 

//  此方法用于根据地名查询对应的高德地图坐标对象
export const getCoordinateByLocationName = async function (location) {
    if (!window.AMap) {
        await getApiAndUiLibaray()
    }
    const result = await getLocationCoordinate(location)
    return result
}

// 计算两个坐标的实际距离
// var p1 = [116.434027, 39.941037];
// var p2 = [116.461665, 39.941564];
export const getDistanceByCoordinates = async function(p1, p2) {
    if (!window.AMap) {
        await getApiAndUiLibaray()
    }
    if (!AMap.GeometryUtil.distance) {
        console.log("计算距离工具函数为null，amap版本过低")
    }
    return AMap.GeometryUtil.distance(p1, p2);
}


function getLocationCoordinate(locationName) {
    return new Promise((resolve, reject) => {
        AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: '全国'
            })

            geocoder.getLocation(locationName, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                // result中对应详细地理坐标信息
                    resolve(result)
                } else {
                    reject("查询失败")
                }
            })
        })
    })
}


