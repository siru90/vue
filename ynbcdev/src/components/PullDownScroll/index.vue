<template>
	<div style="width:100%;height:100%;">
		<div style="width: 100%;position: absolute;overflow: auto;overflow-y: hidden;">
		<div @touchstart="touchStart" 
			@touchmove="touchMove" 
			@touchend="touchEnd" 
			class="verticalScroll" style="width:100%;height:100%;" ref="vertical-scroll">
			<div style="width: 100%">
				<slot>

				</slot>
				<div style="width:100%;position: absolute; bottom: 0;">
				</div>
			</div>

		</div>
		</div>
	</div>
</template>

<script>
	// import Hello from './components/Hello'
	import Bscroll from 'better-scroll'

	export default {
		data() {
			return {
				statY: 0,
				scrollY: 0,
				puttDownY: 0,
				isTop: true,
				wrpperHeight: 0,
				wrpperTop: 0,
				touchEndTop: false,
				touchTime: 0,
				isOnPullingUp: false
			}
		},
		props: {
			bounce: {
				type: Boolean,
				default: false
			}
		},
		watch: {},
		components: {},
		created() {
			this.$store.commit('cjy/CHANGE_PAGE_POS_Y', 0) //初始化滚轮位置
			if(this.$store.state.cjy.isReturn) {
				this.returnPosition()
			}

		},
		mounted() {
			window.PSEvent.listen('verticalScrollGoPosition', this.goToPositionForHeader)
			this.$nextTick(
				this.createdScroll() //执行初始化 bsroll
			)
		},
		methods: {

			//刷新组件
			refresh() {
				if(this.Bscroll) {
					this.Bscroll.refresh()
					console.log('+++refresh')
				}
			},

			//跳到顶部 含动画效果
			goToPositionForHeader(event) {
				this.Bscroll.scrollTo(0, -event, 500, 'easing')
			},

			//滚动到指定位置  该方法会在3内秒持续调用 直到页面高度超过要到的页面位置
			gotoPosition(pos) {
				var position = pos // 跳转到的位置
				var deleat = 100; //延迟时间
				var i = 0 // 执行次数
				var gotoPosistion = () => {
					i++ // 每次gotoPosistion执行次数加1
					// 设置定时器
					this.setTimeOut = setTimeout(() => {
						var outerHeight = this.Bscroll ? -this.Bscroll.maxScrollY : 0 // 获取当前Bscroll的最大高度
						if(i * deleat > 3000) {
							//当执行到3000 ms时结束
							this.$store.commit("cjy/SET_IS_RETURN", false);
							this.isTop = true
							return
						} else if(outerHeight >= position) {
							// 当Bscroll的最大高度 不小于要滚动的位置 执行滚动到指定位置
							this.Bscroll.scrollTo(0, -position, 0, 'easing') // 让bscroll调到指定的位置
							this.scrollY = position // 将页面位置记录保存到组件
							this.$store.commit('cjy/CHANGE_PAGE_POS_Y', position) // 将页面位置存到vuex
							this.$store.commit("cjy/SET_IS_RETURN", false); // 将返回跳转状态重置
							this.isTop = false
							return
						}

						gotoPosistion() // 递归重复执行
					}, deleat)
				}

				//如果滚动位置为0 不需要混动 退出
				if(position == 0) {
					this.isTop = true
					return
				} else {
					this.isTop = false
				}
				gotoPosistion() //执行 跳转代码
			},

			//  初始Bscroll实例
			createdScroll() {
				// 如果bscroll实例存在那么就先销毁实例
				this.Bscroll && this.Bscroll.destroy()
				//拿到dom元素
				var verticalScroll = this.$refs['vertical-scroll']
				// 初始化实例
				this.Bscroll = new Bscroll(verticalScroll, {
					scrollY: true,
					bounce: this.bounce,
					probeType: 3,
					click: true,
					swipeBounceTime: 2000,
					deceleration: 0.0015,
					pullUpLoad: {
						threshold: -60,
						type: true
					}
				})
				console.log(this.Bscroll)
				//监听滚轮位置
				this.listenBscroll()
				// 监听滚动结束
				this.listenBscrollEnd()

				this.pullingUp()
				//将滚动页面的高度信息传递给父组件
				var wrpperHeight = this.getWrpperHeight()
				var wrpperTop = this.getWrpperTop()
				this.$emit('getWrpperSize', {
					wrpperHeight,
					wrpperTop
				})
			},
			//获取高度
			getWrpperHeight() {
				var verticalScroll = this.$refs['vertical-scroll']
				this.wrpperHeight = verticalScroll ? verticalScroll.offsetHeight : document.body.offsetHeight
				return this.wrpperHeight
			},
			//获取距页面高度
			getWrpperTop() {
				var verticalScroll = this.$refs['vertical-scroll']
				this.wrpperTop = verticalScroll ? verticalScroll.getBoundingClientRect().top : 0
				return this.wrpperTop
			},

			//监听滚轮位置方法
			listenBscroll() {
				this.scrollFn = (pos) => {
					this.$store.commit('cjy/CHANGE_PAGE_POS_Y', -pos.y) //更新vuex中页面滚轮位置
					this.scrollY = -pos.y
				}
				this.Bscroll.on('scroll', this.scrollFn)
			},

			// 监听滚轮结束方法
			listenBscrollEnd() {
				this.Bscroll.on('scrollEnd', (pos) => {
					this.$store.commit('cjy/SET_RETURN_POS', -this.Bscroll.y) //滚轮结束时将当前滚动位置传递给 vuex 中的returnPos
					// 当滚动到底部时 将触发父级的 已滚动到底部事件
					if(this.Bscroll.maxScrollY + 20 > this.Bscroll.y && !this.bounce) {
						this.$emit('scrollBottom') // 将滚轮已经滚动到底部事件 传递给父级
					}

					//下拉刷新
					this.isOnPullingUp = false

					if(pos.y == 0) {
						this.isTop = true
					} else {
						this.isTop = false
					}
					window.PSEvent.trigger('scrollEnd')
				})
			},

			pullingUp() {
				this.Bscroll.on('pullingUp', () => {
					this.$emit('scrollBottom')
					this.isOnPullingUp = true
				})
			},

			finishPullUp() {
				this.Bscroll.finishPullUp()
			},
			// 滚动到头部
			goTop() {
				this.Bscroll && this.Bscroll.scrollTo(0, 0, 500, 'easing')
			},

			//滑动事件开始
			touchStart(event) {
				this.statY = event.changedTouches[0].clientY //
				this.statX = event.changedTouches[0].clientX
				this.touchTime = 0
				this.touchEndTop = false
			},

			// 手指滑动中
			touchMove(event) {
				var statMove = event.changedTouches[0].clientY // 手指相对屏幕的位置
				var puttDownY = Math.max(0, statMove - this.statY) //相对滑动开始时的手指距离
				this.puttDownY = puttDownY
				if(statMove - this.statY > 0 && this.touchTime == 0 && this.isTop) {
					var touchPos = this.touchPos
					var isDown = Math.abs(event.changedTouches[0].clientY - this.statY) > Math.abs(event.changedTouches[0].clientX - this.statX)
					this.touchEndTop = isDown //判断 如果是首次挪动手指并且是向下移动  能激活下滑刷新
				}
				if(this.touchEndTop) { //在可刷新状态下
					this.Bscroll.disable()//禁用页面滑动
					window.PSEvent.trigger('verticalPllDown', puttDownY) // 发送事件给其他组件 在可刷新状态
				}
				this.touchTime++ //本次touch事件中手指挪动次数刷新
			},

			// 手指滑动结束
			touchEnd(event) {
				// 如果已激活下滑刷新
				if(this.touchEndTop) {
					event && event.stopPropagation()
					event && event.preventDefault() //touch结束时阻止 点击事件发生
					this.Bscroll.enable() // touch事件结束时重新激活 滑动
				}
				// 手指滑动距离 超过0 结束时将事件发送出去
				if(this.puttDownY > 0 && this.touchEndTop) {
					var puttDownY = this.puttDownY
					this.$emit('pullDown', puttDownY)
					window.PSEvent.trigger('verticalPllDownEnd', puttDownY)
				}
				this.puttDownY = 0 // 重新初始化滑动的距离

				//当手指离开时判断是否是在最顶端
				if(this.scrollY != 0) {
					this.isTop = false
				}
			},

			// 根据路由名称查找对应存储的页面位置信息并返回
			returnPosition() {
				var pageName = this.$route.name // 获取路由名称
				var pagePositionDate = this.$store.state.cjy.returnPos || {} // 获取位置存贮信息列表
				var pagePosy = pagePositionDate[pageName] ? pagePositionDate[pageName].returnPosy : 0 //找出对应的位置信息
				this.gotoPosition(pagePosy) //调用方法返回这个位置
			}

		},

		computed: {
			
		},

		updated() {
			this.$nextTick(
				() => {
					console.log('refresh')
					this.refresh() // 刷新Bscall组件
				}
			)
		},
		beforeDestroy() {
			this.setTimeout && clearTimeout(this.setTimeout) // 清除定时器
			this.Bscroll && this.Bscroll.destroy() // 销毁Bscroll
			this.$emit('savePos', this.scrollY) //将当前的滚动位置传回父组件
			window.PSEvent.remove && window.PSEvent.remove('verticalScrollGoPosition', this.goToPositionForHeader) //移除事件监听
		},
	}
</script>

<style scoped="">
	.editScroll {
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>