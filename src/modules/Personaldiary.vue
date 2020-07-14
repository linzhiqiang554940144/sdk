<template>
  <div>
    <div class="personlog_header">控制中心>游戏中心>个人日志</div>
    <div class="personlog_main">
      <h2 class="personlog_main1">个人日志</h2>
      <div>
        <div class="personlog_waste">
          <div style="display:flex">
              <DatePicker type="daterange" split-panels placeholder="选择时间" style="width: 220px"></DatePicker>
            <div class="personlog_searchss">
                <input class="personlog_input15" type="text" >
                <img class="personlog_img15" src="../assets/search.png" alt="">
            </div>
          </div>
          <div class="personlog_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="personlog_table">
        <div class="personlog_table1">
          <div class="personlog_td21">操作用户</div>
          <div class="personlog_td21">操作事件</div>
          <div class="personlog_td21">ip</div>
          <div class="personlog_td21">摘要</div>
        </div>
        <div>
        </div>
        <div>
          <div class="personlog_td2" v-for="(item,index) in msg" :key="index">
            <div class="personlog_td1">{{item.name}}</div>
            <div class="personlog_td1">{{item.one}}</div>
            <div class="personlog_td1">{{item.two}}</div>
            <div class="personlog_td1">{{item.three}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: [
        {
          name: "苍穹",
          one: "UC",
          two: '赤贯妖星',
          three: 3015161616,
          four: '854(515616)',
          five: "西门吹雪",
          six: 600,
          seven: 2019-9-12,
          eight:"失败",
          nine:"成功",
          value: 1
        },
        {
          name: "苍穹",
          one: 10,
          two: 20,
          three: 30,
          four: 40,
          five: 50,
          six: 60,
          seven: 70,
          eight:"失败",
          nine:"成功",
          value: 2
        },
        {
          name: "苍穹",
          one: 10,
          two: 20,
          three: 30,
          four: 40,
          five: 50,
          six: 60,
          seven: 70,
          eight:"失败",
          nine:"成功",
          value: 3
        }
      ]
    };
  },
  methods: {
  },
  computed: {},
  mounted() {
  },
  watch: {
  }
};
</script>
<style lang="less">
.personlog_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.personlog_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.personlog_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.personlog_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.personlog_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.personlog_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.personlog_td1 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.personlog_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.personlog_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.personlog_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.personlog_renew {
  width: 60px;
  height: 24px;
  border: 1px solid #999;
  border-radius: 3px;
  line-height: 24px;
  cursor: pointer;
}
.ivu-select-selection {
  height:30px!important;
  background-color: #ebebeb;
  font-size: 14px;
  color: #666666;
}
.ivu-select-selection-focused,
.ivu-select-selection:hover {
  border: 1px solid #e1e1e1 !important;
}
.ivu-select-selection-focused {
  border: 1px solid #e1e1e1;
}

.ivu-select-visible .ivu-select-selection {
  border: 1px solid #e1e1e1;
  outline: none;
  box-shadow: none;
}
.ivu-input:focus{
    box-shadow:none;
    outline: none;
    border-color: #dcdee2
}
.ivu-input:hover{
    box-shadow:none;
    outline: none;
    border-color: #dcdee2
}
.ivu-input{
    background-color: #ebebeb
}
.ivu-input::placeholder{
  color: #666666
}
.personlog_img15{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 6px;
    cursor: pointer;
}
.personlog_input15{
    width: 160px;
    height: 30px;
    background-color: #ebebeb;
    border: none;
    border-radius: 3px;
    margin-left: 20px;
    padding-left: 15px
}
.personlog_searchss{
    display: flex;
    align-items: center;
    position: relative;
}
</style>