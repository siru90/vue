<template>

	<div id="" v-if="canInvoice">
		<div class="aui-btn aui-btn-outlined" style="color: initial;" v-show="hasInvoice === 0" @click.stop="exploitBills(orderNo);">
	        开票申请
	    </div>
	</div>
</template>
<script>
	import axios from "axios";
	import api from "../../api";
	import {Popup, MessageBox} from 'mint-ui';
	import { mapState, mapGetters, mapMutations } from "vuex";
	export default {
		data(){
			return {
				rids:"",
				content:"",
				real:""
			}
		},
		props: {
		    hasInvoice: {
		        type: Number,
//		        default: () => {
//		          return false
//		        }
				required:true
		    },
		    orderNo: {
		        type: String,
//		        default: () => {
//		          return false
//		        }
		        required:true
		    },
		    ParentOrderNo: {
		        type: String,
//		        default: () => {
//		          return false
//		        }
		        required:true
		    },
		    configTime: {
//		        type: Number,
//		        default: () => {
//		          return false
//		        }
		        required:true
		    },
		    canInvoice: {
		        type: Boolean,
//		        default: () => {
//		          return false
//		        }
		        required:true
		    },
	    },
	    computed: {
		    ...mapGetters('hzh', [
		       'saveBillshead',
		    ]),
	    	...mapGetters('hzh', [
		       'SaveBillContent',
		    ]),
	    },
		components:{
			// "my-header":MyHeader,
		},
		methods: {
			//判断是否是开票申请7天后
			getTimes(){
				//获取当前时间戳
				var timestamp = new Date().getTime();
				console.log("this.configTime;",this.configTime)
				var configTime = this.configTime;
				var differData = timestamp - configTime;
				//计算毫秒
				var sorc = differData/1000;
				//计算分钟数
				var mins = sorc/60;  
				//计算小时数
				var hours = mins/60; 
				console.log("differData11111",sorc,mins,hours)
				
				if(mins < 30){
					this.real = true;
					MessageBox.alert("确认收货七天之后才能补开发票")
				}
				
			},
            //开票申请
		    async exploitBills(val){
//		    	await this.getTimes();
		    	if(!this.canInvoice){
		    		MessageBox.alert("该订单不能开发票")
		    		return;
		    	}
		    	if(this.real){
		    		return;
		    	}
		    	
		      	console.log("zhouxinsjhige6666",val)
		      	let item = val;
//		      	this.BillAply();
		      	this.$router.push({name:'BillDetail',query:{datas:item,parentOrderNo:this.ParentOrderNo}})	
		      	
		    },
		    async BillAply(){
		    	await this.$store.dispatch('hzh/GetBillheads');
				console.log("saveBillshead/////////",this.saveBillshead,this.orderNo)
				//有问题  方法需要改
				this.saveBillshead.forEach(items => {
//					if(items.orderNo == this.orderNo){
						this.rids = items.rid;
						this.content = this.SaveBillContent;
//					}
				})
		    	var sessionId = localStorage.getItem('sessionId');
		    	console.log("content////////",this.SaveBillContent)
	            var url = window.api.local_host + api.BillAplys + this.rids +"/"+ this.content+"/"+ this.ParentOrderNo;
	            console.log(url,"我贼强啊11111")
	//			var url = "http://test.mall.yn.weilian.cn"+ api.lookUpBills;
	            var config = {
	               url,
	               method: "put",
	               headers: {sessionId},
	            }
	            console.log("qqqqqqqqqqq9",sessionId)
	            await axios(config).then((res) => {
	                console.log("hahahahahahahaha222", res)
	                if(res.data.returnCode === 1){
						this.BillDetails = res.data.data;
//						this.$store.dispatch('hzh/SaveClickAddress', res.data.data);
						
	                }else if(res.data.returnCode === 0){
	                	MessageBox.alert(res.data.errmsg)
//	                	.confirm(res.data.errmsg).then(action => {
//		                   this.$router.push('/login');
//		                });
	                }
	            
	            })
		    }
			
		},
		created(){

		},
		mounted() {
			
		},
	}
	
	
	
	
	
	
	
	
</script>

<style>
	
</style>