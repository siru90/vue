<template>
    <div id="container" class="container">
        
    </div>    
</template>
<script>
/**
 * $emit:
 *      scriptLoadFinsh: ()=>void   高德地图脚本加载完成
 *      mapClick:(e)=>void          地图被点击事件
 * 
 * $props:
 *      centerPosition: number[2]     中心点坐标   
 *      pointMarkersList: {position:number[2],title?:string,click?:(e)=>void}[] 标记列表
 *      autoView: bool                是否自动调整视野
 *      autoGeo: bool                 自动定位
 *      geoFailCb:() => void          定位失败回调
 */
import {MessageBox} from 'mint-ui';
export default {
    props: {
        autoGeo: {
            type: Boolean,
            default:true
        },
        // 中心点坐标
        centerPosition: {
            type:Array,
            validator: function(v) {
                if (v.length != 2) {
                    return false
                } else if (typeof v[0] != "number" || typeof v[1] != "number") {
                    return false
                }
                return true
            },
            default: function() {
                return  [108.33	, 22.84]
            }
        },
        // 标记点列表
        pointMarkersList: {
            type: Array,
            validator: function(v) {
                if (v.length == 0) {
                    return true
                }
                for (const i of v) {
                    const isArr = i.position instanceof Array
                    if (!isArr) {
                        return false
                    } else if (i.position.length != 2) {
                        return false
                    } else if (typeof i.position[0] != "number" || typeof i.position[1] != "number") {
                        return false
                    }
                    if (i.click) {
                        if (i.click instanceof Function) {
                            return true
                        }
                        return false
                    }
                    return true
                }
                
            }
        },
        // 缩放
        zoom: {
            type: Number,
            validator: function(v) {
                if (v>=3 && v<=19) {
                    return true
                }
                return false
            },
            default: 11,
        },
        // 将距离最近的多少个标记放入视野
        setFitViewMarkerNum: {
            type:Number,
            validator: function(v) {
                if (v<0) {
                    return false
                } else if (!Number.isInteger(v)) {
                    return false
                }
                return true
            }
        },
        autoView: {
            type: Boolean,
            default: false
        },
        geoFailCb: {
            type: Function,
            default: () => {
                console.log("定位失败")
            }
        }
    },
    data() {
        return {

            map: null,                                                  // 地图对象
            centerPointMarker: null,                                    // 中心标记对象
            selfCurrentPointLngLat:null,                                // 自身点对象
            pointMarkers: [],                                           // 标记点对象列表
            amapDevConfig: {
                version: 1.3,                                         // 版本
                devKey: "9bfe3d8b8882b7d3e4c23e43d38b18ba",           // 开发账号key
                amapApiUrl: "https://webapi.amap.com/maps",           // 高德apiUrl
                amapUiUrl: "https://webapi.amap.com/ui/1.0/main.js"   // 高德uiUrl
            },
            apiLibLoadStatus: false,
            uiLibLoadStatus:false
        }
    },
    computed: {
        libarayLoadStatus() {
            return this.apiLibLoadStatus && this.uiLibLoadStatus
        }
    },
    methods: {
        /**
         * 具体业务函数
         */
        

        /**
         *  工具函数
         */
        // 获取高德脚本
        getApiAndUiLibaray() {
            // 如果提前加载了高德地图，则不再请求
            if (AMap) {
                return
            }
            const apiScript = document.createElement("script")
            const uiScript = document.createElement("script")
            apiScript.src = this.amapDevConfig.amapApiUrl + `?v=${this.amapDevConfig.version}&key=${this.amapDevConfig.devKey}`
            uiScript.src = this.amapDevConfig.amapUiUrl
            apiScript.onload = () => {
                document.body.appendChild(uiScript)
                this.apiLibLoadStatus = true
            }
            uiScript.onload = () => {
                this.uiLibLoadStatus = true
            }
            // 固定插入顺序
            document.body.appendChild(apiScript)
            
        },
        // 使用高德地图
        startAmap() {
            try {
                let option = {
                    zoom: this.zoom,
                    viewMode: "3D"
                }
                if (!this.autoGeo && this.centerPosition) {
                    option.center = this.centerPosition
                }

                this.map = new AMap.Map('container', option);
                if (!this.autoGeo) {
                    this.renderCurrentPointMarker()
                } else {
                    this.useGeolocationPlug()
                }   
                this.map.on("click",(e) => {
                    this.$emit("mapClick",e)
                })
                
                this.renderPointMarkerList()


                
                
            } catch (error) {
                console.log(error)

                console.log("初始化地图失败！")
                MessageBox({
                    title: "地图加载失败，点击确定重新加载",
                    showCancelButton:true,
                }).then(e => {
                    if (e == "confirm") {
                        this.startAmap()
                    } else {

                    }
                })
            }
        },
        // 生成点标记对象 @position: number[2] 经纬度 @title: 标题
        createPointMarker(position,title) {
            if (this.map) {
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(position[0],position[1]),
                    title: title,
                    label:title,
                    
                })

                marker.setLabel({
                    content:title,
                    offset: new AMap.Pixel(20, 20)
                })
                return marker
            }
             
        },
        // 生成文字标记对象
        // 绘制自身标记点
        renderCurrentPointMarker() {
            // 设置初始标记
            this.centerPointMarker = this.createPointMarker(this.centerPosition,"您的位置")
            this.map.add(this.centerPointMarker)
            this.centerPointMarker.on('click',function(){
                console.log("点击123123")
            })
            this.setFitView()
        },
        // 绘制标记点列表
        renderPointMarkerList() {
            this.pointMarkersList.forEach(element => {
                const el = element
                const p = this.createPointMarker(element.position,element.title)
                this.map.add(p)
                if (element.click) {
                    p.on("click",(e) => {
                        // 缩放并设置为中心
                        // 只有在地图视野比较大时才放大视野
                        if (this.map.getZoom() >= 11) {
                            this.map.setCenter(el.position)
                        } else {
                            this.map.setZoomAndCenter(11,el.position)
                        }  
                        const distance = this.computedDistanceWithSelfPostion(e.lnglat.lng, e.lnglat.lat)
                        element.click(e,el,distance)
                    })
                }
                this.pointMarkers.push(p)
            });
            this.setFitView()
        },
        // 地图自动调整视野
        setFitView() {
            if (this.map && this.pointMarkersList.length > 0 && this.autoView) {
                this.getSameViewPoint()
                this.map.setFitView();
            }
        },
        // 获得共同视野的点
        getSameViewPoint() {
            if (this.centerPointMarker && this.pointMarkers.length > 0) {
                this.pointMarkers.forEach(v => {
                    console.log(v.getPosition())
                })
            }
        },
        // 启用定位插件
        useGeolocationPlug() {
            if (this.map) {
                this.map.plugin("AMap.Geolocation", () => {
                    const geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 130),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    this.map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    geolocation.on("complete", (e) => {
                        this.selfCurrentPointLngLat = new AMap.LngLat(e.position.lng, e.position.lat)
                        console.log(this.selfCurrentPointLngLat)
                        console.log("定位成功")
                    })
                    geolocation.on("error", function() {
                        if (this.geoFailCb) {
                            this.geoFailCb()
                        }
                        
                    })
                })
            }
        },
        // 计算距离
        computedDistanceWithSelfPostion(lg,la) {
            console.log(lg)
            console.log(la)
            console.log(this.selfCurrentPointLngLat)
            return this.selfCurrentPointLngLat.distance([lg,la])
        } 


    },
    mounted() {
        // 防止多次加载脚本
        if (!window.AMap) {
            this.getApiAndUiLibaray()
        } else {
            this.startAmap()
        }

    },
    watch: {
        libarayLoadStatus(v) {
            if (v) {
                console.log("加载地图api完成")
                this.$emit("scriptLoadFinsh")
                this.startAmap()
            }            
        },
        centerPosition(v) {
            if (this.map) {
                // 移除默认标记点
                this.map.remove(this.centerPointMarker)
                // 重新设置中心点
                this.map.setCenter(v)
                // 重新绘制自身标记点
                this.renderCurrentPointMarker()
                // 重新调整视野
                
            }
            
        },
        pointMarkersList(list) {
            this.renderPointMarkerList()
            // 重新调整视野
            
        },

    }
    
}
</script>
<style>
    #container {
        width: 100%;
        height: 100%;
    }
    .amap-marker-label {
        border-color: #ededed;
        border-radius: 4px;
        color: #666666;
        /* background: transparent; */
    }
</style>
