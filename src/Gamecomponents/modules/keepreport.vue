<template>
  <div>
    <div class="keepreport_header">游戏中心>平台运营数据>留存报表</div>
    <div class="keepreport_main">
      <h2 class="keepreport_main1">留存报表</h2>
      <div>
        <div class="keepreport_waste">
          <div style="display:flex">
            <Select v-model="model1" style="width:160px;margin-right: 20px">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <DatePicker
              type="daterange"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 220px;margin-right: 20px"
              @on-change="shijian"
            ></DatePicker>
            <Select v-model="model12" multiple style="width:200px;margin-right: 20px">
              <Option
                v-for="item in cityLists"
                :value="item.id"
                :key="item.id"
              >{{ item.channel_name }}</Option>
            </Select>
          </div>
          <div class="keepreport_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="keepreport_table">
        <div class="keepreport_table1">
          <div class="keepreport_td21">时间</div>
          <div class="keepreport_td21">渠道</div>
          <div class="keepreport_td21">新增账号</div>
          <div class="keepreport_td21">次日留存</div>
          <div class="keepreport_td21">3留</div>
          <div class="keepreport_td21">4留</div>
          <div class="keepreport_td21">5留</div>
          <div class="keepreport_td21">6留</div>
          <div class="keepreport_td21">7留</div>
          <div class="keepreport_td21">15留</div>
          <div class="keepreport_td21">30留</div>
          <div class="keepreport_td21">45留</div>
        </div>
        <div></div>
        <div>
          <div class="keepreport_td2" v-for="(item,index) in msg" :key="index">
            <div class="keepreport_td1">{{index }}</div>
            <div class="keepreport_td1">{{qudao}}</div>
            <div class="keepreport_td1">{{item[1]}}</div>
            <div class="keepreport_td1">{{item[2]}}({{item[2]/item[1]*100 |imageHash}}%)</div>
            <div class="keepreport_td1">{{item[3]}} ({{item[3]/item[1]*100 |imageHash}}%)</div>
            <div class="keepreport_td1">{{item[4]}} ({{item[4]/item[1]*100 |imageHash}}%)</div>
             <div class="keepreport_td1">{{item[5]}} ({{item[5]/item[1]*100 |imageHash}}%)</div>
              <div class="keepreport_td1">{{item[6]}} ({{item[6]/item[1]*100 |imageHash}}%)</div>
                 <div class="keepreport_td1">{{item[7]}} ({{item[7]/item[1]*100|imageHash}}%)</div>
               <div class="keepreport_td1">{{item[15]}} ({{item[15]/item[1]*100 | imageHash}}%)</div>
                <div class="keepreport_td1">{{item[30]}} ({{item[30]/item[1]*100 | imageHash}}%)</div>
                 <div class="keepreport_td1">{{item[45]}} ({{item[45]/item[1]*100 | imageHash}}%)</div>
          </div>
          <div v-if="msgstatus" > 暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msgstatus:false,
      zongji: "",
      cityList: [
        {
          id: 0,
          name: "全部平台"
        },
        {
          id: 1,
          name: "Android"
        },
        {
          id: 2,
          name: "iPhoneOs"
        }
      ],
      cityLists: [],
      model1: 0,
      model12: [],
      msg: [],
      id: "",
      qudao:"全部渠道",
      time:[]
    };
  },
  props: ["GameAuth"],
  methods: {
    channel: function() {
      this.$get("/api/v1/channel", {
        gid: this.id
      }).then(res => {
        this.cityLists = res.data.data.data;
      });
    },
    infoData:function(){
      this.$get("/api/v1/report/keep",{
        gid:this.id,
        time:this.time,
        platform:this.model1,
        cid:this.model12
      }).then(res=>{
          if(res.code==200){
               this.msg=res.data.data
               console.log(this.msg)
               if(this.msg.length!=""){
                 this.msgstatus=false
               }else{
                 this.msgstatus=true
               }
          }
      })
    },
     shijian:function(data){
         if (!data[0]) {
        this.time = [];
      }else{
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
    this.channel();
    this.infoData()
  },
  watch: {
    GameAuth: function() {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
      console.log(this.id, " 登陆支付封禁监听得id");
      this.infoData()
    },
    model12:function(){
      if(this.model12!=""){
        this.qudao="部分渠道"
      }
      else{
        this.qudao="全部渠道"
      }
      this.infoData()
    },
    model1:function(){
      this.infoData()
    }
  }
};
</script>
<style lang="less">
.keepreport_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.keepreport_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.keepreport_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.keepreport_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.keepreport_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.keepreport_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold;
}
.keepreport_td1 {
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
.keepreport_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.keepreport_table {
  border: 1px solid #d7d7d7;
  // border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px;
}
.keepreport_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.keepreport_renew {
  width: 60px;
  height: 24px;
  border: 1px solid #999;
  border-radius: 3px;
  line-height: 24px;
  cursor: pointer;
}
.ivu-select-selection {
  height: 30px !important;
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
.ivu-input:focus {
  box-shadow: none;
  outline: none;
  border-color: #dcdee2;
}
.ivu-input:hover {
  box-shadow: none;
  outline: none;
  border-color: #dcdee2;
}
.ivu-input {
  background-color: #ebebeb;
}
.ivu-input::placeholder {
  color: #666666;
}

.keepreport_td1_caozuo {
  width: 80px;
  height: 25px;
  background-color: #599af7;
  line-height: 25px;
  color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
}
</style>