<template>
  <div>
    <div class="Accountdetail_header">游戏中心>平台运营数据>账号明细</div>
    <div class="Accountdetail_main">
      <h2 class="Accountdetail_main1">账号明细</h2>
      <div>
        <div class="Accountdetail_waste">
          <div style="display:flex">
            <DatePicker
              type="daterange"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 220px"
              @on-change="handleChange"
            ></DatePicker>
            <Select
              v-model="model1"
              multiple
              style="width:200px;margin-right: 20px;margin-left: 20px"
              placeholder="请选择渠道"
            >
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.channel_name }}</Option>
            </Select>
            <Select v-model="model12" style="width:160px">
              <Option v-for="item in namelist" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <div class="Accountdetail_searchss">
              <input class="Accountdetail_input15" type="text" v-model="text1" />
              <img @click="search" class="Accountdetail_img15" src="../../assets/search.png" alt />
            </div>
          </div>
          <div class="Accountdetail_waste2" @click="daochu">导出数据</div>
        </div>
      </div>
   
      <div class="Accountdetail_table">
        <div class="Accountdetail_table1">
          <div class="Accountdetail_td21">用户渠道</div>
          <div class="Accountdetail_td21">用户UID</div>
          <div class="Accountdetail_td21">用户名称</div>
          <div class="Accountdetail_td21">激活时间</div>
          <div class="Accountdetail_td21">最后登陆时间</div>
          <div class="Accountdetail_td21">总付费数</div>
          <div class="Accountdetail_td21">总付费额</div>
          <div class="Accountdetail_td21">操作</div>
        </div>
        <div></div>
        <div>
          <div class="Accountdetail_td2" v-for="(item,index) in msg" :key="index">
            <div class="Accountdetail_td1">{{item.name}}</div>
            <div class="Accountdetail_td1">{{item.uid}}</div>
            <div class="Accountdetail_td1">{{item.username}}</div>
            <div class="Accountdetail_td1">{{zhuanhua(item.create_time)}}</div>
            <div class="Accountdetail_td1">{{item.last_time}}</div>
            <div class="Accountdetail_td1">{{item.total_count}}</div>
            <div class="Accountdetail_td1">{{item.total_money}}</div>
            <div class="Accountdetail_td1">
              <div
                v-if="item.is_login==0"
                class="Accountdetail_td1_caozuo"
                @click="statu_account(item)"
              >封账号</div>
              <div
                v-if="item.is_login!=0"
                class="Accountdetail_td1_caozuo"
                @click="statu_account(item)"
              >解封账号</div>
            </div>
          </div>
          <div v-if="msgStatus">暂无数据</div>
        </div>
      </div>
      <Table v-if="false" :columns="columns8" :data="msglist" size="small" ref="table"></Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns8: [
        {
          title: "用户渠道",
          key: "name",
          fixed: "left",
          width: 200
        },
        {
          title: "用户UID",
          key: "uid",
          fixed: "left",
          width: 200
        },
        {
          title: "用户名称",
          key: "username",
          fixed: "left",
          width: 200
        },
        {
          title: "激活时间",
          key: "create_time",
          fixed: "left",
          width: 200,
         
        },
        {
          title: "最后登陆时间",
          key: "last_time",
          fixed: "left",
          width: 200,
         
        },
        {
          title: "总付费数",
          key: "total_count",
          fixed: "left",
          width: 200
        },
        {
          title: "总付费额",
          key: "total_money",
          fixed: "left",
          width: 200
        },
        {
          title: "是否封禁",
          key: "is_login",
          fixed: "left",
          width: 200,
           render: (h, params) => {
             let name= h("span","已封禁")
             if(params.row.is_login==0){
                  name = h("span", 
                    
                    "未封禁"
             
             );
                }
                return name
                
          }
        }
      ],
      msgStatus: false,
      id: "",
      cityList: [
        {
          id: 0,
          name: "订单号"
        },
        {
          id: 1,
          name: "游戏名称"
        }
      ],
      model1: [],
      model12: 0,
      msg: [],
      msglist: [],
      time1: "",
      time2: "",
      uid: "",
      user_name: "",
      namelist: [
        {
          id: 0,
          name: "用户Uid"
        },
        {
          id: 1,
          name: "用户名"
        }
      ],
      text1: "",
      time: []
    };
  },
  props: ["GameAuth"],
  methods: {
    handleChange: function(data) {
      if (!data[0]) {
        this.time = [];
        return;
      }
      this.time1 = this.timecuo(data[0]);
      this.time2 = this.timecuo(data[1]);
      this.time[0] = this.time1;
      this.time[1] = this.time2;
    },
    timecuo: function(data) {
      var a = data.replace(/-/g, "/");
      return Date.parse(a) / 1000;
    },
    zhuanhua: function(data) {
      return this.formatDate(data);
    },
    channel: function() {
      this.$get("/api/v1/channel", {
        gid: this.id
      }).then(res => {
        if (res.code == 200) {
          this.cityList = res.data.data.data;
        }
      });
    },
    infoData: function() {
      this.$get("/api/v1/report/user", {
        time: this.time,
        cid: this.model1,
        uid: this.uid,
        user_name: this.user_name,
        gid: this.id
      }).then(res => {
        if (res.code == 200) {
          this.msg = res.data.data.data;
          if (this.msg == "") {
            this.msgStatus = true;
          } else {
            this.msgStatus = false;
          }
        }
      });
    },
    search: function() {
      if (this.model12 == 0) {
        this.uid = this.text1;
        this.user_name = "";
      } else {
        this.user_name = this.text1;
        this.uid = "";
      }
      this.infoData();
    },
    formatDate: function(timestamp) {
      var date = new Date(timestamp * 1000); 
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
    statu_account: function(item) {
      if (item.is_login == 0) {
        this.$post("/api/v1/report/user", {
          id: item.id,
          status: 1
        }).then(res => {
          if (res.code == 200) {
            this.$Message.success("封禁账号成功");
            this.infoData();
          }
        });
      } else {
        this.$post("/api/v1/report/user", {
          id: item.id,
          status: 2
        }).then(res => {
          if (res.code == 200) {
            this.$Message.success("解封账号成功");
            this.infoData();
          }
        });
      }
    },
    daochu:function(){
      var that=this
         this.$get("/api/v1/report/user", {
        time: this.time,
        cid: this.model1,
        uid: this.uid,
        user_name: this.user_name,
        gid: this.id
      }).then(res => {
        if (res.code == 200) {
          this.msglist=res.data.data.data;
           this.msglist.forEach(function(data){
            if(data.is_login==0){
              data.is_login="未封禁"
            }
            else{
              data.is_login="封禁中"
            }
            data.last_time= that.formatDate(data.last_time)
            data.create_time=that.formatDate(data.create_time)
            
        })
        }
      }).then(res=>{
        that.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
      });
       
      
    }
  },
  computed: {},
  mounted() {
    if (localStorage.getItem("SDKGame")) {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
    }
    this.channel();
    this.infoData();
  },
  watch: {
    GameAuth: function() {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
      console.log(this.id, " 登陆支付封禁监听得id");
    },
    text1: function() {
      if (!this.text1) {
        this.uid = "";
        this.user_name = "";
        this.infoData();
      }
    }
  }
};
</script>
<style lang="less">
.Accountdetail_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.Accountdetail_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.Accountdetail_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.Accountdetail_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.Accountdetail_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.Accountdetail_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold;
}
.Accountdetail_td1 {
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
.Accountdetail_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Accountdetail_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px;
}
.Accountdetail_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.Accountdetail_renew {
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
.Accountdetail_img15 {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 6px;
  cursor: pointer;
}
.Accountdetail_input15 {
  width: 160px;
  height: 30px;
  background-color: #ebebeb;
  border: none;
  border-radius: 3px;
  margin-left: 20px;
  padding-left: 15px;
}
.Accountdetail_searchss {
  display: flex;
  align-items: center;
  position: relative;
}
.Accountdetail_td1_caozuo {
  width: 60px;
  height: 25px;
  background-color: #599af7;
  line-height: 25px;
  color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
}
.ivu-select-placeholder {
  color: #666 !important;
}
</style>