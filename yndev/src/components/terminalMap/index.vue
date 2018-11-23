<template>
    <div style="width:100%;height:100%;padding-top:2.75rem;background-color:white;">
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <router-link :to="iswbxf ? {path:'/wbxfWorkOrder',query:{serviceNo:serviceParam,sub:this.sub,pageUrl:queryObj.pageUrl}}:{path:'/main/addInstallTerminal',query:{serviceNo:serviceParam,sub:this.sub}}">
                <div class="go-back">
                <i></i>
                <i></i>
                <i></i>
                </div>
            </router-link>
            <div class="aui-title">地图</div>
            <div style="margin-top:0;" @click="sureAddress" class="aui-pull-right text-del">确定</div>
        </header>
        
        <div id="allMap" style="height:60%;">

        </div>
        <div style="height:35%">
            <div class="thisAddress">
                <div class="thisAddressTitle">
                    服务地址
                </div>
                <div class="thisAddressContent">
                    {{address}}
                </div>
            </div>
            <div class="nearAddress">
                <div class="nearAddressTitle">
                    选择附近地址
                </div>
                <div class="nearAddressContent">
                    <div @click="chooseAddress(item)" class="nearAddressContentItem" v-for="(item,index) of nearAddressData" :key="index">{{item}}</div>
                </div>
            </div>
        </div>
        <div v-if="showReload" @click="reload" class="reload">点击刷新</div>
    </div>
</template>
<script>
import {showLoading, hideLoading} from "../../utils/loading";
import {mapGetters, mapMutations, mapActions,mapState} from "vuex";
import {Toast} from '../../utils/toast2.js';

export default {
    data(){
        return{
            serviceParam:null,
            sub:null,
            address:null,
            nearAddress:null,
            showReload:false,
            queryObj: {}
        }
    },
    computed:{
        iswbxf() {
            return this.$route.query.wbxf
        },
        nearAddressData(){
            if(!this.nearAddress) return;
            if(this.nearAddress.pois.length>0){
                let arr = [];
                let that = this;
                this.nearAddress.pois.forEach(val => {
                    arr.push(that.nearAddress.addressComponent.province+that.nearAddress.addressComponent.city+that.nearAddress.addressComponent.district+val.address+"  "+val.name)
                });
                return arr;
            }else{
                return [];
            }
        },
    },
    async created(){
        this.serviceParam = this.$route.query.serviceNo;
        this.sub = this.$route.query.sub;
		this.initScript();
        
    },
    methods:{
        ...mapMutations([
            'CHOOSE_ADDRESS',
        ]),
        getHttp() {
            return location.href.match(/^(http|https)\:.+/)[1];
        },
        initScript() {
            this.showReload = false
			//判断如果有script就删掉
			if (document.querySelector("#amap-box")){
				document.body.removeChild(document.querySelector("#amap-box"));
			}
			showLoading();
			setTimeout(() => {
				hideLoading();		
			},8000)
			let amapBox = document.createElement("div");
			amapBox.setAttribute("id", "amap-box");
			// this.initMap();
			let script1 = document.createElement("script");
			script1.onload = () => {
				let script2 = document.createElement("script");
				script2.onload = () => {
					this.initMap();
				}
				script2.src = "//webapi.amap.com/ui/1.0/main.js";
				amapBox.insertAdjacentElement("beforeend", script2);
			};
			script1.src = this.getHttp() + "://webapi.amap.com/maps?v=1.4.2&key=9bfe3d8b8882b7d3e4c23e43d38b18ba";
			amapBox.insertAdjacentElement("beforeend", script1);
			document.body.appendChild(amapBox);
        },
        reload(){
            //刷新
            //this.$router.go(0);
            this.serviceParam = this.$route.query.serviceNo;
            this.sub = this.$route.query.sub;
            this.initScript();
		},
        initMap(){
            let that =this;
            var tenTimer;
			var markerList = [];
            var temp = null;
            var infoWindow;
            //定义一个存放markers的数组
            let markersArr = [];
            //marker的位置数组
            let markersPosition = [];
            try{
				var map = new AMap.Map('allMap', {
					resizeEnable: true,
					zoom: 15,
					center: [108.383765, 22.813923],
					scrollWheel : true
				});
			} catch(err){
				if(err){
					hideLoading();
					that.showReload = true;
					Toast({
                        message: '加载失败,请重试',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 2000
                    });
					return false
				}
            }
            
            //定位功能
			map.plugin(['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Autocomplete', "AMap.Geocoder"], function() {
				//给一个定位过程的loading
				var geolocation = new AMap.Geolocation({
					enableHighAccuracy: true, //是否使用高精度定位，默认:true
					timeout: 5000, //超过10秒后停止定位，默认：无穷大
					maximumAge: 0, //定位结果缓存0毫秒，默认：0
					convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true, //显示定位按钮，默认：true
					buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
					buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false,
					// markerOptions: {
					// 	icon : "http://webapi.amap.com/theme/v1.3/markers/b/loc.png",
					// 	label : {
					// 		offset: new AMap.Pixel(-40, 20),//修改label相对于maker的位置
					// 		content: "您的位置"
					// 	}
					// }
				});
				//个人定位的marker
				var mineMarker = new AMap.Marker({
					// icon: "http://webapi.amap.com/theme/v1.3/markers/b/loc.png",
					// label : {
					// 	offset: new AMap.Pixel(34, 17),//修改label相对于maker的位置
					// 	content: "您的位置"
					// }
                });
                
               

				map.addControl(geolocation);
				// setTimeout(function () {
				geolocation.getCurrentPosition();
				// }, 5000);
				
				//添加定位失败和定位成功的监听事件
				geolocation.on("complete", function (result) {
					//关闭loading效果
					hideLoading();
					clearTimeout(tenTimer);
					mineMarker.setPosition(new AMap.LngLat(result.position.lng, result.position.lat));	
					mineMarker.setMap(map);
					markersArr.push(mineMarker);
					//根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层
					map.setFitView(markerList);
                    // varibleCenter && map.setCenter([parseFloat(that.addParams.positionlng),parseFloat(that.addParams.positionlat)]);
                    temp = result;
                    openInfo();
                    that.address = temp.formattedAddress;
                    console.log(that.address,'111')
				});
				geolocation.on("error", function () {
					//定位失败或者超过10秒后，关闭loading效果
					if (!tenSecond) {
						hideLoading();
						// suneeeUI.hideToast();
						// suneeeUI.showToast("fail", "定位失败，请刷新重试~", 1200);
						clearTimeout(tenTimer);
					}
                });
                 //定位当前位置并显示消息框
                function openInfo() { 
                    infoWindow = new AMap.InfoWindow({
                        content: temp.formattedAddress,  //使用默认信息窗体框样式，显示信息内容
                        position: [temp.position.lng, temp.position.lat],
                        offset: new AMap.Pixel(0, -30)
                    });
                    infoWindow.open(map);
                 }

                 function openInfoEx(e,result) {
                    //构建信息窗体中显示的内容
                    var info = [];
                    info.push("地址:" + result.regeocode.formattedAddress + "</div></div>");
                    that.address = result.regeocode.formattedAddress;
                    that.nearAddress = result.regeocode;
                    infoWindow = new AMap.InfoWindow({
                        content: result.regeocode.formattedAddress,  //使用默认信息窗体框样式，显示信息内容
                        position: [e.lnglat.lng, e.lnglat.lat],
                        offset: new AMap.Pixel(0, -30)

                    });
                    infoWindow.open(map);
                }
                    
                //地图点击事件
                AMap.event.addListener(map, "click", _onClick); //绑定事件，返回监听对象
                
                function _onClick(e) {
                    var arr = [e.lnglat];
                    if(markersArr.length > 0){
                        markersArr[0].setMap(null);
                        markersArr[0] = null;
                    }
                    var markers = new AMap.Marker({
                        // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png",
                        position: [e.lnglat.lng, e.lnglat.lat],
                        title: temp.province + temp.city + temp.distric + temp.address,
                        clickable: true,
                        map: map
                    });
                    markersArr = [markers];
                    markersPosition = [e.lnglat.lng ,e.lnglat.lat];
                    AMap.service('AMap.Geocoder',function(){//回调函数
                        //实例化Geocoder
                        let geocoder = new AMap.Geocoder({
                            city: "010",//城市，默认：“全国”
                            extensions :'all',
                            radius:100
                        });
                        geocoder.getAddress(markersPosition, function(status, result) {
                            console.log(result,'res')
                            if (status === 'complete' && result.info === 'OK') {
                                AMap.event.addListener(markers, 'click', openInfoEx(e,result));
                            }else{
                                layer.msg("获取位置失败")
                            }
                        });
                    });
                };


				//定义一个延时器，超过10秒提示定位失败，该方法是为了解决高德地图某些时候不执行定位失败的回调
				tenTimer = setTimeout(function () {
					hideLoading();
					clearTimeout(tenTimer);
					// suneeeUI.hideToast();
					// suneeeUI.showToast("fail", "定位失败，请刷新重试~", 1200);
				}, 6000);

				var auto = new AMap.Autocomplete ({

				});
				
				/*根据经纬度计算距离，单位是千米*/
				function calculate(lat1, lng1, lat2, lng2) {
					var radLat1 = lat1 * Math.PI / 180.0;
					var radLat2 = lat2 * Math.PI / 180.0;
					var a = radLat1 - radLat2;
					var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
					var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
					s = s * 6378.137;
					s = Math.round(s * 10000) / 10000;
					return s
				};
				
			});
        },
        chooseAddress(val){
            this.address = val;
        },
        sureAddress(){
            this.$store.dispatch('zwy/saveMapAddress', this.address)
            this.CHOOSE_ADDRESS(null);
            this.$router.push(this.iswbxf ? {path:'/wbxfWorkOrder', query: {serviceNo: this.serviceParam,sub:this.sub,pageUrl:this.queryObj.pageUrl}}:{path: '/main/addInstallTerminal', query: {serviceNo: this.serviceParam,sub:this.sub}});
            
        },
    },
    beforeRouteEnter (to, from, next) {
        // this.queryObj = from.query
        next(vm => {
            vm.queryObj = from.query
        })
    },
}
</script>

<style scoped>
.thisAddress{
    padding: 0 0.5rem;
    margin: 0.5rem 0;
}
.thisAddressTitle{
    font-size: 0.7rem;
    font-weight: 700;
}
.thisAddressContent{
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.1rem;
}
.nearAddress{
    padding: 0 0.5rem;
}
.nearAddressTitle{
    font-size: 0.7rem;
    font-weight: 700;
}
.nearAddressContent{
    height: 5.5rem;
    overflow: auto;
}
.nearAddressContentItem{
    padding: 0.2rem 0;
}
.reload{
	position: absolute;
	width: 25%;
	height: 1.5rem;
	line-height: 1.5rem;
    text-align: center;
	font-size: .7rem;
	border: 1px solid gray;  
	border-radius: .2rem;
	top:35%;
    left: 50%;
    margin-left: -12.5%;
}
</style>
