<template>
	<nav>
		<!--首页tab滚动切换模块 可左右滑动切换-->
		<!--<div class=" cjy-scroll " style="overflow-x: scroll;height: 2.5rem ">-->
		<div class="cjy-outer" ref="navhead">

			<ul class="cjy-list" style="width: 100%;">
				<!--滑动位置提示-->
				<li class="cjy-slder">
					<div style="position: absolute; bottom: 0;width: 100%; height: 1px; background: rgb(234, 234, 234)
; "></div>
					<div class="cjy-active-slider" ref="activeSlider"></div>
				</li>
				<!--滑动位置提示end-->

				<!--每个分类选项按钮-->
				<li class="cjy-tab-item" v-if="" v-for="(item, index) in titleInfor" :class="{'active-list':activeList == index}" @click="changeIndex(index)" ref="titleLi">{{item.goodsClassName}}
				</li>
				<!--每个分类选项按钮end-->

				<li v-if="titleInfor.length>4" class="cjy-tab-item" style="width:2rem!important;">
				</li>
			</ul>

			<!--下拉菜单按键-->
			<div v-if="titleInfor.length > 4" class="classify_select" style="height: 2rem;position:absolute!important;" @click="classifyClum = true">
				<em></em>
			</div>
			<!--下拉菜单按键end-->
		</div>

		<!--弹出分类选择-->
		<transition name="nav-window">
			<div class="select_con" style="display: block;overflow: hidden;z-index: 88;position: absolute;top: 0" v-show="classifyClum" @click="classifyClum = false">
				<h3 style="font-size: 0.7rem">分类<em></em></h3>
				<ul class="aui-row">
					<li class="aui-col-xs-3" v-if="" v-for="(item , index) in titleInfor" @click="changeIndex(index)"><span :class="{'active-list':activeList == index}">{{item.goodsClassName}}</span></li>

				</ul>
			</div>
		</transition>
		<div id="mask_bj" class="mask_bj" style="display: block" v-show="classifyClum" @click="classifyClum = false"></div>
		<!--弹出分类选择end-->
	</nav>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				classifyClum: false, //控制下拉菜单的
			}
		},
		props: {
			titleInfor: {
				type: Array,
				//传入的数据如下 分类名称必传
				default: [{
					goodsClassId: "",
					goodsClassName: "分类"
				}]
			}
		},
		components: {},
		watch: {
			activeList(newData) {
				this.tapMove(newData)
			},

			titleInfor() {
				this.scroll.refresh()
			},
			$route() {
				this.classifyClum = false
			}

		},
		methods: {
			//tap栏滚动
			tapMove(newData) {
				var testDiv = this.$refs.titleLi
				var index = newData
				var activeTitle = testDiv[index]
				var scrollLeft

				//隐藏部分为将活动的tap设置在头部
				//        var minWidth = parseInt(this.scroll.scrollerWidth - this.scroll.wrapperWidth)
				//        for (var i = index; i >= 0; i--) {
				//          if (testDiv[i].offsetLeft<= minWidth) {
				//            scrollLeft =testDiv[i].offsetLeft
				//            break
				//          }
				//        }
				//        if (i == 0) {
				//          scrollLeft = 0
				//        }
				scrollLeft = Math.max(0, activeTitle.offsetLeft - document.body.offsetWidth / 2 + activeTitle.offsetWidth / 2)
				scrollLeft = Math.min(scrollLeft, this.scroll.scrollerWidth - document.body.offsetWidth)
				console.log(scrollLeft)
				this.scroll.scrollTo(-scrollLeft, 0, 500, "easing")

				this.sliderMove() //控制滑动条的移动

			},

			//更改滑动条的位置和大小
			sliderMove() {

				var activeTitleLi = this.$refs.titleLi[this.activeList]
				var activeSlider = this.$refs.activeSlider
				activeSlider.style.transform = `translatex( ${activeTitleLi.offsetLeft}px)`
				activeSlider.style.width = activeTitleLi.offsetWidth + "px"
			},

			//将所index值传入Vuex  获取index的方法为 this.$store.state.jyModules.classifyIndex 直接复制不谢
			changeIndex(index) {
				
				this.$store.dispatch('changeClassifyIndex', index)
			},

		},
		computed: {
			activeList() {
				console.log(this.$store.state.jyModules.classifyIndex)
				
				return this.$store.state.jyModules.classifyIndex
			}
		},
		created() {},
		mounted() {
			var scroll = new BScroll(this.$refs.navhead, {
				startX: 0,
				startY: 0,
				scrollX: true,
				scrollY: false,
				click: true,
				bounce: false,
				momentumLimitDistance: 5
			})
			this.scroll = scroll
			this.tapMove(this.activeList)
			this.sliderMove()
		},
		updated() {
			this.scroll.refresh()
		}
	}
</script>

<style scoped>
	.classify_select {
		right: 0;
		top: 0;
	}
	
	.cjy-tab-item {
		padding: 0;
		width: 33.33%;
		height: 100%;
		line-height: 2.2rem;
		text-align: center;
		overflow: hidden;
		text-overflow: clip;
		word-break: break-all;
		white-space: inherit;
		/*border-bottom: 2px solid transparent;*/
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 0.7rem;
	}
	
	.active-list {
		/*border-bottom: 2px solid #0f8de0;*/
		color: #0f8de0;
		;
	}
	
	.cjy-list {
		display: flex;
		position: absolute;
		height: 100%;
	}
	
	.cjy-outer {
		width: 100%;
		top: 0;
		position: absolute;
		height: 2.2rem;
		z-index: 1;
		background: white;
		/*border-bottom:  solid rgb(234, 234, 234);*/
	}
	
	.cjy-scroll {
		position: relative;
		height: 100%;
		top: 3rem;
	}
	
	.aui-col-xs-3 {
		font-size: 0.7rem;
	}
	
	.nav-window-enter-active,
	.nav-window-leave-active {
		transition: all 0.2s;
	}
	
	.nav-window-enter,
	.nav-window-leave-to {
		transform: translatey(-100%);
		opacity: 0;
	}
	
	.cjy-slder {
		height: 100%;
		width: 0;
	}
	
	.cjy-active-slider {
		height: 100%;
		background: #0f8de0;
		position: absolute;
		bottom: 0;
		height: 2px;
		left: 0;
		transition: 0.5s;
	}
</style>