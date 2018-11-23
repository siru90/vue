<template>
    <div ref="warp" id="wbxfHome">
        <div class="wbxfHomeContent">
            <div class="wbxfHomeBanner" >
                <img @click="gotoImgUrl" :src="bannerImg.image" alt="">
            </div>
            <div class="servicesPart">
                <ul>
                    <li>
                        <div class="serviceItem ripple">
                            做保养
                        </div>
                    </li>
                    <li>
                        <div class="serviceItem ripple">
                            做维修
                        </div>
                    </li>
                    <li>
                        <div class="serviceItem ripple">
                            找网店
                        </div>
                    </li>
                    <li>
                        <div class="serviceItem ripple">
                            找客服
                        </div>
                    </li>
                </ul>
            </div>
            <div class="wbxfGoodsList">
                <ul>
                    <li style="height:100px;">
                        123
                    </li>
                    <li style="height:100px;">
                        123
                    </li>
                    <li style="height:100px;">
                        123
                    </li>
                    <li style="height:100px;">
                        123
                    </li>
                    <li style="height:100px;">
                        123
                    </li>
                    <li>
                        加载更多
                    </li>
                </ul>
            </div>
        </div>

    </div>    
</template>
<script>
import * as rootTypes from "../../store/mutations-type";
import { mapMutations } from "vuex";
import BScroll from 'better-scroll'
export default {
    methods: {
        ...mapMutations([
            rootTypes.SET_HEADER]
        ),
        setHome() {
            let options = {
                titlePart: {
                    isHome: false,
                    title: "维保先锋",
                    isWbHome:true
                },
                hasSearch: false,
                handlePart: {
                    type: '',
                    handleClick: () => {
                    }
                }
            }
            this[rootTypes.SET_HEADER](options)
        },
        gotoImgUrl() {
            console.log("111")
        }
    },
    created() {
        this.$store.dispatch("jyy/getNewHomeWbData")
        this.setHome()
    },
    mounted() {
        this.setHome()
        document.getElementById("header-tt").style.height = "2.75rem";
        let scroll = new BScroll(this.$refs.warp, {
            pullUpLoad: {
                threshold: 50
            }
        })
        // scroll.on("pullingUp", function() {
        //     console.log("加载更多")
        // })
        console.dir(scroll)
        scroll.on("pullingUp", () => {
            console.log("11111")
        })
        scroll.on("pullingDown", () => {
            console.log("22222")
        })
    },
    computed: {
        bannerImg() {
            return this.$store.state.jyy.newHomeWbData.img
        }
    }

}
</script>
<style>
    #wbxfHome .wbxfGoodsList {
        flex: 1;
    }
    #wbxfHome {
        height: calc(100% - 2.75rem);
        /* display: flex;
        flex-direction: column; */
    }
    #wbxfHome .wbxfHomeBanner {
        width: 100%;
        height: 25.78vh;
    }
    #wbxfHome .wbxfHomeBanner img {
        width: 100%;
        height: 100%;
    }
    #wbxfHome .servicesPart {
        background: #ffffff;
        overflow: hidden;
        width: 100%;
        padding: 0.5rem 0;
        margin: 0.4rem 0;
    }
    #wbxfHome .servicesPart ul {
        width: 90vw;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        padding: 1.5vw 0;
    }
    #wbxfHome .servicesPart li {
        flex: 1;
        margin: 2vw;
        justify-content:space-around;
        height: 18.5vw;
    }
    #wbxfHome .servicesPart li:nth-child(1) .serviceItem {
        background: rgba(0,128,0,0.9)
    }
    #wbxfHome .servicesPart li:nth-child(1) .serviceItem:active {
        background: rgba(0,128,0,1)
    }
    #wbxfHome .servicesPart li:nth-child(2) .serviceItem {
        background: rgba(234,57,57,0.9)
    }
    #wbxfHome .servicesPart li:nth-child(2) .serviceItem:active {
        background: rgba(234,57,57,1)
    }
    #wbxfHome .servicesPart li:nth-child(3) .serviceItem {
        background: rgba(15,141,224, 0.9)
    }
    #wbxfHome .servicesPart li:nth-child(2) .serviceItem:active {
        background: rgba(234,57,57,1)
    }
    #wbxfHome .servicesPart li:nth-child(4) .serviceItem {
        background: rgba(242,192,55,0.9)
    }
    #wbxfHome .servicesPart li:nth-child(2) .serviceItem:active {
        background: rgba(234,57,57,1)
    }
    .serviceItem {
        
        text-align: center;
        width: 100%;
        height: 100%;
        line-height: 18.5vw;
        border-radius: 50%;
        color: #ffffff;
        transition: all 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
    }
    .serviceItem:active {
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
    }


    .ripple {
        position: relative;
        overflow: hidden;
    }
    .ripple:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, rgba(255,255,255,0.1)  10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .5s, opacity .5s;
    }
    .ripple:active:after {
        transform: scale(0, 0);
        opacity: .3;
        transition: 0s;
    }

</style>
