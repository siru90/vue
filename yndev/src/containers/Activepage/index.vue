<template>
    <ap :goodsList="goodsList"></ap>
</template>
<script>
import ap from '../../components/Activepage'
import { goodsList } from './goodsListData'
export default {
    components: {
        ap: ap
    },
    data() {
        return {
            goodsList: goodsList
        }
    }
}
</script>
<style>

</style>
