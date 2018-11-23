<template>
    <div style="height: 100%;">
        <div class="aui-write" style="height: 7.3rem;">
            <div class="titles" style="text-align: center;">请输入邮箱地址</div>
            <input type="text" style="" v-model="pushEmail"/>
            
        </div>
        <div class="aui-setemail" style="height: 2.7rem;">
            <div style="display:inline-block;border-right:1px solid #d7d2d2;height: 100%;" @click="deteles">取消</div>
            <div style="display:inline-block;height: 100%;" @click="commit">发送</div>
        </div>
    </div>
    
</template>
<script>
import axios from "axios";
import api from "../../api";
import { Popup ,MessageBox} from 'mint-ui';

export default {
    data(){
        return {
            // aboutData:null
            detele:"",
            pushEmail:"",
//          parentOrderNo:""
        }
    },
  	props: {
      orderNos: {
        type: String,
//		        default: () => {
//		          return false
//		        }
        required:true
      },
      parentOrderNo: {
        type: String,
//		        default: () => {
//		          return false
//		        }
        required:true
      },
    },
    components:{
        // "my-header":MyHeader,
        // ButtonToTop,
        // 'mt-popup': Popup,
        // "Bill-setEmail":BillSetEmail,
    },
    methods: {
        deteles(){
            console.log("adjashfiasfhia////")
            this.detele = false;
            let data = {
                detele:this.detele,
            }
            this.$emit('hideModal',data);//select事件触发后，自动触发showCityName事件 
        },
        commit(){
        	//邮箱验证
			var regEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!regEmail.test(this.pushEmail)){
                MessageBox.alert("邮箱格式不正确")
                return;
            }
        	var sessionId = localStorage.getItem('sessionId');
            let email = this.pushEmail;
            let parentOrderNo = this.parentOrderNo;
            console.log("nihaoa122121",this.parentOrderNo)
            var url = window.api.local_host + api.setEmail + parentOrderNo +"/"+ email;
//			var url = "http://test.mall.yn.weilian.cn"+ api.deleteBills;
            var config = {
               url :url,
//             data:datas,
               method:"PUT",
               headers: {'sessionId': sessionId, 'Content-Type':'application/json', 'Accept' : 'application/json'},
            }
            axios(config).then((res) => {
                console.log("guojilaoa666666666666", res)
                if(res.data.returnCode === 1){
                    MessageBox.alert("发送成功").then(action => {
//					  	this.$store.dispatch('hzh/GetBillheads');//查询发票抬头
//					  	this.$router.push('/main/HeadManagement');
					  	this.deteles();
					});
                    
                }else if(res.data.returnCode === 0){
                	MessageBox.confirm(res.data.errmsg)
//              	.then(action => {
//	                   this.$router.push('/login');
//	                });
                }
            
            })
        },
        
    },
    created(){
        if(this.isChecked){
            this.contentShows = false;
        }
    },
    mounted() {
        
    },
}
</script>

<style>
    .aui-write{
        padding:0.75rem 0.75rem; 
    }
    .aui-write .titles{
        font-size: 1rem;
        height: 2.2rem;
    }
    .aui-write input{
        padding:0.25rem ;
        border:1px solid #d7d2d2;
        height: 2rem;
        font-size: 1rem;
        border-radius: 0.3rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .aui-setemail{
        border-top: 1px solid #d7d2d2;
    }
    .aui-setemail div{
        cursor: pointer;
        display:inline-block;
        font-size: 1rem;
        text-align: center;
        line-height: 2.2rem;
        width: 49%;
    }
</style>