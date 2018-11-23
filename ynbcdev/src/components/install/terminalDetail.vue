<template>
    <div class="vue_app" style="position: absolute;width: 100%">
        <header class="aui-bar aui-bar-nav aui-bar-light">
		<div @click="goBack" replace>
			<div class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</div>
			<div class="aui-title">工单详情</div>
		</header>
		<div style="height: 3rem;"></div>
        <div class="aui-content top_div" v-if="terminalData">
            <ul class="aui-list aui-list-in">
				<li class="aui-list-header">
	              	  终端信息
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">车牌号码</div>
	                    <div class="aui-list-item-right">{{terminalData.carno}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">终端编号</div>
	                    <div class="aui-list-item-right">{{terminalData.teleptleno}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">终端类型</div>
	                    <div class="aui-list-item-right">{{terminalData.dtutype}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">无忧服务类型</div>
	                    <div class="aui-list-item-right">{{terminalData.openservice}}</div>
	                </div>
	            </li>
                <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">ECU版本</div>
	                    <div class="aui-list-item-right">{{terminalData.ecutype}}</div>
	                </div>
	            </li>
                <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">发动机编号</div>
	                    <div class="aui-list-item-right">{{terminalData.engineno}}</div>
	                </div>
	            </li>
			</ul>
            <ul class="aui-list aui-list-in">
				<li class="aui-list-header">
	              	  服务选择
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务类型</div>
	                    <div class="aui-list-item-right" v-if="!terminalData.aftersaleservicetype">终端售后服务</div>
	                    <div class="aui-list-item-right" v-else>{{terminalData.aftersaleservicetype==10?'终端售后维修单':'终端售后拆除单'}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务商</div>
	                    <div class="aui-list-item-right">{{terminalData.servicename}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务方式</div>
	                    <div class="aui-list-item-right">{{terminalData.servicetype==0?'到店':'上门'}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务地点</div>
	                    <div class="aui-list-item-right">{{terminalData.servicetype==0?terminalData.store:terminalData.serveraddress}}</div>
	                </div>
	            </li>
                <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">预约服务日期</div>
	                    <div class="aui-list-item-right">{{serverDate}}</div>
	                </div>
	            </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-card-list" style="width:100%;padding-right:0.75rem">
                            <div class="aui-card-list-header" style="padding:0;">
                                故障现象
                            </div>
                            <div class="aui-card-list-content" style="display:flex;flex-wrap:wrap;margin-right:-4%">
                                <div v-for="(item,index) of trouble" :key="index" v-if="item.choose" class="faultItem">{{item.ddlname}}</div>
                            </div>
                        </div>
                    </div>
                </li>
			</ul>
            <ul class="aui-list aui-list-in">
				<li class="aui-list-header">
	              	  服务回执
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">终端校验结果</div>
	                    <div class="aui-list-item-right">{{terminalData.dtustatus==1?"设备运行正常":(terminalData.dtustatus?"不通过":'')}}</div>
	                </div>
	            </li>

			</ul>
            <ul class="aui-list aui-list-in" >
				<li class="aui-list-header">
	              	  服务描述
	            </li>
	            <li class="aui-list-item">
	              	 <textarea name=""  disabled="disabled" v-model="terminalData.servicedescription" rows="" cols=""></textarea>
	            </li>
	        </ul>
            <ul class="aui-list aui-media-list address_list">
				<li class="aui-list-item">
					<div class="aui-card-list-content-padded">
						<div class="aui-list-item-text">
							<div class="aui-list-item-title"><strong>终端安装效果照</strong></div>
						</div>
						<div class="car_img">
                            <div class="img">
                                <img :src="terminalData.photo ? terminalData.photo.split(',')[0] : ''" alt="">
                                <span v-if="!terminalData.photo">终端图片</span>
                            </div>
                            <div class="img"  v-if="terminalData.photo&&terminalData.photo.split(',').length==3">
                                <img :src="terminalData.photo.split(',')[1]" alt="">
                                <span v-if="!terminalData.photo">终端图片</span>
                            </div>

						</div>
					</div>
				</li>
			</ul>
            <ul class="aui-list aui-media-list address_list">
				<li class="aui-list-item">
					<div class="aui-card-list-content-padded">
						<div class="aui-list-item-text">
							<div class="aui-list-item-title"><strong>车辆照片</strong></div>
						</div>
						<div class="car_img">
                            <div class="img">
                                <img v-if="terminalData.photo" :src="terminalData.photo.split(',').length==3? terminalData.photo.split(',')[2] : terminalData.photo.split(',')[1]" alt="">
                                <span v-if="!terminalData.photo">车辆图片</span>
                            </div>

						</div>
					</div>
				</li>
			</ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {mapGetters, mapMutations, mapActions} from "vuex";

export default {
    data(){
        return {
            aftersaleserviceid:null,
            terminalData:null,//工单数据
            trouble:null,//故障类型
        }
    },
    created(){
        this.aftersaleserviceid = this.$route.query.aftersaleserviceid;
        this.initData();
    },
    computed: {
        ...mapGetters('xhModules', [
        'userInfo',
        'sessionId',
        'login'
        ]),
        serverDate(){
            let date = new Date(this.terminalData.serverdate)
            return  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes()<10? "0"+date.getMinutes():date.getMinutes())+ ":" + (date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds());
        }
    },
    methods:{
        async initData(){
            let res = await axios.get(window.api.local_host + "/valueAdded/terminalSaleAfter?afterSaleServiceId="+this.aftersaleserviceid,{headers:{'sessionId':this.sessionId}})
            
            if(res.status==200 && res.data.returncode==1){
                this.terminalData = res.data.data[0];
            }

            let FaultMode = await axios.get(window.api.local_host+'/valueAdded/findFaultPhenomenon',{headers:{'sessionId':this.sessionId}});

            if(FaultMode.status==200 && FaultMode.data.returncode==1){
                FaultMode.data.data[0].PUB_AFTER_SALE_TROUBLE.forEach(element => {
                
                    element.choose = false;
                    
                });
                
            }

            if(this.terminalData.troubletype&& FaultMode.data.data[0].PUB_AFTER_SALE_TROUBLE.length>0){
                let troubleDate = FaultMode.data.data[0].PUB_AFTER_SALE_TROUBLE;
                this.terminalData.troubletype.split(',').forEach(val=>{
                    troubleDate.forEach(v=>{
                        if(val == v.ddlid){
                            v.choose = true;
                        }
                    })
                })
            }
            this.trouble = FaultMode.data.data[0].PUB_AFTER_SALE_TROUBLE;
            console.log(this.trouble);
            
        },
        goBack(){
            this.$router.go(-1)
        }
    },
}
</script>
<style scoped>
.faultItem{
    /* width: 30%; */
    border: 1px solid #aaa;
    border-radius: 5px;
    min-height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    margin-bottom: 0.3rem;
    margin-right: 3%;
    padding: 0 0.3rem;
    /* font-size: 0.5rem; */
}
.img{
    margin: auto;
    margin-top: 0rem;
}
.word{
    font-size: 18px;
    text-align: center;
}
.img{
    position: relative;
    height: 60vw;
}
.img>span{
    position: absolute;
    z-index: 10;

}
.img>img{
    position: absolute;
    z-index: 20;
}
</style>
