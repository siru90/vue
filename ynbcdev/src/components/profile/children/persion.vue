<template>
  <div class="vue_app" style="position: absolute;width: 100%">
    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light">
      <router-link to="/main/profile">
        <div class="go-back">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </router-link>
      <div class="aui-title">个人信息</div>
    </header>
    <!--头部-->
    <div style="height:3rem;"></div>
    <div class="aui-content personal_information js_uploadBox">
      <ul class="aui-list aui-list-in">
        <!--头像栏结束-->
        <li class="aui-list-item" style="position: relative; height:3.5rem;">
          <vue-clip :options="options" :on-complete="complete" :on-max-files="maxFilesReached"
                    :on-sending="sending" class="feild-mode">

            <!--//图片展示-->
            <template slot="clip-uploader-body" scope="props ">
              <div class="aui-list-item-right " style="float: right; ">
                <!--默认图片-->
                <div v-if="props.files.length<1" class="aui-list-item-media js_showBox backgroundShowPic"
                     :style="{backgroundImage: `url(${imgUrl || 'static/image/demo1.png'})`}">
                </div>
                <!--默认图片end-->

                <div class="aui-list-item-media js_showBox backgroundShowPic" v-if=" index+1 == props.files.length"
                     v-for="(file, index) in props.files" style="margin: 0;position: static;right: 0"
                     :style="{backgroundImage: `url(${file.dataUrl})`}">

                  <!--<img :src="  file.dataUrl">-->
                </div>

              </div>
            </template>
            <!--//图片展示-->
            <template slot="clip-uploader-action">
              <div class="tImg childClass" style="position:absolute;left: 0;right: 0 ; z-index: 10">
                <div class="aui-list-item-title dz-message childClass"></div>
              </div>
            </template>
          </vue-clip>
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div class="aui-list-item-title">头像</div>
          </div>
        </li>
        <!--头像栏结束-->
        <li class="aui-list-item" style=" margin-right: 1.5rem">
          <div class="aui-list-item-inner " style="padding-right: 0 ;">
            <div class="aui-list-item-title">账号</div>
            <div class="aui-list-item-right" v-model="account">{{account}}</div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner aui-list-item-arrow" @click="changeUserInfo('username')">
            <div class="aui-list-item-title">昵称</div>
            <div class="aui-list-item-right" v-model="username">{{username || '设置'}}</div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner aui-list-item-arrow" @click="flag = !flag">
            <div class="aui-list-item-title">性别</div>
            <div class="aui-list-item-right" v-model="sex">{{ sex || '设置'}}</div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner aui-list-item-arrow" @click="changeUserInfo('birthday')">
            <div class="aui-list-item-title">生日</div>
            <div class="aui-list-item-right" v-model="birthday">{{birthday || '设置'}}</div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner aui-list-item-arrow" @click="changeUserInfo('email')">
            <div class="aui-list-item-title">邮箱</div>
            <div class="aui-list-item-right" v-model="email">{{email || '设置'}}</div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 性别 -->
    <mt-popup v-model="flag" position="bottom" popup-transition="popup-fade" style="width:100%;height:200px;">
      <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" :showToolbar="true">
        <span class="mint-datetime-action mint-datetime-cancel" @click="flag = !flag">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="flag = !flag;changeUserInfo('sex')">确认</span>
      </mt-picker>
    </mt-popup>
    <!-- 生日 -->
    <mt-datetime-picker
      v-if=" showDatePicker "
      ref="picker"
      type="date"
      @confirm="handleChange"
      @cancel = "cancel"
      :visible-item-count="5"
      style="width:100%;height:200px;"
      :startDate="new Date(1970,0,1)"
      :value=" birthday ?  changeDate(birthday) : new Date()"
      year-format="{value}"
      month-format="{value}"
      date-format="{value}"

    >
    </mt-datetime-picker>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {getUserInfo, signout, changeUserInfo, getUserInfoAgain} from '../../config/getData.js'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import Mint from 'mint-ui'
  import {MessageBox, Popup, Picker, DatetimePicker} from 'mint-ui'
  import {Toast} from '../../../utils/toast2.js'
  import VueClip from 'vue-clip'
  import axios from 'axios'
  // import api from '../../../api/index.js'
  Vue.use(Mint)

  Vue.use(VueClip)

  export default {
    data () {
      return {
        imgUrl: null,//头像
        account: null,//账号
        username: null, //昵称
        birthday: null,//生日
        sex: null, //性别
        sex_1: null,//
        email: null,//家庭成员
        flag: false,
        flag_birthday: false,
        flag_member: false,
        image: false,
        visiable: false,
        date: new Date(),
        showDatePicker: false,
        slots: [
          {
            values: ['男', '女'],
            textAlign: 'center',
            cancelText: '取消'
          }
        ],
        options: {
          url: '/upload',
          paramName: 'file',
        }
      }
    },
    computed: {
      ...mapGetters('xhModules', [
        'sessionId'
      ])
    },
    async mounted() {
      await this.getUserInfo();
      await this.initData();
      this.image = true;

    },
    props: {
      "mt-picker": {}
    }
    ,
    components: {
      "mt-picker": Picker,
      "picker-name": Picker.name,
      "mt-popup": Popup,
      "popup-name": Popup.name,
      "mt-datetime-picker": DatetimePicker,
    }
    ,
    methods: {
      ...mapActions('xhModules', [
        'getUserInfo'
      ])
      ,
      ...mapMutations('xhModules', [
        'USER_INFO',
        'ClEAR_SESSIONID',
        'LOGO_OUT',
        'LOGO_IN',
        'CLEAR_INFO'
      ])
      ,
      onValuesChange(picker, values) {
        // alert(values[0])
        // if(values[0] == undefined){
        // 	this.sex_1
        // }
        this.sex_1 = values[0];
        // if (values[0] > values[1]) {
        //   picker.setSlotValue(1, values[0]);
        // }
      }
      ,
      changeDate(date) {
        date= date.split("-")
        return new Date(date[0],date[1]-1, date[2])
      },
      cancel () {
        this.showDatePicker = false
      },
      handleChange(value) {
        console.log("new Date(value)===============", new Date(value))
        this.showDatePicker = false
        let val = String(value).substr(4, 12);
        let year = val.substr(6, 8);
        let month = val.substr(0, 3);
        let day = val.substr(3, 4);

        switch (month) {
          case 'Jan':
            month = '0' + 1;
            break
          case 'Feb':
            month = '0' + 2;
            break
          case 'Mar':
            month = '0' + 3;
            break
          case 'Apr':
            month = '0' + 4;
            break
          case 'May':
            month = '0' + 5;
            break
          case 'Jun':
            month = '0' + 6;
            break
          case 'Jul':
            month = '0' + 7;
            break
          case 'Aug':
            month = '0' + 8;
            break
          case 'Sep':
            month = '0' + 9;
            break
          case 'Oct':
            month = 10;
            break
          case 'Nov':
            month = 11;
            break
          case 'Dec':
            month = 12;
            break
        }
        this.birthday = year.substr(0, 5) + '-' + month + '-' + day.substr(1, 3)
        let sendDate = year.substr(0, 5) + '-' + month + '-' + day.substr(1, 3);

        changeUserInfo({
          birthday: sendDate
        });
        this.flag_birthday = !this.flag_birthday;
      }
      ,

      async initData() {
        let response = await getUserInfoAgain(this.sessionId);
        if (response.returncode === 0) {
          Toast({
            message: response.errmsg,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          })
          this.LOGO_OUT(false);
          return
        }

        this.LOGO_IN(true);
        this.USER_INFO(response.data[0]);


        let res = await getUserInfoAgain(this.sessionId);
        if (res.returncode === 0) {
          //获取信息失败
          Toast({
            message: res.errmsg,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });
          return
        }

        if (res.data == '') {
          Toast({
            message: "暂无信息",
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });
          return
        }

        this.imgUrl = res.data[0].vipheadphoto //头像
        this.account = res.data[0].phone //昵称
        this.username = res.data[0].vipname
        this.birthday = res.data[0].birthday;
        this.email = res.data[0].email;
        this.sex = res.data[0].sex ? res.data[0].sex : this.sex;
      }
      ,
      changeUserInfo(val) {
        switch (val) {
          case "username":
            MessageBox.prompt(this.username, '昵称').then(param => {
              this.username = param.value;
              changeUserInfo({
                vipname: this.username
              });
            });
            break;
          case "sex":
            // this.flag = true;
            this.sex_1 = this.sex_1 == "男" ? "男" : "女"
            changeUserInfo({
              sex: this.sex_1 == '男' ? 0 : 1
            });
            this.sex = this.sex_1;
            break;
          case "birthday":
            this.showDatePicker=true
            setTimeout( () => {
              this.$refs.picker.open();
            },20)

            this.flag_birthday = !this.flag_birthday;
            // this.visiable = !this.visiable;
            changeUserInfo({
              birthday: this.birthday
            });
            break;
          case "email":
            MessageBox.prompt(this.email, '邮箱').then(param => {
              var isParst = this.checkMail(param.value)
              if (isParst) {
                this.email = param.value;
                changeUserInfo({
                  email: this.email
                });
              } else {
                Toast({
                  message: "E-Mail地址错误",
                  iconClass: "aui-iconfont aui-icon-close",
                  duration: 500
                })
              }

            });
            break;
        }
      }
      ,

      //图片上传后
      complete (file, status, xhr) {
      }
      ,
      maxFilesReached (file) {
      }
      ,
      async sending (file, xhr, formData) {
        let date = new Date().getTime();
        formData.append("file", file.name);
        formData.append("name", "file");
        formData.append('Content-Type', file.type);
        let config = {
          url: window.api.mall_file_host + '/upload?token=' + date,
          method: 'post',
          data: formData
        }
        axios(config).then(res => {
          if (res.code == 200) {
            Toast({
              message: "头像修改成功",
              iconClass: "aui-iconfont aui-icon-correct",
              duration: 500
            });
          }
          changeUserInfo({
            vipheadphoto: res.data.visitPath
          });
        });
      },
      //邮箱校验
      checkMail (mail) {
        var isParst = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(mail)
        return isParst
      }
    },
  created () {
  }
  }
</script>


<style scoped="scoped">
  /*#img {
        position: absolute;
        top: -2rem;
        left: 16rem;
        width: 50px;
        height: 2.5rem;
    }*/
  .myShow {
    visibility: hidden;
  }

  #img {
    position: absolute;
    top: -2rem;
    left: 15rem;
    width: 50px;
    height: 2.5rem;
    z-index: 100;
  }

  #img2 {
    position: absolute;
    top: -1.5rem;
    left: 15rem;
    width: 50px;
    height: 2.5rem;
  }

  .img2 {
    width: 50px;
    height: 2.5rem;
  }

  #po {
    position: absolute;
  }

  #wid > div {
    width: 100%;
  }

  .picker-slot {
    width: 100%;
  }

  .picker {
    display: block;
  }

  /*.dz-message{
        min-height: 2.2rem;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-flex: 1;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        z-index: 100;
    }*/

  .feild-mode {
    width: 100%;
    height: 100%;
    z-index: 3;
    position: absolute;
    padding-right: 1.5rem;
    left: 0;
    top: 0;
  }

  .childClass {
    width: 100%;
    height: 100%;
  }

  .c-box {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    right: -3.32rem;
    top: 0.5rem;
    z-index: 5;
    /*top:50%;*/
    /*transform: translatey(-50%);*/
  }

  .aui-list-item-right {
    padding: 0.5rem 0.5rem 0.5rem 0;
    /*height:3.5rem;*/
    position: relative;
  }

  .js_showBox {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
  }

  .js_logoBox {
    width: 100% !important;
    height: 2.5rem !important;
  }

  .backgroundShowPic {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
  }
</style>
