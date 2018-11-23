<template>
    <div >
        测试页面
        {{testData}}
        <button @click="doclick" class=""></button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    props: {
        testData: {
            type: String,
            default: "adf"
        }
    },
    methods: {
        doclick() {
            Toast("xinisfsf")
        }
    }
}
</script>
<style>

</style>

