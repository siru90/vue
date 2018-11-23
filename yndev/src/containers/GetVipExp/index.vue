<template>
    <getVipExp :methodsList="methodsList"></getVipExp>
</template>
<script>
import getVipExp from '../../components/GetVipExp'
export default {
    async created() {
        await this.$store.dispatch("jyy/getVipExpMethods")
    },
    computed: {
        methodsList() {
            return this.$store.state.jyy.vipExpMethods
        }
    },
    components: {
        getVipExp
    }
}
</script>
<style>

</style>
