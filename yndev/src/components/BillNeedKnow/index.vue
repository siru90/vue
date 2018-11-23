<template>
  <div style="width: 100%;height: 100%;overflow: auto;position: relative;">
  	<div style="">
        <div class="aui-list-item-title" style="text-align:center;padding:0.5rem 0.5rem;font-size: 0.84rem;
        	position: fixed;top: 0;left: 0;width: 100%;height:2.2rem;z-index: 9;background-color: #ffffff ;">发票须知</div>
        <ul class="aui-list aui-list-in"  style="padding:0.75rem 0.75rem;width: 100%;height: 100%;margin: 2.2rem 0;">
            <li v-for="(item,index) in BillKnows" :key="index" >
                <span style="display:inline-block">{{index + 1}}.</span>
                <div style="display:inline-block">{{String(item)}}</div>
            </li>
            <!--<li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>-->
            <!--<li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>
            <li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>
            <li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>
            <li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>
            <li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>
            <li class="aui-list-item">
                <span>1.</span>
                <div>发票须知内容发票须知内容发票须知内容发票须知内容</div>
            </li>-->
        </ul>
        <div class="IKnow" @click.stop="isPopupVisible" style="">
            	我知道了
        </div>
  </div>
</div>
</template>
<script>
	// import MyHeader from "../header";
	import axios from "axios";
	import { mapState, mapGetters, mapMutations } from "vuex";
	import api from "../../api";
	// import ButtonToTop from '../../real-components/ButtonToTopForTest';
	export default {
		data(){
			return {
          BillKnows:"",//  
			}
		},
		props: {
	      
	    },
		components:{
			// "my-header":MyHeader,
			// ButtonToTop,
		},
		methods: {
            isPopupVisible(){
                
                let data = {
                    isPopupVisible:false,
                }
                this.$emit('switch',data);//select事件触发后，自动触发showCityName事件 
            },
            async needKonw(){
            	var url = window.api.local_host + api.BillNeedKonw;
            	var sessionId = localStorage.getItem('sessionId');
	        		var config = {
		               url,
		               method: "get",
		               headers: {sessionId},
		            }
	            await axios(config).then((res) => {
	                console.log("hahahahahahahaha222", res)
	                if(res.data.returnCode === 1){
										this.BillKnows = res.data.data;
//									this.$store.dispatch('hzh/SaveClickAddress', res.data.data);
						
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
        	this.needKonw();
        },
				mounted() {
					
				},
	}
</script>

<style>
	.IKnow{
			padding:0.5rem .5rem 0.5rem 0.5rem;
			text-align:center;
			width: 100%;
			background-color: #ffffff;
			z-index: 9;
			box-sizing: border-box;
      border-top:1px solid #969896;
      font-size: 0.84rem;
      margin-top: 0.75rem;
      position: fixed;
      bottom:0;
      left:0;
      box-sizing: border-box;
      color: red;
	}
</style>
