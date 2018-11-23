<template>
    <yygd :defaultData="defaultData" :serviceSlots="serviceSlots"></yygd>
</template>
<script>
import yygd from '../../components/WbxfWordOrder/index'
export default {
    components: {
        yygd
    },
    data() {
        return {
            serviceSlots: [
                {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ]
        }
    },
    computed: {
        defaultData() {
            console.log(this.$store.state.jyy.wbOrderData)
            
            return this.$store.state.jyy.wbOrderData
        }
    },
    created() {
        console.log()
    },
}
</script>
<style>

</style>
