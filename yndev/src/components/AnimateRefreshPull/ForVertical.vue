<template>
  <div style=" width: 100%;overflow:hidden;position: relative"
       :class="{'cjy-animat' : lastAnimate}"
       :style="{height:boxHeight+ 'px'}">
  </div>
</template>

<script>
  import indexVue from './index'

  export default {
    data() {
      return {}
    },
    mixins: [indexVue]
  }
</script>

<style>

</style>
