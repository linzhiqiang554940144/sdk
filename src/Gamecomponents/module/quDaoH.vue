<template>
  <div>
    <div class="textaccount_header">游戏中心>SDK聚合工具>渠道参数回调</div>
    <div class="textaccount_main">
      <h2 class="textaccount_main1">渠道参数回调</h2>
      <div>
        <div class="textaccount_waste">
          <div style="display:flex">
            <Select v-model="model1" style="width:160px">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="textaccount_table">
        <div class="textaccount_table1">
          <div class="textaccount_td21">渠道Code</div>
          <div class="textaccount_td21">渠道名称</div>
          <div class="textaccount_td21">渠道回调地址</div>
          <div class="textaccount_td21">操作</div>
        </div>
        <div></div>
        <div>
          <div class="textaccount_td2" v-for="(item,index) in msg" :key="index">
            <div class="textaccount_td1">{{item.code}}</div>
            <div class="textaccount_td1">
              {{item.name}}
            </div>
            <div class="textaccount_td1">
             {{item.notify_url?item.notify_url:"暂无回调参数"}}
            </div>
            <div class="textaccount_td1">
                            <div class="textaccount_xinxi11"  @click="basic(item.back_url)" >访问渠道后台</div><div v-if="item.notify_url"  class="textaccount_shanchu11" v-clipboard:copy="item.notify_url" v-clipboard:success="copy">复制回调地址</div>
            </div>
          </div>
        </div>
      </div>
        <Page :total="total" @on-change="gaibianpage" v-if="total>9" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [
        {
          id: 1,
          name: "显示全部渠道的回调"
        },
        {
          id: 2,
          name: "隐藏无需配置的渠道"
        }
      ],
      model1: 1,
      msg: [
      ],
      // 页数
      page:1,
      pagesize:10,
        total:"",
        // 游戏ID
        id:""
    };
  },
   props: ["GameAuth"],
  methods: {
    basic:function(url){
        if(url){
          window.open(url);
        }
        else{
            this.$Message.warning('暂无');
        }
         
    },
     copy({ value, event }) {
      console.log("success", value);
      this.$Message.success("已复制");
    },

    infoData:function(){
      this.$get("/api/v1/channelback",{
          page:this.page,
          pagesize:this.pagesize,
          type:this.model1,
          gid:this.id
      }).then(res=>{
          if(res.code==200){
              this.msg=res.data.data.data
          this.total=res.data.data.total
          }
          
      })
    },
    gaibianpage:function(data){
          console.log(data)
    }
  },
  computed: {},
  mounted() {
        // 是否存在游戏  存在获取ID
    if(localStorage.getItem("SDKGame")){

         this.id=JSON.parse(localStorage.getItem("SDKGame")).id
      }
      this.infoData()
  },
  watch: {
      model1:function(){
          this.infoData()
      },
      // 是否更换了游戏ID
       GameAuth:function(){
       this.id=JSON.parse(localStorage.getItem("SDKGame")).id
          this.infoData()
    },
  }
};
</script>
<style lang="less">
.textaccount_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.textaccount_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.textaccount_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.textaccount_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.textaccount_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.textaccount_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.textaccount_td1 {
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
.textaccount_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.textaccount_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px;margin-bottom: 40px
}
.textaccount_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.textaccount_renew {
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
.textaccount_img15 {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 6px;
  cursor: pointer;
}
.textaccount_input15 {
  width: 160px;
  height: 30px;
  background-color: #ebebeb;
  border: none;
  border-radius: 3px;
  margin-left: 20px;
  padding-left: 15px;
}
.textaccount_searchss {
  display: flex;
  align-items: center;
  position: relative;
}
.textaccount_bianji {
  width: 60px;
  height: 30px;
  background-color: #599af7;
  color: #ffffff;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
}
.textaccount_hint {
  margin: 10px 15px 0 15px;
  padding-top: 14px;
  padding-bottom: 6px;
  padding-left: 14px;
  background-color: #ffe5e5;
  border-radius: 3px;
}
.textaccount_text1 {
  display: flex;
  align-items: center;
}
.textaccount_text1 div {
  font-size: 12px;
  color: #666;
}
.textaccount_text2 {
  font-size: 12px;
  color: #666666;
  text-align: left;
  padding-left: 53px;
}
.textaccount_td1_td1 {
  width: 28px;
  height: 26px;
  background-image: url(../../assets/yes.png);
  background-size: 100% 100%;
}
.textaccount_td1_td2 {
  width: 28px;
  height: 26px;
  background-image: url(../../assets/no.png);
  background-size: 100% 100%;
}
.textaccount_model .ivu-modal-body {
  padding: 0;
  font-size: 12px
}
.textaccount_model_label{
  width: 80px;
  text-align: right;
  margin-right: 10px;
  margin-left: 97px
}
.textaccount_model1{
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 20px
}
.textaccount_model12{
    display: flex;
  justify-content: left;
  margin-top: 20px
}
.textaccount_model_input1{
  width: 360px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  padding-right: 40px
}
.textaccount_model11{
  position: relative;
  display: flex;
  
}
.textaccount_model11_text{
  position: absolute;
  right: -135px;
}
.textaccount_model_input12{
  width: 360px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  padding-top: 5px
}
.textaccount_xinxi11 {
  width: 120px;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #ffffff;
  background-color: #599ae7;
  border-radius: 3px;
  margin-right: 14px;
  cursor: pointer;
}
.textaccount_shanchu11 {
  width: 120px;
  height: 26px;
  line-height: 26px;
  color: #ffffff;
  border-radius: 3px;
  background-color: #d9534f;
  cursor: pointer;
}
.textaccount_model123{
  width: 360px;
  margin: 0 auto;
  margin-bottom: 22px
}
.textaccount_model123_text1{
  font-size: 12px;
  color: #a2a8b3;
}
.textaccount_model123_text2{
  color: #d9534f;font-size: 12px
}
</style>