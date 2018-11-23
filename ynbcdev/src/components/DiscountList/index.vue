<template>
  <li :class="{already_received: discountInfor.isReceived}">
    <dl>
      <p>满{{discountInfor.allPrice}}减 {{discountInfor.offPrice}}</p>
      <h2>¥{{discountInfor.offPrice}}</h2>
    </dl>
    <em>已领</em>
  </li>
</template>

<script>
  // import Hello from './components/Hello'

  export default {
    data () {
      return {}
    },
    components: {},
    props: {
      discountInfor: {
        type: Object,
        default: {
          isReceived: false,
          allPrice: parseInt(50),
          offPrice: parseInt(5)
        }
      }
    }
  }
</script>

<style>

</style>
