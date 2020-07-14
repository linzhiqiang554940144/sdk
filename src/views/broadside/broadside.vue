<template>
  <div class="broadside">
    <div class="broadside_header">
      <div class="broadside_one">
        <div class="broadside_img1"></div>
        <div class="broadside_text1" @click="shouye">首页</div>
        <div @click="games" v-if="game" class="broadside_text2">游戏中心</div>
        <div @click="controls" v-if="control" class="broadside_text2">控制中心</div>
        <div>
          <div class="broadside_Gameimg" v-if="game">
            <img class="broadside_Gameimg_img" :src="Gameimg" alt />
            <span class="broadside_Gameimg_span">{{GameName}}</span>
          </div>
          <div class="broadside_Gameimg_hide" v-if="hide">
            <div class="broadside_Gameimg_hide1">
              <input type="text" placeholder="请输入关键字" class="broadside_Gameimg_hide1_input" />
              <img class="broadside_Gameimg_hide1_img" src="../../assets/search.png" alt />
            </div>
            <div class="broadside_Gameimg_hide2">
              <div
                v-for="(item,index) in GameList"
                :key="index"
                class="broadside_Gameimg_hide2_hide"
                @click="hideGame(item)"
              >{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-right: 10px;width:100px" class="broadside_twos">
        <div class="broadside_two">
          <div class="broadside_img2"></div>
          <div class="broadside_text3">{{name}}</div>
        </div>
        <div class="broadside_three">
          <div class="broadside_three_text" @click="xinxi">
            <img src="../../assets/header.png" alt="">
            信息完善</div>
          <div class="broadside_three_text" @click="tuichu"><img src="../../assets/quit.png" alt="">退出系统</div>
        </div>
      </div>
    </div>
    <div class="broadside_left">
      <div :class="cone?'broadside_left_one':'broadside_left_one1'">
        <div class="broadside_left_ones" @click="caidan">
          <div class="broadside_img3"></div>
        </div>
        <div
          :class="active == index?'broadside_left_onesss': 'broadside_left_oness'"
          v-for="(item,index) in datas"
          :key="index"
          @click="click1(index)"
        >
          <img class="broadside_left_oness_img1" :src="active == index?item.img2:item.img1" alt />
          <div v-if="cone" class="broadside_left_oness_text1">{{item.msg}}</div>
        </div>
      </div>
      <div :class="ce?'broadside_one_one':'broadside_one_ones'">
        <div :class="ce?'broadside_left_two':'broadside_left_twos'" v-if="ce">
          <div>
            <div class="broadside_left_two1">{{data1.msg}}</div>
            <div class="broadside_line"></div>
            <div
              v-for="(items,i) in data1.msg1"
              :key="i"
              :class="index==i?'broadside_left_two12':'broadside_left_two11'"
            >
              <div class="broadside_fours" @click="click2(items)">
                <img
                  :class="index==i?'broadside_imgT':'broadside_imgB' "
                  src="../../assets/xiala.png"
                  alt
                  v-if="items.msg3?true:false"
                />
                {{items.msg2}}
              </div>
              <div
                @click="click3(ittt)"
                :class="index3==indexs?'broadside_four1':'broadside_four2'"
                v-show="index==i"
                v-for="(ittt,indexs) in items.msg3"
                :key="indexs"
              >{{ittt.msg4}}</div>
            </div>
          </div>
        </div>
        <div :class="ce?'broadside_ces':'broadside_ce'" @click="cebian"></div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../../bus.js";
export default {
  data() {
    return {
      Gameimg: "",
      GameList: [
      ],
      GameName: "",
      hide: false,
      xxxxx: false,
      broadsidefours: false,
      index: 0,
      index3: -1,
      active: -1,
      datas: [],
      data: [
        {
          msg: "游戏中心",
          ww: true,
          rt: "gameManage",
          img1: require("../../assets/gamex.png"),
          img2: require("../../assets/gamew.png"),
          msg1: [
            {
              index: 0,
              msg2: "游戏管理",
              rt: "gameManage"
            },
            {
              index: 1,
              msg2: "游戏总览",
              rt: "Gamepandect"
            },
            {
              index: 2,
              msg2: "渠道总览",
              rt: "Ditchpandect"
            },
            {
              index: 3,
              msg2: "全局查询",
              rt: "Globalquery"
            }
          ]
        },
        {
          msg: "账号中心",
          ww: true,
          rt: "Detailmsg",
          img1: require("../../assets/zw.png"),
          img2: require("../../assets/zx.png"),
          msg1: [
            {
              index: 0,
              msg2: "详细信息",
              rt: "Detailmsg"
            },
            {
              index: 1,
              msg2: "权限管理",
              msg3: [
                {
                  index: 0,
                  msg4: "管理分组",
                  rt: "Managementgroup"
                },
                {
                  index: 1,
                  msg4: "管理员",
                  rt: "Administrator"
                }
              ]
            },
            {
              index: 2,
              msg2: "日志",
              msg3: [
                {
                  index: 0,
                  msg4: "系统日志",
                  rt: "systemlog"
                },
                {
                  index: 1,
                  msg4: "个人日志",
                  rt: "Personaldiary"
                }
              ]
            }
          ]
        }
      ],
      data2: [
        {
          msg: "SDK参数配置",
          ww: true,
          rt: "Gameparameter",
          img1: require("../../assets/sdkw.png"),
          img2: require("../../assets/sdkx.png"),
          msg1: [
            {
              index: 0,
              msg2: "游戏参数配置",
              rt: "Gameparameter"
            },
            {
              index: 1,
              msg2: "渠道参数配置",
              rt: "Ditchparameter"
            },
              {
              index: 2,
              msg2: "渠道参数回调",
              rt: "Ditchparameters"
            },
            {
              index: 3,
              msg2: "登陆支付封禁",
              rt: "paybanned"
            },
            {
              index: 4,
              msg2: "母包测试账号",
              rt: "textaccount"
            }
          ]
        },
        // 账号
        {
          msg: "游戏运营数据",
          ww: true,
          rt: "Gamecase",
          img1: require("../../assets/ww.png"),
          img2: require("../../assets/xx.png"),
          msg1: [
            {
              index: 0,
              msg2: "游戏概况",
              rt: "Gamecase"
            },
            {
              index: 1,
              msg2: "账号角色",
              msg3: [
                {
                  index: 0,
                  msg4: "账号明细",
                  rt: "accountdetail"
                },
                {
                  index: 1,
                  msg4: "角色明细",
                  rt: "roledetail"
                }
              ]
            },
            {
              index: 2,
              msg2: "订单明细",
              rt: "orderdetail"
            },
            {
              index: 3,
              msg2: "基础报表",
              msg3: [
                {
                  index: 0,
                  msg4: "单日报表",
                  rt: "Dailyreport"
                },
                {
                  index: 1,
                  msg4: "单日报表(时)",
                  rt: "Dailyreports"
                },
                {
                  index: 2,
                  msg4: "渠道报表",
                  rt: "Channelreport"
                },
                {
                  index: 3,
                  msg4: "订单成功率",
                  rt: "successrate"
                },
                {
                  index: 4,
                  msg4: "留存报表",
                  rt: "keepreport"
                },
                {
                  index: 5,
                  msg4: "LTV报表",
                  rt: "LTVreport"
                }
              ]
            },
            {
              index: 4,
              msg2: "转化数据",
              msg3: [
                {
                  index: 0,
                  msg4: "节点转化",
                  rt: "nodechange"
                },
                {
                  index: 1,
                  msg4: "事件转化",
                  rt: "eventchange"
                }
              ]
            },
            {
              index: 5,
              msg2: "账号角色",
              msg3: [
                {
                  index: 0,
                  msg4: "区服数据",
                  rt: "districtData"
                }
              ]
            }
          ]
        }
      ],

      name: "叶孤城",
      game: false,
      control: true,
      cone: false,
      data1: [],
      ce: true,
      ack: false,
      numbersX: 0,
      textToTranslate: ""
    };
  },
  props: ["requiresAuth"],
  methods: {
    shouye: function() {
      this.$router.push({
        name: "shouye"
      });
      sessionStorage.setItem("SDKstatus", JSON.stringify(true));
    },
    xinxi: function() {
      localStorage.setItem("SDKbroadside", JSON.stringify(1));
      this.active = 1;
      this.index = 0;
      this.data1 = this.datas[1];
      this.$router.push({
        name: "Detailmsg"
      });
    },

    tuichu: function() {
      localStorage.removeItem("SDKtoken");
      localStorage.removeItem("SDKbroadside");
      localStorage.removeItem("SDKGame");
      localStorage.removeItem("SDKbroadsidetwo");
      this.$router.push({
        name: "shouye"
      });
    },

    hideGame: function(val) {
      this.GameName = val.name;
      this.Gameimg = val.img;
      localStorage.setItem("SDKGame", JSON.stringify(val));
      this.$emit("formSubmit", this.textToTranslate);
    },
    qingchu: function() {
      this.cone = false;
      this.ce = true;
      bus.$emit("txt", this.cone);
      bus.$emit("txt1", this.ce);
    },
    cebian: function() {
      this.ce = !this.ce;
    },
    click1: function(index) {
      this.data1 = this.datas[index];
      localStorage.setItem("SDKbroadside", JSON.stringify(index));
      localStorage.setItem("SDKbroadsidetwo", JSON.stringify(0));
      this.$router.push({
        name: this.datas[index].rt
      }).catch(err=>{
        
      });;

      (this.ce = true), (this.active = index);
      this.index = 0;
    },
    click2: function(index) {
      this.index3 = -1;
      this.index = index.index;
      localStorage.setItem("SDKbroadsidetwo", JSON.stringify(index.index));
      if (index.msg3) {
        return;
      }
      this.$router.push({
        name: index.rt
      }).catch(err=>{
        
      });;
    },
    click3: function(index) {
      this.index3 = index.index;
      this.$router.push({
        name: index.rt
      }).catch(err=>{
        
      });;
    },
    caidan: function() {
      this.cone = !this.cone;
    },
   
    games: function() {
      localStorage.setItem("SDKbroadside", JSON.stringify(0));
      localStorage.setItem("SDKbroadsidetwo", JSON.stringify(0));
      this.game = false;
      this.control = true;
      this.datas = this.data;
      this.active = 0;
      this.index = 0;
      this.numbersX = 0;
      this.$router.push({
        name: "gameManage"
      });
    },
    controls: function() {
      this.numbersX = 0;
      localStorage.setItem("SDKbroadside", JSON.stringify(0));
      localStorage.setItem("SDKbroadsidetwo", JSON.stringify(0));
      this.game = true;
      this.control = false;
      this.datas = this.data2;
      this.active = 0;
      this.index = 0;
      this.$router.push({
        name: "Gameparameter"
      });
    },
    // 全部游戏
    Game: function() {
      this.$get("/api/v1/game").then(res => {
          if(res.code==200 && res.data.data.total>0){
            this.GameList = res.data.data.data;
              if (!localStorage.getItem("SDKGame")) {
              localStorage.setItem(
                "SDKGame",
                JSON.stringify(res.data.data.data[0])
              );
               this.GameName = this.GameList[0].name;
                this.Gameimg = this.GameList[0].img;
            } else {
              this.GameName = JSON.parse(localStorage.getItem("SDKGame")).name;
              this.Gameimg = JSON.parse(localStorage.getItem("SDKGame")).img;
                }
          }
          else{
              console.log("1561")
             this.$Message.warning(res.message);
          }
      });
    }
  },
  mounted() {
    this.Game();
    document.addEventListener("click", e => {
      if (e.target.className == "broadside_Gameimg") {
        this.hide = !this.hide;
      } else if (e.target.className == "broadside_Gameimg_img") {
        this.hide = !this.hide;
      } else if (e.target.className == "broadside_Gameimg_span") {
        this.hide = !this.hide;
      } else if (e.target.className == "broadside_Gameimg_hide1_input" ||e.target.className == "broadside_Gameimg_hide1_img" || e.target.className == "broadside_Gameimg_hide" || e.target.className == "broadside_Gameimg_hide2"  ) {
          console.log(54165)
        this.hide = true;
      } else {
        this.hide = false;
      }
    });
    if (this.requiresAuth) {
      this.game = false;
      this.control = true;
    } else {
      this.game = true;
      this.control = false;
    }

    console.log(this.requiresAuth, "路由");
    window.addEventListener("popstate", this.qingchu, false);
    if (this.game) {
      this.datas = this.data2;
      
    } else {
      this.datas = this.data;
    }
    if (localStorage.getItem("SDKbroadside")) {
      this.numbersX = JSON.parse(localStorage.getItem("SDKbroadside"));
      this.active = JSON.parse(localStorage.getItem("SDKbroadside"));
    }
    if (localStorage.getItem("SDKbroadsidetwo")) {
      this.index = JSON.parse(localStorage.getItem("SDKbroadsidetwo"));
    }
    this.data1 = this.data[this.numbersX];
  },
  created() {},
  watch: {
    cone: function() {
      bus.$emit("txt", this.cone);
    },
    ce: function() {
      bus.$emit("txt1", this.ce);
    },
    game: function() {
      if (this.game) {
        this.datas = this.data2;
        this.data1 = this.datas[this.numbersX];
      } else {
        this.datas = this.data;
        this.data1 = this.datas[this.numbersX];
      }
    },
    control: function() {
      if (this.control) {
        this.datas = this.data;
        this.data1 = this.datas[this.numbersX];
      } else {
        this.datas = this.data2;
        this.data1 = this.datas[this.numbersX];
      }
    },
    requiresAuth: function() {
      if (this.requiresAuth) {
        this.game = false;
        this.control = true;
        console.log(this.requiresAuth, "12");
      } else {
        this.Game();
        this.game = true;
        this.control = false;
      }
    }
  }
};
</script>
<style lang="less">
.hfabkfj {
  width: 50px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
}
.hfabkfj:hover {
  margin-left: 10px;
  text-overflow: inherit;
  overflow: inherit;
}
.broadside {
  height: 50px;
  margin: 0 auto;
}
.broadside_header {
  width: 100%;
  height: 50px;
  background-color: #282337;
  display: flex;
  justify-content: space-between;
}
.broadside_one {
  display: flex;
  line-height: 50px;
  align-items: center;
}
.broadside_img1 {
  background-image: url(../../assets/logo3.png);
  width: 47px;
  height: 32px;
  background-size: 100% 100%;
  margin-right: 27px;
}
.broadside_text1 {
  font-size: 14px;
  color: #cccccc;
  margin-right: 34px;
  cursor: pointer;
}
.broadside_text1:hover {
  color: #599ae7;
}
.broadside_text2 {
  font-size: 14px;
  color: #cccccc;
  margin-right: 15px;
  cursor: pointer;
  user-select: none;
}
.broadside_text2:hover {
  color: #599ae7;
}
.broadside_two {
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
}
.broadside_img2 {
  width: 21px;
  height: 25px;
  background-size: 100% 100%;
  background-image: url(../../assets/account.png);
  cursor: pointer;
}
.broadside_text3 {
  font-size: 14px;
  color: #cccccc;
  // margin-right: 30px;
  margin-left: 4px;
  cursor: pointer;
}
.broadside_left {
  height: calc(100vh - 50px);
  display: flex;
}
.broadside_left_one {
  width: 150px;
  background-color: #282337;
  transition: all 0.2s;
}
.broadside_left_two {
  width: 160px;
  background-color: #ebebeb;
  overflow: hidden;
  user-select: none;
}
.broadside_left_ones {
  display: flex;
  justify-content: center;
  height: 36px;
  align-items: center;
  background-color: #4e5569;
  cursor: pointer;
}
.broadside_img3 {
  background-image: url(../../assets/cd.png);
  height: 14px;
  width: 18px;
  background-size: 100% 100%;
}
.broadside_left_oness {
  display: flex;
  height: 50px;
  align-items: center;
  cursor: pointer;
  opacity: 0.6;
}
.broadside_left_onesss {
  display: flex;
  height: 50px;
  align-items: center;
  cursor: pointer;
}
.broadside_left_oness_img1 {
  width: 22px;
  height: 22px;
  margin-right: 14px;
  margin-left: 14px;
  cursor: pointer;
}
.broadside_left_oness div {
  font-size: 14px;
  color: #cccccc;
  cursor: pointer;
}
.broadside_left_onesss .broadside_left_oness_text1 {
  color: #599ae7;
}
.broadside_left_oness:hover {
  opacity: 1;
}
.broadside_left_one1 {
  width: 50px;
  overflow: hidden;
  background-color: #282337;
  transition: all 0.3s;
}
.broadside_left_two1 {
  height: 36px;
  font-size: 16px;
  color: #a0a6b1;
  line-height: 36px;
  font-weight: bold;
  border-bottom: 1px solid #cccccc;
}
.broadside_line {
  height: 1px;
  background-color: #ffffff;
}
.broadside_left_two11 {
  color: #282c37;
  font-size: 14px;
  text-align: left;
  // padding-left: 48px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  border-bottom: 1px solid #cccccc;
}
.broadside_left_two12 {
  color: #282c37;
  font-size: 14px;
  text-align: left;
  // padding-left: 48px;
  // height: 36px;
  line-height: 36px;
  cursor: pointer;
  border-bottom: 1px solid #cccccc;
  background-color: #d7d7d7;
}
.broadside_left_two11:hover {
  background-color: #d7d7d7;
}
.broadside_ce {
  width: 13px;
  height: 127px;
  //   background-color: red;
  position: absolute;
  top: calc(50vh - 64px);
  background-image: url(../../assets/zkrx.png);
  background-size: 100% 100%;
  cursor: pointer;
}
.broadside_ce:hover {
  background-image: url(../../assets/zkr.png);
}
.broadside_ces:hover {
  background-image: url(../../assets/zkl.png);
}
.broadside_ces {
  width: 13px;
  height: 127px;
  background-image: url(../../assets/zklx.png);
  cursor: pointer;

  background-size: 100% 100%;
  position: absolute;
  left: 147px;
  top: calc(50vh - 114px);
}
.broadside_one_one {
  width: 160px;
  display: flex;
  position: relative;
  //   transition: all 0.3s
}
.broadside_one_ones {
  width: 0px;
  overflow: hidden;
  //   transition: all 0.3s
}
.broadside_left_twos {
  width: 0;
  overflow: hidden;
}
.broadside_four1 {
  background-color: #f5f5f5;
  padding-left: 66px;
  color: #599ae7;
}
.broadside_four2 {
  padding-left: 66px;
  background-color: #ebebeb;
}
.broadside_fours {
  // padding-left: 48px;
  text-align: center;
  position: relative;
}
.broadside_imgB {
  width: 5px;
  height: 11px;
  position: absolute;
  left: 10px;
  top: 12px;
  transition: all 0.3s;
}
.broadside_imgT {
  width: 5px;
  height: 11px;
  position: absolute;
  left: 10px;
  top: 12px;
  transform: rotate(90deg);
  transition: all 0.3s;
}
.broadside_Gameimg {
  display: flex;
  align-items: center;
  background-color: #343741;
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;
  cursor: pointer;
  z-index: 10;
  width: 128px;
  height: 50px;
}
.broadside_Gameimg_img {
  width: 28px;
  height: 28px;
  background-size: 100% 100%;
  margin-right: 10px;
}
.broadside_Gameimg_hide {
  width: 250px;
  height: 180px;
  background-color: #343741;
  position: absolute;
  z-index: 100;
}
.broadside_Gameimg_hide1 {
  height: 26px;
  line-height: 26px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.broadside_Gameimg_hide1_input {
  width: 230px;
  height: 26px;
  border-radius: 15px;
  padding-left: 15px;
  background-color: #595d6a;
  border: none;
  color: #999;
}
.broadside_Gameimg_hide1_img {
  width: 12px;
  height: 12px;
  background-size: 100% 100%;
  position: absolute;
  right: 25px;
}
.broadside_Gameimg_hide2 {
  height: 100px;
  overflow: auto;
  font-size: 12px;
  color: #cccccc;
  margin-top: 15px;
  text-align: left;
  padding-left: 20px;
}
.broadside_Gameimg_hide2_hide {
  height: 25px;
  line-height: 25px;
}
.broadside_Gameimg_hide1_input:focus {
  border: none !important;
}
.broadside_Gameimg_hide2::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
.broadside_Gameimg_hide2::-webkit-scrollbar-thumb {
  /*滚动条里面小方块样式*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  background: #595d6a !important;
}
.broadside_Gameimg_hide2::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.broadside_three {
  height: 100px;
  background-color: #343741;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  display: none;
  position: absolute;
  width: 100px;
}
.broadside_three_text {
  height: 50px;
  line-height: 50px;
  display: flex;
justify-content: center;
align-items: center;

}
.broadside_three_text:hover{
  opacity: 0.5;
}
.broadside_three_text img{
    width: 13px;
    height: 13px;
    margin-right: 5px
}
.broadside_twos:hover .broadside_three {

  display: block;
}
.broadside_Gameimg_span {
  width: 100px;
  /*设置文本框大小*/
  white-space: nowrap;
  /*设置内容不换行*/
  text-overflow: ellipsis;
  /*设置文字超出文本框的内容显示成...*/
  overflow: hidden;
}
.broadside_four2:hover {
  background-color: #f5f5f5;
  padding-left: 66px;
  color: #599ae7;
  animation: marquee 5s linear infinite;
}
.broadside_Gameimg_hide2_hide:hover {
  color: #599ae7;
  cursor: pointer;
}
</style>