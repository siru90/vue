<template>
    <div>
      <li v-if="isputDown">
        <dl>
          <p>满200减10</p>
          <h2>¥10</h2>
        </dl>
        <em>已领</em>
      </li>
      <li>
        <dl v-else>
          <p>满300减30</p>
          <h2>¥30</h2>
        </dl>
        <em>已领</em>
      </li>
    </div>
</template>

<script>
  // import Hello from './components/Hello'

  export default {
    data () {
      return {}
    },
    props: {
      title:"",
      isputDown:"false",
      discouts:""
    },
    components: {}
  }
</script>

<style>

</style>
