<template>
  <div>
    <div class="Dailyreports_header">游戏中心>平台运营数据>单日报表(时)</div>
    <div class="Dailyreports_main">
      <h2 class="Dailyreports_main1">单日报表(时)</h2>
      <div>
        <div class="Dailyreports_waste">
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
                @on-change="shijian"
            ></DatePicker>
            <Select v-model="model12" multiple style="width:160px;margin-left: 20px">
              <Option
                v-for="(item,index) in cityLists"
                :value="item.id"
                :key="index"
              >{{ item.channel_name }}</Option>
            </Select>
          </div>
          <div class="Dailyreports_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="Dailyreports_table">
        <div class="Dailyreports_table1">
          <div class="Dailyreports_td21">时间</div>
          <div class="Dailyreports_td21">渠道</div>
          <div class="Dailyreports_td21">新增账号</div>
          <div class="Dailyreports_td21">新增设备</div>
          <div class="Dailyreports_td21">活跃用户</div>
          <div class="Dailyreports_td21">新用户付费数</div>
          <div class="Dailyreports_td21">总付费数</div>
          <div class="Dailyreports_td21">新用户充值额</div>
          <div class="Dailyreports_td21">总付费额</div>
          <div class="Dailyreports_td21">新用户付费率</div>
          <div class="Dailyreports_td21">新用户付费用户</div>
          <div class="Dailyreports_td21">活跃付费率</div>
          <div class="Dailyreports_td21">ARPPU</div>
          <div class="Dailyreports_td21">ARPU</div>
        </div>
        <div>
        </div>
        <div>
          <div class="Dailyreports_td2" v-for="(item,index) in msg" :key="index">
            <div class="Dailyreports_td1">{{item.day}}</div>
            <div class="Dailyreports_td1">{{item.name}}</div>
            <div class="Dailyreports_td1">{{item.account}}</div>
            <div class="Dailyreports_td1">{{item.device}}</div>
            <div class="Dailyreports_td1">{{item.act_user}}</div>
            <div class="Dailyreports_td1">{{item.new_user_pay}}</div>
            <div class="Dailyreports_td1">{{item.pay_total}}</div>
            <div class="Dailyreports_td1">{{item.new_user_money}}</div>
            <div class="Dailyreports_td1">{{item.money_total}}</div>
            <div class="Dailyreports_td1">{{item.new_rate}}</div>
            <div class="Dailyreports_td1">{{item.pay_new_user}}</div>
            <div class="Dailyreports_td1">{{item.new_active}}</div>
            <div class="Dailyreports_td1">{{item.arrpu}}</div>
            <div class="Dailyreports_td1">{{item.arpu}}</div>
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
          id: 0,
          name: "全部平台"
        },
        {
          id: 1,
          name: "安卓"
        },
        {
          id: 2,
          name: "苹果"
        }
        ],
        model1:0,
        model12:[],
      msg: [
      
      ],
      time:[],
      cityLists:[],
    };
  },
   props: ["GameAuth"],
  methods: {
    infoData:function(){
      this.$get("/api/v1/report/hour",{
        gid:this.id,
        time:this.time,
        cid:this.model12,
        platform:this.model1
      }).then(res=>{
          this.msg=res.data.data.data
      })
    },
      channel:function(){
      this.$get("/api/v1/channel",{
        gid:this.id
      }).then(res=>{
          this.cityLists=res.data.data.data
      })
    },
      shijian:function(data){
         if (!data[0]) {
        this.time = [];
      }else{
        console.log(111);
      this.time1 = this.timecuo(data[0]);
      this.time2 = this.timecuo(data[1]);
      this.time[0] = this.time1;
      this.time[1] = this.time2;
      }
      
      this.infoData()
    },
   
    timecuo: function(data) {
      var a = data.replace(/-/g, "/");
      return Date.parse(a) / 1000;
    },
  },
  computed: {},
  mounted() {
    if (localStorage.getItem("SDKGame")) {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
    }
    this.infoData()
    this.channel()
  },
  watch: {
     GameAuth: function() {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
      console.log(this.id, " 登陆支付封禁监听得id");
      this.infoData()
    },
    model12:function(){
      this.infoData()
    },
    model1:function(){
      this.infoData()
    }
  }
};
</script>
<style lang="less">
.Dailyreports_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.Dailyreports_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.Dailyreports_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.Dailyreports_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.Dailyreports_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.Dailyreports_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.Dailyreports_td1 {
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
.Dailyreports_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Dailyreports_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.Dailyreports_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.Dailyreports_renew {
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



.Dailyreports_td1_caozuo{
    width: 80px;
    height: 25px;
    background-color: #599af7;
    line-height: 25px;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
}
</style>