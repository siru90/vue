<template>
  <div @touchstart="loadPosition"
       @touchend="changeEnd">
    <transition :name="className" tag="div" style="position: relative">
        <slot>

        </slot>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        className: 'goleft'
      }
    },
    props: {
      lengths: {
        type: Number,
        default: 0
      }
    },
    components: {},
//    mounted () {
//      this.$nextTick(() => {
//        this.scroll = new Bscroll(this.$refs.wrapper, {})
//      })
//    },
    methods: {
      //记录位置手指放下的位置
      loadPosition (e)  {
        this.startX = e.changedTouches[0].clientX
        this.startY = e.changedTouches[0].clientY
        this.oldX = this.startX
        this.oldY = this.startY
      },
      //改变Activeindex
      changeEnd (e) {
        var endX = e.changedTouches[0].clientX
        var endY = e.changedTouches[0].clientY

        var X = endX - this.startX;
        var Y = endY - this.startY;
        if (Math.abs(X) > Math.abs(Y) && Math.abs(X) > 100 && this.startX > 50) {
          if (X > 0) {
            var index = Math.max(0, this.activeIndex - 1)
          } else {
            var index = Math.min(this.lengths - 1, this.activeIndex + 1)
          }
          this.$store.dispatch('changeClassifyIndex', index)
          var ggactive = this.$store.state.jyModules.classifyIndex
        }
      },
      //手指移动
      changeMove (e)  {

        var newX = e.changedTouches[0].clientX
        var newY = e.changedTouches[0].clientY
        var moveX = newX - this.oldX
        var moveY = newY - this.oldY
        if (Math.abs(moveY) / Math.abs(moveX) > 1) {
          document.body.scrollTop = document.body.scrollTop - moveY
        }
        this.oldX = newX
        this.oldY = newY
      }
    },
    watch: {
      activeIndex (newData, oldData) {
        if (newData - oldData > 0) {
          this.className = "goleft"
        } else {
          this.className = "goright"
        }
      }
    },
    computed: {
      activeIndex () {
        return this.$store.state.jyModules.classifyIndex
      }
    }
  }
</script>

<style scoped>
  .goleft-enter-active, .goleft-leave-active, .goright-enter-active, .goright-leave-active {
    transition: all 0.5s;
  }

  .goleft-enter, .goright-leave-to {
    transform: translatex(100%);
    opacity: 0.8
  }

  .goleft-leave-to, .goright-enter {
    transform: translatex(-100%);
    opacity: 0.8
  }
</style>
