<template>
  <div class="reset">
    <div class="reset_header">
      <div class="reset_headers">
        <div class="reset_headers_one">
          <div @click="shouye" class="reset_logo"></div>
          <div @click="login" class="reset_header_text" style="color:#1b92d7">首页</div>
          <div @click="login" class="reset_header_text">开发文档</div>
          <div @click="login" class="reset_header_text">资源下载</div>
          <div @click="login" class="reset_header_text">管理中心</div>
        </div>
        <div class="reset_headers_two">
          <div @click="login">登陆</div>
          <div @click="enroll">注册</div>
        </div>
      </div>
    </div>
    <div class="reset_main">
      <div class="reset_text1">首页＞找回账号</div>
      <div class="reset_text2">找回账号</div>
      <div v-if="msg1">
        <div class="reset_text3">请输入你要找回的账号</div>
        <div style="position: relative;">
          <input class="reset_input1" type="text" placeholder="账号" v-model="phone" />
          <img class="reser_img1" src="../assets/account.png" alt />
          <div class="reset_img2" v-if="msg2">请输入账号</div>
        </div>
        <div class="reset_text4" @click="next">下一步</div>
      </div>
      <div v-if="content">
        <div style="margin-top: 10px;margin-bottom: 10px;">点击获取按钮,系统将发送验证码到绑定手机 : {{phones}}</div>
        <div class="reset_content1">
          <input class="reset_input2" type="text" v-model="code" placeholder="验证码" />
          <div class="reset_img3" @click="codeSend" v-if="code1" >{{codename}}</div>
          <div class="reset_img4" v-if="code2">{{number}}秒后重试</div>
        </div>
        <div class="reset_content1">
          <input type="password" class="reset_password1" placeholder="新密码" v-model="password1" />
          <div class="reset_content1_img1"></div>
        </div>
        <div class="reset_content1">
          <input type="password" class="reset_password2" placeholder="密码" v-model="password2" />
          <div class="reset_content1_img1"></div>
        </div>
        <div class="reset_xiugai" @click="amend">立即修改</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      codename:"获取",
      phone: "",
      phones: "",
      phonex:"",
      code:"",
      msg1: true,
      msg2: false,
      code1: true,
      code2: false,
      number: 60,
      content: false,
      password1:"",
      password2:""
    };
  },
  methods: {
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
    codeSend: function() {
      this.code1 = false;
      this.code2 = true;
      this.time();
      this.codename="重新获取"
      this.$get("api/v1/tel/code", {
              tel: this.user_phone,
              type: 2
            }).then(res => {
              if (res.code == 200) {
                

              } else {
                this.$Message.error(res.message);
              }
            });
    },
    shouye: function() {
      this.$router.push({
        name: "shouye"
      });
    },
    login: function() {
      this.$router.push({
        name: "login"
      });
    },
    enroll: function() {
      this.$router.push({
        name: "enroll"
      });
    },
    next: function() {
      if (!this.phone) {
        this.msg2 = true;
      } else {
          
        this.$get("api/v1/check/user", {
          username: this.phone
        }).then(res => {

          if (res.code == 200 && res.data.data!=null) {
              this.user_phone=res.data.data.user_phone,
         
            this.phonex=res.data.data.user_phone
            this.phones = res.data.data.user_phone.replace(
              /(\d{3})\d{4}(\d{4})/,
              "$1****$2"
            );
            this.msg1 = false;
            this.content = true;
            
          } else {
            this.$Message.error(res.message);
          }
        });

        // this.phones = this.phones.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      }
    },
    // 修改密码
    amend:function(){
        console.log(111)
        this.$put("api/v1/set/password",{
          tel:this.phonex,
          code:this.code,
          password:this.password1,
          password2:this.password2,
          username:this.phone
        }).then(res=>{
              if(res.code==200){
                this.$Message.success("修改成功,三秒后跳转登录页");

                setTimeout(() => {
                  this.$router.push("login")
                }, 3000);
                
              }
        })
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      if (e.target.className != "reset_text4") {
        this.msg2 = false;
      }
    });
  }
};
</script>
<style lang="less">
.reset {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.reset_header {
  background-color: #282c37;
}
.reset_headers {
  width: 1160px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.reset_headers_one {
  display: flex;
  line-height: 60px;
  align-items: center;
}
.reset_logo {
  background-image: url(../assets/logo.png);
  height: 32px;
  width: 119px;
  background-size: 100% 100%;
  margin-right: 60px;
  cursor: pointer;
}
.reset_header_text {
  font-size: 12px;
  color: #ffffff;
  margin-left: 32px;
  cursor: pointer;
  user-select: none;
}
.reset_headers_two {
  display: flex;
  line-height: 60px;
  color: #fff;
}
.reset_headers_two div {
  margin-right: 10px;
  cursor: pointer;
  user-select: none;
}
.reset_headers_two div:hover {
  color: #1b92d7;
}
.reset_headers_two div:active {
  color: #ffffff;
}
.reset_main {
  width: 1160px;
  margin: 0 auto;
  text-align: left;
}
.reset_text1 {
  font-size: 14px;
  color: #666666;
  margin-top: 10px;
}
.reset_text2 {
  font-size: 16px;
  color: #282c37;
  font-weight: bold;
  margin-top: 25px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
}
.reset_text3 {
  font-size: 14px;
  color: #333333;
  margin-top: 10px;
}
.reset_input1 {
  width: 320px;
  height: 40px;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  padding-left: 15px;
  font-size: 16px;
  margin-top: 10px;
  padding-right: 40px;
}
.reser_img1 {
  width: 20px;
  height: 22px;
  position: absolute;
  top: 17px;
  left: 284px;
}
.reset_text4 {
  width: 320px;
  height: 40px;
  border-radius: 3px;
  background-color: #599af7;
  margin-top: 20px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  font-size: 16px
}
.reset_text4:hover {
  background-color: #3a7fe3;
}
.reset_text4:active {
  background-color: #599af7;
}
.reset_img2 {
  background-image: url(../assets/qipao2.png);
  width: 98px;
  height: 26px;
  position: absolute;
  top: 10px;
  left: 320px;
  padding-left: 20px;
  color: #fff;
  font-size: 14px;
}
.reset_img3 {
  width: 112px;
  height: 40px;
  background-color: #599af7;
  line-height: 40px;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  font-size: 16px
}
.reset_img3:hover{
  background-color: #3a7fe3
}
.reset_img4 {
  width: 112px;
  height: 40px;
  background-color: #cccccc;
  line-height: 40px;
  color: #666666;
  border-radius: 3px;
  text-align: center;
}
.reset_content1 {
  display: flex;
  position: relative;
}
.reset_input2 {
  width: 200px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  margin-right: 8px;
  padding-left: 15px;
  font-size: 16px;
}
.reset_password1 {
  width: 320px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  margin-top: 25px;
  padding-left: 15px;
  font-size: 16px;
  padding-right: 40px;
}
.reset_password2 {
  width: 320px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  margin-top: 25px;
  padding-left: 15px;
  font-size: 16px;
  padding-right: 40px;
}
.reset_xiugai {
  width: 320px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  margin-top: 25px;
  text-align: center;
  line-height: 40px;
  background-color: #599df7;
  color: #fff;
  cursor: pointer;
  user-select: none;
  font-size: 16px
}
.reset_xiugai:hover{
  background-color: #3a7fe3
}
.reset_content1_img1 {
  background-image: url(../assets/pwd.png);
  width: 20px;
  height: 20px;
  background-size: 100% 100%;
  position: absolute;
  left: 285px;
  top: 35px;
}
</style>