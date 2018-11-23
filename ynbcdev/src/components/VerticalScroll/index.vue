<template>
  <div style="width:100%;height:100%;">

    <div v-if="env === 'edit'" class="editScroll" style="width:100%;height:100%;">
      <slot>

      </slot>
    </div>

    <div v-else class="verticalScroll" ref="vertical-scroll">
      <div style="width: 100%;">
        <slot>

        </slot>
        <div style="width:100%;position: absolute; bottom: 0;">
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  // import Hello from './components/Hello'
  import Bscroll from 'better-scroll'

  export default {
    data () {
      return {}
    },
    watch: {},
    components: {},
    created () {
      this.$store.commit('cjy/CHANGE_PAGE_POS_Y', 0) //初始化滚轮位置
    },
    mounted() {
      if (this.env == 'edit') {
        return
      }
      this.$nextTick(() => {
          this.createdScroll() //执行初始化 bsroll
        }
      )

    },
    methods: {
      refresh () {
        if (this.Bscroll) {

          this.Bscroll.refresh()// 刷新bscroll 组件

        }

      },
      //滚动到指定位置
      gotoPosition (pos) {
        var position = pos // 跳转到的位置
        var deleat = 100; //延迟时间
        var i = 0  // 执行次数

        //递归
        var gotoPosistion = () => {
          i++ // 每次gotoPosistion执行次数加1
          // 设置定时器
          this.setTimeOut = setTimeout(() => {
            var outerHeight = this.Bscroll ? -this.Bscroll.maxScrollY : 0  // 获取当前Bscroll的最大高度

            if (i * deleat > 3000) {
              //当执行到3000 ms时结束
              return
            } else if (outerHeight >= position) {
              // 当Bscroll的最大高度 不小于要滚动的位置 执行滚动到指定位置
              this.Bscroll.scrollTo(0, -position, 0, 'easing')
              return
            }
            // 递归重复执行
            gotoPosistion()
          }, deleat)
        }

        //如果滚动位置为0 不需要混动 退出
        if (position == 0) {
          return
        }
        gotoPosistion()//执行 跳转代码
      },

      //  初始Bscroll实例
      createdScroll ()  {
        this.Bscroll && this.Bscroll.destory()
        var verticalScroll = this.$refs['vertical-scroll']
        this.Bscroll = new Bscroll(verticalScroll, {
          scrollY: true,
          bounce: false,
          probeType: 3,
          click: true
        })
//        console.log(this.Bscroll)

        this.listenBscroll()//监听滚轮位置
        this.$store.commit('cjy/CHANGE_PAGE_POS_Y', 0)
        // 监听滚动结束
        this.Bscroll.on('scrollEnd', (pos) => {
          this.$store.commit('cjy/SET_RETURN_POS', -this.Bscroll.y) //滚轮结束时将当前滚动位置传递给 vuex 中的returnPos
          // 当滚动到底部时 将触发父级的 已滚动到底部事件
          if (this.Bscroll.maxScrollY + 20 > this.Bscroll.y) {
            this.$emit('scrollBottom') // 将滚轮已经滚动到底部事件 传递给父级
          }
        })
      },

      //监听滚轮位置方法
      listenBscroll () {
        this.scrollFn = (pos) => {
          //将滚轮位置传递给父级
          this.$store.commit('cjy/CHANGE_PAGE_POS_Y', -pos.y) //更新vuex中页面滚轮位置
        }
        this.Bscroll.on('scroll', this.scrollFn)
      },

      // 滚动到头部
      goTop () {
        this.Bscroll && this.Bscroll.scrollTo(0, 0, 500, 'easing')
      },
    },

    computed: {
      env() {
        return window.environment;
      },
    },
    updated() {
      this.$nextTick(
        () => {
          this.refresh() // 刷新动作
        }
      )
    },
    beforeDestroy() {
      this.setTimeout && clearTimeout(this.setTimeout) // 清除定时器
      this.Bscroll && this.Bscroll.destroy()
    }
  }
</script>

<style scoped="">
  .editScroll {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .verticalScroll {
    width: 100%;
    height: 100%;
  }
</style>
