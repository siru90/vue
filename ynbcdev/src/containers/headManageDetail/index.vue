<template>
    <div>
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div class="go-back"  @click.stop="mGoBacks">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="aui-title">抬头管理</div>
            <div @click.stop="deletes" style="margin-right: 3%;font-weight:400;position: absolute;top: 0px;right: 0rem;height: 100%;">
                	删除
            </div>
        </header>
        <div style=" width: 100%;top: 4rem;left: 0;position: fixed;">
            <ul class="aui-list">
                <li class="" style="padding-top:1rem;padding:0.75rem 0.75rem;">
                    <div style="display:inline-block;width: 25%;height: 1.5rem;" >	
                        <input class="aui-checkbox" type="checkbox" :checked="personal" disabled="disabled">
                        <span style="margin-left:0.5rem;line-height: 1.2rem;">个人</span>
                    </div>
                    <div style="display:inline-block;width: 25%;" >	
                        <input class="aui-checkbox" type="checkbox" :checked="enterprise" disabled="disabled">
                        <span style="margin-left:0.5rem;line-height: 1.2rem;">企业</span>
                    </div>
                    
                    <div style="display:inline-block;width: 45%;text-align: right;" @click.stop="chooseIsDefault">	
                        <input class="aui-checkbox" type="checkbox" :checked="isDefault" >
                        <span style="margin-left:0.5rem;line-height: 1.2rem;">是否默认</span>
                        
                    </div>
                </li>
                <!-- 勾选个人or企业 -->
                <li class="aui-list-item">
                    <div class="aui-list-item-label" style="text-align:left;width:28%;" :class="{'active':enterprise}">
                        <span style="color:red;" v-if="personal">*<span style="color:#444444;">姓名</span></span>
                        <span style="color:red;" v-if="enterprise">*<span style="color:#444444;">名称</span></span>
                    </div>
                    <div class="aui-list-item-input">
                        <input style="font-size: 0.6rem;" type="text" v-on:input="chkvalue(this)" placeholder="请输入真实姓名" v-if="personal" v-model="realNames"/>
                        <input style="font-size: 0.6rem;" type="text" v-on:input="chkvalue(this)" placeholder="请输入公司名称" v-if="enterprise" v-model="companyName"/>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-label" style="text-align:left;width:28%;" :class="{'active':enterprise}">
                        <span style="color:red;" v-if="personal">*<span style="color:#444444;">身份证号</span></span> 
                        <span style="color:red;" v-if="enterprise">*<span style="color:#444444;">税号</span></span> 
                    </div>
                    <div class="aui-list-item-input">
                        <input type="text" style="font-size: 0.6rem;" v-on:input="chkvalue(this)" placeholder="请输入身份证号码" v-if="personal"  v-model="idNumber"/>
                        <input type="text" style="font-size: 0.6rem;" v-on:input="chkvalue(this)" placeholder="请输入纳税人识别号 或 社会统一征信代码" v-if="enterprise" v-model="dutyParagraphNo"/>
                    </div>
                </li>
                
            </ul>
        </div>
        <div class="aui-list-item" style="position: absolute; bottom: 0;width:100%;">
            <div style="" class="aui-btn aui-btn-block" @click.stop="saveEvent" v-bind:class="{ 'aui-btn-danger' : isActive }">
                	保存
            </div>
        </div>
    </div>
</template>
<script>
// import MyHeader from "../header";
import axios from "axios";
import {Popup, MessageBox} from 'mint-ui';
import { mapState, mapGetters, mapMutations } from "vuex";
import api from "../../api";
// import ButtonToTop from '../../real-components/ButtonToTopForTest';
export default {
	data(){
		return {
            personal:true,//个人
            enterprise:false,//企业
            isDefault:false,//是否勾选默认
            _rid:"",//传过来的rid值
            lists:"",//保存对应的rid的数据
            realNames:'',//个人姓名
            companyName:'',//公司名称
            idNumber:'',//身份证号
            dutyParagraphNo:'',//税号
            isActive:'',
           
		}
	},
	computed: {
      ...mapGetters('hzh', [
        'saveBillshead',

      ]),
      
    },
	components:{
		// "my-header":MyHeader,
		// ButtonToTop,
	},
	methods: {
		chkvalue(){
				console.log("jilaoguo11",this.realNames)
				let personalNames = this.realNames;
                let idNumbers = this.idNumber;
                let dutyParagraphNos = this.dutyParagraphNo;
                let enterpriseNames = this.companyName;
				if(this.personal){
					if(personalNames == '' || idNumbers == ''){
						this.isActive = false
						console.log("jilaoguo22",)
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
		//删除事件
        deletes(){
        	MessageBox.confirm('确定是否删除?').then(action => {
	        	console.log("点击了删除")
	            var sessionId = localStorage.getItem('sessionId');
	            let that = this;
	            let rid = this._rid;
	            console.log("nihaoa",rid)
	            let isDefault = this.isDefault?'1':'0';
	            console.log(isDefault,"isDefault")
	            if(isDefault){
	            	console.log("0.0---")
	            	this.$store.dispatch('hzh/GetBillInfor',"");
	            }
	            var url = window.api.local_host + api.deleteBills+rid;
	//			var url = "http://test.mall.yn.weilian.cn"+ api.deleteBills;
	            var config = {
	               url :url,
	//             data:datas,
	               method:"delete",
	               headers: {'sessionId': sessionId, 'Content-Type':'application/json', 'Accept' : 'application/json'},
	            }
	            axios(config).then((res) => {
	                console.log("guojilaoa666666666666", res)
	                if(res.data.returnCode === 1){
	//                  MessageBox.alert("删除成功").then(action => {
						  	this.$store.dispatch('hzh/GetBillheads');//查询发票抬头
						  	that.$router.replace('/main/HeadManagement');
	//					});
	                    
	                }else if(res.data.returnCode === 0){
	                	MessageBox.confirm(res.data.errmsg).then(action => {
		                   that.$router.push('/login');
		                });
	                }
	            
	            })
            });
            
        },
        //保存事件
        saveEvent(){
        	let personalNames = this.realNames;
            let idNumbers = this.idNumber;
            let dutyParagraphNos = this.dutyParagraphNo;
            let enterpriseNames = this.companyName;
        	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证验证
            var username = /^[\u4E00-\u9FA5]{1,12}$/;//姓名
            var userenterprise = /^[\u4e00-\u9fa5]{1,30}$/;//公司名称
            var numbers = /^[A-Z0-9]{15,20}$/;
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
            }
        	let datas = {};
        	if(this.personal){
				datas.invoicesTitleType = '1';
				datas.personalName = this.realNames;
				datas.idNumber = this.idNumber;
				datas.isDefault = this.isDefault?'1':'0';
				datas.rid = this._rid;
				
        	}else if(this.enterprise){
        		datas.invoicesTitleType = '2';
				datas.companyName = this.companyName;
				datas.dutyParagraphNo = this.dutyParagraphNo;
				datas.isDefault = this.isDefault?'1':'0';
				datas.rid = this._rid;
        	}
        	var sessionId = localStorage.getItem('sessionId');
            let that = this;
            var url = window.api.local_host + api.putBills;
//				var url = "http://test.mall.yn.weilian.cn"+ api.putBills;
            var config = {
               url :url,
               data:datas,
               method:"PUT",
               headers: {'sessionId': sessionId, 'Content-Type':'application/json', 'Accept' : 'application/json'},
            }
            axios(config).then((res) => {
//              console.log("guojilao3333333", res)
                if(res.data.returnCode === 1){
                	MessageBox.alert("保存成功").then(action => {
					  	this.$store.dispatch('hzh/GetBillheads');//查询发票抬头
					  	this.$router.replace('/main/HeadManagement');
					});
//					this.BillDatas = res.data.data;
//					this.$store.dispatch('hzh/SaveClickAddress', this.BillDatas);
					
                }else if(res.data.returnCode === 0){
//                  	MessageBox.confirm(res.data.errmsg);
                	MessageBox.confirm(res.data.errmsg).then(action => {
	                   that.$router.push('/login');
	                });
                }
            
            })
        	
        },
        mGoBacks(){
//          this.$router.push({path:"HeadManagement"})
//			window.history.back();
			this.$router.replace('/main/HeadManagement');
        },
        //点击个人or企业
        chooseStyle(){
        	console.log("zhouxinaaaaaa")
//          if(this.personal){
//              this.personal = true;
//              this.enterprise = false;
//          }else{
//          	console.log("jinlailea------>")
//              this.personal = false;
//              this.enterprise = true;
//          }
        },
        chooseIsDefault(){
            console.log("chooseIsDefault")
            if(this.isDefault){
                this.isDefault = false;
            }else{
                this.isDefault = true;
            }
        },
        //获取传过来的rid所对应的数据
        dealWithDatas(){
        	this.saveBillshead.forEach((item)=>{
        		if(this._rid == item.rid){
        			this.lists = item;
        			if(item.invoicesTitleType == 1){
        				console.log(item,"------")
        				this.personal = true;
        				this.realNames = item.personalName;
        				this.idNumber = item.idNumber;
        				this.isDefault = item.isDefault==1?true:false;
        			}else if(item.invoicesTitleType == 2){
        				console.log(item,"+++++++")
        				this.enterprise = true;
        				this.personal = false;
        				this.companyName = item.companyName;
        				this.dutyParagraphNo = item.dutyParagraphNo;
        				this.isDefault = item.isDefault==1?true:false;
        			}
        		}
        	})
        }

		
    },
    created(){
        if(this.isChecked){
            this.contentShows = false;
        }
        this._rid = this.$router.history.current.query.datas;
        console.log(this.$router.history.current.query,"6666666")
        this.dealWithDatas();
        this.chkvalue();
    },
    
	mounted() {
		
	},
}
</script>

<style>

</style>
