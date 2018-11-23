<template>
	 <div>
		<header class="aui-bar aui-bar-nav aui-bar-light">
            <div class="go-back" @click="goBack">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="aui-title">配送信息</div>
        </header>
        <div style="height:3rem;"></div>

        <div class="centent">
            <!--物流信息-->
            <div class="order_logistics_box">
                <div class="order_logistics">
                    <div style="margin-right:0.5rem;" class="pic"><img :src="imgUrlList[0] || 'static/image/demo1.png'"><span>{{goodsNum}}件商品</span></div>
                    <p>配送状态：<span>{{logisticsStatus  || "加载中"}}</span></p>
                    <p>配送公司：<b>{{logisticsCompany || "加载中"}}</b></p>
                    <p>运单编号：<b>{{logisticsNo || "加载中"}}</b></p>
                    <p v-if="false">官方电话：
                        <a href="tel:400-8888888">400-8888888</a>
                    </p>
                </div>
                <div class="delivery_box" v-if="logisticsData.length">
                    <ul class="delivery_list">
                        <li v-for="(item, index) in logisticsInfo" :key="index" :class="index === 0 ? 'start' : ''">
                            <i class="line_icon"></i>
                            <p>{{item.context}}</p>
                            <div class="time">{{item.time}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--物流信息 end-->
            <div class="no_data" v-if="!logisticsData.length">
				<img src="static/image/no_data.png">
				<p>暂无相关数据</p>
			</div>
        </div>
	</div> 
</template>
<script>
    import {showLoading, hideLoading} from "../../utils/loading";
    import {getLogisticsCompany, getLogisticsStatus, getLogisticsDetailInfo} from "../../utils/getLogisticsInfo";
	export default {
		props: {

		},
		data () {
			return {
                logisticsData: [],
                baseData:{}
			}
		},
		computed: {
            //快递公司
            logisticsCompany() {
                if (this.logisticsData[0]) {
                    return getLogisticsCompany(this.logisticsData[0].com);
                } else if(this.baseData.orderNo) {
                    return this.baseData.logisticsName
                } else {
                    return "暂无数据";
                }
            },
            //运送状态
            logisticsStatus() {
                if (this.logisticsData[0]) {
                    return getLogisticsStatus(this.logisticsData[0].state + "");
                } else {
                    return "暂无数据";
                }
            },
            //运单号
            logisticsNo() {
                if (this.logisticsData[0]) {
                    return this.logisticsData[0].nu;
                } else if (this.baseData.logisticsNo) {
                    return this.baseData.logisticsNo
                } else {
                    return "暂无数据";
                }
            },
            //运送详细信息
            logisticsInfo() {
                if (this.logisticsData[0]) {
                    return this.logisticsData[0].data;
                }
            },
            //图片详情
            imgUrlList() {
                // console.log("这是图片详情", this.$route.params);
                return this.$route.params.imgurl || [];
            },
            //订单号
            orderNo() {
                // return "0950754246542201";
                return this.$route.params.orderNo;
            },
            goodsNum() {
                return this.imgUrlList.length;
            }

		},
		methods: {
            getLogisticsDetail() {
                //显示loading
                showLoading();
                let callback = data => {
                    console.log(data);
                    this.baseData = data
                    if (data && data.logisticsInfo) {
                        

                        this.logisticsData.push(JSON.parse(data.logisticsInfo));
                        // console.log(this.logisticsData);
                    }
                    //隐藏loading
                    hideLoading();
                    
                }
                let errFn = function () {
                    //隐藏loading
                    hideLoading();
                }
                getLogisticsDetailInfo(this.orderNo, callback, errFn);
                

                // this.logisticsData = [
                //     {
                //         "message": "ok",
                //         "nu": "12345678",
                //         "ischeck": "0",
                //         "com": "yuantong",
                //         "status": "200",
                //         "data": [
                //             {
                //                 "time": "2017-09-03 16:14:11",
                //                 "context": "圆通合作点【指尖快递】快件已到达林和中路8号驿站,如有疑问请联系13922442440",
                //                 "ftime": "2017-09-03 16:14:11",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-09-01 17:41:56",
                //                 "context": "圆通合作点【指尖快递】快件已到达中山TCL国际E城B6栋负一楼驿站,如有疑问请联系13923450903",
                //                 "ftime": "2017-09-01 17:41:56",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-08-26 21:04:48",
                //                 "context": "圆通合作点【指尖快递】快件已到达普陀区梅岭北路1251弄63号驿站,如有疑问请联系15000691626",
                //                 "ftime": "2017-08-26 21:04:48",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-08-08 17:11:39",
                //                 "context": "圆通合作点【收发室】快件已到达水韵风情庄园物业驿站,如有疑问请联系17301126656",
                //                 "ftime": "2017-08-08 17:11:39",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-07-15 16:08:22",
                //                 "context": "圆通合作点【指尖快递】快件已到达港汇广场A座负一层驿站,如有疑问请联系18656091731",
                //                 "ftime": "2017-07-15 16:08:22",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-07-10 17:37:44",
                //                 "context": "圆通合作点【腾云小站】快件已到达1坊7号天主教堂门口韵达快递驿站,如有疑问请联系13164772596",
                //                 "ftime": "2017-07-10 17:37:44",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-05-19 15:16:13",
                //                 "context": "圆通合作点【指尖快递】快件已到达港汇广场A座负一层驿站,如有疑问请联系13515644171",
                //                 "ftime": "2017-05-19 15:16:13",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             },
                //             {
                //                 "time": "2017-05-18 10:12:38",
                //                 "context": "圆通合作点【指尖快递】快件已到达绿地蓝海国际大厦B座负一层驿站,如有疑问请联系055163520604",
                //                 "ftime": "2017-05-18 10:12:38",
                //                 "areaCode": null,
                //                 "areaName": null,
                //                 "status": "在途"
                //             }
                //         ],
                //         "state": "0",
                //         "condition": "00"
                //     }
                // ]
            },
            goBack() {
                window.history.back();
            }
            
        },
        created () {
            this.getLogisticsDetail();
            // console.log("这是图片详情", this.$route.params);
        }

	}
</script>

<style>

</style>


