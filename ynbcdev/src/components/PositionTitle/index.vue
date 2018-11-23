<template>
    <div class="classify_title">
        <h1>{{titleConfig.title}}</h1>
        <p>{{titleConfig.describe}}</p>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        props : {
            titleConfig: {
                type : Object,
                default : {}
            }
        },
        methods : {
            
        },
        mounted () {
            
        },
        watch : {
           
        }
    }
</script>

<style>
    
</style>