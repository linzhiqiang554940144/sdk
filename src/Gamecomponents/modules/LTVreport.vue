<template>
  <div>
    <div class="LTVreport_header">游戏中心>平台运营数据>LTV报表</div>
    <div class="LTVreport_main">
      <h2 class="LTVreport_main1">LTV报表</h2>
      <div>
        <div class="LTVreport_waste">
          <div style="display:flex">
              
               <Select v-model="model1" style="width:160px;margin-right: 20px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
            <DatePicker
              type="daterange"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 220px"
            ></DatePicker>
            <Select v-model="model1" style="width:160px;margin-right: 20px;margin-left: 20px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
          </div>
          <div class="LTVreport_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="LTVreport_table">
        <div class="LTVreport_table1">
          <div class="LTVreport_td21">时间</div>
          <div class="LTVreport_td21">渠道</div>
          <div class="LTVreport_td21">新增账号</div>
          <div class="LTVreport_td21">新增设备</div>
          <div class="LTVreport_td21">活跃用户</div>
          <div class="LTVreport_td21">新用户付费数</div>
          
        </div>
        <div>
        </div>
        <div>
          <div class="LTVreport_td2">
            <!-- 总计的数据 -->
            <div class="LTVreport_td1">1</div>
            <div class="LTVreport_td1">1</div>
            <div class="LTVreport_td1">1</div>
            <div class="LTVreport_td1">1</div>
            <div class="LTVreport_td1">1</div>
            <div class="LTVreport_td1">1</div>
          </div>
          <div class="LTVreport_td2" v-for="(item,index) in msg" :key="index">
            <div class="LTVreport_td1">{{item.name}}</div>
            <div class="LTVreport_td1">{{item.one}}</div>
            <div class="LTVreport_td1">{{item.two}}</div>
            <div class="LTVreport_td1">{{item.three}}</div>
            <div class="LTVreport_td1">{{item.four}}</div>
            <div class="LTVreport_td1">{{item.five}}</div>
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
      zongji:"",
        cityList:[
            {
                id:0,
                name:"订单号"
            },
            {
                id:1,
                name:'游戏名称'
            }
        ],
        model1:0,
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
.LTVreport_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.LTVreport_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.LTVreport_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.LTVreport_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.LTVreport_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.LTVreport_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.LTVreport_td1 {
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
.LTVreport_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.LTVreport_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.LTVreport_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.LTVreport_renew {
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



.LTVreport_td1_caozuo{
    width: 80px;
    height: 25px;
    background-color: #599af7;
    line-height: 25px;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
}
</style>