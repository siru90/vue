<template>
  <div style="width:100%; height: 100% ">
    <div style="height: 100%;position: relative;overflow:hidden;overflow-y:hidden;"
         id="scrollOuter"
         ref="scrollOuter">
      <div class="transition-group"
           @touchstart="loadPosition"
           @touchmove='touchMove'
           @touchend="changeEnd"
           style=" width: 100%;height: 100%;"
           ref="scrollOuter">
        <transition
          :name="className"
          tag="div"
          @after-leave="tempDestroyed"
          style="position: relative">

          <div style="position: absolute;top:0; width: 100%;height: 100% "
               v-for="(list,faindex) in lengths"
               :key="faindex"
               v-if="faindex == activeIndex ">
            <vertical-scroll
              @savePos="savePos"
              @getWrpperSize='getWrpperSize'
              @scrollBottom="scrollBottom"
              @pullDown="pullDown"
              :bounce="bounce"
              ref="verticalScroll">
              <slot>

              </slot>

            </vertical-scroll>
          </div>
        </transition>

      </div>
    </div>
    <!--<button-to-top @goTop="goTop"></button-to-top>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  /*import ButtonToTop from "../ButtonToTopForTest"
  import {mapMutations} from "vuex";*/
  import VerticalScroll from '../PullDownScroll'
  export default {
    data() {
      return {
        className: 'goleft',
        elements: null,
        timeList: [],
        top: 0,
        newVal: 0,
        oldVal: 0,
        scrollTop: 0,
        wrpperHeight: 0,
        wrpperTop: 0,
        pagePosition: {},
        oldIndex: 0,
        moveData: {x: 0, y: 0, time: 1, a: 0}
      }
    },

    props: {
      lengths: {
        type: Number,
        default: 1
      },
      bounce: {
        type: Boolean,
        default: false
      }
    },
    components: {
     /* ButtonToTop,*/
      VerticalScroll
    },
    beforeCreate () {
      /*this.$store.commit('xxy/setstoptouch', true)*/
    },
    created () {

    },
    mounted() {
      this.elements = this.$refs.scrollOuter
      this.$nextTick(() => {
        var pos = this.$store.state.cjy.returnPos
        this.$store.state.cjy.isReturn && this.returnPos(pos) //调到指定位置
      })
    },

    methods: {
      /*...mapMutations('xxy', [
        "sethomehid"
      ]),*/
      setScrollTop (data) {
        this.scrollTop = data
      },
      //记录位置手指放下的位置
      loadPosition (e)  {
        this.startX = e.changedTouches[0].clientX
        this.startY = e.changedTouches[0].clientY
        this.oldX = this.startX
        this.oldY = this.startY
      },
      touchMove (e) {
        var moveData = this.moveData
        var oldx = moveData.x
        var oldTime = moveData.time
        var newx = e.changedTouches[0].clientX
        var newy = e.changedTouches[0].clientY
        var newTiem = new Date().getTime()
        var touchTime = oldTime - newTiem
        var touchLength = oldx - newx || 1
        var a = Math.abs(touchLength / touchTime)
        this.moveData.x = newx
        this.moveData.y = newy
        this.moveData.time = newTiem
        this.moveData.a = a
      },
      //改变Activeindex
      changeEnd (e) {
        var a = this.moveData.a
        /*var isStoptouch = this.$store.state.xxy.stoptouch*/
        var endX = e.changedTouches[0].clientX
        var endY = e.changedTouches[0].clientY
        var X = endX - this.startX;
        var Y = endY - this.startY;
        var touchLength = Math.abs(X) > Math.abs(Y) && Math.abs(X)
        /*&& isStoptouch*/
        if ((touchLength > 60 || (touchLength > 30 && a > 1.2))) {
          if (X > 0) {
            var index = Math.max(0, this.activeIndex - 1)
          } else {
            var lengths = this.lengths > 0 ? this.lengths : 1
            var index = Math.min(lengths - 1, this.activeIndex + 1)
          }
          this.$store.dispatch('cjy/changeClassifyIndex', index)
          var ggactive = this.$store.state.cjy.classifyIndex
        }
        /*this.$store.commit('xxy/setstoptouch', true)*/

      },
      //滑动到底部
      scrollBottom () {
        this.$emit('scrollBottom')
      },
      //滑动大顶部
      goTop () {
        this.$refs.verticalScroll[0].goTop()
      },
      //调到指定位置
      returnPos (pos) {
        this.$refs.verticalScroll[0].gotoPosition(pos)
      },
      //刷新页面
      refresh () {
        this.$nextTick(() => {
          this.$refs.verticalScroll[0].refresh()
        })
      },
      finishPullUp () {
        this.$nextTick(() => {
          this.$refs.verticalScroll[0].finishPullUp ()
        })
      },
      //组件被销毁
      tempDestroyed(){
        this.$emit('tempDestroyed')
      },
      pullDown (data) {
        this.$emit('pullDown', data)
      },
      //获取wrpper高度
      getWrpperHeight () {
        var wrpper = this.$refs.verticalScroll[0]
        var wrpperHeight = wrpper.getWrpperHeight()
        this.wrpperHeight = wrpperHeight
        return wrpperHeight
      },
      //获取wrpper距离
      getWrpperTop (){
        var wrpper = this.$refs.verticalScroll[0]
        var wrpperTop = wrpper.getWrpperTop()
        this.wrpperTop = wrpperTop
        return wrpperTop
      },

      getWrpperSize (data) {
        this.wrpperHeight = data.wrpperHeight
        this.wrpperTop = data.wrpperTop
        this.$emit('getWrpperSize', data)
      },
      savePos (data) {
        var oldIndex = this.oldIndex
        this.pagePosition[oldIndex] = data
      }
    },
    watch: {
      activeIndex(newData, oldData) {
        var returnPosition = this.pagePosition[newData] || 0
        this.$emit( 'changeIsReutrnPosition', returnPosition != 0)
        this.oldIndex = oldData || 0
        if (newData - oldData > 0) {
          this.className = "goleft"
        } else {
          this.className = "goright"
        }
        this.$nextTick(() => {
          this.pagePosition[newData] && this.returnPos(this.pagePosition[newData]) //返回对应的位置
        })
      },
    },
    computed: {
      activeIndex() {
        var activeIndex = this.$store.state.cjy.classifyIndex
        return activeIndex
      }
    },
    beforDestory () {
      this.$store.commit('cjy/SET_IS_RETURN', false)
    }
  }
</script>

<style scoped>
  .goleft-enter-active,
  .goleft-leave-active,
  .goright-enter-active,
  .goright-leave-active {
    transition: all 0.3s;
  }

  .goleft-enter,
  .goright-leave-to {
    transform: translatex(100%);
    opacity: 0.8
  }

  .goleft-leave-to,
  .goright-enter {
    transform: translatex(-100%);
    opacity: 0.8
  }
</style>
