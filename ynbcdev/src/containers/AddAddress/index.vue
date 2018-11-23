<template>
    <div>
        <div class="vue_app" style="position: absolute;width: 100%; z-index:99">
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <!--<router-link to="/main/address">-->
                <div @click="showMes" class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <!--</router-link>-->
                <div class="aui-title">{{isEditInfo}}</div>
                <div class="aui-pull-right text-del" @click="handleSubmit()">保存</div>
            </header>
            <div style="height: 3rem;"></div>
            <!--头部-->
            <div class="aui-content top_div">
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <!--<li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">省/地级市</div>
                            <div class="aui-list-item-input aui-list-item-arrow" @click="chooseProvince">
                                <p>{{province}}</p>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">城市/区域</div>
                            <div class="aui-list-item-input aui-list-item-arrow" @click="chooseCity">
                                <p>{{city}}</p>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">县/区</div>
                            <div class="aui-list-item-input aui-list-item-arrow" @click="chooseArea">
                                <p>{{area}}</p>
                            </div>
                        </div>
                    </li>-->
                    <li class="aui-list-item">
	                	<div class="aui-list-item-inner">
	                        <div class="aui-list-item-label">选择地区</div>
	                        <div class="aui-list-item-input aui-list-item-arrow">
	                            <p id="name" @click="getAddress('1','2','33')">{{province}} {{city}} {{area}}</p>
	                        </div>
	                    </div>
                    </li>
                    <li class="aui-list-item menpai">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">详细地址</div>
                            <div class="aui-list-item-input">
                                <textarea placeholder="如：E座526单元"  v-model="address"></textarea>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">姓名 </div>
                            <div class="aui-list-item-input">
                                <input type="text" placeholder="输入收货人姓名"  v-model="name">
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">性别</div>
                            <div class="aui-list-item-input">
                                <label>
                                    <input class="aui-radio" type="radio" :checked="sex == true" name="demo1" @click.stop="getSex(0)"> 先生</label> &nbsp;&nbsp;
                                <label>
                                    <input class="aui-radio" type="radio" :checked="sex == false" name="demo1" @click.stop="getSex(1)"> 女士</label>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">手机号码</div>
                            <div class="aui-list-item-input">
                                <input type="number" placeholder="输入收货人手机号码" v-model="phone">
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">标签</div>
                            <div class="aui-list-item-input aui-list-item-arrow" @click="chooseLabel">
                                <p id="picker2">{{label}}</p>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <label>                								<!--this.$route.query.data?defaultaddress == '1':defaultaddress == '0'-->
                                <input class="aui-checkbox" type="checkbox" ref='checkedBo' @click="changDefault()" :checked="defaultaddress==1?true:false" name="demo1">&nbsp;设为默认地址</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import {getUserInfoAgain} from "../../components/config/getData.js"
import {mapGetters,mapMutations} from 'vuex';
import API from "../../utils/url-router"
var {H5_HOST_URL} = API()
//import api from '../../api';
var api =window.api

// import { gwToast } from '../../utils/toast'
import {MessageBox} from "mint-ui";
import {Toast} from '../../utils/toast2';
import {showLoading, hideLoading} from "../../utils/loading";

export default {
    props: {

    },
    components: {
    },
    data() {
        return {
            province: '请选择',
            provinceId: 0,
            city: '',
            cityId: 0,
            area: '',
            areaId: 0,
            provinceList: [],
            cityList: [],
            areaList: [],  
            requeryCity: true,
            requeryArea: true,
            label: '选择“家、公司”标签',
            labelId: false,
            phone: '',
            address: '',
            name: '',
            defaultCheck: true,
            sex: true,
            vipdtlid: 0,
            erp_api: {},
            isEditInfo:'新增地址',
            myPicker:null,
            defaultaddress:'0',
            myCity:null
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'xhModules/userInfo',
            sessionId: 'xhModules/sessionId'
        })
    },
    methods: {
        ...mapMutations('xhModules', [
			'USER_INFO',
			'LOGO_OUT',
       		'LOGO_IN'
		]),
		getSex(type){
			console.log(123456)
			if(type == 0){
				this.sex = true;
			}else {
				this.sex = false;
			}
			console.log(this.sex);
		},
		changDefault(){
			console.log(this.$refs.checkedBo.checked);
			if(this.$refs.checkedBo.checked){
				this.defaultaddress = '1';
			}else{
				this.defaultaddress = '0';
			}
		},
		//重新获取userInfo
		async zxGetUserInfo(){
			let response = await getUserInfoAgain(this.sessionId);
		    if (response.returncode === 0) {

	          this.LOGO_OUT(false);
	          return
	        }

	        this.LOGO_IN(true);
	        this.USER_INFO(response.data[0]);
	        console.log('userInfo', this.userInfo)
		},
        async getArea (code) {
            let res = await axios.get(window.api.mall_base_host + 'address/getarealist?areaid=' + code)
            return res.data.data.arealist
        },
		async getAddress(a,b,c){
			let data1;
			let data2;
			let data3;
			let that = this;
			var nameEl = document.getElementById('name');
			//首次显示获取省市区
            if(!this.provinceList.length){
                data1 = await this.getArea(a);
                data1 = this.getType(data1);
//              console.log(data1);
           		data2  = await this.getArea(b);
           		data2 = this.getType(data2);
           		data3 = await this.getArea(c);
           		data3 = this.getType(data3);
            } else {
//              province = this.provinceList
            }
//          console.log('省',data1);
//          console.log('市',data2);
			this.myCity = data2;
//          console.log('区',data3);
            var picker = new Picker({
				data: [data1, data2, data3],
				selectedIndex: [0, 0, 0],
				title: '请选择'
			});
			this.myPicker = picker;
			picker.show();
			//确定时 将内容的显示改变
			picker.on('picker.select', function (selectedVal, selectedIndex) {
				//this传进来的是插件中的数据
//				console.log(this.data);
				nameEl.innerText = this.data[0][selectedIndex[0]].text + ' ' + this.data[1][selectedIndex[1]].text + ' ' + this.data[2][selectedIndex[2]].text;
				that.provinceId = this.data[0][selectedIndex[0]].value;
				that.cityId = this.data[1][selectedIndex[1]].value;
				that.areaId = this.data[2][selectedIndex[2]].value;
				console.log(that.provinceId,that.cityId,that.areaId);
			})

			picker.on('picker.change', (index, selectedIndex)=> {
				var city = null;
				if(index == 0){
					this.getArea(data1[selectedIndex].value).then((res)=>{
						let arr = this.getType(res);
						this.myCity = arr;
//						console.log(this.myCity,'city');
						picker.refillColumn(index+1, arr);
						this.getArea(arr[0].value).then((res)=>{
							let arr1 = this.getType(res);
							picker.refillColumn(index+2,arr1);
						})
					})
				}else if(index == 1){
					if(this.myCity){
						this.getArea(this.myCity[selectedIndex].value).then((res)=>{
	//						console.log(99999222)
							let arr = this.getType(res);
							picker.refillColumn(index+1, arr);
						})
					}else{
						console.log('没有change事件')
					}
				}
//				else if(index == 2){
//
//				}
			});
		},
//      async chooseProvince() {
//          let province
//          if(!this.provinceList.length){
//              province = await this.getArea('1')
//              province = this.getType(province)
//              this.provinceList = province
//          } else {
//              province = this.provinceList
//          }
//          let packerData = new Picker({
//              data: [province],
//              title:'请选择'
//          })
//          packerData.show()
//          this.myPicker = packerData;
//          packerData.on('picker.select', (selectedVal, selectedIndex) => {
//              let value = selectedVal[0]
//              if(this.provinceId != value){
//                  this.provinceId = value
//                  let text = province[selectedIndex[0]].text;
//                  this.province = text
//                  this.requeryCity = true
//                  // 清空市和县的数据
//                  this.cityList = []
//                  this.areaList = []
//                  this.city = '请选择'
//                  this.area = '请选择'
//                  this.cityId = 0
//                  this.areaId = 0
//              } else {
//                  this.requeryCity = false
//              }
//          })
//      },
//
//      async chooseCity() {
//         let city
//         if(this.requeryCity) {
//             city = await this.getArea(this.provinceId)
//             city = this.getType(city)
//             this.cityList = city
//         } else {
//             city = this.cityList
//         }
//         let packerData = new Picker({
//              data: [city],
//              title:'请选择'
//          })
//
//          packerData.show()
//          this.myPicker = packerData;
//          packerData.on('picker.select', (selectedVal, selectedIndex) => {
//              let value = selectedVal[0]
//              if(this.cityId != value){
//                  this.cityId = value
//                  let text = city[selectedIndex[0]].text;
//                  this.city = text
//                  this.requeryArea = true
//                  // 清空县的数据
//                  this.areaList = []
//                  this.area = '请选择'
//                  this.areaId = 0
//              } else {
//                  this.requeryArea = false
//              }
//          })
//      },
//
//      async chooseArea() {
//         let area
//         if(this.requeryArea) {
//             area = await this.getArea(this.cityId)
//             area = this.getType(area)
//             this.areaList = area
//         } else {
//             area = this.areaList
//         }
//         let packerData = new Picker({
//              data: [area],
//              title:'请选择'
//          })
//          packerData.show()
//          this.myPicker = packerData;
//          packerData.on('picker.select', (selectedVal, selectedIndex) => {
//              let value = selectedVal[0]
//              if(this.areaId != value){
//                  this.areaId = value
//                  let text = area[selectedIndex[0]].text;
//                  this.area = text
//              }
//          })
//      },

        chooseLabel() {
            let arr = [{
                text: '家庭',
                value: '0'
            },{
                text: '公司',
                value: '1'
            },{
                text: '其他',
                value: '2'
            }]
            let packerData = new Picker({
                data: [arr],
                title:'请选择'
            })
            packerData.show()
            this.myPicker = packerData;
            packerData.on('picker.select', (selectedVal, selectedIndex) => {
                let value = selectedVal[0]
                this.labelId = value
                let text = arr[selectedIndex[0]].text;
                this.label = text
            })
        },

        getType(list) {
            let arr = []
            list && list.map((item) => {
                arr.push({text: item.name,value: item.id})
            })
            return arr
        },

        showMessage(msg) {
            Toast({
                message: msg,
                duration: 1000,
                iconClass: "aui-iconfont aui-icon-close"
            });
        },

        // 保存前校验
        handleSubmit() {

            if(!this.provinceId || !this.cityId || !this.areaId) {
                this.showMessage('请选择地区')
                return
            }
			console.log(this.provinceId,this.cityId,this.areaId);
            if(!this.address) {
                this.showMessage('请填写详细地址')
                return
            }
            if(!this.name) {
                this.showMessage('请填写收货人姓名')
                return
            }
            if(!this.phone) {
                this.showMessage('请填写联系号码')
                return
            } else {
                let reg = new RegExp(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/)
                if(!reg.test(parseInt(this.phone))){
                    this.showMessage('请填写正确的手机号')
                    return
                }
            }
            if(!this.labelId) {
                this.showMessage('请选择地址标签')
                return
            }
            this.save()
        },

        save() {
        	if(this.myPicker){
        		this.myPicker.hide ();
        	}
            let userData = this.userInfo
            console.log(userData,'555555');
            let isEdit
            if(this.$route.query.data){
                isEdit = true
            } else {
                isEdit = false
            }
            let params = {
				enterpriseid : userData.enterpriseid,
				type : "ADD",
				mobile : userData.phone,
				receivename : this.name,
				province: this.provinceId,
				city: this.cityId,
				region: this.areaId,
				address: this.address,
				label: this.labelId,
				vipid: userData.vipid,
				sex: this.sex ? '0' : '1',
				phone: this.phone,
				housemember: "",
				defaultaddress:this.defaultaddress
			}
//          console.log(params.defaultaddress);
            if(isEdit) {
                params.type = 'UPDATE'
                params.vipdtlid = this.vipdtlid
            }
           	showLoading();
            axios.post(window.api.mall_base_host + 'pubVip/updatevipaddress',{...params}).then((res) => {
                if(res.status === 200) {
                    let msg = ''
                    if(isEdit){
                        msg = '编辑地址成功'
                    } else {
                        msg = '添加地址成功'
                    }
                    Toast({
                        message: msg,
                        duration: 1000,
                        iconClass: "aui-iconfont aui-icon-correct"
                    });
                    let url = H5_HOST_URL + '/user/refreshUserInfo' + "?token=" + new Date().getTime();
                    let sessionId = window.localStorage.sessionId;
                    console.log('sessionID',sessionId);
//                  console.log("这是加了时间戳的url", url);
                    axios.get(url, {headers:{sessionId: sessionId}}).then((data) => {
                        let userInfo = data.data.data[0]
                        this.USER_INFO(userInfo)
                        hideLoading();
                        //原来设置settimeout 1000
                        this.$router.push( '/address/'+1)
//
                    }).catch((err)=>{
                    	hideLoading();
                    })
                }else{
                	hideLoading();
                }
            }).catch(function(){
            	hideLoading();
            })
        },
        showMes(){
			MessageBox.confirm('确定要放弃此次操作吗？').then((action)=>{
//				console.log(action,'过去');
//				this.$router.push('/address');
				if(this.myPicker){
					this.myPicker.hide ();
				}
				this.$router.push( '/address')
			},(action)=>{
//				console.log(action,'原地');
			});


       },
       changIsEditInfo(){
       		if(this.$route.query.data){
       			this.isEditInfo = '编辑地址';
       		}else{
       			this.isEditInfo = '新增地址';
       		}
       }

    },
    beforeCreate(){
        let scriptFile = document.createElement('script')
        scriptFile.setAttribute("type","text/javascript")
        scriptFile.setAttribute("id","addAddress")
        scriptFile.setAttribute("src",'static/script/picker.min.js')
        document.getElementsByTagName("head")[0].appendChild(scriptFile)
    },
    beforeDestroy(){
        let sciDom = document.getElementById('addAddress')
        sciDom.parentNode.removeChild(sciDom)
    },
    created() {
    	this.zxGetUserInfo();
        this.changIsEditInfo();
        console.log(this.userInfo,'进来');
        console.log(this.sessionId,'session');
    },
    mounted() {
        if(this.$route.query.data) {
            // 编辑
            let config = this.$route.query.data
            console.log(config)
            this.provinceId = config.province
            this.cityId = config.city
            this.areaId = config.region
            this.phone = config.phone
            this.name = config.receivename
            this.label = config.label
            
            
             console.log(config,'config');
            if(config.label === '家庭'){
                this.labelId = '0'
            }
            if(config.label === '公司'){
                this.labelId = '1'
            }
            if(config.label === '其他'){
                this.labelId = '2'
            }
            let address = config.result
            let arr = address.split(' ')
            this.province = arr[0]
            this.city = arr[1]
            this.area = arr[2]
            this.address = arr[3]
            if(config.sex == '男'){
                this.sex = true
            } else {
                this.sex = false
            }
            console.log(this.sex,'sex');
            if(config.defaultaddress == '默认'){
                this.defaultCheck = true
                this.defaultaddress = '1'
            } else {
                this.defaultCheck = false
                this.defaultaddress = '0'
            }
            this.vipdtlid = config.vipdtlid
        }else if(!this.$route.query.data){
        	 this.defaultaddress = '1'
        }
//      console.log(this.defaultaddress)
    }
}
</script>

<style scoped="scoped">

	.picker-content{
		margin-top: -3rem;
	}

</style>


