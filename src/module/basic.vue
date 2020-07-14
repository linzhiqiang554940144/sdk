<template>
  <div>
    <div class="basic_header">控制中心>游戏中心>游戏管理>基本信息</div>
    <div class="basic_main">
      <h2 class="basic_main1">基础信息</h2>

      <div class="basic_main2">
        <!-- 左侧 -->
        <div class="basic_left">
          <div class="basic_img1"></div>

          <div class="basic_left1">
            <div class="basic_unify12">
              <div class="basic_text1">{{name}}</div>
              <div class="basic_text3" @click="bianji">编辑</div>
            </div>
            <div class="basic_unify1">
              <div class="basic_text2">游戏类型 :</div>
              <div class="basic_text2">{{type}}</div>
            </div>
            <div class="basic_unify1">
              <div class="basic_text2">屏幕方向 :</div>
              <div class="basic_text2">{{msgList.screen_direction==1?"横屏":"竖屏"}}</div>
            </div>
            <div class="basic_unify1">
              <div class="basic_text2">创建 :</div>
              <div class="basic_text2">{{msgList.created_at}}</div>
            </div>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="basic_right">
          <div>
            <span class="basic_right_span1">ProductCode :</span>
            <span class="basic_right_span2">{{msgList.product_code}}</span>
          </div>
          <div>
            <span class="basic_right_span1">PrductKey :</span>
            <span class="basic_right_span2">{{msgList.product_key}}</span>
          </div>
          <div>
            <span class="basic_right_span1">Callback_Key :</span>
            <span class="basic_right_span2">{{msgList.callback_key}}</span>
          </div>
          <div>
            <span class="basic_right_span1">mD5_Key :</span>
            <span class="basic_right_span2">{{msgList.md5_key}}</span>
          </div>
          <div>
            <span class="basic_right_span1">Callback_Url :</span>
            <span class="basic_right_span2">{{msgList.call_url}}</span>
          </div>
        </div>
      </div>
    </div>
     <Modal
        width="860px"
        height="578px"
        v-model="modal1"
        title="编辑"
        @on-ok="ok"
        @on-cancel="cancel" class="basic">
           <div class="basic_model1">
            <label>ProductCode :</label>
            <span>{{msgList.product_code}}</span>
          </div>
          <div class="basic_model1">
            <label>PrductKey :</label>
            <span>{{msgList.product_key}}</span>
          </div>
          <div class="basic_model1">
            <label>Callback_Key :</label>
            <span>{{msgList.callback_key}}</span>
          </div>
          <div class="basic_model1">
            <label>mD5_Key :</label>
            <span>{{msgList.md5_key}}</span>
          </div>
        <div class="basic_model1">
            <label for="">游戏类型</label>
                 <Select v-model="model123" style="width:160px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
        </div>
        <div class="basic_model1">
            <label for="">游戏平台</label>
            <input type="radio" checked>
            <span>安卓</span>
        </div>
        <div class="basic_model1">
              <label for="">发行地区</label>
            <input type="radio" checked>
            <span>国内</span>
        </div>
        <div class="basic_model1">
            <label for="">Callback_Url</label>
            <input type="text" class="basic_model1_input1" v-model="call_back">
            <span class="basic_err">游戏接收到账通知的URL，融合SDK在渠道充值后会向URL发送同步请求</span>
        </div>
        <div class="basic_model1">
            <label for="">游戏Icon</label>
            <input type="file" class="basic_file">
            <div class="basic_files">

            </div>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
    data() {
        return {
            id:"",
            modal1:false,
            model123:0,
            cityList:[],
            msgList:"",
            type:"",
            name:"",
            call_back:""
        }
    },
  methods: {
    bianji: function() {
        this.modal1=true
    },
    ok:function(){
        this.$put("/api/v1/game/"+this.id,{
            call_back:this.call_back,
            name:this.name,
            type:this.model123,
            platform:1,
            area:1
        }).then(res=>{
              if(res.code==200){
                this.games()
              }
        })
    },
    cancel:function(){
    },
    games:function(){
      this.$get("/api/v1/game/"+this.id).then(res=>{
          if(res.code==200){
              this.msgList=res.data.data
          }
            
      })
    },
    //   游戏类型
    types: function() {
      this.$get("/api/v1/gametype").then(res => {
          if(res.code==200){
             this.cityList=res.data.data
            this.cityList.unshift({id:0,name:'全部游戏'})
          }
      });
    },
  },
  mounted() {
          console.log(this.$route.query.id)
          this.id=this.$route.query.id
          this.name=this.$route.query.name
          this.type=this.$route.query.type
          this.games()
          this.types()
  },
};
</script>
<style lang="less">
.basic_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.basic_main {
  width: 100%;
  background-color: #ffffff;
  height: 220px;
  min-width: 1500px;
  min-height: 220px;
  border: 1px solid #ebebeb;
}
.basic_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.basic_left {
  display: flex;
  width: 50%;
  border-right: 1px solid #999999;
  margin-top: 15px;
}
.basic_left1 {
  margin-top: 10px;
  margin-left: 18px;
}
.basic_img1 {
  width: 130px;
  height: 130px;
  background-color: #282c37;
  border-radius: 15px;

  margin-left: 15px;
}
.basic_main2 {
  display: flex;
  justify-content: space-between;
}
.basic_unify1 {
  display: flex;
}
.basic_unify12 {
  display: flex;
  margin-bottom: 30px;
}
.basic_text1 {
  font-size: 16px;
  color: #282c37;
}
.basic_text3 {
  font-size: 14px;
  color: #666666;
  width: 60px;
  height: 24px;
  border: 1px solid #666666;
  border-radius: 3px;
  line-height: 24px;
  margin-left: 14px;
  cursor: pointer;
}
.basic_text2 {
  font-size: 14px;
  color: #666666;
}
.basic_right {
  padding-top: 29px;
  width: 50%;
  text-align: left;
  padding-left: 30px;
}
.basic_right span {
  font-size: 14px;
  color: #666;
}
.basic_model1{
    display: flex;
    margin-left: 172px;
    margin-bottom: 30px;
    line-height: 30px;
    position: relative;
}
.ivu-select-selection {
  height:30px!important;
  background-color: #ebebeb;
  font-size: 14px;
  color: #666666;
}
.basic_model1_input1{
    width: 420px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #999999;
    padding-left: 15px
}
.basic_model1 label{
    width: 100px;
        margin-right: 15px;
        text-align: right;
        line-height: 30px
}
.basic_err{
    position: absolute;
    font-size: 12px;
    color: #a2a8b3;
    left: 134px;
    top: 30px;
}
.basic .ivu-modal-body{
  max-height: 600px;
  overflow: auto;
}
.basic_file{
    width: 146px;
    height: 146px;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
}
.basic_files{
    width: 146px;
    height: 146px;
    position: absolute;
    left: 115px;
    background-image: url(../assets/file1.png);
    background-size: 100% 100%;
    cursor: pointer;
}
.basic_right div{
  display: flex;
  margin-bottom: 1px
}
.basic_right_span1{
  width: 100px;
  display: block;
  margin-right: 22px
}
</style>