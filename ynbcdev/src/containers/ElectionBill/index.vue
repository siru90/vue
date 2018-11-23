<template>
    <div>
        <!--<my-header :title="'抬头管理'" :hasTitle="true" :hasBack="true"></my-header>-->
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:static;">
			<div class="go-back" @click.stop="goBack">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">电子发票</div>
			<!--<div class="aui-pull-right text-del" @click.stop="clearCar" v-if="cartArray.length">删除</div>-->
		</header>
        <div class="aui-content aui-margin-b-15" style="position: relative;height: 20rem;background: #fff;padding-top: 3rem;" >
        	<div style="position: absolute;background:#9A9A9A;width: 1.5rem;height: 1.5rem;border-radius: 50%;right: 10%;top: 2%;">
        		<a href="">
        			
        		</a>
        		<img src="../../../static/image/BillImg/downLoad.png" style="background: rgb(154, 154, 154);position: absolute;right: 15%;top: 15%;" />
        	</div>
        	<div id="">
        		<img src="../../../static/image/BillImg/翌能发票明细.jpg" v-if="ones"/>
            	<img src="../../../static/image/BillImg/翌能商品大类.jpg" v-if="twos"/>
        	</div>
            <div id="flage" @click="checked" style="">
            	{{datas}}/{{2}}
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
	          datas:'1',
	          ones:true,
	          twos:null
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
				this.$router.go(-1)
			},
			checked(){
				if(this.datas == "1"){
					this.datas = '2';
					this.ones = true;
					this.twos = false;
				}else{
					this.datas = '1';
					this.ones = false;
					this.twos = true;
				}
				
			}
//		    isChoose(){
//		          console.log("dianjilegouxuan")
//		          if(this.isChecked){
//		              this.isChecked = false;
//		              this.CheckedElect = true;
//		          }else{
//		              this.isChecked = true;
//		              this.CheckedElect = false;
//		          }
//		          let data = {
//		              isChecked:this.isChecked,
//		              CheckedElect:this.CheckedElect,
//		          }
//		          this.$emit('showContent',data);//select事件触发后，自动触发showCityName事件 
//		      },
//		      goToDetail(val){
//		      	console.log("奇迹而国际老",val)
//		        this.$router.push({path:"headManageDetail",query:{datas:val}})
//		      },
//		      getSaveDatas(){
//		      	console.log(this.saveBillshead,"15615454564564")
//		      	
//		      }
	    },
	    created(){
	    	
	    },
		mounted() {
			
		},
	}
</script>

<style>
	.listers{
		border-bottom: 1px solid #eaeaea !important;
		padding: 0 1.35rem 0 0.75rem !important;
	}
	#flage{
		position: absolute;
		bottom:10%;right: 10%;
		background: #999999;
		color: #ffffff;
		width: 1.8rem;
		height: 1.3rem;
		line-height: 1.3rem;
		text-align: center;
		border-radius: 0.8rem;
	}
</style>
