<template>
	<li class="aui-list-item">
        <div style="color:#ffffff;" class="aui-btn aui-btn-block" @click.stop="saveInfor" v-bind:class="{ 'aui-btn-danger' : getBillList.length?true:false }">
         	确认
        </div>
    </li>
	
	
</template>

<script>
	import axios from "axios";
	import api from "../../api";
	import {Popup, MessageBox} from 'mint-ui';
	import { mapState, mapGetters, mapMutations } from "vuex";
	export default {
		data(){
			return {
				ParentOrderNos:"",
				rids:'',
			}
		},
      	props: {
//	      	orderNo: {
//		        type: String,
//	//		        default: () => {
//	//		          return false
//	//		        }
//		        required:true
//		    },
		    types: {
		        type: Boolean,
	//		        default: () => {
	//		          return false
	//		        }
		        required:true
		    },
	    },
	    computed: {
	    	getBillList() {
                return this.$store.state.hzh.getBillInfor;
            },
            getBillContent() {
                return this.$store.state.hzh.BillContent;
            },
            
	    },
		components:{
			// "my-header":MyHeader,
		},
		watch:{
			
		},
		methods: {
            //保存信息
	      	async saveInfor(){
	      		let getVal = this.$router.history.current.query.datas;
	      		this.ParentOrderNos =  this.$router.history.current.query.parentOrderNo;
	      		let abc = await this.$store.state.hzh.goodsList;
				console.log("999999",abc,this.$router.history.current.query.parentOrderNo)
	      		if(getVal){
	      			this.openBills(abc);
//	      			
//	      			console.log("开票申请的跳转到订单页")
//	      			this.$router.push('order')
	      			return
	      		};
	      		if(this.getBillList.length == 0){
      			 	MessageBox.alert('请选择发票抬头')
      			 	return
	      		}
	      		this.$store.dispatch('hzh/SaveBillBtn', "tures");
	      		console.log("zhouxinsjhige111",this.getBillList,this.getBillContent)
	      		this.$router.go(-1);
	      	},
	      	//开票申请的接口
	      	async openBills(abc){
		    	await this.$store.dispatch('hzh/GetBillheads');
//				abc.forEach(items => {
//					this.rids = items.rid
//				})
		    	var sessionId = localStorage.getItem('sessionId');
//		    	console.log("content////////",this.SaveBillContent) 
	            var url = window.api.local_host + api.BillAplys +"?invoicesTitleId="+ this.getBillList+"&invoiceContext="+ this.getBillContent+"&parentOrderNo="+ this.ParentOrderNos;
	            console.log(url,"我贼强啊")
	            var config = {
	               url,
	               method: "put",
	               headers: {sessionId},
	            }
	            await axios(config).then((res) => {
	                console.log("hahahahahahahaha222", res)
	                if(res.data.returnCode === 1){
	                	console.log("开票申请的跳转到订单页")
	                	MessageBox.alert("开发票成功!").then(action => {
		                   this.$router.push('order')
		                });
//	      				this.$router.push('order')
//						this.BillDetails = res.data.data;
//						this.$store.dispatch('hzh/SaveClickAddress', res.data.data);
						
	                }else if(res.data.returnCode === 0){
	                	MessageBox.alert("开发票失败，请稍后再试!").then(action => {
		                   this.$router.push('order')
		                });

//	                	.confirm(res.data.errmsg).then(action => {
//		                   this.$router.push('/login');
//		                });
	                }
	            
	            })
	      	}
			
		},
		mounted() {
			
		},
	}
	
</script>

<style>
</style>