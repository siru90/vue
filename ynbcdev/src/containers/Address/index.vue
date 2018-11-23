<template>
    <div>
        <div class="vue_app" style="position: absolute;width: 100%">
            <!-- <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
   
                <div @click="goUser" class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
     
                <div class="aui-title">收货地址</div>
                <div style="margin-top:0;" class="aui-pull-right text-del" @click="goAdd()">新增地址</div>
            </header> -->
            <!--头部-->
            <div class="aui-content top_div">
                <ul class="aui-list aui-media-list address_list">
                    <li class="aui-list-item" v-for="(item, index) in addressArr" :key="index" @click="chooseAddress(item)">
                        <div class="aui-media-list-item-inner">
                            <div class="aui-list-item-label-icon">
                                <i class="icon njfont nj-dizhi"></i>
                            </div>
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-text">
                                    <div class="aui-list-item-title">
                                        <strong>收货人：{{item.receivename}}</strong>
                                        <span class="aui-font-size-14 text_c_gray"></span>
                                    </div>
                                    <div class="aui-list-item-right aui-font-size-14">{{item.phone}}</div>
                                </div>
                                <p>
                                    <span class="aui-label aui-label-info">{{item.label}}</span>&nbsp;{{item.result}}</p>
                            </div>
                        </div>
                        <div class="edit_address">
                            <div class="aui-pull-left">
                                <label>
                                    <input class="aui-radio" type="radio" name="demo1" :checked="item.defaultaddress == '默认'" @click.stop="setDefault(item)">&nbsp;默认地址</label>
                            </div>
                            <div class="aui-btn aui-btn-outlined" @click.stop="goEdit(item)">
                                <i class="aui-iconfont aui-icon-edit"></i>编辑</div>
                            <div class="aui-btn aui-btn-outlined" @click.stop="doDelete(item)">
                                <i class="aui-iconfont aui-icon-trash"></i>删除</div>
                        </div>
                    </li>
                    <div id="contorlShow" v-if="haveAddress">
						<div id="disShow">
							<img src="static/image/no_data.png" alt="" />
							<p>暂无收货地址信息</p>
						</div>
					</div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import {mapMutations,mapGetters} from 'vuex'
import {getUserInfoAgain} from "../../components/config/getData.js"
import axios from 'axios'
import api from '../../api'
import API from "../../utils/url-router"
import * as gwTypes from "../../store/modules/gw-modules/mutation-types";
// import vConsole from "../../../static/script/vconsole.min.js"
import {Toast} from '../../utils/toast2'
import {MessageBox} from 'mint-ui'
//const api = window.api;
var {H5_HOST_URL} = API()
console.log("++++++++++", H5_HOST_URL)
export default {
    props: {

    },
    data() {
        return {
            addressArr: [],
            province: [],
            erp_api: {},
            userInfomation: {},
            haveAddress:false
        }
    },
    computed: {
        ...mapGetters({
            login: 'xhModules/login',
            sessionId: 'xhModules/sessionId',
            addressChooseAble: "gwModules/chooseAddressAble"
        }),
        userInfo () {
//      	console.log(123,this.$store.state.xhModules.userInfo);
            return this.$store.state.xhModules.userInfo
        }
    },
    watch:{
    	addressArr () {
    		if (this.addressArr.length === 0) {
    			this.haveAddress = true;
    		} else {
    			this.haveAddress = false;
    		}
    	},
    },
    methods: {
        ...mapMutations([
            'SET_HEADER',
            'CHOOSE_ADDRESS',
        ]),

        ...mapMutations('xhModules', [
			'USER_INFO',
			'LOGO_OUT',
       		'LOGO_IN'
		]),
        ...mapMutations('gwModules', [
			gwTypes.CHOOSE_ADDRESS_ABLE
		]),
		//重新获取userInfo  此方法是为了修复bug 实际没有也没关系  留着更稳妥
		async zxGetUserInfo(){
			let response = await getUserInfoAgain(this.sessionId);
			console.log('response', response)
		    if (response.returncode === 0) {

	          this.LOGO_OUT(false);
	          return
	        }

	        this.LOGO_IN(true);
	        this.USER_INFO(response.data[0]);
//	        console.log("userInfo",this.userInfo)
		},
        renderList (list) {
            this.addressArr = []
            list && list.map((item) => {
               this.getAwait(item);
            })
        },

        async getAwait(item) {
            let provinceName = this.getName(item.province,this.province)
            let cityList = (await this.getArea(item.province)).arealist
            let cityName = this.getName(item.city,cityList)
            let areaList = (await this.getArea(item.city)).arealist
            let areaName = this.getName(item.region,areaList)
            item.result = provinceName + ' ' + cityName + ' ' + areaName + ' ' + item.address
            this.addressArr.push(item)
            console.log(this.addressArr,'ass')
        },

        getName(val,arr) {
            let result = ''
            arr && arr.map((item) => {
                if(item.id == val){
                    result = item.name
                }
            });
            return result
        },

        // 获取所有省
        async getArea (code) {
            let res = await axios.get(window.api.mall_base_host + 'address/getarealist?areaid=' + code)
            return res.data.data
        },

        doDelete(item) {
            let params = {
				enterpriseid : this.userInfomation.enterpriseid,
				type : "DEL",
				vipdtlid: item.vipdtlid,
				mobile: this.userInfomation.phone,
			}
            let config = {
                method: "POST",
                url: window.api.mall_base_host + 'pubVip/updatevipaddress',
//              headers: {
//                  sessionId: this.sessionId
//              },
                data: {...params}
            }
            MessageBox.confirm('是否删除地址？').then((action)=>{
            	axios({...config}).then((res) => {
            		console.log(res.data.code)
                	if(res.status === 200) {
                		
	                    Toast({
	                        message: '删除成功',
	                        iconClass: "aui-iconfont aui-icon-correct",
	                        duration: 1000
	                    });
	                    let url = H5_HOST_URL + '/user/refreshUserInfo' + "?token=" + new Date().getTime();
	//                  console.log("这是加了时间戳的url", url);
//						console.log( this.sessionId,123)
						let sessionId = window.localStorage.sessionId;
	                    axios.get(url, {headers:{sessionId: sessionId}}).then((data) => {
//	                    	console.log(789)
	                        let userInfo = data.data.data[0]
	                        this.USER_INFO(userInfo)
	                        this.userInfomation = userInfo
	                        this.renderNew(userInfo)
	                    }).catch((Error)=>{
//	                    	console.log(err);
//	                    	 Toast({
//		                        message: '服务器错误',
//		                        iconClass: "aui-iconfont aui-icon-correct",
//		                        duration: 1000
//		                    });
	                    })
	                }else{
	                	Toast({
	                        message: '删除失败',
	                        iconClass: "aui-iconfont aui-icon-close",
	                        duration: 1000
	                    });
	                }

	            })
            });

        },

        goEdit(item) {
            this.$router.push({
                path: '/addAddress',
                query: {
                    data: {...item}
                }
            })
        },

        async renderNew(source) {
            console.log("renderNew方法里的source", source);
            let defalt = []
            let arr = []
            this.userInfomation = source
            this.userInfomation.addressList && this.userInfomation.addressList.map((item) => {
                if(item.defaultaddress == '默认'){
                    defalt.push(item)
                    return
                } else {
                    arr.push(item)
                }
            })
            let province = await this.getArea('1')
            this.province = province.arealist
            this.renderList([...defalt,...arr])
        },

        setDefault(item) {
            let {defaultaddress,label,sex,...rest} = item
            let userData = this.userInfomation
            if(label == '家庭'){
                label = '0'
            }
            if(label == '公司'){
                label = '1'
            }
            if(label == '其他'){
                label = '2'
            }
            if(sex == '男'){
                sex = '0'
            } else {
                sex = '1'
            }
            let params = {
                enterpriseid : userData.enterpriseid,
                type : "UPDATE",
                mobile : userData.phone,
                vipid: userData.vipid,
                defaultaddress: '1',
                label,
                sex,
                ...rest
            }
            console.log(989889);
            axios.post(window.api.mall_base_host + 'pubVip/updatevipaddress',{...params}).then((res) => {
            	console.log(123)
                if(res.status === 200) {
                    Toast({
                        message: '修改成功',
                        iconClass: "aui-iconfont aui-icon-correct",
                        duration: 1000
                    });
                    let url = window.api.local_host + '/user/refreshUserInfo' + "?token=" + new Date().getTime();
                    console.log("这是加了时间戳的url", url);
//						console.log( this.sessionId,123)
//zx
					let sessionId = window.localStorage.sessionId;

                    axios.get(url, {headers:{sessionId: sessionId}}).then((data) => {
                        let userInfo = data.data.data[0]
                        this.USER_INFO(userInfo)
                    }).catch((err)=>{
//                      	console.log(err);
//                      	Toast({
//	                            message: '服务器错误',
//	                            iconClass: "aui-iconfont aui-icon-correct",
//	                            duration: 1000
//	                        });
                    })
                }
            })
        },

        chooseAddress(item) {
            if(this.addressChooseAble) {
                this.CHOOSE_ADDRESS(item)
                this[gwTypes.CHOOSE_ADDRESS_ABLE](false);
                if(this.$route.params.index != undefined){
                	window.history.go(-3);
                }else{
                	window.history.back();
                }
//              window.history.back();
//				window.location.replace("/#/confirmorder");
//              this.$router.push({"path": "/confirmorder"});
            }
        },

        goUser(){
//          window.history.back()

			if(this.addressChooseAble){
				this[gwTypes.CHOOSE_ADDRESS_ABLE](false);
				if(this.$route.params.index != undefined){
//					console.log(999999999999999);
					window.history.go(-3);
				}else{
					window.history.back();
				}
//				this.$router.push('/confirmorder');
			}else{
           		 this.$router.push('/main/profile');
			}

        },

        goAdd () {
            this.$router.push({"path": "/addAddress"})
        }
    },
    async created (){
    	await this.zxGetUserInfo();

        if(this.login){
            this.SET_HEADER({

                titlePart: {
                    isHome: false,
                    title: '收货地址'
                },
                hasSearch: false,
                handlePart: {
                    type: '4',
                    handleClick: () => {
                        this.$router.push({path:'/addAddress'})
                    }
                }
            })
        } else {
            MessageBox.alert('请先登录').then(action => {
                this.$router.push({"path": "/main/classify"});
            });
            //this.$router.push({path:'/login'})
        }
    },
    mounted (){
//      console.log(111111111111111111);
        if(this.login) {
//          console.log("用户已经登录，已经走到该流程");
//          console.log("用户已经登录，已经走到该流程", this.userInfo);
			console.log(this.userInfo,'8888')
            this.renderNew(this.userInfo);
        }
        document.querySelector('body').id = "address"
//      console.log(this.$route.params.index,'index');
    },
    beforeDestroy() {
        document.querySelector('body').id = ""
    },

}
</script>

<style>
    #address header{
        display: block !important;
    }
    #address .text-del {
        margin-top: 0;
    }
	#address #contorlShow{
		position: relative;
		width: 100%;
		text-align: center;
	}
	#address #disShow{
		width: 50%;
		height: 50%;
		text-align: center;
		margin-top:4em;
		display: inline-block;
	}
	#address #disShow img{
		margin: 0 auto;
	}
	#address #disShow p{
		margin-top:2em;
	}
</style>


