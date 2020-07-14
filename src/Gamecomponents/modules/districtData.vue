<template>
  <div>
    <div class="districtData_header">游戏中心>平台运营数据>区服数据</div>
    <div class="districtData_main">
      <h2 class="districtData_main1">区服数据</h2>
      <div class="districtData_hint">
        <div class="districtData_text1">
          <h5>重要提示 :</h5>
          <div>1.订单列表数据更新间隔为5分钟，母包支付需要使用母包测试账号方可支付成功</div>
        </div>
        <div class="districtData_text2">2.确认实际支付后,若订单支付状态显示为[等待]则需检查渠道后台的发货地址或融合后台渠道参数，参见</div>
        <div class="districtData_text2">3.此功能是针对渠道全部玩家的,若某角色被阻止后,可通过角色列表后的[解除阻止]功能单独解除此角色的阻止结果.</div>
        <div class="districtData_text2">4.也提供单个用户封账号的功能,操作方法运营数据平台->玩家明细->账号明细->找到用户 点击其他的[封账号]即可完成</div>
      </div>
      <div>

        <div class="districtData_waste">
          <div style="display:flex">
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
            <Select v-model="model1" style="width:160px;margin-right: 20px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
            <Select v-model="model1" style="width:160px;">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
            <div class="districtData_searchss">
                <input class="districtData_input15" type="text" >
                <img class="districtData_img15" src="../../assets/search.png" alt="">
            </div>
          </div>
          <div class="districtData_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="districtData_table">
        <div class="districtData_table1">
          <div class="districtData_td21">区服</div>
          <div class="districtData_td21">开服时间</div>
          <div class="districtData_td21">总付费数</div>
          <div class="districtData_td21">总付费额</div>
          <div class="districtData_td21">ARPPU</div>
        </div>
        <div>
        </div>
        <div>
          <div class="districtData_td2" v-for="(item,index) in msg" :key="index">
            <div class="districtData_td1">{{item.name}}</div>
            <div class="districtData_td1">{{item.one}}</div>
            <div class="districtData_td1">{{item.two}}</div>
            <div class="districtData_td1">{{item.three}}</div>
            <div class="districtData_td1">{{item.four}}</div>
         
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
.districtData_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.districtData_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.districtData_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.districtData_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.districtData_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.districtData_table1 {
  display: flex;
  font-weight: bold;
  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
}
.districtData_td1 {
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
.districtData_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.districtData_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.districtData_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.districtData_renew {
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
.districtData_img15{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 6px;
    cursor: pointer;
}
.districtData_input15{
    width: 160px;
    height: 30px;
    background-color: #ebebeb;
    border: none;
    border-radius: 3px;
    margin-left: 20px;
    padding-left: 15px
}
.districtData_searchss{
    display: flex;
    align-items: center;
    position: relative;
    
}
.districtData_td1_caozuo{
    width: 80px;
    height: 25px;
    background-color: #599af7;
    line-height: 25px;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
}
.districtData_hint {
  margin: 10px 15px 0 15px;
  padding-top: 14px;
  padding-bottom: 6px;
  padding-left: 14px;
  background-color: #ffe5e5;
  border-radius: 3px;
}
.districtData_text1 {
  display: flex;
  align-items: center;
}
.districtData_text1 div {
  font-size: 12px;
  color: #666;
}
.districtData_text2 {
  font-size: 12px;
  color: #666666;
  text-align: left;
  padding-left: 53px;
}
</style>