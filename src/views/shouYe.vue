<template>
  <div class="shouye">
    <div class="shouye_img1">
      <div class="shouye_header_opc">
        <div class="shouye_header">
            <div class="shouye_header_one">
                <div class="shouye_logo"> </div>
                <div @click="login" class="shouye_header_text" style="color:#1b92d7">首页</div>
                <div  @click="login" class="shouye_header_text">开发文档</div>
                <div  @click="login" class="shouye_header_text">资源下载</div>
                <div  @click="login" class="shouye_header_text">管理中心</div>
            </div>
            <div class="shouye_header_two" v-if="!info">
                <div  @click="login">登陆</div>
                <div @click="enroll">注册</div>
            </div>
              <div v-if="info" class="shouye_header_two"> {{name}} </div>
        </div>
      </div>
    </div>
    <div class="shouye_bottom">
          <div>
            <div>
            杭州祈点信息技术有限责任公司
          </div>
          <div @click="gongshang" class="zhengfu">
            浙ICP备17019080号
          </div>
          <div>
            地址：浙江省杭州市富阳区银湖街道富闲路9号银湖创业中心6号17层1707室
          </div>
          <div class="shouyes_bottom">
            <img src="../assets/wenhuaju.png" alt="">
            <img src="../assets/police.png" alt="">
            <img src="../assets/xinxi.png" alt="">
          </div>
          </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        info:false,
        name:""
    }
  },
    methods: {
      gongshang:function(){
           window.open("http://beian.miit.gov.cn/");
      },
        login:function(){
            this.$router.push({
                name:"login",
            })
        },
        enroll:function(){
            this.$router.push({
                name:"enroll"
            })
        },
        
    },
};
</script>
<style lang="less">
.shouye {
  background-color: #000c11;
  height: 100%;
  width: 100%;
  display: block ;
  overflow: hidden;
  margin: 0;
  padding: 0
}
.shouye_img1 {
  background-image: url(../assets/shouye.jpg);
  width: 1920px;
  height: 800px;
  min-width: 1920px;
  background-size: 100% 100%;
  margin: 0 auto
}
.shouye_header_opc {
  width: 1920px;
  height: 60px;
  background-color: rgba(#282c37, 0.4);
}
.shouye_header {
  width: 1160px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.shouye_header_one{
    display: flex;
    line-height: 60px;
    align-items: center
}
.shouye_logo{
    background-image: url(../assets/logo.png);
    height: 32px;
    width: 119px;
    background-size: 100% 100%;
    margin-right: 60px;
}
.shouye_header_text{
    font-size: 14px;
    color: #ffffff;
    margin-left: 32px;
    cursor: pointer;
    user-select: none;
}
.shouye_header_text:hover{
    color: #1b92d7
}
.shouye_header_text:active{
    color: #ffffff
}
.shouye_header_two{
    display: flex;
    line-height: 60px;
    color: #fff;
}
.shouye_header_two div{
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
}
.shouye_header_two div:hover{
     color: #1b92d7
}
.shouye_header_two div:active{
    color: #ffffff
}
.shouye_bottom{
  background-color: #fff;
  height: 150px;
  width: 1920px;
  margin: 0 auto;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.shouyes_bottom img{
  margin-right: 10px
}
.zhengfu:hover{
  cursor: pointer;
  color: #599df7
}
</style>