<template>

    <div ref="head"   :class={[tabClassName]:true}  >
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
      var scroll = new BScroll(this.$refs.head, {
        startX: 0,
        startY: 0,
        scrollX: true,
        scrollY: false,
        click: true,
        stop:true
      })
      this.scroll = scroll
    },
    updated () {
      this.scroll.refresh()
    },
    props: {
      tabClassName:{
        type : String,
        default: ""
      }
    },
    methods: {
    },
    computed: {
    },
    components: {}
  }
</script>

<style lang="less">
  .ranking_head_box {
    width: 100%;
    top: 3rem;
    height:3.7rem;
    z-index: 1;
    background: white;
  }

</style>
