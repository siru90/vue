<template>
	<div class="aui-content aui-margin-b-15">
        <div class="aui-list aui-list-in">
            <li class="" style="border:0;padding: 0 0.75rem;">
                <div style="min-height:2.2rem;" class="aui-list-item-inner" >
                    <div style="" class="aui-list-item-title">发票类型</div>
                </div>
            </li>
            <li style="height:2rem;border:0;padding: 0 0.5rem;">
                <label style="padding-left: 0.2rem;margin-right: 2rem;" @click.stop="isChoose">
                    <input class="aui-checkbox" type="checkbox" :checked="isChecked" >
                    <span style="margin-left:0.5rem;">不开发票</span>
                </label>
                <label @click.stop="ElecBill">
                    <input class="aui-checkbox" type="checkbox" :checked="CheckedElect" >
                    <span style="margin-left:0.5rem;">电子发票</span>
                </label>
            </li>
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
                isChecked:'',
                CheckedElect:"",
                contentShows:false
			}
		},
		props: {
	      isChooses: {
	        type: Boolean,
//		        default: () => {
//		          return false
//		        }
			required:true
	      },
	    },
		components:{
			// "my-header":MyHeader,
			// ButtonToTop,
		},
		methods: {
            isChoose(){
                console.log("dianjilegouxuan")
                if(this.isChecked){
                    this.isChecked = false;
                    this.CheckedElect = true;
                }
                else if(this.CheckedElect){
                    this.isChecked = true;
                    this.CheckedElect = false;
                    let data = "";
                    this.$store.dispatch('hzh/GetBillInfor',data);
                    this.$store.dispatch('hzh/SaveBillContent',data);
                }
                this.$store.dispatch('hzh/SaveBillBtn', "");
                let data = {
                    isChecked:this.isChecked,
                    CheckedElect:this.CheckedElect,
                }
                this.$emit('showContent',data);//select事件触发后，自动触发showCityName事件 
            },
          	ElecBill(){
          		if(this.isChecked){
                    this.isChecked = false;
                    this.CheckedElect = true;
                }
          		else if(this.CheckedElect){
                    this.isChecked = true;
                    this.CheckedElect = false;
                    let data = "";
                    this.$store.dispatch('hzh/GetBillInfor',data);
                    this.$store.dispatch('hzh/SaveBillContent',data);
                }
                let data = {
                    isChecked : this.isChecked,
                    CheckedElect : this.CheckedElect,
                }
                this.$emit('showContent',data);//select事件触发后，自动触发showCityName事件 
//              this.$store.dispatch('hzh/GetBillheads');//查询发票抬头
          	}
			
        },
        created(){
        	console.log("zhouxina",this.isChooses)
            if(this.isChecked){
                this.contentShows = false;
            }
            if(this.isChooses){
                this.CheckedElect = true;
                this.isChecked = false;
            }else{
            	this.CheckedElect = false;
                this.isChecked = true;
            }
        },
		mounted() {
			
		},
	}
</script>

<style>

</style>