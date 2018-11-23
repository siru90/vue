<template>
    <div style="display:block;" class="ordersearch_con">
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
</template>
<script>
import Datepicker from 'iview/src/components/date-picker';
import 'iview/dist/styles/iview.css';
export default {
    components: {
        "Date-picker": Datepicker,
    },
    data() {
        return {
            startTime: '',
            endTime: '',
            searchNum:''
        }
    },
    methods: {
        searchFn() {
          const searchData = {
            startTime: this.startTime,
            endTime: this.endTime,
            searchNum: this.searchNum
          }
          this.$emit("searchOrder", searchData)
            console.log("确定")
        }
    }
}
</script>

<style>
  .aui-content {
    background: #eaeaea;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }

  .rate {
    margin-left: 30%;
  }

  .goleft-enter-active, .goright-enter-active, .goleft-leave-active, .goright-leave-active {
    transition: all 0.5s;
  }

  .goleft-enter, .goright-leave-to {
    transform: translatex(30%);
    opacity: 0
  }

  .goright-enter, .gotleft-leave-to {
    transform: translatex(-30%);
    opacity: 0
  }

  #mt {
    width: 80%;
    height: 200px;
    border-radius: 3px;
    /* text-align: center; */
    line-height: 33px;
    text-align: center;
    /*padding-top: 15px;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  #mt > h2 {
    color: #333;
    font-weight: 700;
    flex-grow: 1;
    padding-top: 10px;
  }

  #mt_div {
    padding-left: 15px;
    /*padding-top: 5px;*/
    /*padding-bottom: 5px;*/
    text-align: left;
    border-bottom: 1px solid #ccc;
    flex-grow: 1;
  }

  #mt_btn {
    width: 25%;
    height: 1.8rem;
    margin: auto;
    font-size: 16px;
    color: #0f8de0;
    background-color: #fff;
    flex-grow: 0.5;
  }
  .refuseInfo{
    overflow-y: auto;
    line-height: 24px;
    height: 3rem;
    white-space: normal;
    word-break: break-all;
  }
  .order_list_div {
    /*background: #f5f5f5;*/
  }
  .service_list {
    margin-bottom: .5rem;
  }
  .service_list img {
    height: 100%;
  }
</style>
