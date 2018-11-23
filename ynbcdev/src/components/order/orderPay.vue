<template>
	<!--头部-->
	<div>
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<div class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">订单支付</div>
		</header>
		<div style="height: 3rem;"></div>
		<div class="centent payment_con">
			<div class="amount_con  aui-margin-b-15">
				<h2>应付金额：￥66.8</h2>
			</div>
			<!--付款方式1-->
			<div class="aui-content aui-margin-b-15">
				<ul class="aui-list aui-list-in">
					<li class="aui-list-header">
						余额支付
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-qianbao"></i>
						</div>
						<div class="aui-list-item-inner">
							账户余额
							<div class="aui-list-item-right">
								<label>¥88.03</label>&nbsp;<input type="checkbox" class="aui-checkbox">
							</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-lipinquan"></i>
						</div>
						<div class="aui-list-item-inner">
							礼品券余额
							<div class="aui-list-item-right">
								<label>¥100.00</label>&nbsp;<input type="checkbox" class="aui-checkbox">
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!--付款方式1 end-->
			<!--付款方式2-->
			<div class="aui-content aui-margin-b-15">
				<ul class="aui-list aui-list-in">
					<li class="aui-list-header">
						翌支付
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-zhifubao"></i>
						</div>
						<div class="aui-list-item-inner">
							支付宝支付
							<div class="aui-list-item-right">
								<div class="aui-list-item-right"><input type="radio" class="aui-radio" name="payment2"></div>
							</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-weixin"></i>
						</div>
						<div class="aui-list-item-inner">
							微信支付
							<div class="aui-list-item-right"><input type="radio" class="aui-radio" name="payment2"></div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-title"><i class="icon_yl"></i>银联支付</div>
							<div class="aui-list-item-right"><input type="radio" class="aui-radio" name="payment2"></div>
						</div>
					</li>
				</ul>
			</div>
			<!--付款方式2 end-->
			<!--确定-->
			<div style="height:4rem;"></div>
			<div class="settle_accounts lijixiadan">
				<div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">确定</div>
			</div>
			<!--确定 end-->
		</div>
	</div>
</template>