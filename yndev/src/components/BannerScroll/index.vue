<template>
  <div ref="head" class="cjy-waper" @touchstart="stopSlid"><!-- -->
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.$nextTick(() => {
        var bounce = this.bounce
        var wrapperWidth = this.$refs.head.offsetWidth
        var scroll = new BScroll(this.$refs.head, {
          startX: 0,
          startY: 0,
          scrollX: true,
          scrollY: false,
//        click: true,
          stop: true,
          freeScroll: true,
          momentum: true,
          bounce: bounce,
          eventPassthrough: 'vertical',
        })
        scroll.maxScrollX = wrapperWidth - scroll.scrollerWidth
        this.scroll = scroll

      })

    },
    updated () {

    },
    props: {
      tabClassName: {
        type: String,
        default: ""
      },
      bounce: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      stopSlid () {
      }
    },
    computed: {},
    components: {},
    updated () {
//      console.log('shuaxin')
//      var scroll = this.scroll
//      if (scroll) {
//        this.scroll.refresh()
//        var wrapperWidth = this.$refs.head.offsetWidth
//        scroll.maxScrollX = wrapperWidth - scroll.scrollerWidth
//      }
    }
  }
</script>

<style lang="less">
  .ranking_head_box {
    width: 100%;
    top: 3rem;
    height: 3.7rem;
    z-index: 1;
    background: white;
  }

  .cjy-waper {
    width: 100%;
  }

</style>
