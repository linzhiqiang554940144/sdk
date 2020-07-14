<template>
  <div>
    <div class="roledetail_header">游戏中心>平台运营数据>角色明细</div>
    <div class="roledetail_main">
      <h2 class="roledetail_main1">角色明细</h2>
      <div>
        <div class="roledetail_waste">
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
            >
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.channel_name }}</Option>
            </Select>
            <Select v-model="model12" style="width:160px">
              <Option v-for="item in cityLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <div class="roledetail_searchss">
              <input class="roledetail_input15" type="text" v-model="content" />
              <img class="roledetail_img15" @click="search" src="../../assets/search.png" alt />
            </div>
          </div>
          <div class="roledetail_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="roledetail_table">
        <div class="roledetail_table1">
          <div class="roledetail_td21">用户渠道</div>
          <div class="roledetail_td21">区服</div>
          <div class="roledetail_td21">用户UID</div>
          <div class="roledetail_td21">Username</div>
          <div class="roledetail_td21">角色名</div>
          <div class="roledetail_td21">等级</div>
          <div class="roledetail_td21">更新数</div>
          <div class="roledetail_td21">付费额</div>
          <div class="roledetail_td21">最后登录时间</div>
          <div class="roledetail_td21">创建登陆时间</div>
          <div class="roledetail_td21">操作</div>
        </div>
        <div></div>
        <div>
          <div class="roledetail_td2" v-for="(item,index) in msg" :key="index">
            <div class="roledetail_td1">{{item.name}}</div>
            <div class="roledetail_td1">{{item.server_name}}</div>
            <div class="roledetail_td1">{{item.uid}}</div>
            <div class="roledetail_td1">{{item.username}}</div>
            <div class="roledetail_td1">{{item.role_name}}</div>
            <div class="roledetail_td1">{{item.vip}}</div>
            <div class="roledetail_td1">{{item.total_count}}</div>
            <div class="roledetail_td1">{{item.total_money}}</div>
            <div class="roledetail_td1">{{item.last_time}}</div>
            <div class="roledetail_td1">{{ zhuanhua (item.create_time) }}</div>

            <div class="roledetail_td1">
              <div
                v-if="item.is_whitelist==0"
                class="roledetail_td1_caozuo"
                @click="jiechu(item)"
              >解除阻止</div>
              <div
                v-if="item.is_whitelist!=0"
                class="roledetail_td1_caozuo"
                @click="jiechu(item)"
              >立即阻止</div>
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
      time: [],
      id: "",
      cityList: [],
      cityLists: [
        {
          id: 0,
          name: "用户UID"
        },
        {
          id: 1,
          name: "用户名称"
        },
        {
          id: 2,
          name: "角色名称"
        },
        {
          id: 3,
          name: "玩家区服"
        },
        {
          id: 4,
          name: "玩家角色ID"
        }
      ],
      model1: [],
      model12: 0,
      msg: [],
      cid: [],
      uid: "",
      user_name: "",
      role_name: "",
      server_name: "",
      role_id: "",
      content: ""
    };
  },
  props: ["GameAuth"],
  methods: {
    infodata: function() {
      this.$get("/api/v1/report/role", {
        gid: this.id,
        cid: this.model1,
        uid: this.uid,
        user_name: this.user_name,
        role_name: this.role_name,
        server_name: this.server_name,
        role_id: this.role_id,
        time: this.time
      }).then(res => {
        this.msg = res.data.data.data;
      });
    },
    jiechu: function(item) {
      if (item.is_whitelist == 0) {
        this.$post("/api/v1/report/role", {
          id: item.id,
          status: 1
        }).then(res => {
          if (res.code == 200) {
            this.infodata();
          }
        });
        return;
      }
      this.$post("/api/v1/report/role", {
        id: item.id,
        status: 2
      }).then(res => {
        if (res.code == 200) {
          this.infodata();
        }
      });
    },
    // 渠道
    channel: function() {
      this.$get("/api/v1/channel", {
        gid: this.id
      }).then(res => {
        if (res.code == 200) {
          this.cityList = res.data.data.data;
        }
      });
    },
    handleChange: function(data) {
      console.log(data);
      if (!data[0]) {
        this.time = [];

        console.log(11122);
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
    }, zhuanhua: function(data) {
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
    search: function() {
      if (this.model12 == 0) {
        this.uid = this.content;
        this.user_name = "";
        this.role_name = "";
        this.server_name = "";
        this.role_id = "";
      } else if (this.model12 == 1) {
        this.uid = "";
        this.user_name = this.content;
        this.role_name = "";
        this.server_name = "";
        this.role_id = "";
      } else if (this.model12 == 2) {
        this.uid = "";
        this.user_name = "";
        this.role_name = this.content;
        this.server_name = "";
        this.role_id = "";
      } else if (this.model12 == 3) {
        this.uid = "";
        this.user_name = "";
        this.role_name = "";
        this.server_name = this.content;
        this.role_id = "";
      } else {
        this.uid = "";
        this.user_name = "";
        this.role_name = "";
        this.server_name = "";
        this.role_id = this.content;
      }
      this.infodata()
    }
  },
  computed: {},
  mounted() {
    if (localStorage.getItem("SDKGame")) {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
    }
    this.infodata();
    this.channel();
  },
  watch: {
    GameAuth: function() {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
    }
  }
};
</script>
<style lang="less">
.roledetail_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.roledetail_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.roledetail_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.roledetail_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.roledetail_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.roledetail_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold;
}
.roledetail_td1 {
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
.roledetail_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.roledetail_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px;
}
.roledetail_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.roledetail_renew {
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
.roledetail_img15 {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 6px;
  cursor: pointer;
}
.roledetail_input15 {
  width: 160px;
  height: 30px;
  background-color: #ebebeb;
  border: none;
  border-radius: 3px;
  margin-left: 20px;
  padding-left: 15px;
}
.roledetail_searchss {
  display: flex;
  align-items: center;
  position: relative;
}
.roledetail_td1_caozuo {
  width: 80px;
  height: 25px;
  background-color: #599af7;
  line-height: 25px;
  color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
}
</style>