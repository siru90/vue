<template>
    <div class="aui-content aui-margin-b-15" style="min-height: 13rem;">	
        <ul class="aui-list aui-list-in" style="min-height: 13rem;">
            <li class="aui-list-item" style=" border-bottom:0;">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-title">发票内容</div>
                </div>
            </li>
            <li class="" style="justify-content: start; border-bottom:0;padding:0.5rem 0.75rem;">
                <div style="display:inline;margin-right:2rem;" @click.stop="chooseStyles">	
                    <input class="aui-checkbox" type="checkbox" :checked="shopDetail" >
                    <span style="margin-left:0.5rem;line-height: 1.2rem;">商品明细</span>
                    <!--<input class="aui-checkbox" type="checkbox" v-model="isChecked" @click="isChoose">-->
                </div>
                <div style="display:inline;" @click.stop="chooseType">	
                    <input class="aui-checkbox" type="checkbox" :checked="shopClassfly">
                    <span style="margin-left:0.5rem;line-height: 1.2rem;">商品大类</span>
                </div>
            </li>
            <li class="aui-list-item" v-if="shopDetail">
                <img src="../../../static/image/BillImg/翌能发票明细.jpg" style="height:11rem;"/>
            </li>
            <li class="aui-list-item" v-if="shopClassfly">
                <img src="../../../static/image/BillImg/翌能商品大类.jpg" style="height:11rem;"/>
            </li>
            <!--<li class="aui-list-item" style="padding-right:.75rem;">
                <div class="aui-btn aui-btn-danger aui-btn-block">
                    保存
                </div>
            </li>-->
        </ul>
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
                shopDetail:true,//商品明细
                shopClassfly:false//商品大类
			}
		},
		components:{
			// "my-header":MyHeader,
			// ButtonToTop,
		},
		methods: {
            chooseStyles(){
                if(this.shopDetail){
                    this.shopDetail = false;
                    this.shopClassfly = true;
                }
                else if(this.shopClassfly){
                    this.shopDetail = true;
                    this.shopClassfly = false;
                }
                this.$store.dispatch('hzh/SaveBillContent', this.shopDetail ? '商品明细' : '商品大类');
            },
            chooseType(){
                if(this.shopDetail){
                    this.shopDetail = false;
                    this.shopClassfly = true;
                }
                else if(this.shopClassfly){
                    this.shopDetail = true;
                    this.shopClassfly = false;
                }
                this.$store.dispatch('hzh/SaveBillContent', this.shopDetail ? '商品明细' : '商品大类');
            }
			
		},
		created(){
			this.$store.dispatch('hzh/SaveBillContent', this.shopDetail? '商品明细' : '商品大类');
		},
		mounted() {
			
		},
	}
</script>

<style>

</style>
