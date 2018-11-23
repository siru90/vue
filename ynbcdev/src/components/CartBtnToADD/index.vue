<template>
	<div style="position: relative; z-index: 10000">
		<div id="add_to_car" class="aui-btn aui-btn-danger aui-btn-sm" @click="addCart">加入采购车</div>
		<!-- 服务和商品遮罩层 -->
		<goods-service 
			ref="goodsService" 
			pageType="detail" 
			:goodsId="goodsId"
			:gwGoodsItem="gwGoodsItem">
		</goods-service>
	</div>
</template>
<script>
import GoodsService from "../GoodsService"
export default {
	props: {
		pageType: {
			type: String,
			default: "detail"
		},
		goodsId: {
			type: Number,
			default: 13
		},
		gwGoodsItem: {
			type: Object,
			default: function () {
				return {}
			}
		}

	},
	data() {
		return {}
	},
	computed: {

	},
	methods: {
		//点击添加采购车按钮
		addCart() {
			this.$refs.goodsService.showService();
		}
	},
	components: {
		"goods-service": GoodsService,
	}

}
</script>


<style>
	#add_to_car {
		background: #970000 !important;
	}
</style>


