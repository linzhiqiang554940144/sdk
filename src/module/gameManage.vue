<template>
  <div>
    <div class="guanli_header">控制中心>游戏中心>游戏管理</div>
    <div class="guanli_main">
     
      <h2 class="guanli_main1">全部游戏</h2>
      <div style="display:flex;justify-content: space-between">
        <div class="guanli_main2">
          <div class="guanli_mains_one" @click="found">
            <Icon type="md-add" />
            <div class="guanli_mains_one1" >创建游戏</div>
          </div>
          <div class="guanli_main22">
            <Select v-model="model1" style="width:160px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
          </div>
          <div class="guanli_main22">
            <Select v-model="model11" style="width:160px">
              <Option
                v-for="item in leiList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
          </div>
          <div class="guanli_main223">
            <img @click="searchname" class="guanli_img1" src="../assets/search.png" alt />
            <input class="guanli_input1" type="text" v-model="value" />
          </div>
        </div>

        <div class="guanli_waste">
          <div class="guanli_waste1">导出数据</div>
          <div class="guanli_waste2" @click="recycle">回收站</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="guanli_table">
          <div class="guanli_table1">
              <div class="guanli_td21">游戏名称</div>
              <div class="guanli_td21">游戏类型</div>
              <div class="guanli_td21">PFAFAGUKHIUHIHAF</div>
              <div class="guanli_td21">操作</div>
          </div>
          <div>
              <div class="guanli_td2" v-for="(item,index) in msgList" :key="index">
                        <div class="guanli_td1">{{item.name}}</div>
                        <div class="guanli_td1">{{item.type_name}}</div>
                        <div class="guanli_td1">{{item.product_code}}</div>
                        <div class="guanli_td1">
                            <div class="guanli_xinxi1" @click="basic(item)">游戏信息</div><div class="guanli_shanchu1" @click="deletes(item)">删除</div>
                        </div>
              </div>
          </div>
      </div>
    </div>
    <!-- 弹框 -->
    <Modal
        width="860px"
        height="578px"
        v-model="modal12"
        title="创建游戏"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="guanli_model1">
            <label for="">游戏名称</label>
            <input type="text" class="guanli_model1_input1" v-model="name">
        </div>
        <div class="guanli_model1">
            <label for="">游戏类型</label>
                 <Select v-model="model123" style="width:160px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
        </div>
        <div class="guanli_model1">
            <label for="">游戏平台</label>
            <input type="radio" checked>
            <span>安卓</span>
        </div>
        <div class="guanli_model1">
              <label for="">发行地区</label>
            <input type="radio" checked>
            <span>国内</span>
        </div>
        <div class="guanli_model1">
            <label for="">Callback_Url</label>
            <input type="text" class="guanli_model1_input1" v-model="call_back">
            <span class="guanli_err">游戏接收到账通知的URL，融合SDK在渠道充值后会向URL发送同步请求</span>
        </div>
        <div class="guanli_model1">
            <label for="">游戏Icon</label>
            <input type="file" class="guanli_file">
            <div class="guanli_files">

            </div>
        </div>
    </Modal>
  </div>
</template>
<script>
import bus from "../bus.js";
export default {
  data() {
    return {
      id:"",
      value:"",
      call_back:"",
      name:"",
      model1: 0,
      model11:1,
      model123:0,
      modal12:false,
      msgList:[],

      cityList: [
      ],
      leiList:[
          {
              id:1,
              name:"游戏名称"
          },
          {
              id:2,
              name:"Produceid"
          },
      ]
    };
  },
  methods: {
    deletes:function(val){
          this.id=val.id
          this.$delete("/api/v1/game/"+this.id ).then(res=>{
                this.game()
          })
    },
    searchname:function(){
        this.game()
    },
    game:function(){
        this.$get("/api/v1/game",{
          page:1,
          pagesize:10,
          type:this.model1,
          type_option:this.model11,
          value:this.value
        }).then(res=>{
                if(res.code==200){
                  this.msgList=res.data.data.data
                }
        })
    },
    recycle:function(){
        this.$router.push({
          name:"recycle"
        })
    },
    basic:function(item){
        localStorage.setItem(
                "SDKGame",
                JSON.stringify(item)
              );
        this.$router.push({
          name:"basic",
             query: {
            id: item.id,
            name:item.name,
            type:item.type_name
            }
        })
    },
    ok:function(){
          if(!this.name){
            this.$Message.warning("用户名不能为空");
            return
          }
          if(!this.call_back){
             this.$Message.warning("网址不能为空");
             return
          }
          if(this.model123==0){
             this.$Message.warning("请选择游戏类型");
             return
          }
        this.$post("/api/v1/game",{
            call_back:this.call_back,
            name:this.name,
            type:this.model123,
            platform:1,
            area:1
        }).then(res=>{
              if(res.code==200){
                this.game()
              }
              else{
                 this.$Message.warning(res.message);
              }
        })
    },
    cancel:function(){

    },
    //   创建游戏
      found:function(){
          this.modal12=true
      },
    //   游戏类型
    type: function() {
      this.$get("/api/v1/gametype").then(res => {
          if(res.code==200){
              this.cityList=res.data.data
            this.cityList.unshift({id:0,name:'全部游戏'})
          }
          
      });
    },

  },
   
  mounted() {
     this.type();
    this.game()
  },
  created() {
      
  },
};
</script>
<style lang="less">
.guanli_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.guanli_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.guanli_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.guanli_main2 {
  display: flex;
}
.guanli_main22 {
  margin-top: 14px;
  margin-left: 10px;
}
.guanli_main223 {
  margin-top: 14px;
  margin-left: 10px;
  position: relative;
}
.ivu-select-selection {
  height:30px!important;
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
.guanli_mains_one {
  width: 90px;
  height: 30px;
  background-color: #599ae7;
  color: #ffffff;
  font-size: 22px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  margin-top: 14px;
  margin-left: 15px;
  justify-content: center;
  cursor: pointer;
}
.guanli_mains_one1 {
  font-size: 14px;
}
.guanli_img1 {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 6px;
  left: 15px;
  cursor: pointer;
}
.guanli_input1 {
  width: 160px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background-color: #ebebeb;
  padding-left: 35px;
  padding-right: 5px;
  color: #666666;
}
.guanli_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
}
.guanli_waste1 {
  width: 80px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
}
.guanli_waste2 {
  width: 60px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 3px;
  cursor: pointer;
}
.guanli_table1{
    display: flex;
    
    justify-content: space-between;
    
    border-radius: 3px;
    font-size: 14px;
    color: #282c37;
    background-color: #ebebeb;
    font-weight: bold
}
.guanli_td1{
    width: 25%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #d7d7d7;
    border-right: 1px solid #d7d7d7;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666
}
.guanli_td21{
    width: 25%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #d7d7d7;
    border-right: 1px solid #d7d7d7;
    display: flex;
    justify-content: center;
    align-items: center;
}
.guanli_table{
    border: 1px solid #d7d7d7;
    border-bottom: none;
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 15px;
    border-right: none;
    border-radius: 4px
}
.guanli_td2{
    display: flex;
    justify-content: space-between
}
.guanli_xinxi1{
    width: 80px;
    height: 26px;line-height: 26px;
    font-size: 14px;
    color: #ffffff;
    background-color:#599ae7;
    border-radius: 3px;
    margin-right: 14px;
    cursor: pointer;
}
.guanli_shanchu1{
    width: 60px;
    height: 26px;
    line-height: 26px;
    color: #ffffff;
    border-radius: 3px;
    background-color: #d9534f;
    cursor: pointer;
}
.guanli_model1{
    display: flex;
    margin-left: 172px;
    margin-bottom: 30px;
    line-height: 30px;
    position: relative;
    align-items: center
}
.guanli_model1 label{
    width: 100px;
        margin-right: 15px;
        text-align: right;
        line-height: 30px
}
.guanli_model1_input1{
    width: 420px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #cccccc;
    padding-left: 15px
}
.guanli_err{
    position: absolute;
    font-size: 12px;
    color: #a2a8b3;
    left: 134px;
    top: 30px;
}
.guanli_file{
    width: 146px;
    height: 146px;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
}
.guanli_files{
    width: 146px;
    height: 146px;
    position: absolute;
    left: 115px;
    background-image: url(../assets/file1.png);
    background-size: 100% 100%;
    cursor: pointer;
}
.ivu-btn-text{
    border: 1px solid #999999;
}
.ivu-btn-text:hover{
// border: 1px solid #999999;
background-color:#599ae7;
color: #ffffff
}
.ivu-btn-primary{
    background-color: #599ae7
}
</style>