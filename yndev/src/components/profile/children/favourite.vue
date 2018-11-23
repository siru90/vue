<template>
	<div class="order_list_div" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
		<router-link to="/main/profile">
			<div class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</router-link>	
			<div class="aui-title">我的收藏</div>
		</header>
		<!-- <div style="height:3.75rem;"></div> -->
		<div class="centent top_div">
			<!--商品列表-->
			<div class="aui-content">
				<ul class="aui-list aui-media-list commodity_list subtotal_list">
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							收藏记录
							<div class="aui-pull-right text_c_gray">共2件</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-media">
								<img src="../../../../static/image/demo1.png">
							</div>
							<div class="aui-list-item-inner suggest">
								<h3>商品标题最多可显示两行商品标题最多可显示两行</h3>
								<p>规格：500g/盒</p>
								<p><span class="prices_text">¥<em>16.8</em></span>/碗</p>
							</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-media">
								<img src="../../../../static/image/demo1.png">
							</div>
							<div class="aui-list-item-inner suggest">
								<h3>商品标题最多可显示两行商品标题最多可显示两行</h3>
								<p>规格：500g/盒</p>
								<p><span class="prices_text">¥<em>16.8</em></span>/碗</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!--商品列表 end-->
		</div>
	</div>
</template>

<script>
	import {mapGetters} from "vuex"

	export default {
		computed: {
			...mapGetters('xhModules',[
				'sessionId'
			])
		}
		,
		mounted() {
			this.initData();
		}
		,
		methods: {
			async initData() {
				if(this.sessionId == null) {
					this.$router.push({path:'/login'});
				}
			}
		}
	}
</script>