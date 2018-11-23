<template>
	<div id="">
		<div class="aui-btn aui-btn-outlined" v-show="hasInvoice === 1" @click="lookUpBills(orderNo);" style="margin:0;">
                        查看发票
    	</div>
	</div>
	
</template>	
<script>
	import axios from "axios";
	export default {
		data(){
			return {
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
	      creTime: {
	        type: Number,
//		        default: () => {
//		          return false
//		        }
	        required:true
	      },
	    },
	    
		components:{
			// "my-header":MyHeader,
		},
		methods: {
            //查看发票
		      	lookUpBills(val){
		      		console.log("zhouxinsjhige111",val)
		      		this.$router.push({name:'/main/BillParticulars',query:{orderNo:val,ParentOrderNo:this.ParentOrderNo,creTime:this.creTime}})	  
		      	},
			
		},
		mounted() {
//			console.log("chakan",this.hasInvoice,this.orderNo)
		},
	}
	

	
	
</script>

<style>
</style>