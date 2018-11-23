<template>
  <div class="order_list_div" style="position: absolute;width: 100%;">

    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light">
      <div style="height: 2.75rem;positon:relative">
        <router-link to="/main/profile">
          <div class="go-back">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </router-link>
      </div>
      
      <div class="aui-title">
        {{param == 0 ? "终端安装单" : (param == 1 ? "配件安装单" : (param == 2 ? "维修预约" : (param == 3 ? "保养预约" : (param == 4 ? "终端维修":(param == 5 ? "终端拆除" : "")))))}}
      </div>
      <div class="right_icon" @click="search = !search;">
        <a id="order-search" class="search_icon"><i class="icon njfont nj-sousuo"></i></a>
      </div>
      <repair-head v-if="tapHead" :titleInfor=" tapHead" :isRouter="false" style="margin-top: 3rem">
      </repair-head>
    </header>
    <div style="height:2.3rem;'top: 6rem;position: fixed;width: 100%; '">

    </div>

    <!--订单tab滚动切换模块-->

    <!--订单tab切换模块end-->

    <!-- <transition-group :name="className" tag="div" style="position: relative"> -->


    <!--预约单查询-->
    <!--add mask-->
    <div id="mask_bj" class="mask_bj" :style="search ? 'display:block' : 'display:none'"></div>
    <!--add search-panel-->
    <div class="ordersearch_con" :style="search ? 'display:block' : 'display:none'">
      <ul class="aui-list aui-form-list from_con">
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              开始时间：
            </div>
            <div class="aui-list-item-input">
              <!-- <input type="text" class="goodscode_input" v-model="startTime" @click="search_flag = true;$refs.pickerel.open();"> -->
              <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="startTime"></Date-picker>
            </div>
          </div>
        </li>
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              结束时间：
            </div>
            <div class="aui-list-item-input">
              <!-- <input type="text" class="goodscode_input" v-model="endTime" @click="search_flag = false;$refs.pickerel.open();"> -->
              <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="endTime"></Date-picker>
            </div>
          </div>
        </li>
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              工单编号：
            </div>
            <div class="aui-list-item-input">
              <input type="text" class="goodscode_input" v-model="searchNum">
            </div>
          </div>
        </li>
      </ul>
      <div class="aui-dialog-footer">
        <div class="aui-dialog-btn" tapmode="" button-index="0" @click="search = !search;">取消</div>
        <div class="aui-dialog-btn" tapmode="" button-index="1" @click="searchFn();search = false;">确定</div>
      </div>
    </div>
    <!--预约单查询 end-->

    <!--<div class="centent" v-if="move" :key="item">-->
    <div class="centent" v-if="move" style="margin-top: 2.2rem">

      <!--商品列表-->
      <div class="aui-content">

        <transition-group :name="className">
          <ul class="aui-list aui-media-list service_list" v-if="data && item[mainIntalcode] == param%2"
              v-for="(item, index) in data " :key="index" v-model="data">

            <li class="aui-list-item">

              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <!-- // 0-待预约，1-预约完成（待安装），2-安装完成（待确认），3-待评价（安装完成确认）；4-完成 -->
                  <div class="aui-list-item-title">工单编号：{{param == 0 || param == 1 ? item.installno : (param == 2 || param == 3 ? item.maintenanceno : (param == 4  ? item.maintenanceno : ( param == 5 ? item.removeno : '')))}}</div>
                  <div class="aui-list-item-right"><span
                    class="aui-text-danger">{{item.usestatus == '0.1' ? "待预约" : (item.usestatus == '0.2' ? "待受理" : (item.usestatus == '1' ? "待服务" : (item.usestatus == '2' ? "待确认" : (item.usestatus == '3' ? "待评价" : (item.usestatus == '4' ? "已完成" : (item.usestatus == '5' ? "服务商已拒绝" : (item.usestatus == '6' ? "待预约" : (item.usestatus == '9' ? "关闭" : ""))))))))
                    }}</span></div>
                </div>
                <div class="aui-list-item-text" v-if="item.billno">
                  <div class="aui-list-item-title">订单编号：{{item.billno}}</div>
                </div>
              </div>
            </li>
            <li class="aui-list-item">
              <div class="aui-media-list-item-inner">
                <div class="aui-list-item-media">
                  <img src="static/image/demo1.png">
                  <!--需要链接到商品详情-->
                </div>
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-text">
                    <div class="aui-list-item-title">{{item.goodsname}}</div>
                  </div>
                  <div class="aui-list-item-text">
                    预约服务日期：{{ item.orderdate && Number(item.usestatus) != 6 ? changeDate(item.orderdate) : "&nbsp;"}}
                  </div>
                  <div class="aui-list-item-text" v-if="param == 4 || param == 5">
                    车牌号码：{{item.carno}}&nbsp;
                  </div>
                  <div class="aui-list-item-text" v-if="param == 4 || param == 5">
                    发动机号：{{item.engineno}}&nbsp;
                  </div>
                  <div class="aui-list-item-text" v-else>
                    服务商：{{item.servicename}}
                  </div>
                </div>
              </div>
            </li>
            <li class="edit_address" style="border-top: 0 solid transparent;">

              <!--<router-link id="add_appointment" :to="{path:'/main/addInstall',query:{serviceNo:param}}"-->
              <!--class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.usestatus == '0'"-->
              <!--&gt;立即预约-->
              <!--</router-link>-->

              <!-- <router-link
                :to="{path:'/main/addInstall',query:{sub:0,serviceNo:param,order:item.installno || item.maintenanceno,serviceId:item.serviceid}}"> -->
              <div class="aui-btn aui-btn aui-btn-outlined"
                   v-show="item.usestatus == '5'" @click=" popupVisible = !popupVisible;refuseDetail(item)">查看拒绝详情
              </div>

              <!-- </router-link> -->

              <!-- 详情 -->
              
                <div class="aui-btn aui-btn-outlined" v-show="item.usestatus > 0" @click="toDetails(item)">工单详情
                </div>

              <!-- 立即预约 -->
              <router-link
                :to="{path:'/main/addInstall',query:{sub:0,serviceNo:param,order:item.installno || item.maintenanceno || item.removeno,serviceId:item.serviceId}}">
                <div  class="aui-btn aui-btn-danger aui-btn-outlined"
                     v-show="item.usestatus == '0.1' || item.usestatus == '5' || item.usestatus == '6'">立即预约
                </div>
              </router-link>
               <div  class="aui-btn aui-btn-danger aui-btn-outlined"
                     v-show="item.usestatus == '0.2' || item.usestatus =='1'" @click="dancel(item.installno)" v-if="param == 0 || param == 1">取消预约
                </div>
                <div  class="aui-btn aui-btn-danger aui-btn-outlined" @click="dancel(item.maintenanceno)" v-show="item.usestatus == '0.2' || item.usestatus =='1'" v-if="param == 2 || param == 3 ">
                    取消预约
                </div>
                <div  class="aui-btn aui-btn-danger aui-btn-outlined" @click="cancel(item.removeno)" v-show="item.usestatus == '0.2' || item.usestatus =='1'" v-if="param == 4 || param == 5 ">
                    取消预约
                </div>

              <div class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.usestatus == '2' "
                   @click="orderOver(item)">确认服务完成
              </div>

              <div id="service_evaluation" class="aui-btn aui-btn-danger aui-btn-outlined"
                   v-show="item.usestatus == '3' && !item.appraise" @click="rate = true;subRate(item)">立即评价
              </div>
            </li>
          </ul>

        </transition-group>
        <div id="order_no_data" v-if="isWhite() " class="no_data">
          <img src="static/image/no_data.png">
          <p>暂无数据</p>
        </div>

        <div style="width: 100px; height: 3rem;"></div>
      </div>
      <!--商品列表 end-->


    </div>


    <!--<div style="height:5rem;"></div>-->
    <router-link :to="{path:'/main/addInstall',query:{serviceNo:param,sub:1}}">
      <div id="add_appointment2" class="settle_accounts lijixiadan">
        <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">新增预约</div>

      </div>
    </router-link>
    <!--服务选择-->
    <div class="aui-mask aui-mask-in" v-show="rate"></div>
    <div id="purchase_service" class="purchase_service" :style="rate ? 'display:block' : 'display:none'">
      <div class="description_tit">
        服务评价
        <a class="spec_close" @click="rate = false;"></a>
      </div>
      <div class="spec_middle">
        <div class="star_rating">
          <Rate allow-half v-model="valueHalf" class="rate"></Rate>
          <div class="evaluation_result">
            <label class="aui-text-success">{{valueHalf}}&nbsp;很满意</label>
          </div>
          <div class="standard_con">
            <li @click="appraisement = 0 " :class="{active: appraisement == 0}"><span>服务周到</span><i
              class="icon njfont nj-xuanzhong"></i></li>
            <li @click="appraisement = 1 " :class="{active: appraisement == 1}"><span>服务准时</span><i
              class="icon njfont nj-xuanzhong"></i></li>
            <li @click="appraisement = 2 " :class="{active: appraisement == 2}"><span>安装技师技术很棒</span><i
              class="icon njfont nj-xuanzhong"></i></li>
            <li @click="appraisement = 3 " :class="{active: appraisement == 3}"><span>不太满意</span><i
              class="icon njfont nj-xuanzhong"></i></li>
          </div>
        </div>
        <div class="settle_accounts lijixiadan">
          <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="sendRate">确定</div>
        </div>
      </div>
    </div>
    <!--  -->
    <mt-popup
      id="mt"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="middle">
      <h3>拒绝详情</h3>
      <div id="mt_div">
        <p>服务商：{{refuseService}}</p>
        <p>拒单时间：{{getTime(refuseTime)}}</p>
        <p class="refuseInfo">拒单原因：{{refuseInfo}}</p>
      </div>
      <mt-button type="primary" id="mt_btn" @click=" popupVisible = !popupVisible">关闭</mt-button>
    </mt-popup>

  </div>
</template>