<template>
  <div>
    <div class="paybanned_header">游戏中心>SDK聚合工具>游戏参数配置</div>
    <div class="content-box">
        <div class="titles1">
          <span>游戏参数</span>
        </div>
        <div class="content">
            <Button type="primary" class="btn" style="margin-bottom: 10px;" @click="on_Edit(1)">修改</Button>
            <div class="text">
              <span class="span1">ProductCode</span>
              <span class="span2" id="ProductCode">{{gameData.product_code}}</span>
              <span class="copy" v-clipboard:copy="gameData.product_code" v-clipboard:success="copy">复制</span>
            </div>
            <div class="text">
              <span class="span1">ProductKey</span>
              <span class="span2">{{gameData.product_key}}</span>
              <span class="copy" v-clipboard:copy="gameData.product_key" v-clipboard:success="copy">复制</span>
            </div>
            <div class="text">
              <span class="span1">Callback_Key</span>
              <span class="span2">{{gameData.callback_key}}</span>
              <span class="copy" v-clipboard:copy="gameData.callback_key" v-clipboard:success="copy">复制</span>
            </div>
            <div class="text">
              <span class="span1">Md5_Key</span>
              <span class="span2">{{gameData.md5_key}}</span>
              <span class="copy" v-clipboard:copy="gameData.md5_key" v-clipboard:success="copy">复制</span>
            </div>
            <div class="text">
              <span class="span1">游戏平台</span>
              <span class="span2">{{gameData.platform == 1 ? '手机游戏' : 'H5游戏'}}</span>
            </div>
            <div class="text">
              <span class="span1">发行地区</span>
              <span class="span2">{{gameData.area == 1 ? '国内' : '海外'}}</span>
            </div>
            <div class="text">
              <span class="span1">游戏名称</span>
              <span v-if="!editBtn" class="span2">{{SDKGame.name}}</span>
              <Input v-if="editBtn" v-model="editData.name"  style="width: 440px;height:30px;" />
            </div>
            <div class="text">
              <span class="span1">游戏类型</span>
              <span v-if="!editBtn" class="span2">{{SDKGame.type_name}}</span>
              <Select v-if="editBtn" v-model="editData.type" style="width:220px;height:30px;">
                <Option v-for="item in gameList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="text">
              <span class="span1">Callback_Url</span>
              <span v-if="!editBtn" class="span2">{{gameData.call_url}}</span>
              <span v-if="(editBtn == true || gameData.call_url == '') ? false : true" class="copy" v-clipboard:copy="gameData.call_url" v-clipboard:success="copy">复制</span>
              <Input v-if="editBtn" v-model="editData.call_back"  style="width: 440px;height:30px;" />
            </div>
            <div class="text">
              <!-- <span class="span1">游戏Icon</span> -->
              <!-- <img src="../assets/qipao.png" alt=""> -->
              <div class="guanli_model1">
                <label for="">游戏Icon</label>
                <input type="file" class="guanli_file">
                <div class="guanli_files">

                </div>
              </div>
            </div>
            <div class="text" v-if="editBtn">
              <Button type="primary" class="xiugai" @click="on_Edit(2)">修改</Button>
              <Button class="fanhui" @click="on_Back">返回</Button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gameList: [],
      editBtn: false,
      SDKGame: "",
      editData: {
        name:'',
        platform:'',
        area:'',
        type: null,
        call_back: ""
      },
      gameData: {},
    };
  },
  created() {
    let type
    if(localStorage.getItem("SDKGame")){
      this.SDKGame = JSON.parse(localStorage.getItem("SDKGame"));
    type = this.SDKGame.type_name
    this.editData.name = this.SDKGame.name
     this.$get("/api/v1/gametype").then(res => {
      this.gameList = res.data.data;
      this.editData.type = this.gameList.filter((item,index)=>{
        if(item.name == type){
          return item.id
        }
      })
      this.editData.type = this.editData.type.shift().id
      console.log(this.editData.type,'this.editData.type')
    });
    }
    this.initData();
  },
  methods: {
    initData() {
        if(localStorage.getItem("SDKGame")){
            this.$get("/api/v1/game/" + this.SDKGame.id + "").then(res => {
        this.gameData = res.data.data;
        this.editData.call_back = this.gameData.call_url
        this.editData.platform = this.gameData.platform
        this.editData.area = this.gameData.area
      });
        }
      
    },
    Game:function(){
      this.$get("/api/v1/game").then(res=>{
        let arr = res.data.data.data.filter((item,index)=>{
          if(this.SDKGame.id == item.id){
            return item
          }
        })
        localStorage.setItem("SDKGame",JSON.stringify(arr[0]))
        this.SDKGame = JSON.parse(localStorage.getItem("SDKGame"));
      })
    },
    on_Edit(val) {
      if (val == 1) {
        this.editBtn = true;
      } else if (val == 2) {
     
        this.$put("/api/v1/game/" + this.SDKGame.id + "",this.editData).then(res => {
          if (res.code == 200) {
            this.Game();
            this.on_Back();
            this.initData();
            this.$Message.success(res.message);
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    },
    on_Back() {
      this.editBtn = false;
    },
    copy({ value, event }) {
      this.$Message.success("已复制");
    }
  },
  mounted() {},
  props: ["GameAuth"],
  watch: {
    GameAuth: function() {
      let type
      this.SDKGame = JSON.parse(localStorage.getItem("SDKGame"));
      type = this.SDKGame.type_name
      this.editData.name = this.SDKGame.name
      this.$get("/api/v1/gametype").then(res => {
        this.gameList = res.data.data;
        this.editData.type = this.gameList.filter((item,index)=>{
          if(item.name == type){
            return item.id
          }
        })
        this.editData.type = this.editData.type.shift().id
        console.log(this.editData.type,'this.editData.type')
      });
      this.initData();
    }
  },
};
</script>
<style lang="less" scoped>
.content-box {
  padding-left: 15px;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  padding-right: 15px;
}
.content {
  text-align: left;
}
.paybanned_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.titles1 {
  height: 45px;
  line-height: 44px;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 14px;
  text-align: left;
  span {
    font-size: 16px;
    font-weight: bold;
  }
}
.text {
  margin-bottom: 32px;
  font-size: 14px;
  .span1 {
    margin-right: 30px;
    text-align: right;
    display: inline-block;
    width: 87px;
  }
  .span2 {
    text-align: left;
  }
  .copy {
    display: inline-block;
    width: 50px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    margin-left: 10px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #cccccc;
  }
  .copy:hover {
    opacity:0.7;
  }
}
.xiugai,
.fanhui {
  width: 100px;
  height: 30px;
}
.xiugai {
  margin-left: 120px;
  margin-right: 34px;
}

.guanli_model1 {
  display: flex;
  margin-left: -11px;
  margin-bottom: 30px;
  line-height: 30px;
  position: relative;
}
.guanli_model1 label {
  width: 96px;
  margin-right: 15px;
  text-align: right;
  line-height: 30px;
  margin-bottom: 115px;
}
.guanli_model1_input1 {
  width: 420px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #999999;
  padding-left: 15px;
}
.guanli_file {
  width: 146px;
  height: 146px;
  opacity: 0;
  z-index: 1;
  margin-left: 30px;
  cursor: pointer;
}
.guanli_files {
  width: 146px;
  height: 146px;
  position: absolute;
  left: 130px;
  background-image: url(../../assets/file1.png);
  background-size: 100% 100%;
  cursor: pointer;
}
</style>