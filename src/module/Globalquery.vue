<template>
  <div>
    <div class="Gamepandect_header">控制中心>游戏中心>全局查询</div>
    <div class="Gamepandect_main">
      <h2 class="Gamepandect_main1">全局查询</h2>
      <div>
        <div class="Gamepandect_waste">
          <div style="display:flex">
            <Select v-model="model1" style="width:160px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
            <div class="Gamepandect_searchss">
                <input class="Gamepandect_input15" type="text" >
                <img class="Gamepandect_img15" src="../assets/search.png" alt="">
            </div>
          </div>
          <div class="Gamepandect_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="Gamepandect_table">
        <div class="Gamepandect_table1">
          <div class="Gamepandect_td21">游戏名称</div>
          <div class="Gamepandect_td21">渠道名称</div>
          <div class="Gamepandect_td21">区服</div>
          <div class="Gamepandect_td21">订单号</div>
          <div class="Gamepandect_td21">Username(Uid)</div>
          <div class="Gamepandect_td21">角色</div>
          <div class="Gamepandect_td21">金额</div>
          <div class="Gamepandect_td21">订单时间</div>
          <div class="Gamepandect_td21">支付</div>
          <div class="Gamepandect_td21">通知游戏</div>
        </div>
        <div>
        </div>
        <div>
          <div class="Gamepandect_td2" v-for="(item,index) in msg" :key="index">
            <div class="Gamepandect_td1">{{item.name}}</div>
            <div class="Gamepandect_td1">{{item.one}}</div>
            <div class="Gamepandect_td1">{{item.two}}</div>
            <div class="Gamepandect_td1">{{item.three}}</div>
            <div class="Gamepandect_td1">{{item.four}}</div>
            <div class="Gamepandect_td1">{{item.five}}</div>
            <div class="Gamepandect_td1">{{item.six}}</div>
            <div class="Gamepandect_td1">{{item.seven}}</div>
            <div  class="Gamepandect_td1">{{item.eight}}</div>
            <div  class="Gamepandect_td1">{{item.nine}}</div>
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
.Gamepandect_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.Gamepandect_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.Gamepandect_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.Gamepandect_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.Gamepandect_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.Gamepandect_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.Gamepandect_td1 {
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
.Gamepandect_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Gamepandect_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.Gamepandect_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.Gamepandect_renew {
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
.Gamepandect_img15{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 6px;
    cursor: pointer;
}
.Gamepandect_input15{
    width: 160px;
    height: 30px;
    background-color: #ebebeb;
    border: none;
    border-radius: 3px;
    margin-left: 20px;
    padding-left: 15px
}
.Gamepandect_searchss{
    display: flex;
    align-items: center;
    position: relative;
}
</style>