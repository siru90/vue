<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<router-link to="/cartshownum">cartshownum</router-link>
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
			<div class="burger">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">个人中心</div>
			<div class="right_icon">
				<a class="shopping_cart">
					<i class="icon njfont nj-gouwuche"></i>
					<div class="aui-badge">88</div>
				</a>
			</div>
		</header>
		<div style="height: 3rem;"></div>
		<!--头部 end-->
		<div class="centent">
			<!--用户信息-->
			<div class="user_information">
				<div class="user_con">
					<!-- <img src="./image/user2.jpg" class="aui-img-round aui-list-img-sm"> -->
					<dl>
						<dt>登录/注册</dt>
						<dd>会员等级</dd>
					</dl>
				</div>
				<div class="qr_code_list">
					<li>
						<i class="icon njfont nj-saoyisao"></i>
						<span>扫一扫</span>
					</li>
					<li>
						<i class="icon njfont nj-fukuanma"></i>
						<span>付款码</span>
					</li>
				</div>
			</div>
			<!--用户信息end-->
	
			<div class="aui-row order_class">
				<div class="aui-col-5">
					<i class="icon njfont nj-daifukuan"></i>
					<div class="aui-grid-label">待付款</div>
					<div class="aui-badge">3</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-5">
					<i class="icon njfont nj-daipeisong"></i>
					<div class="aui-grid-label">待配送</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-5">
					<i class="icon njfont nj-peisongzhong"></i>
					<div class="aui-grid-label">配送中</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-5">
					<i class="icon njfont nj-daipingjia"></i>
					<div class="aui-grid-label">待评价</div>
				</div>
				<div id="all_order" class="aui-col-5 lef_line">
					<i class="icon njfont nj-quanbudingdan"></i>
					<div class="aui-grid-label">全部订单</div>
					<em></em>
				</div>
			</div>
			<!--充值有礼 所有暂时隐藏勿删除-->
			<div class="recharge_activities">
				<div class="classify_title">
					<h1>充值有礼</h1>
				</div>
				<div class="iscroll_list">
					<ul id="scroller" class="scroller_list">
						<li class="active">
							<h3>¥100</h3>
							<div class="aui-grid-label">得105元，额...</div>
							<input type="radio" class="aui-radio" checked="" name="recharge">
						</li>
						<li>
							<h3>¥500</h3>
							<div class="aui-grid-label">得530元，额...</div>
							<input type="radio" class="aui-radio" name="recharge">
						</li>
						<li>
							<h3>¥1000</h3>
							<div class="aui-grid-label">得1070元，额...</div>
							<input type="radio" class="aui-radio" name="recharge">
						</li>
						<li>
							<h3>¥2000</h3>
							<div class="aui-grid-label">得2015元，额...</div>
							<input type="radio" class="aui-radio" name="recharge">
						</li>
						<li>
							<h3>¥5000</h3>
							<div class="aui-grid-label">得5400元，额...</div>
							<input type="radio" class="aui-radio" name="recharge">
						</li>
					</ul>
	
				</div>
				<div class="aui-margin-15">
					<div class="aui-btn aui-btn-danger aui-btn-block aui-btn-outlined aui-btn-sm">立即充值</div>
				</div>
			</div>
			<!--钱包等-->
			<div class="aui-row order_class value_con">
				<div class="aui-col-xs-3">
					<h3>500.00元</h3>
					<div class="aui-grid-label">钱包余额</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-xs-3">
					<h3>868</h3>
					<div class="aui-grid-label">积分</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-xs-3">
					<h3>500.00元</h3>
					<div class="aui-grid-label">礼品券</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-xs-3">
					<h3>868</h3>
					<div class="aui-grid-label">成长值</div>
				</div>
			</div>
			<!--钱包等 end-->
			<!--服务预约-->
			<div class="aui-row order_class">
				<div id="installation" class="aui-col-xs-3">
					<i class="icon njfont nj-zhuangpei"></i>
					<div class="aui-grid-label">终端安装单</div>
					<div class="aui-badge">3</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-xs-3">
					<i class="icon njfont nj-lingjian"></i>
					<div class="aui-grid-label">配件安装单</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-xs-3">
					<i class="icon njfont nj-weixiu"></i>
					<div class="aui-grid-label">维修预约</div>
					<div class="right_line"></div>
				</div>
				<div class="aui-col-xs-3">
					<i class="icon njfont nj-baoyang"></i>
					<div class="aui-grid-label">保养预约</div>
				</div>
			</div>
			<!--服务预约 end-->
			<div class="aui-content aui-margin-b-15">
				<ul class="aui-list aui-list-in">
					<li id="my_car" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-zhuangpei"></i>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">我的车辆</div>
							<p>管理</p>
						</div>
					</li>
					<li id="coupon" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-gouwuquan"></i>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">我的优惠券</div>
							<p>未使用&nbsp;2</p>
						</div>
					</li>
					<li id="management_address" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-dizhi"></i>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">我的收货地址</div>
							<p>管理</p>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-xiaoxi"></i>
						</div>
						<div id="new_message" class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">我的消息</div>
							<div class="aui-list-item-right">
								<div class="aui-badge" style="position:relative;top:0; left:0">88</div>
							</div>
						</div>
					</li>
					<li id="my_collection" class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-shoucang"></i>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">我的收藏</div>
							<p>5</p>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-yaoqinghaoyou"></i>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">邀请好友</div>
							<p>查看邀请码</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="aui-content aui-margin-b-15">
			<ul class="aui-list aui-list-in">
				<li id="server_center" class="aui-list-item">
					<div class="aui-list-item-label-icon">
						<i class="icon njfont nj-kefu"></i>
					</div>
					<div class="aui-list-item-inner aui-list-item-arrow">
						<div class="aui-list-item-title">服务中心</div>
					</div>
				</li>
				<li id="aboutus" class="aui-list-item">
					<div class="aui-list-item-label-icon">
						<i class="icon njfont nj-haoyou"></i>
					</div>
					<div class="aui-list-item-inner aui-list-item-arrow">
						<div class="aui-list-item-title">关于我们</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>