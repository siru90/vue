<template>
    <div>
        <!--<my-header :title="'抬头管理'" :hasTitle="true" :hasBack="true"></my-header>-->
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:relative;">
			<div class="go-back" @click.stop="goBack">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">抬头管理</div>
			<!--<div class="aui-pull-right text-del" @click.stop="clearCar" v-if="cartArray.length">删除</div>-->
		</header>
        <div class="aui-content aui-margin-b-15" style="margin-top:0.75rem;">
            <div class="aui-list aui-list-in">
                <li class="aui-list-item-arrow listerly" @click="goToDetail(item.rid)" style=""
                	v-for="(item,indexs) in saveBillshead" :key="indexs">
                    <!--<div style="display:inline-block;">
                        <div style="text-align: left;">象翌微链科技发展有限公司</div>
                        <div style="text-align: left;">91450100595101416N</div>
                    </div>
                    <div style="display:inline-block;line-height:2.2rem;">公司</div>-->
                    <!--<label style="display:inline-block;margin-top:0.5rem;margin-right: 0.7rem;">
                        <input class="aui-checkbox" type="checkbox" :checked="item.isDefault==1?true:false">
                    </label>-->
                    <!--<div id="" style="overflow: hidden;width: 100%;height: 100%;position: relative;border-bottom: 1px solid #eaeaea ;">-->
		                <div style="width:80%;" v-if="item.invoicesTitleType == 1?true:false">
		                    <div style="text-align: left;">{{item.personalName}}</div>
		                    <div style="text-align: left;">{{item.idNumber}}</div>
		                </div>
		                <div style="width:80%;" v-if="item.invoicesTitleType == 2?true:false">
		                    <div style="text-align: left;">{{item.companyName}}</div>
		                    <div style="text-align: left;">{{item.dutyParagraphNo}}</div>
		                </div>
		                <div style="line-height:2.2rem;">{{item.invoicesTitleType=='1'?"个人":"公司"}}</div>
		                <div id="" v-if="item.isDefault" style="text-align: center;width: 14%;
		                    	transform: rotate(45deg);width: 2.2rem;text-align: center;top: 0.1rem;
		                    	height: 0.7rem;position: absolute;background-color: red;line-height: 0.7rem;right: -3.4%;">
	                    	<!--<span id="" style="color: #ffffff;font-size: 0.2rem;">
	                    		默认
	                    	</span>-->
	                    	<span style="color: #ffffff;font-size: 0.45rem;height: 100%;display:block;width: 100%;text-align: center;">
	                    		默认
	                    	</span>
		                    	    
		                </div>
		            <!--</div>-->        
                </li>
                <!--<li class="aui-list-item aui-list-item-arrow listers" @click="goToDetail">
                    <div style="display:inline-block;">
                        <div style="text-align: left;">李兰</div>
                        <div style="text-align: left;">身份证91450100595101416N</div>
                    </div>
                    <div style="display:inline-block;line-height:2.2rem;">个人</div>
                </li>-->
            </div>
        </div>
    </div>
</template>
<script>
	// import MyHeader from "../header";
	import axios from "axios";
	import { mapState, mapGetters, mapMutations } from "vuex";
	// import ButtonToTop from '../../real-components/ButtonToTopForTest';
	export default {
		data(){
			return {
	          // aboutData:null
	          isChecked:true,
	          CheckedElect:false,
	          contentShows:false
			}
		},
		computed: {
	      ...mapGetters('hzh', [
	        'saveBillshead',
	
	      ]),
	    },
		components:{
//			"my-header":MyHeader,
			// ButtonToTop,
		},
		methods: {
			goBack(){
//				this.$router.push({path:"BillDetail",query:{goodsId:'1'}})
				//取消保存在
				window.history.back();
			},
		    isChoose(){
		          console.log("dianjilegouxuan")
		          if(this.isChecked){
		              this.isChecked = false;
		              this.CheckedElect = true;
		          }else{
		              this.isChecked = true;
		              this.CheckedElect = false;
		          }
		          let data = {
		              isChecked:this.isChecked,
		              CheckedElect:this.CheckedElect,
		          }
		          this.$emit('showContent',data);//select事件触发后，自动触发showCityName事件 
		      },
		      goToDetail(val){
		      	console.log("qijierguojilao1111",val)
		        this.$router.replace({path:"headManageDetail",query:{datas:val}})
		      },
		      getSaveDatas(){
		      	console.log(this.saveBillshead,"15615454564564")
		      	
		      }
	    },
	    created(){
	    	console.log("qijierguojilao2222")
	        if(this.isChecked){
	            this.contentShows = false;
	        }
	        this.getSaveDatas();
	    },
		mounted() {
			
		},
	}
</script>

<style>
	.listerly{
		display:flex;
		padding: 0.4rem 1.35rem 0.1rem 0.75rem !important;
		position: relative;
		overflow: hidden;
		border-bottom: 1px solid #eaeaea !important;
	}
</style>
