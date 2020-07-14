<template>
  <div class="enroll">
    <div class="enroll_img1">
        <div class="enroll_logo" @click="shouye">

        </div>
      <div class="enroll_msg1">账号注册</div>
      <div class="enroll_accounts">
        <div v-show="qipao1" class="enroll_qipao">{{name1}}</div>
        <input class="enroll_account" maxlength="16" type="text" placeholder="账号" v-model="account" />
        <div class="enroll_image1"></div>
      </div>
      <div class="enroll_passwords">
        <div v-show="qipao2" class="enroll_qipao">{{name2}}</div>
        <input
          class="enroll_password"
          maxlength="16"
          type="password"
          v-model="password"
          placeholder="密码"
        />
        <div class="enroll_image2">

        </div>
      </div>
      <div class="enroll_phones">
        <div v-show="qipao4" class="enroll_qipaos">{{name3}}</div>
        <input type="text" v-model="phone" class="enroll_phone" maxlength="20" placeholder="手机号" />
        <div class="enroll_image3"></div>
      </div>
      <div class="enroll_codes">
        <div v-show="qipao3" class="enroll_qipaos">请输入验证码</div>
        <input type="text" v-model="code" class="enroll_code" placeholder="验证码" />
        <div class="enroll_img2" @click="codeSend" v-if="code1">发送验证码</div>
        <div class="enroll_img21" v-if="code2">{{number}}秒后重试</div>
      </div>
      <div class="enroll_enroll" @click="enroll">注册</div>
      <div class="enroll_text">
        <div>已有帐号 ? 立即</div>
        <div @click="login" style="text-decoration: underline;">登陆</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      qipao1: false,
      qipao2: false,
      qipao3: false,
      qipao4: false,
      account: "", 
      password: "", 
      code: "", 
      phone: "", 
      code1: true,
      code2: false,
      number: 60,
      name1:"",
      name2:"",
      name3:""
    };
  },
  methods: {
      shouye:function(){
            this.$router.push({
                name:"shouye"
            })
      },
    enroll: function() {
      if (!this.account ) {
        this.qipao1 = true;
        this.qipao2 = false;
        this.qipao3 = false;
        this.qipao4=false
        this.name1="请输入账号"
        return;
      }
       if (this.account.length<5) {
        this.qipao1 = true;
        this.qipao2 = false;
        this.qipao3 = false;
        this.qipao4=false
        this.name1="不能小于5位"
        return;
      }

      if (!this.password) {
        this.qipao2 = true;
        this.qipao1 = false;
        this.qipao3 = false;
        this.qipao4=false
        this.name2="请输入密码"
        return;
      }
       if (this.password.length<6) {
        this.qipao2 = true;
        this.qipao1 = false;
        this.qipao3 = false;
        this.qipao4=false
        this.name2="不能小于6位"
        return;
      }
      if(!this.phone){
          this.qipao4=true
          this.qipao2 = false;
        this.qipao3 = false;
        this.qipao1=false
        this.name3="请输入手机号"
          return
      }
       
      if (!this.code) {
        this.qipao3 = true;
        this.qipao2 = false;
        this.qipao1 = false;
        this.qipao4=false
        return;
      }
      this.qipao3 = false;
        this.qipao2 = false;
        this.qipao1 = false;
        this.qipao4=false
        this.$post("api/v1/user/register",{
          tel:this.phone,
          code:this.code,
          username:this.account,
          password:this.password
        }).then(res=>{
                if(res.code==200){
                    this.$Message.success('注册成功,来到主页面');
                  this.$router.push({
                    name:"gameManage"
                  })
                }
        })
      
    },
    login: function() {
      this.$router.push({
        name: "login"
      });
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
    codeSend: function() {
      if(!this.phone){
        this.$Message.warning('请输入手机号');
        return
      }
      this.$get("api/v1/tel/code",{
        tel:this.phone,
        type:1
      }).then(res=>{
         if(res.code==200){
            this.code1 = false;
      this.code2 = true;
      this.time();
         }else{
           this.$Message.error(res.message);
         }
      })
      
      
    }
  },
  mounted() {
      document.addEventListener("click", e => {
      if (e.target.className != "enroll_enroll") {
        this.qipao1 = false;
        this.qipao2 = false;
        this.qipao3 = false;
        this.qipao4=false
      }
    });
  },
};
</script>
<style lang="less">
.enroll {
  background-color: #000c11;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0
}
.enroll_img1 {
  width: 1920px;
  height: 900px;
  min-width: 1920px;
  min-height: 900px;
  background-image: url(../assets/banner.jpg);
  background-size: 100% 100%;
  position: relative;
}
.enroll_msg1 {
  position: absolute;
  font-size: 32px;
  color: #3399ff;
  font-weight: 600;
  right: 516px;
  top: 243px;
  user-select: none;
}
.enroll_accounts {
  position: absolute;
  right: 380px;
  top: 323px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.enroll_account {
  width: 400px;
  height: 46px;
  border: none;
  border-radius: 3px;
  padding-left: 15px;
  background-color: rgb(245, 245, 245);
}
.enroll_passwords {
  position: absolute;
  right: 380px;
  top: 394px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.enroll_phones {
  position: absolute;
  right: 380px;
  top: 464px;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.enroll_phone {
  width: 400px;
  height: 46px;
  border: none;
  border-radius: 3px;
  padding-left: 15px;
  background-color: rgb(245, 245, 245);
}
.enroll_qipao {
  background-image: url(../assets/qipao.png);
  width: 98px;
  height: 26px;
  font-size: 12px;
  color: #fff;
  line-height: 26px;
  text-align: left;
  padding-left: 7px;
  position: absolute;
  left: -98px;
}
.enroll_password {
  width: 400px;
  height: 46px;
  border: none;
  border-radius: 3px;
  padding-left: 15px;
  background-color: rgb(245, 245, 245);
}
.enroll_codes {
  position: absolute;
  right: 380px;
  top: 535px;
  font-size: 18px;
  display: flex;
}
.enroll_qipaos {
  background-image: url(../assets/qipao.png);
  width: 98px;
  height: 26px;
  font-size: 12px;
  color: #fff;
  line-height: 26px;
  text-align: left;
  padding-left: 8px;
  position: absolute;
  left: -98px;
}
.enroll_code {
  width: 230px;
  height: 46px;
  padding-left: 15px;
  border: none;
  border-radius: 3px;
  margin-right: 17px;
  background-color: rgb(245, 245, 245);
}
.enroll_img2 {
  width: 153px;
  height: 46px;
  background-color: #25a1e9;
  line-height: 46px;
  color: #fff;
  cursor: pointer;
  border-radius: 3px
}
.enroll_img21 {
  width: 153px;
  height: 46px;
  background-color: #cccccc;
  line-height: 46px;
  color: #666666;
  border-radius: 3px;
}
.enroll_enroll {
  width: 400px;
  height: 46px;
  border-radius: 3px;
  position: absolute;
  right: 380px;
  top: 606px;
  background-color: #25a1e9;
  color: #fff;
  line-height: 46px;
  font-size: 18px;
  cursor: pointer;
  user-select: none;
}
.enroll_enroll:hover {
  background-color: #157db9;
}
.enroll_enroll:active {
  background-color: #25a1e9;
}
.enroll_text {
  display: flex;
  position: absolute;
  color: #fff;
  right: 505px;
  top: 661px;
  font-size: 15px;
}
.enroll_text div:nth-child(2) {
  color: #157db9;
  cursor: pointer;
}
.enroll_logo{
  background-image: url(../assets/logo1.png);
  width: 379px;
  height: 87px;
  background-size: 100% 100%;
  position: absolute;
  right: 400px;
  top: 155px;
  cursor: pointer;
}
.enroll_image1{
  width: 25px;
  height: 27px;
  background-image: url(../assets/account.png);
  background-size: 100% 100%;
  position: absolute;
  left: 358px;
}
.enroll_image2{
  width: 25px;
  height: 27px;
  background-image: url(../assets/pwd.png);
  background-size: 100% 100%;
  position: absolute;
  left: 358px;
}
.enroll_image3{
   width: 21px;
  height: 29px;
  background-image: url(../assets/phone.png);
  background-size: 100% 100%;
  position: absolute;
  left: 360px;
}
</style>