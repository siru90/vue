<template>
    <div class="aui-margin-b-15">
        <div class="aui-list aui-list-in">
            <ul class="aui-list aui-list-in scrolls" style="padding-bottom: 0.5rem;">
                <li class="" style="padding: 0 0.75rem;">
                    <div class="aui-list-item-inner" style="border-bottom: 1px solid #eaeaea !important;padding-right: 0;">
                        <div class="aui-list-item-title" style="width:86%;padding: 0.5rem 0;"><a>发票抬头</a></div>
                        <div class="aui-list-item-right" style="color:#0f8de0 !important;width:14%;text-align: center;" @click.stop="goHeadManagement">管理</div>
                    </div>
                </li>
                <!--<span id="" style="display: none;">
                	{{saveBillshead}}
                </span>-->
                <li class="listers" v-for="(item,indexs) in saveBillshead" :key="indexs">
                	<div id="" style="padding-top:0.5rem;overflow: hidden;width: 100%;height: 100%;position: relative;border-bottom: 1px solid #eaeaea !important;">
                		<div style="float:left;width:12%;padding-top: 0.44rem;" @click.stop="checkeds(item,indexs)">
	                        <input class="aui-checkbox chooseCheck" type="checkbox" :checked="getBillList === item.rid">
	                    </div>
	                    <div style="width:74%;float:left;" v-if="item.invoicesTitleType == 1?true:false">
	                        <div style="text-align: left;">{{item.personalName}}</div>
	                        <div style="text-align: left;">{{item.idNumber}}</div>
	                    </div>
	                    <div style="width:74%;float:left;" v-if="item.invoicesTitleType == 2?true:false">
	                        <div style="text-align: left;">{{item.companyName}}</div>
	                        <div style="text-align: left;">{{item.dutyParagraphNo}}</div>
	                    </div>
	                    <div style="line-height:2.2rem;float:left;width:14%;text-align: center;">{{item.invoicesTitleType=='1'?"个人":"公司"}}</div>
	                    <div id="" v-if="item.isDefault" style="text-align: center;width: 14%;
	                    	transform: rotate(45deg);width: 2.2rem;text-align: center;top: 0.1rem;
	                    	height: 0.7rem;position: absolute;background-color: red;line-height: 0.7rem;right: -3.7%;">
	                    	<span style="color: #ffffff;font-size: 0.45rem;height: 100%;display:block;width: 100%;">
	                    		默认
	                    	</span>
	                    	    
	                    </div>
                	</div>
                </li>
                
                <li class="" style="padding: 0 0.5rem;margin-top:0.5rem;position: relative;">
                    <div class="aui-btn aui-btn-block" style="height:1.75rem;line-height: 1.75rem;" @click.stop="addNewHead">
                        <p style="color:#0099FF;">+ 新增抬头</p>
                        <span></span>
                    </div>
                    <div :class="isDisplay?'ward':'Down'">
                    	<div id="u514_div">
                    	
                    	</div>
                    </div>
                   	<div :class="isDisplay?'upWard':'upDown'">
                    	<div id="u514_div">
                    	
                    	</div>
                    </div>
                </li>
            </ul>
            <div v-if="isDisplay" style="margin-top:0.75rem;">
                <ul class="aui-list aui-list-in" style="border-top:0;">
                    <li class=" "  style="border:0;padding: 0.75rem;height: 2.5rem;width: 100%;">
                        <div style="display:inline-block;width: 25%;" @click.stop="choosePersonal" >	
                            <input class="aui-checkbox" type="checkbox" :checked="personal">
                            <span style="margin-left:0.5rem;line-height: 1.2rem;">个人</span>
                        </div>
                        <div style="display:inline-block;width: 25%;" @click.stop="chooseEnterprise">	
                            <input class="aui-checkbox" type="checkbox" :checked="enterprise" >
                            <span style="margin-left:0.5rem;line-height: 1.2rem;">企业</span>
                        </div>
                        <div style="display:inline-block;width: 45%;text-align: right;"  @click.stop="chooseIsDefault">	
                            <input class="aui-checkbox" type="checkbox" :checked="isDefault">
                            <span style="margin-left:0.5rem;line-height: 1.2rem;">是否默认</span>
                        </div>
                    </li>
                    <!-- 勾选个人 -->
                    <li class="aui-list-item" style=" border-bottom:0;">
                        <div class="aui-list-item-label" style="text-align:left;width:28%;" :class="{'active':enterprise}">
                            <span style="color:red;" v-if="personal">*<span style="color:#444444;">姓名</span></span>
                            <span style="color:red;" v-if="enterprise">*<span style="color:#444444;">名称</span></span>
                        </div>
                        <div class="aui-list-item-input">
                            <input class="userName" style="font-size: 0.6rem;" v-on:input="chkvalue(this)" type="text" placeholder="请输入真实姓名" v-if="personal" v-model="personalName"/>
                            <input class="userName" style="font-size: 0.6rem;" v-on:input="chkvalue(this)" type="text" placeholder="请输入公司名称" v-if="enterprise" v-model="enterpriseName"/>
                        </div>
                    </li>
                    <li class="aui-list-item" style=" border-bottom:0;">
                        <div class="aui-list-item-label" style="text-align:left;width:28%;" :class="{'active':enterprise}">
                            <span style="color:red;" v-if="personal">*<span style="color:#444444;">身份证号</span></span> 
                            <span style="color:red;" v-if="enterprise">*<span style="color:#444444;">税号</span></span> 
                        </div>
                        <div class="aui-list-item-input" >
                            <input class="numbers" style="font-size: 0.6rem;" v-on:input="chkvalue(this)" type="text" placeholder="请输入身份证号码" v-if="personal" v-model="idNumber"/>
                            <input class="numbers" style="font-size: 0.6rem;" v-on:input="chkvalue(this)" type="text" placeholder="请输入纳税人识别号或社会统一征信代码" v-if="enterprise" v-model="dutyParagraphNo "/>
                        </div>
                    </li>
                    <li class="" style="padding:0 .75rem;margin-top: 0.75rem;"> 
                        <div class="aui-btn aui-btn-block" @click.stop="putIn" style="max-height:2rem ;line-height: 2rem;" v-bind:class="{'aui-btn-danger':isActive }">
                            	保存
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
	// import MyHeader from "../header";
	import axios from "axios";
	import api from "../../api";
	import {Popup, MessageBox} from 'mint-ui';
	import { mapState, mapGetters, mapMutations } from "vuex";
	// import ButtonToTop from '../../real-components/ButtonToTopForTest';
	export default {
		data(){
			return {
                // aboutData:null
                isChecked:null,
                isDisplay:false,//点击新增抬头
                personal:true,//个人
                enterprise:false,//企业
                isDefault:false,//是否勾选默认
                personalName:"",//姓名
                enterpriseName:"",//公司名
                idNumber:"",//身份证号
                dutyParagraphNo:"",//税号
                BillDatas:"",//存储发票抬头
				isActive:"",//改变保存按钮的颜色
				newArry:[],//保存2个抬头数据
			}
		},
		computed: {
	      	...mapGetters('hzh', [
	        	'saveBillshead',
	      	]),
	      	...mapGetters('hzh', [
	        	'saveBillsheadTwo',
	      	]),
	      	getBillList() {
	            return this.$store.state.hzh.getBillInfor;
	        },
	        getBillLists() {
	            return this.$store.state.hzh.newArry;
	        },
	    
	    },
		components:{
			// "my-header":MyHeader,
			// ButtonToTop,
		},
		methods: {
			chkvalue(){
				let personalNames = this.personalName;
                let idNumbers = this.idNumber;
                let dutyParagraphNos = this.dutyParagraphNo;
                let enterpriseNames = this.enterpriseName;
				if(this.personal){
					if(personalNames == '' || idNumbers == ''){
						this.isActive = false
					}else{
						this.isActive = true;
					}
                }
                else if(this.enterprise){
					if(dutyParagraphNos == '' || enterpriseNames == ''){
						this.isActive = false
					}else{
						this.isActive = true;
					}
                }
			},
            //点击新增抬头
            addNewHead(){
            	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证验证
                var username = /^[\u4E00-\u9FA5]{1,12}$/;//姓名
                var userenterprise = /^[\u4e00-\u9fa5]{1,30}$/;//公司名称
                var numbers = /^[A-Z0-9]{15,20}$/;
                if(this.isDisplay){
                    this.isDisplay = false;
                }else{
                    this.isDisplay = true;
                }
                let personalNames = this.personalName;
                let idNumbers = this.idNumber;
                let dutyParagraphNos = this.dutyParagraphNo;
                let enterpriseNames = this.enterpriseName;
                console.log(personalNames,idNumbers,dutyParagraphNos,enterpriseNames,"aiya9999999",this.personal)
                if(this.personal){
                	if(username.test(personalNames) === true && reg.test(idNumbers) === true) { 
						this.isActive = true;
					}else{
						this.isActive = false;
					}
//					if(personalNames == '' || idNumbers == ''){
//						this.isActive = false
//					}
//					if(personalNames == '' || idNumbers == ''){
//						this.isActive = false
//						console.log("jilaoguo3333",)
//					}else{
//						this.isActive = true;
//					}
                }
                else if(this.enterprise){
                	if(userenterprise.test(enterpriseNames) === true && numbers.test(dutyParagraphNos) === true) { 
						this.isActive = true;
					}else{
						this.isActive = false;
					}
//					if(dutyParagraphNos == '' || enterpriseNames == ''){
//						this.isActive = false
//					}else{
//						this.isActive = true;
//					}
                }
                
            },
            //点击个人
            choosePersonal(){
                if(this.personal){
                    this.personal = false;
                    this.enterprise = true;
                }else{
                    this.personal = true;
                    this.enterprise = false;
                }
            },
            //点击企业
	        chooseEnterprise(){
	            if(this.enterprise){
	                this.personal = true;
	                this.enterprise = false;
	            }else{
	                this.personal = false;
	                this.enterprise = true;
	            }
            },
            chooseIsDefault(){
                console.log("chooseIsDefault")
                if(this.isDefault){
                    this.isDefault = false;
                }else{
                    this.isDefault = true;
                }
            },
            //进入抬头管理
            goHeadManagement(){
                this.$router.push({path:'HeadManagement'})
                let data = "real"
                this.$store.dispatch('hzh/PutAValue',data)
            },
            //查询发票抬头
            getBillhead(){
            	this.$store.dispatch('hzh/GetBillheads');
//          	console.log("qweeqeq",this.saveBillshead)
//          	this.saveBillshead.forEach((val,list)=>{
//          		if(val.isDefaults){
//          			console.log("nihaoa***********************",list)
//          			this.checkeds(list)
//          		}
//          	})
//          	var sessionId = localStorage.getItem('sessionId');
//              let that = this;
//              var url = window.api.local_host + api.lookUpBills;
////				var url = "http://test.mall.yn.weilian.cn"+ api.lookUpBills;
//              var config = {
//                 url :url,
//                 method:"GET",
//                 headers: {'sessionId': sessionId, 'Content-Type':'application/json', 'Accept' : 'application/json'},
//              }
//              axios(config).then((res) => {
//                  console.log("guojilaoa888888888888", res)
//                  if(res.data.returnCode === 1){
//						this.BillDatas = res.data.data;
//						this.$store.dispatch('hzh/SaveClickAddress', this.BillDatas);
//						
//                  }else if(res.data.returnCode === 0){
////                  	MessageBox.confirm(res.data.errmsg);
//                  	MessageBox.confirm(res.data.errmsg).then(action => {
//		                   that.$router.push('/login');
//		                });
//                  }
//              
//              })
            },
			//新增确认提交
            putIn(){
                let type = this.personal == true ? '1' : '2';
                let choseDefault = this.isDefault == true ? '1' : '0';
                let personalNames = this.personalName;
                let idNumbers = this.idNumber;
                let isDefaults =  choseDefault;
                let dutyParagraphNos = this.dutyParagraphNo;
                let enterpriseNames = this.enterpriseName;
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证验证
                var username = /^[\u4E00-\u9FA5]{1,12}$/;//姓名
                var userenterprise = /^[\u4e00-\u9fa5]{1,30}$/;//公司名称
                var numbers = /^[A-Z0-9]{15,20}$/;
                console.log("进来了被")
                let result = 1;
                if(this.personal){
                	if(username.test(personalNames) === false ) { 
						MessageBox.alert("请输入正确的名字"); 
						return
					}
					if(reg.test(idNumbers) === false ) { 
						MessageBox.alert("身份证输入不合法"); 
						return
					}
					if(personalNames == '' || idNumbers == ''){
						this.isActive = false
					}
					//判断输入的是否是重复的数据
					let flag = 0;
					this.saveBillshead.forEach((item,index) => {
						if(item.idNumber === idNumbers){
							flag = 1;
							console.log("item---------------->",item,idNumbers)
							MessageBox.alert("保存失败，已存在该身份证号")
							result = '0';
						}
					})
					if(flag){
						return false;
					}
                }
                else if(this.enterprise){
                	if(userenterprise.test(enterpriseNames) === false ) { 
						MessageBox.alert("请输入正确的企业名"); 
						return
					}
					if(numbers.test(dutyParagraphNos) === false ) { 
						MessageBox.alert("企业税号输入不合法"); 
						return
					}
					if(dutyParagraphNos == '' || enterpriseNames == ''){
						this.isActive = false
					}
					//判断输入的是否是重复的数据
					let flag = 0;
					this.saveBillshead.forEach((item,index) => {
						if(item.dutyParagraphNo === dutyParagraphNos){
							flag = 1;
							console.log("item---------------->",item,dutyParagraphNos)
							MessageBox.alert("保存失败，已存在该税号")
						}
					})
					if(flag){
						return false;
					}
                }
                
				console.log("点击了保存-符合")
                let datas={};
                if(type == '1'){
                    datas.invoicesTitleType = "1",
                    datas.personalName  = personalNames,
                    datas.idNumber  = idNumbers,
                    datas.isDefault = isDefaults
                }else if(type == '2'){
                    datas.invoicesTitleType = "2",
                    datas.companyName  = enterpriseNames,
                    datas.dutyParagraphNo = dutyParagraphNos,
                    datas.isDefault = isDefaults
                }
                var sessionId = localStorage.getItem('sessionId');
                let that = this;
                var url = window.api.local_host + api.addBills;
//				var url = "http://test.mall.yn.weilian.cn"+ api.addBills;
                var config = {
                   url :url,
                   data:datas,
                   method:"POST",
                   headers: {'sessionId': sessionId, 'Content-Type':'application/json', 'Accept' : 'application/json'},
                }
                axios(config).then((res) => {
                    console.log("guojilaoa666666666666", res)
                    if(res.data.returnCode === 1){
                        MessageBox.alert('新增抬头成功').then(action => {
						  	this.$store.dispatch('hzh/GetBillheads');//查询发票抬头
						  	this.isDisplay = false;//关闭新增抬头
   							document.querySelector(".overhidAbout").scrollTop = 104;
// 							this.startmarquee(104,20,1500); // 第一个参数为上升的高度，第二个为速度
							this.personalName = "";
			                this.idNumber = "";
			                this.isDefault = '';
			                this.dutyParagraphNo = "";
			                this.enterpriseName = "";
						});
                        
                    }else if(res.data.returnCode === 0){
                    	MessageBox.confirm(res.data.errmsg).then(action => {
		                   that.$router.push('/login');
		                });
                    }
                
                })

            },
            //勾选发票抬头
            checkeds(data,val){
            	console.log("val110",val)
            	this.isChecked = val;
            	if(document.getElementsByClassName("chooseCheck")[val].checked){
            		console.log("进来了if")
				    this.$store.dispatch('hzh/GetBillInfor', data.rid);
				}else{
					console.log("进来了else")
					this.$store.dispatch('hzh/GetBillInfor',"");
				}
//          	this.$store.dispatch('hzh/GetBillInfor', data.rid);
            	
            },
            //改变保存按钮的状态
            chooseBtnType(){
            	for(let i=0;i<document.getElementsByClassName("chooseCheck").length;i++){
            		if (document.getElementsByClassName("chooseCheck")[i].checked) {
            			console.log("进来了if")
	            		this.isActive = true;
	            		this.$store.dispatch('hzh/GetBillInfor', data.rid);
	            	}else {
	            		console.log("进来了eslse")
	            		this.isActive = false;
	            		this.$store.dispatch('hzh/GetBillInfor', "");
	            	}
            	}
            	
            },
			//屏幕向上滑动
			startmarquee(lh,speed,delay) {
                var p=false;
                var t;
                var o=document.querySelector(".scrolls");
                o.innerHTML+=o.innerHTML;
                o.style.marginTop=0;
                o.onmouseover=function(){
                	p=true;
                }
                o.onmouseout=function(){
                	p=false;
                }
                function start(){
                    t=setInterval(scrolling,speed);
                    if(!p) o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
                }
                function scrolling(){
                    if(parseInt(o.style.marginTop)%lh!=0){
                        o.style.marginTop=parseInt(o.style.marginTop)-1+"px";
                        if(Math.abs(parseInt(o.style.marginTop))>=o.scrollHeight/2) o.style.marginTop=0;
                    }else{
                        clearInterval(t);
                        setTimeout(start,delay);
                    }
                }
                setTimeout(start,delay);
            }
		},
		created(){
			this.getBillhead();//查询发票抬头
			this.chooseBtnType();
			
		},
		watch: {
//	    	saveBillshead(newdata,olddata){
//				if(newdata[0]){
//					this.newArry[0] = newdata[0];
//				}
//				if(newdata[1]){
//					this.newArry[1] = newdata[1];
//				}
//				return this.newArry;
//				return newdata;
//			}
	    },
		async mounted() {
			let abc = await this.$store.state.hzh.goodsList;
			console.log("发射点发射点2",abc)
		},
	}
</script>

<style>
	.listers{
		padding: 0rem 0.75rem !important;
		justify-content: start !important;
		border-bottom: 0px;
	}
	.chooseBtn{
		background-color: #969896 !important;
		color: red !important;
	}
	.upDown{
		transform: rotate(45deg);
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 0.7rem;
		right: 1rem;
        border-right:1px solid rgba(107, 107, 107, 1);
        border-bottom:1px solid rgba(107, 107, 107, 1);
	}
	.Down{
		transform: rotate(45deg);
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 0.4rem;
		right: 1rem;
        border-right:1px solid rgba(107, 107, 107, 1);
        border-bottom:1px solid rgba(107, 107, 107, 1);
	}
	.upWard{
		transform: rotate(45deg);
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 1rem;
		right: 1rem;
        border-left:1px solid rgba(107, 107, 107, 1);
        border-top:1px solid rgba(107, 107, 107, 1);
	}
	.ward{
		transform: rotate(45deg);
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 0.7rem;
		right: 1rem;
        border-left:1px solid rgba(107, 107, 107, 1);
        border-top:1px solid rgba(107, 107, 107, 1);
	}
	.active{
		width:15% !important;
		
	}
</style>