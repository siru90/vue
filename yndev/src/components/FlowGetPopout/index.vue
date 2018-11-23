<template>
	<div class="flowGet-cover" v-if="flowGetshow">
		<div class="flowGetmask"></div>
		<div class="flowGetpopout">
			<div class="mask-contant">
				<p><span></span>成功</p>
				<p>恭喜获得<span>60M</span>流量</p>
				<p><span></span><span></span></p>
				<p>自动充值成功<span>（3S）</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	export default {
		props: {
			text: {
				type: String,
				default: "购买"
			},
			contant: {
				type: Array,
				default: function() {
					return [{
						name: "面额：￥",
						money: "50"
					}, {
						name: "余额：￥",
						money: "50"
					}]
				}
			},
			title: {
				type: String,
				default: "去购物"
			},
			timedata: {
				type: Number,
				default: 30
			},
			time: {
				type: String,
				default: ""
			},
			clickEventsure: {
				type: Function,
				default: () => {}
			},
			clickEventtitle: {
				type: Function,
				default: () => {}
			},
		},
		data() {
			return {
				flowGetshow:false
			}
		},
		computed: {

		},
		methods: {
			//显示弹框
			showCover(){
				this.flowGetshow = true
			},
			//隐藏弹框
			hideCover() {
				this.flowGetshow = false
			},
			//右边按钮显示的文字
			titlefn(){
			    if(this.title==0){
			    	return "设置支付密码"
			    }else if(this.title==1){
			    	return "去购物"
			    }else{
			    	return this.title
			    }
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style>
	.flowGet-cover {
		position: fixed;
		top: 0px;
		height: 100%;
		width: 100%;
		z-index: 99999;
		touch-action: none;
	}

	.flowGet-cover .flowGetmask {
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.7;
	}

	.flowGet-cover .flowGetpopout {
		position: absolute;
		width: 14rem;
		height: 17.5rem;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background:url(../../../static/image/bg_tangchukuang.png) no-repeat;
		background-size: contain;
	}

</style>
