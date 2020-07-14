<template>
  <div>
    <div class="Guanliyuan_header">控制中心>游戏中心>权限管理>管理员</div>
    <div class="Guanliyuan_main">
      <h2 class="Guanliyuan_main1">管理员</h2>
      <div style="display:flex;justify-content: space-between">
        <div class="Guanliyuan_main2">
          <div class="Guanliyuan_mains_one" @click="found()">
            <div class="Guanliyuan_mains_one1">新增</div>
          </div>
          <div class="Guanliyuan_mains_two">
            <input class="Guanliyuan_mains_two1" type="text" placeholder="输入用户名" v-model="username" />
            <img @click="search" class="Guanliyuan_mains_two2" src="../assets/search.png" alt />
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="Guanliyuan_table">
        <div class="Guanliyuan_table1">
          <div class="Guanliyuan_td21">角色组</div>
          <div class="Guanliyuan_td21">用户名称</div>
          <div class="Guanliyuan_td21">姓名</div>
          <div class="Guanliyuan_td21">电话</div>
          <div class="Guanliyuan_td21">邮件</div>
          <div class="Guanliyuan_td21">QQ</div>
          <div class="Guanliyuan_td21">最后登陆时间</div>
          <div class="Guanliyuan_td21">操作</div>
        </div>
        <div>
          <div class="Guanliyuan_td2" v-for="(item,index) in msgList" :key="index">
            <div class="Guanliyuan_td1">{{item.name}}</div>
            <div class="Guanliyuan_td1">{{item.username}}</div>
            <div class="Guanliyuan_td1">{{item.realname}}</div>
            <div class="Guanliyuan_td1">{{item.user_phone}}</div>
            <div class="Guanliyuan_td1">{{item.email}}</div>
            <div class="Guanliyuan_td1">{{item.qq}}</div>
            <div class="Guanliyuan_td1">{{item.updated_at}}</div>

            <div class="Guanliyuan_td1">
              <div class="Guanliyuan_xinxi1" @click="basic(item.id)">查看</div>
              <div class="Guanliyuan_shanchu1" @click="shanchu(item.id)">删除</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 新增 -->
      <Modal v-model="modal1" title="新增账号" width="700px" class="Guanliyuan_model" >
        <div slot="footer">
          <Button type="text" size="default" @click="no">取消</Button>
          <Button type="primary" size="default" @click="ok">保存</Button>
        </div>

        <div class="Guanliyuan_model1">
          <label for>管理分组</label>
          <Select v-model="model1" style="width:240px">
            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="Guanliyuan_model1">
          <label for>用户名称</label>
          <input type="text" v-model="yonghuname" />
          <div class="Guanliyuan_model1_one">*</div>
        </div>
        <div class="Guanliyuan_model1">
          <label for>密码</label>
          <input type="password" v-model="password1" />
          <div class="Guanliyuan_model1_one">*</div>
        </div>
        <div class="Guanliyuan_model1">
          <label for>姓名</label>
          <input type="text" v-model="name1" />
        </div>
        <div class="Guanliyuan_model1">
          <label for>手机号</label>
          <input type="text" v-model="phone1" />
        </div>
        <div class="Guanliyuan_model1">
          <label for>邮箱</label>
          <input type="text" v-model="email1" />
        </div>
        <div class="Guanliyuan_model1">
          <label for>QQ</label>
          <input type="text" v-model="qq1" />
        </div>
      </Modal>
      <!-- 编辑 -->
      <Modal v-model="modal2" title="编辑账号" width="700px" class="Guanliyuan_model">
           <div slot="footer">
          <Button type="text" size="default" @click="nobianji">取消</Button>
          <Button type="primary" size="default" @click="okbianji">保存</Button>
        </div>
        <div class="Guanliyuan_model1">
          <label for>管理分组</label>
          <Select v-model="model2" style="width:240px" disabled >
            <Option v-for="(item,index) in cityList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="Guanliyuan_model1">
          <label for>用户名称</label>
          <div class="Guanliyuan_model1_name"> {{yonghunames}}</div>
          <div class="Guanliyuan_model1_one">*</div>
        </div>
        <div class="Guanliyuan_model1">
          <label for>密码</label>
          <input type="password"  v-model="password1s" />
          <div class="Guanliyuan_model1_one">*</div>
        </div>
        <div class="Guanliyuan_model1">
          <label for>姓名</label>
          <input type="text"  v-model="name1s"/>
        </div>
        <div class="Guanliyuan_model1">
          <label for>手机号</label>
          <input type="text" v-model="phone1s" />
        </div>
        <div class="Guanliyuan_model1">
          <label for>邮箱</label>
          <input type="text" v-model="email1s" />
        </div>
        <div class="Guanliyuan_model1">
          <label for>QQ</label>
          <input type="text" v-model="qq2" />
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model1: "",
      model2: "",
      loading: true,
      modal1: false,
      modal2: false,
      cityList: [],
      msgList: [],
      username: "",
      // 新增
      yonghuname: "",
      password1: "",
      name1: "",
      phone1: "",
      email1: "",
      qq1:"",
      // 修改
      yonghunames:"",
      name1s:"",
      phone1s:"",
      password1s:"",
      email1s:"",
      id:"",
      qq2:"",
      group_id:""
    };
  },
  methods: {
    found: function() {
      this.modal1 = true;
      (this.model1 = ""),
        (this.yonghuname = ""),
        (this.password1 = ""),
        (this.phone1 = ""),
        (this.email1 = ""),
        (this.name1 = "");
    },
    basic: function(id) {
      this.modal2 = true;
      this.$get("api/v1/account/user/"+id+"").then(res=>{
            this.model2=Number(res.data.data.group_id) 
            this.yonghunames=res.data.data.username
            this.name1s=res.data.data.realname
            this.phone1s=res.data.data.user_phone
            this.email1s=res.data.data.email
            this.id=res.data.data.id,
            this.qq2=res.data.data.qq
      })
    },
    infoData: function() {
      var that = this;
      this.$get("api/v1/account/user", {
        username: this.username
      }).then(res => {
        if (res.code == 200) {
          res.data.data.forEach(function(item) {
            var a = new Date(Number(item.updated_at));
            item.updated_at = that.formatDate(a);
          });
          this.msgList = res.data.data;
        }
      });
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
    shanchu: function(id) {
      this.$delete("api/v1/account/user/" + id + "").then(res => {
        if (res.code == 200) {
          this.infoData();
        } else {
        }
      });
    },
    search: function() {
      this.infoData();
    },
    infoList: function() {
      this.$get("api/v1/rbac/list/group").then(res => {
        if (res.code == 200) {
          this.cityList = res.data.data;
        }
      });
    },
    // 新增
    ok: function() {
      if (!this.model1) {
        this.$Message.warning("请选择分组之后进行操作");
        return;
      }
      console.log(this.yonghuname.length);
      if (!this.yonghuname || this.yonghuname.length < 4) {
        this.$Message.warning("用户名不能低于5位");
        return;
      }
      if (!this.password1 || this.password1.length < 5) {
        this.$Message.warning("密码不能低于6位");
        return;
      }

      this.$post("api/v1/account/user", {
        group_id: this.model1,
        username: this.yonghuname,
        password: this.password1,
        tel: this.phone1,
        email: this.email1,
        realname: this.name1,
        qq:this.qq1
      }).then(res => {
        if (res.code == 200) {
          this.modal1 = false;
          this.$Message.success("添加成功");
          this.infoData();
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    no: function() {
      this.modal1=false
    },
    // 编辑
    okbianji:function(){
        this.$put("api/v1/account/user/"+this.id+"",{
            id:this.id,
            tel:this.phone1s,
            realname:this.name1s,
            qq:this.qq2,
            email:this.email1s,
            password:this.password1s,
            group_id:this.model2
        }).then(res=>{
            if(res.code==200){
                this.modal2=false
                this.$Message.success("修改成功");
                this.infoData();
            }
        })
    },
    nobianji:function(){
        this.modal2=false
    }
  },
  mounted() {
    this.infoData();
    this.infoList();
  },
  watch: {
    username: function() {
      if (!this.username) {
        this.infoData();
      }
    }
  }
};
</script>
<style lang="less">
.Guanliyuan_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.Guanliyuan_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.Guanliyuan_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.Guanliyuan_main2 {
  display: flex;
  padding-top: 14px;
  line-height: 30px;
}
.Guanliyuan_main22 {
  margin-top: 14px;
  margin-left: 10px;
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
.Guanliyuan_mains_one {
  width: 60px;
  height: 30px;
  background-color: #599ae7;
  color: #ffffff;
  font-size: 22px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  margin-left: 15px;
  justify-content: center;
  cursor: pointer;
}
.Guanliyuan_mains_one1 {
  font-size: 14px;
}

.Guanliyuan_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  font-weight: bold;
}
.Guanliyuan_td1 {
  width: 34%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.Guanliyuan_td21 {
  width: 34%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Guanliyuan_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px;
}
.Guanliyuan_td2 {
  display: flex;
  justify-content: space-between;
}
.Guanliyuan_xinxi1 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #ffffff;
  background-color: #599ae7;
  border-radius: 3px;
  margin-right: 14px;
  cursor: pointer;
}
.Guanliyuan_shanchu1 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  color: #ffffff;
  border-radius: 3px;
  background-color: #d9534f;
  cursor: pointer;
}
.ivu-btn-text {
  border: 1px solid #999999;
}
.ivu-btn-text:hover {
  background-color: #599ae7;
  color: #ffffff;
}
.ivu-btn-primary {
  background-color: #599ae7;
}
.Guanliyuan_mains_two {
  display: flex;
  align-items: center;
  margin-left: 10px;
  position: relative;
}
.Guanliyuan_mains_two1 {
  width: 140px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background-color: #ebebeb;
  padding-left: 15px;
  padding-right: 40px;
  box-sizing: border-box;
}
.Guanliyuan_mains_two2 {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 10px;
}
.Guanliyuan_model .ivu-modal-body {
  padding-bottom: 0 !important;
}
.Guanliyuan_model1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}
.Guanliyuan_model1 label {
  width: 60px;
  margin-right: 20px;
  text-align: left;
  font-size: 12px;
  color: #666;
}
.Guanliyuan_model1 input {
  width: 240px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  padding-right: 40px;
}
.Guanliyuan_model1_one {
  position: absolute;
  right: 162px;
  font-size: 20px;
  color: red;
}
.Guanliyuan_model1_name {
  width: 240px;
}
</style>