<template>
  <div>
    <div class="orderdetail_header">游戏中心>平台运营数据>订单明细</div>
    <div class="orderdetail_main">
      <h2 class="orderdetail_main1">订单明细</h2>
      <div class="orderdetail_hint">
        <div class="orderdetail_text1">
          <h5>重要提示 :</h5>
          <div>1.订单列表数据更新间隔为5分钟，母包支付需要使用母包测试账号方可支付成功</div>
        </div>
        <div class="orderdetail_text2">2.确认实际支付后,若订单支付状态显示为[等待]则需检查渠道后台的发货地址或融合后台渠道参数，参见</div>
        <div class="orderdetail_text2">3.此功能是针对渠道全部玩家的,若某角色被阻止后,可通过角色列表后的[解除阻止]功能单独解除此角色的阻止结果.</div>
        <div class="orderdetail_text2">4.也提供单个用户封账号的功能,操作方法运营数据平台->玩家明细->账号明细->找到用户 点击其他的[封账号]即可完成</div>
      </div>
      <div>

        <div class="orderdetail_waste">
          <div style="display:flex">
              <DatePicker
              type="daterange"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 220px"
               @on-change="shijian"
            ></DatePicker>
               <Select v-model="status" style="width:160px;margin-right: 20px;margin-left: 20px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
            <Select v-model="cid" multiple style="max-width:auto;min-width:160px;margin-right: 20px">
              <Option
                v-for="item in cityList1"
                :value="item.id"
                :key="item.id"
              >{{ item.channel_name }}</Option>
            </Select>
            <Select v-model="model3" style="width:160px;">
              <Option
                v-for="item in cityList2"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
            <div class="orderdetail_searchss">
                <input class="orderdetail_input15" type="text" v-model="value" >
                <img class="orderdetail_img15" @click="search" src="../../assets/search.png" alt="">
            </div>
          </div>
          <div class="orderdetail_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="orderdetail_table">
        <div class="orderdetail_table1">
          <div class="orderdetail_td21">渠道</div>
          <div class="orderdetail_td21">区服</div>
          <div class="orderdetail_td21">订单号</div>
          <div class="orderdetail_td21">Username(Uid)</div>
          <div class="orderdetail_td21">角色</div>
          <div class="orderdetail_td21">金额</div>
          <div class="orderdetail_td21">订单时间</div>
          <div class="orderdetail_td21">支付</div>
          <div class="orderdetail_td21">通知游戏</div>
           <div class="orderdetail_td21">操作</div>
        </div>
        <div>
        </div>
        <div>
          <div class="orderdetail_td2" v-for="(item,index) in msg" :key="index">
            <div class="orderdetail_td1">{{item.name}}</div>
            <div class="orderdetail_td1">{{item.server_name}}</div>
            <div class="orderdetail_td1">{{item.username}}</div>
            <div class="orderdetail_td1">{{item.uid}}</div>
            <div class="orderdetail_td1">{{item.role_name}}</div>
            <div class="orderdetail_td1">{{item.amount}}</div>
            <div class="orderdetail_td1">{{ zhuanhua(item.create_time) }}</div>
            <div class="orderdetail_td1">{{item.status==0?"未支付":item.status==1?"支付成功":"支付失败"}}</div>
            <div class="orderdetail_td1">{{item.is_notify==0?"未通知":"通知"}}</div>
            <div  class="orderdetail_td1">
                <div class="orderdetail_td1_caozuo">详情</div>
                 <div class="orderdetail_td1_caozuo1">补单</div>
            </div>
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
                name:"全部"
            },
            {
                id:1,
                name:'未支付'
            },
             {
                id:2,
                name:"支付失败 "
            },
             {
                id:3,
                name:"未发货 "
            },
             {
                id:4,
                name:"发货失败"
            },
             {
                id:5,
                name:"完成"
            },
        ],
        cityList1:[],
        cityList2:[
           {
                id:0,
                name:"订单号"
            },
             {
                id:1,
                name:"cp订单号"
            },
             {
                id:2,
                name:"渠道订单号"
            },
             {
                id:3,
                name:"角色姓名"
            },
             {
                id:4,
                name:"用户id"
            },
             {
                id:5,
                name:"登录名"
            },
             {
                id:6,
                name:"区服名称"
            },
        ],
        model1:0,
        model3:0,
      msg: [
      ],
      id:"",
      status:0,
      no:"",
      cp_no:"",
      ch_no:"",
      role_name:"",
      uid:"",
      user_name:"",
      server_name:"",
      time:[],
      cid:[],value:""
    };
  },
  props: ["GameAuth"],
  methods: {
    infoData:function(){
        this.$get("/api/v1/report/order",{
          gid:this.id,
          time:this.time,
          status:this.status,
          cid:this.cid,
          no:this.no,
          cp_no:this.cp_no,
          ch_no:this.ch_no,
          role_name:this.role_name,
          uid:this.uid,
          user_name:this.user_name,
          server_name:this.server_name
        }).then(res=>{
              if(res.code==200){
                    this.msg=res.data.data.data
              }
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
    },
    
    timecuo: function(data) {
      var a = data.replace(/-/g, "/");
      return Date.parse(a) / 1000;
    },
     channel:function(){
      this.$get("/api/v1/channel",{
        gid:this.id
      }).then(res=>{
          this.cityList1=res.data.data.data
      })
    },

     zhuanhua: function(data) {
      return this.formatDate(data);
    },
     // 时间戳转为日期
    formatDate: function(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    search:function(){
        if(this.model3==0){
          this.no=this.value
          this.cp_no=""
          this.ch_no=""
          this.role_name=""
          this.uid=""
          this.user_name=""
          this.server_name=""
        }
        else if(this.model3==1){
             this.no=""
          this.cp_no=this.value
          this.ch_no=""
          this.role_name=""
          this.uid=""
          this.user_name=""
          this.server_name=""
        }else if(this.model3==2){
             this.no=""
          this.cp_no=""
          this.ch_no=this.value
          this.role_name=""
          this.uid=""
          this.user_name=""
          this.server_name=""
        }else if(this.model3==3){
             this.no=""
          this.cp_no=""
          this.ch_no=""
          this.role_name=this.value
          this.uid=""
          this.user_name=""
          this.server_name=""
        }else if(this.model3==4){
             this.no=""
          this.cp_no=""
          this.ch_no=""
          this.role_name=""
          this.uid=this.value
          this.user_name=""
          this.server_name=""
        }else if(this.model3==5){
             this.no=""
          this.cp_no=""
          this.ch_no=""
          this.role_name=""
          this.uid=""
          this.user_name=this.value
          this.server_name=""
        }else if(this.model3==6){
             this.no=""
          this.cp_no=""
          this.ch_no=""
          this.role_name=""
          this.uid=""
          this.user_name=""
          this.server_name=this.value
        }
      this.infoData()
    }
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
  }
};
</script>
<style lang="less">
.orderdetail_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.orderdetail_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.orderdetail_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.orderdetail_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.orderdetail_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.orderdetail_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.orderdetail_td1 {
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
.orderdetail_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.orderdetail_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.orderdetail_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.orderdetail_renew {
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
.orderdetail_img15{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 6px;
    cursor: pointer;
}
.orderdetail_input15{
    width: 160px;
    height: 30px;
    background-color: #ebebeb;
    border: none;
    border-radius: 3px;
    margin-left: 20px;
    padding-left: 15px
}
.orderdetail_searchss{
    display: flex;
    align-items: center;
    position: relative;
    
}
.orderdetail_td1_caozuo{
    width: 60px;
    height: 25px;
    background-color: #599af7;
    line-height: 25px;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 10px
}
.orderdetail_td1_caozuo1{
    width: 60px;
    height: 25px;
    background-color:darkseagreen;
    line-height: 25px;
    color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 10px
}
.orderdetail_hint {
  margin: 10px 15px 0 15px;
  padding-top: 14px;
  padding-bottom: 6px;
  padding-left: 14px;
  background-color: #ffe5e5;
  border-radius: 3px;
}
.orderdetail_text1 {
  display: flex;
  align-items: center;
}
.orderdetail_text1 div {
  font-size: 12px;
  color: #666;
}
.orderdetail_text2 {
  font-size: 12px;
  color: #666666;
  text-align: left;
  padding-left: 53px;
}
</style>