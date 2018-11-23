import axios from "axios";
import api from "../../../api";
import {Popup, MessageBox} from 'mint-ui';

export default {
	namespaced: true,
	state: {
        goodsList: [],
        getBillInfor:[],
        BillContent:[],
		orderBills:[],
		vals:[],
		newArry:[],
		BillBtn:[]
    },
	getters: {
		//操作方法
        saveBillshead(state){
            return state.goodsList;
        },
        saveBillsheadTwo(state){
            return state.newArry;
        },
        
      
    },
    mutations: {
    	//存储数据
    	SAVE_BILLS_HEAD(state,data){
            state.goodsList = data;
//          if(data[0]){
//				state.newArry[0] = data[0];
//			}
//			if(data[1]){
//				state.newArry[1] = data[1];
//			}
            console.log(state.goodsList,"保存在vuex里面的goodsList值")
        },
        SAVE_TWO_BILLS_HEAD(state,data){
            if(data[0]){
				state.newArry[0] = data[0];
			}
			if(data[1]){
				state.newArry[1] = data[1];
			}
            console.log(state.newArry,"保存在vuex里面的newArry值")
        },
        GET_BILLS_INFOR(state,data){
            state.getBillInfor = data;
            console.log(state.getBillInfor,"保存在vuex里面的getBillInfor值")
        },
        SAVE_BILLS_CONTENT(state,data){
            state.BillContent = data;
            console.log(state.BillContent,"保存在vuex里面的getBillInfor值")
        },
        SAVE_BILLS_BTN(state,data){
            state.BillBtn = data;
            console.log(state.BillContent,"保存在vuex里面的点击保存按钮值")
        },
    	GET_ORDER_LIST(state, data){
            state.goodsList = data;
        },
        GET_ORDER_BILLS(state, data){
        	state.orderBills = data;
        	console.log(state.orderBills,"保存在vuex里面的orderBills值")
        },
        PUT_A_VALUE(state, data){//保存一个值用来点击管理返回
        	state.vals = data;
        	console.log(state.vals,"保存在vuex里面的vals值")
        }
    },
    actions: {
    	//请求接口
    	PutAValue({commit}, data){
    		commit('PUT_A_VALUE', data);
    	},
    	SaveClickAddress({commit}, data) {
            commit('SAVE_BILLS_HEAD', data);
        },
        SaveTwoBills({commit}, data) {
            commit('SAVE_TWO_BILLS_HEAD', data);
        },
        GetBillInfor({commit}, data) {
            commit('GET_BILLS_INFOR', data);
        },
        SaveBillContent({commit}, data) {
            commit('SAVE_BILLS_CONTENT', data);
        },
        SaveBillBtn({commit}, data) {
            commit('SAVE_BILLS_BTN', data);
        },
        GetBillheads({commit}){
        	var sessionId = localStorage.getItem('sessionId');
            var url = window.api.local_host + api.lookUpBills;
//			var url = "http://test.mall.yn.weilian.cn"+ api.lookUpBills;
//			var url = "http://test.mall.yn.weilian.cn/orderInvoiceTitle/selectOrderInvoiceTitleList";
            var config = {
               url,
               method: "GET",
               headers: {sessionId},
            }
            console.log("aaaaaaaa",sessionId)
            axios(config).then((res) => {
                console.log("hahahahahahahaha", res)
                if(res.data.returnCode === 1){
//              	console.log("res.data.data", res.data.data[0].rid + "");
//					this.BillDatas = res.data.data;
//					this.dispatch('hzh/SaveClickAddress', res.data.data);
					commit('SAVE_BILLS_HEAD', res.data.data);
					commit('SAVE_TWO_BILLS_HEAD', res.data.data);
					res.data.data && res.data.data.forEach(ele => {
						
						ele.isDefault && commit('GET_BILLS_INFOR', ele.rid);
					})
//					this.dispatch('hzh/getGoodsDate')
					try {
	                    commit('GET_ORDER_LIST', res.data.data);
	                    
	                } catch (error) {
	                    
	                }
					
                }else if(res.data.returnCode === 0){
                	MessageBox.alert(res.data.errmsg)
//              	.then(action => {
//	                   this.$router.push('/login');
//	                });
                }
            
            })
      	},
      	GetOrderBills({commit}, data){
//    		return new Promise((resolve,reject)=>{
				var sessionId = localStorage.getItem('sessionId');
	            var url = window.api.local_host + '/' + api.getBills + '/' + data;
	            var config = {
	               url,
	               method: "GET",
	               headers: {sessionId},
	            }
	            console.log("bbbbbbbbbb9",sessionId)
	            axios(config).then((res) => {
	                console.log("uuuuuuuuuuuiiiiiiii", res)
	                if(res.data.returnCode === 1){
//						this.BillDetails = res.data.data[0];
						try {
							console.log("有没有执行啊********1111")
	                    	commit('GET_ORDER_BILLS', res.data.data[0]);
		                } catch (error) {
		                    
		                }
//						this.$store.dispatch('hzh/SaveClickAddress', res.data.data);
//						resolve(true)
	                }else if(res.data.returnCode === 0){
	                	commit('GET_ORDER_BILLS', res.data.data);
//	                	MessageBox.alert(res.data.msg)
//	                	resolve(false)
//	                	MessageBox.alert(res.data.msg)
//	                	.confirm(res.data.errmsg).then(action => {
//		                   this.$router.push('/login');
//		                });
	                }
	            
	            })
//          })
      	}
    }
	
	
	
}
