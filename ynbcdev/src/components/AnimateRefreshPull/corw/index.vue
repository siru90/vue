<template>
  <div style="width: 2rem; position:relative">
    <div class=" corw-head cjy-center"></div>
    <div class=" corw-back cjy-center" style="height: 4px;margin-top: -1px"></div>
    <div class=" corw-back cjy-center" style="height: 4px"></div>
    <div class=" corw-back cjy-center"></div>

  </div>
</template>

<script>
  // import Hello from './components/Hello'

  export default {
    data() {
      return {}
    },
    components: {}
  }
</script>

<style>
  .cjy-center {
    position: relative;
    margin: auto;
    left: 0;
    right: 0;
  }

  .corw-head {
    width: 0;
    height: 0;
    border-right: 10px transparent solid;
    border-bottom: 9px #8b8781 solid;
    border-left: 10px transparent solid;
  }

  .corw-back {
    width: 12px;
    height: 6px;
    background: #8b8781;
    margin-top: 2px;
  }

</style>
