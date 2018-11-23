<template>
    <div>
        <!--<my-header :title="'发票详情'" :hasTitle="true" :hasBack="true"></my-header>-->
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:relative;">
			<div class="go-back" @click.stop="goBack">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">发票详情</div>
			<!--<div class="aui-pull-right text-del" @click.stop="clearCar" v-if="cartArray.length">删除</div>-->
		</header>
        <div class="aui-content aui-margin-b-15" style="margin-top:0.75rem;">
            <ul class="aui-list" style="">
                <div class="aui-billdetail">
                    <div style="display:inline-block;line-height: 2.2rem;">
                        <div style="text-align: left;">发票状态:</div>
                    </div>
                    <div style="display:inline-block;line-height:2.2rem;" v-if="BillDetails.url">已开票</div>
                    <div style="display:inline-block;line-height:2.2rem;" v-else>开票中</div>
                </div>
                    
                <div class="aui-billdetail">
                    <div>
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">订单编号:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{BillDetails.parentOrderNo}}</div>
                    </div>
                    <div>
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">下单时间:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{this.getTime(creTimes)}}</div>
                    </div>
                </div>
                <div class="aui-billdetail">
                    <div>
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">发票抬头:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{BillDetails.orderInvoiceTitle ? (BillDetails.orderInvoiceTitle.personalName ? BillDetails.orderInvoiceTitle.personalName : BillDetails.orderInvoiceTitle.companyName):""}}</div>
                    </div>
                    <div v-if="BillDetails.orderInvoiceTitle && BillDetails.orderInvoiceTitle.invoicesTitleType == '1'">
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">身份证号:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{BillDetails.orderInvoiceTitle.idNumber}}</div>
                    </div>
                    <!--<div v-if="BillDetails.orderInvoiceTitle && BillDetails.orderInvoiceTitle.invoicesTitleType == '2'">
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">发票抬头:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{BillDetails.orderInvoiceTitle.companyName}}</div>
                    </div>-->
                    <div v-if="BillDetails.orderInvoiceTitle && BillDetails.orderInvoiceTitle.invoicesTitleType == '2'">
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">税号:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{BillDetails.orderInvoiceTitle.dutyParagraphNo}}</div>
                    </div>
                    <div>
                        <div style="display:inline-block;line-height: 2.2rem;">
                            <div style="text-align: left;">发票内容:</div>
                        </div>
                        <div style="display:inline-block;line-height:2.2rem;">{{BillDetails.invoiceContext}}</div>
                    </div>
                </div>
                <div  class="aui-billdetail" style="text-align: right;line-height:2.6rem;" v-if="BillDetails.url">
                    <div class="lookBill" @click='lookBill'>
                    	<!--查看发票-->
                        <a :href='BillDetails.url'>查看发票</a>
                    </div>
                    <div class="setMeail" @click="setEmail" >发送邮箱</div>
                </div>
            </ul>
        </div>
        <mt-popup ref="BillDetail" v-model="popupVisible" popup-transition="popup-fade" modal="true" closeOnClickModal="true" class="setEmail">
			<Bill-SetEmail  @hideModal="updateType" :orderNos="BillDetails.orderNo ? BillDetails.orderNo:''" :parentOrderNo = "ParentOrderNo ? ParentOrderNo : ''"></Bill-SetEmail>
		</mt-popup>
    </div>
</template>
<script>
//	import MyHeader from "../header";
    import axios from "axios";
    import { Popup ,MessageBox} from 'mint-ui';
    import BillSetEmail from "../../components/BillSetEmail";
    import { mapState, mapGetters, mapMutations } from "vuex";
//  import {getBills} from "../../api";
    import api from "../../api";
	// import ButtonToTop from '../../real-components/ButtonToTopForTest';
	export default {
		data(){
			return {
                // aboutData:null
                isChecked : true,
                CheckedElect : false,
                contentShows : false,
                popupVisible : false,
                orderNo : "",
                BillDatas:"",
                imgDwonLoad:"",
                orderNos:"",
                ParentOrderNo:"",
                BillDetails:"",
                creTimes:''
			}
		},
		computed: {
	      ...mapGetters('hzh', [
	        'saveBillshead',
	      ]),
//	      getBillDatas(){
//	      	this.ParentOrderNo = this.$router.history.current.query.ParentOrderNo;
//	      	return this.getBillDetail(this.ParentOrderNo)
//	      }
	    
	    },
		components:{
//			"my-header":MyHeader,
            // ButtonToTop,
            'mt-popup': Popup,
            "Bill-SetEmail": BillSetEmail,
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
            setEmail() {
//              this.popupVisible = true;
				MessageBox.prompt('请输入邮箱地址').then(({ value, action }) => {
				  	//邮箱验证
					var regEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
					if(!regEmail.test(value)){
		                MessageBox.alert("邮箱格式不正确")
		                return;
		            }
		        	var sessionId = localStorage.getItem('sessionId');
		            let email = value;
		            let parentOrderNo = this.ParentOrderNo;
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
				});
            },
            updateType(data) {
				this.popupVisible = data.detele;//改变了父组件的值 
			},
			lookBill(){
//				await this.$store.dispatch('hzh/GetBillheads');
				console.log("aiyaa/////////",this.BillDetails.url)
//				window.location.href = this.BillDetails.url;
//				this.BillDetails.forEach(items => {
//					if(items.orderNos == this.orderNos){
//						this.imgDwonLoad = items.Url
//					}
//				})
//				this.$router.push(this.BillDetails.url);
			},
			getBillDetail(val) {
//				return new Promise((resolve,reject)=>{
					var sessionId = localStorage.getItem('sessionId');
		            var url = window.api.local_host + '/' + api.getBills + '/' + val;
		            var config = {
		               url,
		               method: "GET",
		               headers: {sessionId},
		            }
		            console.log("bbbbbbbbbb9",sessionId)
		            axios(config).then((res) => {
		                console.log("uuuuuuuuuuuiiiiiiii", res)
		                if(res.data.returnCode === 1){
							this.BillDetails = res.data.data[0];
	//						this.$store.dispatch('hzh/SaveClickAddress', res.data.data);
//							resolve(true)
		                }else if(res.data.returnCode === 0){
							this.BillDetails = res.data.data[0];
//	                		MessageBox.alert(res.data.msg)
//		                	resolve(false)
	//	                	.confirm(res.data.errmsg).then(action => {
	//		                   this.$router.push('/login');
	//		                });
		                }
		            
		            })
//	            })
			},
			//转换时间格式
		    getTime(param){
		        let date = new Date(Number(param));
		        let year = date.getFullYear();
		        let month = checkTime(date.getMonth() + 1);
		        let day = checkTime(date.getDate());
		        let hour = checkTime(date.getHours());
		        let min = checkTime(date.getMinutes());
		        let sec = checkTime(date.getSeconds());
		
		        function checkTime(i) {
		          if (i < 10) {
		            i = '0' + i;
		          }
		          return i;
		        }
		
		        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
		    }
			
        },
        async created() {
            if (this.isChecked) {
                this.contentShows = false;
            }
            this.orderNos = this.$router.history.current.query.orderNo;
            this.ParentOrderNo = this.$router.history.current.query.ParentOrderNo;
            //this.creTimes = this.$router.history.current.query.creTime;
            this.creTimes = this.$route.query.creTime
            console.log("orderNo----------------",this.orderNos)
            await this.getBillDetail(this.ParentOrderNo);
        },
        mounted() {
            
        },
	}
</script>

<style>
.aui-billdetail{
    text-align: left;
    border-bottom: 1px solid #eaeaea;
    padding:0 0.75rem;
}
.lookBill{
    border: 1px solid rgb(153, 153, 153);
    border-radius: 0.34rem;
    width: 4.2rem;
    height: 1.8rem;
    display: inline-block;
    line-height: 1.8rem;
    text-align: center;
}
.setMeail{
    border: 1px solid rgb(153, 153, 153);
    border-radius: 0.34rem;
    width: 4.2rem;
    height: 1.8rem;
    display: inline-block;
    line-height: 1.8rem;
    text-align: center;
}
.setEmail{
    width: 80%;
	height: 30%;
	border-radius: 0.4rem;
}
</style>
