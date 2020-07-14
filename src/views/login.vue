<template>
  <div class="login" id="login">
    <div class="login_img1">
      <div class="login_logo" @click="shouye"></div>
      <div class="login_msg1">账号登陆</div>
      <div class="login_accounts">
        <div v-show="qipao1" class="login_qipao">请输入账号</div>
        <input class="login_account" maxlength="20" type="text" placeholder="账号" v-model="account" />
        <div class="login_image1"></div>
      </div>
      <div class="login_passwords">
        <div v-show="qipao2" class="login_qipao">请输入密码</div>
        <input
          class="login_password"
          maxlength="20"
          type="password"
          v-model="password"
          placeholder="密码"
        />
        <div class="login_image2"></div>
      </div>
      <div class="login_codes">
        <div v-show="qipao3" class="login_qipaos">请输入验证码</div>
        <input type="text" v-model="code" class="login_code" placeholder="验证码" />
        <img class="login_img2" :src="img" title="点击更换验证码" @click="image" />
      </div>
      <div class="login_login" @click="login">登陆</div>
      <div class="login_text">
        <div class="login_find" @click="reset">忘记密码 ?</div>
        <div class="login_text_one">| 没有账号 ? 立即</div>
        <div class="login_find" @click="enroll">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      img: "",
      qipao1: false,
      account: "", // 账号
      password: "", // 密码
      code: "", // 验证码
      qipao2: false,
      qipao3: false,
      key:""
    };
  },
  methods: {
    romove:function(){
        localStorage.removeItem('SDKtoken')
            localStorage.removeItem('SDKbroadside')
            localStorage.removeItem('SDKGame')
            localStorage.removeItem('SDKbroadsidetwo')
    },
    image: function() {
      this.$get("/api/v1/code").then(res => {
        this.img = res.data.img;
        this.key=res.data.key
      });
    },
    shouye: function() {
      this.$router.push({
        name: "shouye"
      });
    },
    enroll: function() {
      this.$router.push({
        name: "enroll"
      });
    },
    login: function() {
      if (!this.account) {
        this.qipao1 = true;
        this.qipao3 = false;
        this.qipao2 = false;
        return;
      }
      if (!this.password) {
        this.qipao2 = true;
        this.qipao3 = false;
        this.qipao1 = false;
        return;
      }
      if (!this.code) {
        this.qipao3 = true;
        this.qipao2 = false;
        this.qipao1 = false;
        return;
      }
      this.qipao3 = false;
      this.qipao2 = false;
      this.qipao1 = false;
      this.$post("api/v1/user/login", {
        username: this.account,
        password: this.password,
        captcha: this.code,
        key:this.key
      }).then(res => {
        if (res.code == 200) {
          this.$router.push({
            name: "gameManage"
          });
        }
        else{
            this.image()
           this.$Message.error(res.message);
        }
      });
    },
    reset: function() {
      this.$router.push({
        name: "reset"
      });
    },
    keyclick:function(){
      var that=this
      $("#login").keydown(function(event){
  if(event.keyCode==13){
              that.login()
  }
});
    }
  },
  components: {},
  mounted() {
    this.keyclick()
    this.romove()
    document.addEventListener("click", e => {
      if (e.target.className != "login_login") {
        this.qipao1 = false;
        this.qipao2 = false;
        this.qipao3 = false;
        
      }
    });
    this.$get("/api/v1/code").then(res => {
      this.img = res.data.img;
      this.key=res.data.key
    });
  }
};
</script>
<style lang="less" >
.login {
  background-color: #000c11;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.login_img1 {
  width: 1920px;
  height: 900px;
  min-width: 1920px;
  min-height: 900px;
  background-image: url(../assets/banner.jpg);
  background-size: 100% 100%;
  position: relative;
}
.login_msg1 {
  position: absolute;
  font-size: 32px;
  color: #3399ff;
  font-weight: 600;
  right: 516px;
  top: 243px;
  user-select: none;
}
.login_accounts {
  position: absolute;
  right: 380px;
  top: 323px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.login_qipaos {
  background-image: url(../assets/qipao.png);
  width: 98px;
  height: 26px;
  font-size: 12px;
  color: #fff;
  line-height: 26px;
  text-align: left;
  padding-left: 8px;
}
.login_qipao {
  background-image: url(../assets/qipao.png);
  width: 98px;
  height: 26px;
  font-size: 12px;
  color: #fff;
  line-height: 26px;
  text-align: left;
  padding-left: 12px;
  position: absolute;
  left: -98px;
}
.login_account {
  width: 400px;
  height: 46px;
  border: none;
  border-radius: 3px;
  padding-left: 15px;
  background-color: rgb(245, 245, 245);
  padding-right: 60px;
}
.login_passwords {
  position: absolute;
  right: 380px;
  top: 394px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.login_password {
  width: 400px;
  height: 46px;
  border: none;
  border-radius: 3px;
  padding-left: 15px;
  background-color: rgb(245, 245, 245);
  padding-right: 60px;
}
.login_codes {
  position: absolute;
  right: 380px;
  top: 464px;
  font-size: 18px;
  display: flex;
}
.login_code {
  width: 230px;
  height: 46px;
  padding-left: 15px;
  border: none;
  border-radius: 3px;
  margin-right: 17px;
  background-color: rgb(245, 245, 245);
}
.login_img2 {
  width: 153px;
  height: 46px;
  cursor: pointer;
  border-radius: 3px
}

.login_login {
  width: 400px;
  height: 46px;
  background-color: #25a1e9;
  position: absolute;
  right: 380px;
  top: 535px;
  border-radius: 3px;
  line-height: 46px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  user-select: none;
}
.login_login:hover {
  background-color: #157db9;
}
.login_login:active {
  background-color: #25a1e9;
}
.login_text {
  position: absolute;
  display: flex;
  right: 470px;
  top: 586px;
}
.login_find {
  color: #25a1e9;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 10px;
}
.login_find:hover {
  color: #157db9;
}
.login_text_one {
  color: #ffffff;
}
.login_logo {
  background-image: url(../assets/logo1.png);
  width: 379px;
  height: 87px;
  position: absolute;
  right: 400px;
  top: 155px;
  cursor: pointer;
  background-size: 100% 100%;
}
.login_image1 {
  width: 25px;
  height: 27px;
  background-image: url(../assets/account.png);
  background-size: 100% 100%;
  position: absolute;
  left: 358px;
}
.login_image2 {
  width: 25px;
  height: 27px;
  background-image: url(../assets/pwd.png);
  background-size: 100% 100%;
  position: absolute;
  left: 358px;
}
</style>
