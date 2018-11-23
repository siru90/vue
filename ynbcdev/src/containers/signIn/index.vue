<template>
    <div id="signIn">
        <div class="header">
            <header class="aui-bar aui-bar-nav aui-bar-light" ref="header">
                <div class="go-back" @click.stop="goBack">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">签到</div>
            </header>
        </div>
        <!-- <div style="width:100%;height:3rem;"></div> -->
        <div class="contents" ref="contents">
            <div class="mobleData">
                <div>
                    <img src="static/image/img.png" alt="!">
                    <span>流量：{{SignIn ? receiveflow : '0'}}m</span>
                </div>
            </div>
            <div class="signProcession">
                <div class="signedInfo">
                    <ul>
                        <li v-for="(item, index) in dateList" :key="index">
                            <p v-if="item.receiveflow">{{item.receiveflow}}m</p>
                            <p v-if="!item.receiveflow"></p>
                            <img src="static/image/on.png" v-if="item.receiveflow" alt="#">
                            <img src="static/image/off.png" v-if="!item.receiveflow" alt="#">
                            <p v-if="item.receivetime">{{formatTime(item.receivetime).split(' ')[0].split("-")[1]}}-{{formatTime(item.receivetime).split(' ')[0].split("-")[2]}}</p>
                            <p v-if="!item.receivetime"></p>
                        </li>
                        <li>
                            <p v-if="SignIn && showTopUp">{{receiveflow}}m</p>
                            <!--这个不该有  -->
                            <!-- <p v-if="showTopUp && !receiveflow"></p> -->
                            <!--真的不该有  -->
                            <p v-if="!SignIn"></p>
                            <div class="TopUp" v-if="!showTopUp && SignIn" @click="toTopUp">
                                <img src="static/image/btn.png">
                            </div>
                            <img src="static/image/off.png" alt="#" v-if="!SignIn">
                            <img src="static/image/on.png" alt="#" v-else>
                            <p>今天</p>
                        </li>
                        <li>
                            <p></p>
                            <div class="unknown">?</div>
                            <p>明天</p>
                        </li>
                    </ul>
                </div>
                <div class="lineThrough"></div>
                <div class="darkLine"></div>
            </div>
            <div class="advertisment">
                <p>签到送流量，快来免费领取流量吧</p>
                <img src="static/image/bg2.png" alt="#">
            </div>
            <div class="signInBTN">
                <p v-if="!SignIn" @click="goSign">签到</p>
                <p v-else @click="getTomorrow">已签到</p>
            </div>
            <div class="rules">
                <div class="rulesTitle">
                    <p>签到规则</p>
                </div>
                <div class="rulesContent">
                    <p><span>1、</span><span>活动期间，每人每天可签到一次，签到可获得一定额度的流量奖励。</span></p>
                    <p><span>2、</span><span>签到获得的流量需要通过充值功能充值到对应终端才能生效。</span></p>
                    <p><span>3、</span><span>签到的流量当天充值有效，超过24点作废。</span></p>
                    <p><span>4、</span><span>签到充值到终端的流量限当月使用，不能累积到下一个月使用。</span></p>
                </div>
            </div>
            <Recharge ref="recharge"></Recharge>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { getUserInfoAgain, getSessionId } from '../../components/config/getData.js'
import axios from 'axios';
import Recharge from '../../components/Recharge';
import {Toast} from "../../utils/toast2";
export default {
    props: {

    },
    data() {
        return {
            dateList: [{},{},{},{},{}],
            SignIn: false,
            showTopUp: false,
            receiveflow: '',
            todayCheckin: '',
            haveCheckinTask: ''
        }
    },
    computed: {
        userInfo() {
			return this.$store.state.xhModules.userInfo
		},
        sessionId() {
			return this.$store.state.xhModules.sessionId
		},
        login() {
			return this.$store.state.xhModules.login
        },
        ...mapGetters("gwModules", [
            "getCurrentRechargeResult"
        ]),
        
    },
    components: {
        Recharge
    },
    created(){
        if(!this.sessionId){
            Toast({
                message: "请先登录。",
                type: 'warn',
                duration: 2000
            })
            this.$router.replace({'path': 'login',query:{page:'signIn'}});
        }
    },
    mounted(){
        // this.$refs.contents.style.height = document.documentElement.clientHeight - this.$refs.header.offsetHeight + 'px';
        // console.log(window.api)
        this.commence();
    },
    methods: {
        ...mapMutations("xhModules", [
            "USER_INFO",
            "LOGO_IN",
            "LOGO_OUT",
        ]),
        goBack() {
            this.$router.replace({'path': 'main/profile'});
        },
        async commence() {
            if(!this.userInfo){
                // await getSessionId();
                // function getUserInfo() {
                //     if(this.$store.state.xhModules.userInfo){
                //         console.log(this.$store.state.xhModules.userInfo,"this");
                //     }else{
                //         getUserInfo()
                //     }
                // }
                
                // await getUserInfoAgain(this.sessionId);
                // let response = await getUserInfoAgain(this.sessionId);
                // alert(JSON.stringify(response));
                // if(response.returncode === 0) {
                //     this.LOGO_OUT(false);
                //     return
                // }
                // this.LOGO_IN(true);
                // await this.USER_INFO(response.data[0]);
                // setTimeout(() => {
                    
                // },500)
                this.timer = setInterval( () => {
                    if (this.userInfo) {
                        clearInterval(this.timer);
                        this.timer = null;
                        this.geInfoFn();
                    }
                },200)
            }else{
                this.geInfoFn();
            }
        },
        geInfoFn(){
            var vipid = this.userInfo.vipid;
            var enterpriseid = this.userInfo.enterpriseid;
            // let url = 'http://test.base.scn.weilian.cn' + '/flowCheckin/queryCheckinInfo';
            let url = window.api.mall_base_host + 'flowCheckin/queryCheckinInfo';
            let options = {
                method: "get",
                url: url,
                params:{
                    vipid: vipid,
                    enterpriseid: enterpriseid
                }
            }
            axios(options).then((res) => {
                let temp = res.data.data[0];
                if(res.data.returnCode == 1){
                    if(temp.checkinFlowList.length == 0){
                        let arr = [];
                        for(let i = 0;i < 5;i++){
                            let obj = {
                                SignIn : false,
                                receiveflow : '',
                            }
                            let time = new Date().getTime();
                            obj.receivetime = time - 86400000 * (i + 1);
                            arr.push(obj);
                        }
                        this.dateList = arr.reverse();
                    }else if(temp.checkinFlowList.length > 0 && temp.checkinFlowList.length < 5){
                        let arr = [];
                        for(let i = 0;i < 5 - temp.checkinFlowList.length;i++){
                            let obj = {
                                SignIn : false,
                                receiveflow : '',
                            }
                            let time = new Date().getTime();
                            obj.receivetime = time - 86400000 * (i + temp.checkinFlowList.length + 1);
                            arr.push(obj);
                        }
                        for(let i = 0;i < temp.checkinFlowList.length;i++){
                            for(let j = i;j < temp.checkinFlowList.length;j++){
                                console.log(temp.checkinFlowList[i].receivetime > temp.checkinFlowList[j].receivetime)
                                if(temp.checkinFlowList[i].receivetime > temp.checkinFlowList[j].receivetime){
                                    let temper = temp.checkinFlowList[i];
                                    temp.checkinFlowList[i] = temp.checkinFlowList[j];
                                    temp.checkinFlowList[j] = temper;
                                }
                            }
                        }
                        this.dateList = arr.reverse().concat(temp.checkinFlowList.reverse());
                    }else{
                        let ListLength = temp.checkinFlowList.length;
                        for(let i = 0;i < ListLength;i++){
                            for(let j = i;j < ListLength;j++){
                                if(temp.checkinFlowList[i].receivetime > temp.checkinFlowList[j].receivetime){
                                    let temper = temp.checkinFlowList[i];
                                    temp.checkinFlowList[i] = temp.checkinFlowList[j];
                                    temp.checkinFlowList[j] = temper;
                                }
                            }
                        }
                        this.dateList = temp.checkinFlowList;
                    }
                    this.haveCheckinTask = temp.haveCheckinTask;
                    if(Number(temp.haveCheckinTask)){
                        this.SignIn = Boolean(parseInt(temp.isCheckedin));
                        this.todayCheckin = temp.todayCheckin;
                        this.receiveflow = temp.todayCheckin.receiveflow;
                        this.showTopUp = Boolean(parseInt(temp.todayCheckin.ifcharge));
                    }
                }else{
                    console.log("获取数据失败")
                }
            })
        },
        goSign(){
            if (!Number(this.haveCheckinTask)){
                Toast({
                    message: "活动未开启",
                    type: 'warn',
                    duration: 2000
                })
                return false;
            }
            var vipid = this.userInfo.vipid;
            var enterpriseid = this.userInfo.enterpriseid;
            let obj = {
                vipid: vipid,
                enterpriseid: enterpriseid
            }
            let url = window.api.mall_base_host + 'flowCheckin/doFlowCheckin';
            let options = {
                method: "get",
                url: url,
                params: obj
            }
            axios(options).then((res) => {
                let temp = res.data.data[0];
                if(res.data.returnCode == 1){
                    if(temp.checkinstatus == 1){
                        console.log(temp)
                        this.geInfoFn();
                        this.$refs.recharge.rToast({
                            rechargeParams: {
                                checkindtlid: temp.flowCheckin.checkindtlid
                            },
                            state:1,//样式
                            number: temp.flowCheckin.receiveflow//充值多少流量
                        })
                    }else if(temp.checkinstatus == 3){
                        this.geInfoFn();
                        Toast({
                            message: "今日流量被领光了，请明天再来。",
                            type: 'warn',
                            duration: 2000
                        })
                    }
                }else if(res.data.returnCode == 2){
                    Toast({
                        message: "今天已经签到了，请明天再来。",
                        type: 'warn',
                        duration: 2000
                    })
                }
            })
        },
        toTopUp(){
            this.$router.push({'path':'main/trafficTopUp', query: {'item': this.todayCheckin}})
        },
        add0(m){
            return m < 10 ? '0' + m : m
        },
        formatTime(timer){
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(timer);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        },
        getTime(){
            let date = new Date().getTime();
            return date;
        },
        getTomorrow(){
            Toast({
                message: "今天已签到，请明天再来。",
                type: 'warn',
                duration: 2000
            })
        },
        
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
    }
}
</script>

<style>
    #signIn{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .contents{
        margin-top: 3rem;
        width: 100%;
        overflow-x: hidden;
        flex: 1;
        position: relative;
        background: #007ee5 url('../../../static/image/bg.png') no-repeat left bottom;
        background-size: contain;
    }
    .BGI{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .mobleData{
        width: 100%;
        height: 3rem;
        box-sizing: border-box;
        padding: .9rem;
    }
    .mobleData>div{
        width: 4.7rem;
        height: 1.1rem;
        position: relative;
        color: white;
    }
    .mobleData>div>img{
        width: 100%;
        height: 100%;
    }
    .mobleData>div>span{
        position: absolute;
        top: .08rem;
        right: .5rem;
        font-size: .6rem;
    }
    .signedInfo{
        width: 100%;
        height: 100%;

    }
    .signedInfo ul{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        box-sizing: border-box;
        padding: 0 .2rem;
    }
    .signedInfo ul li{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .unknown{
        width: 1.45rem;
        height:1.45rem;
        border-radius:50%;
        text-align:center;
        line-height:1.45rem;
        color:white;
        background:#0065b7;
    }
    .TopUp{
        color: white;
        width: 2.67rem;
        height: 1.22rem;
        margin-bottom: .3rem;
    }
    
    .signedInfo p{
        color: white;
        height: 1.5rem;
        line-height: 1.5rem;
    }
    .signedInfo img{
        width: 1.45rem;
    }
    .TopUp img{
        width: 100%;
    }
    .signProcession{
        width: 100%;
        height: 5.25rem;
        position: relative;
    }
    .lineThrough{
        width: 80%;
        height: .15rem;
        background: #ffd92c;
        position: absolute;
        left: 0;
        top: 2.5rem;
        z-index: 2;
    }
    .darkLine{
        width: 100%;
        height: .15rem;
        background: #0065b7;
        position: absolute;
        left: 0;
        top: 2.5rem;
        z-index: 1;
    }
    .advertisment{
        margin-top: .2rem;
        width: 100%;
        height: 1.75rem;
        position: relative;
    }
    .advertisment p{
        color: white;
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 1.75rem;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    .advertisment img{
        width: 90%;
        position: absolute;
        left: 0;
        top: 0;
        left: 5%;
    }
    .signInBTN{
        margin-top: 1.15rem;
        width: 100%;
        height: 2.5rem;
        position: relative;
        text-align: center;
        background: url('../../../static/image/signIn.png') no-repeat center center;
        background-size: 8.5rem;
    }
    .signInBTN p{
        height: 100%;
        line-height: 2.5rem;
        color: #ff8206;
        font-size: .9rem;
    }
    .rules{
        width: 100%;
        margin: 2.4rem auto .7rem auto;
    }
    .rulesTitle{
        width: 90%;
        height: 2.5rem;
        margin: 0 auto;
        border-radius: .3rem .3rem 0 0;
        background: #ff8206;
    }
    .rulesTitle p{
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 2.5rem;
        font-size: .725rem;
        color: white;
    }
    .rulesContent{
        width: 90%;
        margin: 0 auto;
        background: white;
        border-radius: 0 0 .3rem .3rem;
        height: 10.3rem;
        box-sizing: border-box;
        padding: .7rem .9rem;
    }
    .rulesContent p{
        color: #bbbbbb;
        font-size: .7rem;
        text-align: left;
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        line-height: 1.15rem;
    }
    .rulesContent p span:nth-child(1){
         width: 1rem;
         height: 1rem;
    }
    .rulesContent p span:nth-child(2){
         flex: 1;
    }
</style>


