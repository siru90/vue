<template>
	<div class="order_list_div" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
		<router-link to="/service">
			<div class="close_page">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</router-link>	
			<div class="aui-title">电话客服</div>
		</header>
		<div style="height:3rem;"></div>
		<div class="call_server">
			<div class="call_nember">
				<i class="icon njfont nj-kefu"></i>
				<p>客服热线</p>
				<h1>4006-900-910</h1>
			</div>
			<div class="aui-content-padded">
				<div class="aui-btn aui-btn-block">
					<a href="tel:4006-900-910">呼叫客服</a>
				</div>
			</div>
		</div>
	</div>
</template>