<template>
  <div>
    <div class="detail_header">控制中心>游戏中心>详细信息</div>
    <div class="detail_main">
      <h2 class="detail_main1">详细信息</h2>
      <div class="detail_text">
        <div>登陆账号 :</div>
        <div class="detail_text2">15615616</div>
      </div>

      <div class="detail_text">
        <div>注册时间 :</div>
        <div class="detail_text2">{{created_at}}</div>
      </div>
      <div class="detail_text">
        <div>最后登陆 :</div>
        <div class="detail_text2">{{updated_at}}</div>
      </div>
      <div class="detail_text1" style="margin-top: 56px;">
        <h3 class="detail_text3">登陆密码</h3>
        <div>安全性高的密码可以使账号更安全。建议你定期更换密码，设计一个包含字母，符号或数字中至少两项且长度超过6位的密码</div>
        <div class="detail_text4" @click="bianji">编辑</div>
      </div>
      <div class="detail_text1">
        <h3 class="detail_text3">手机绑定</h3>
        <div v-if="user_phones">您已绑定了手机号{{user_phone}}【你的手机可以用于找回密码】</div>
        <div v-if="user_phones" class="detail_text4" @click="gaibang">改绑</div>
          <div v-if="!user_phones">你尚未绑定手机</div>
          <div v-if="!user_phones" class="detail_text4" @click="bangding">绑定</div>
      </div>
    </div>
    <!-- 编辑 -->
    <Modal
      width="600px"
      ok-text="保存"
      v-model="modal1"
      title="编辑密码"
      @on-ok="okone"
      @on-cancel="cancelone"
    >
      <div class="detail_password1">
        <label for class="detail_mima1">原密码</label>
        <input type="password" class="detail_mima2" v-model="oldpassword" />
      </div>
      <div class="detail_password2">
        <label for class="detail_mima1">新密码</label>
        <input type="password" class="detail_mima2" v-model="newpassword" />
      </div>
      <div class="detail_password3">
        <label for class="detail_mima1">确认新密码</label>
        <input type="password" class="detail_mima2" v-model="newpasswords" />
      </div>
    </Modal>

    <!-- 改绑 -->
    <Modal
      width="600px"
      v-model="modal2"
      title="Common Modal dialog box title"
      @on-ok="oktwo"
      @on-cancel="canceltwo"
    >
      <div slot="close"></div>
      <div slot="header" class="detail_gaibang1">
        <h4 style="margin-left:10px">改绑手机</h4>
        <div class="detail_gaibang2">
          <Steps :current="current" size="small">
            <Step title="验证旧手机"></Step>
            <Step title="验证新手机"></Step>
          </Steps>
        </div>
      </div>
      <div slot="footer" class="detail_footer1">
        <div class="detail_footer2" @click="footer1">取消</div>
        <div class="detail_footer3" v-if="footertwo" @click="footer2">下一步</div>
        <div class="detail_footer3" @click="footer3" v-if="footerthree">确定</div>
      </div>
      <div v-if="footertwo" class="detail_footer_main">
        <div class="detail_footer_main2">
          <span>你绑定的手机号为 ：</span>
          <span>{{user_phone}}</span>
        </div>
        <div class="detail_footer_main1">
          <label for>验证码</label>
          <input type="text" v-model="code" class="detail_code" placeholder />
          <div class="detail_code1" @click="codeSend" v-if="code1">发送验证码</div>
          <div class="detail_code2" v-if="code2">重新发送 ({{number}})</div>
        </div>
      </div>
      <div v-if="footerthree" class="detail_footer_main">
        <div>
          <label for class="detail_footer_label1">新手机号</label>
          <input type="text" class="detail_footer_phone1" v-model="phone" />
        </div>
        <div class="detail_footer_main1">
          <label for class="detail_footer_label1">验证码</label>
          <input type="text" class="detail_code" v-model="newcode1" />
          <div class="detail_code1" @click="codeSends" v-if="code3">发送验证码</div>
          <div class="detail_code2" v-if="code4">重新发送({{numbers}})</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_phones:true,
      modal1: false,
      modal2: false,
      current: 0,
      footertwo: true,
      footerthree: false,
      code: "",
      code1: true,
      code2: false,
      code3: true,
      code4: false,
      number: 60,
      numbers: 60,
      // 新密码
      newpassword: "",
      // 老密码
      oldpassword: "",
      // 重复密码
      newpasswords: "",
      created_at: "",
      updated_at: "",
      user_phone: "",
      phone: "",newcode1:""
    };
  },
  methods: {
    bangding:function(){
        
    },
    bianji: function() {
      this.modal1 = true;
    },
    gaibang: function() {
      this.code="",
      this.newcode1="",
      this.phone=""
      this.modal2 = true;
      (this.current = 0), (this.footertwo = true), (this.footerthree = false);
      console.log(516);
    },
    okone: function() {
      this.$put("api/v1/account/modify/Password", {
        old_password: this.oldpassword,
        password: this.newpassword,
        password_confirmation: this.newpasswords
      }).then(res => {
        if (res.code == 200) {
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    cancelone: function() {},
    oktwo: function() {},
    canceltwo: function() {},
    footer1: function() {
      this.modal2 = false;
    },
    footer2: function() {
      this.$post("api/v1/account/modify/phone", {
        type: 2,
        code: this.code
      }).then(res => {
        if (res.code != 200) {
          this.$Message.warning(res.message);
        } else {
          this.current++;
          this.footertwo = false;
          this.footerthree = true;
          if (this.current > 1) {
            this.current = 1;
          }
        }
      });
    },
    footer3: function() {
      if(this.newcode1){
        this.$post("api/v1/account/modify/phone",{
           type:1,
           code:this.newcode1,
           tel:this.phone
        }).then(res=>{
            if(res.code==200){
                this.modal2 = false;
                this.infoData()
                this.$Message.success("修改成功");
            }

        })
      }
      
    },
    time: function() {
      if (this.number == 0) {
        this.code1 = true;
        this.code2 = false;
        this.number = 60;
        return;
      }
      if (this.number > 0) {
        this.number--;
        setTimeout(() => {
          this.time();
        }, 1000);
      }
    },
    times: function() {
      if (this.numbers == 0) {
        this.code3 = true;
        this.code4 = false;
        this.numbers = 60;
      }
      if (this.numbers > 0) {
        this.numbers--;
        setTimeout(() => {
          this.times();
        }, 1000);
      }
    },
    codeSend: function() {
      console.log("发送验证码");
      this.code1 = false;
      this.code2 = true;
      this.time();
      this.$get("api/v1/account/send/sms").then(res => {});
    },
    codeSends: function() {
      if(this.phone){
        this.code3 = false;
      this.code4 = true;
      this.times();
      this.$get("api/v1/tel/code", {
        tel: this.phone
      }).then(res => {});
      }
      else{
          this.$Message.warning('请先输入手机号');
      }
    },
    infoData: function() {
      this.$get("api/v1/account/user/info").then(res => {
       
        if(res.code==200){
           var a = new Date(Number(res.data.data.created_at));
        var b = new Date(Number(res.data.data.updated_at));
        this.created_at = this.formatDate(a);
        this.updated_at = this.formatDate(b);
          if(res.data.data.user_phone){
            this.user_phones=true
            this.user_phone = res.data.data.user_phone.replace(
          /(\d{3})\d{4}(\d{4})/,
          "$1****$2"
        );
        }else{
          this.user_phones=false
        }
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
    }
  },
  computed: {},
  mounted() {
    this.infoData();

  },
  watch: {}
};
</script>
<style lang="less">
.detail_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.detail_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.detail_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.detail_text {
  display: flex;
  margin-left: 15px;
  font-size: 14px;
  color: #666666;
  margin-top: 15px;
  margin-bottom: 10px;
}
.detail_text1 {
  display: flex;
  margin-left: 15px;
  font-size: 14px;
  color: #666666;
  margin-top: 25px;
  line-height: 26px;
}
.detail_text2 {
  padding-left: 15px;
}
.detail_text3 {
  font-size: 14px;
  color: #282c37;
  margin-right: 25px;
}
.detail_text4 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 14px;
  margin-left: 20px;
  cursor: pointer;
}
.ivu-btn-text {
  border: 1px solid #999999;
}
.ivu-btn-text:hover {
  // border: 1px solid #999999;
  background-color: #599ae7;
  color: #ffffff;
}
.ivu-btn-primary {
  background-color: #599ae7;
}
.detail_mima1 {
  width: 80px;
  text-align: right;
  display: inline-block;
  margin-left: 126px;
  font-size: 14px;
  color: #666666;
}
.detail_mima2 {
  width: 240px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-left: 15px;
}
.detail_password1 {
  margin-top: 40px;
}
.detail_password2 {
  margin-top: 20px;
}
.detail_password3 {
  margin-top: 20px;
  margin-bottom: 60px;
}
.detail_mima2 {
  padding-left: 15px;
}
.detail_gaibang1 {
  display: flex;
}
.detail_gaibang2 {
  width: 320px;
  margin-left: 70px;
}
.detail_footer1 {
  display: flex;
  justify-content:flex-end;
}
.detail_footer2 {
  width: 60px;
  height: 30px;
  border: 1px solid #cccccc;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  margin-right: 20px;
  cursor: pointer;
}
.detail_footer3 {
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  background-color: #599ae7;
  color: #fff;
  cursor: pointer;
}
.detail_footer_main1 {
  display: flex;
  font-size: 14px;
  margin-top: 25px;
  color: #666;
  align-items: center;
}
.detail_footer_main {
  margin-top: 80px;
  margin-left: 153px;
  margin-bottom: 80px;
}
.detail_footer_main2 {
  font-size: 14px;
  color: #666;
}
.detail_code {
  width: 140px;
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin-left: 15px;
  margin-right: 10px;
}
.detail_code1 {
  width: 90px;
  height: 30px;
  background-color: #599ae7;
  border-radius: 3px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.detail_code2 {
  width: 90px;
  height: 30px;
  background-color: #b4b4b4;
  border-radius: 3px;
  line-height: 30px;
  color: #333;
  text-align: center;
  font-size: 12px;
}
.detail_footer_phone1 {
  width: 240px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  line-height: 30px;
  margin-left: 15px;
  padding-left: 15px;
}
.detail_footer_label1 {
  width: 80px;
  text-align: right;
  display: inline-block;
}
</style>