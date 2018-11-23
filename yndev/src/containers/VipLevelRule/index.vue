<template>
    <viplevelrule :vipLevelRule="vipLevelRule"></viplevelrule>
</template>
<script>
import viplevelrule from '../../components/VipLevelRule'
export default {
    async created() {
        await this.$store.dispatch("jyy/getVipExpMethods")
        this.$store.dispatch("jyy/getVipLevelRule")
    },
    components: {
        viplevelrule
    },
    computed: {
        vipLevelRule() {
            return this.$store.state.jyy.vipLevelRule
        }
    }
}
</script>
<style>

</style>
