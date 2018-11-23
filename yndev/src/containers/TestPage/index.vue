<template>
    <test :testData="a"></test>
</template>
<script>
import test from '../../components/TestPage'
export default {
    components: {
        "test": test
    },
    data() {
        return {
            a: "ceshi"
        }
    },
}
</script>
<style>

</style>
