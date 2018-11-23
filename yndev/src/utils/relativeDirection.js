
export function distanceByLnglat(arr,arr1) {
    const lng1 = arr[0]
    const lng2 = arr1[0]
    const lat1 = arr[1]
    const lat2 = arr1[1]
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
    s = Math.round(s * 10000) / 10000;
    return s
}
 
function Rad(d) {
    return d * Math.PI / 180.0;
}