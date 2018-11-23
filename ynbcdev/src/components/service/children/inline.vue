<template>

	<div class="vue_app" style="position: absolute;width: 100%; height:100%;">
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<router-link to="/service">
				<div class="go-back">
					<i></i>
					<i></i>
					<i></i>
				</div>
			</router-link>	
			<div class="aui-title">在线客服</div>
		</header>
		<iframe :src="url" frameborder="0" width="100%;" height="100%;"></iframe>
	</div>
	
</template>

<script>
	export default {
		data () {
			return {
				url: null
			}
		}
		,
		mounted() {
			this.url =  this.$route.query.urlData;
		}
	}
</script>