<template>
  <div>
    <div class="paybanned_header">游戏中心>SDK聚合工具>登陆支付封禁</div>
    <div class="paybanned_main">
      <h2 class="paybanned_main1">登陆支付封禁</h2>
      <div class="paybanned_hint">
        <div class="paybanned_text1">
          <h5>重要提示 :</h5>
          <div>1.此功能可针对特定渠道即时控制是否启用和关闭登录、支付、创建新角色三项节点,关闭登录或支付的渠道,玩家将无法登录或支付,关闭新增角色后,新角色将无法游戏</div>
        </div>
        <div class="paybanned_text2">2.关闭支付是立即生效的，关闭登录是下次登陆时生效(注：并不能立即将玩家踢下线)</div>
        <div class="paybanned_text2">3.此功能是针对渠道全部玩家的,若某角色被阻止后,可通过角色列表后的[解除阻止]功能单独解除此角色的阻止结果.</div>
        <div class="paybanned_text2">4.也提供单个用户封账号的功能,操作方法运营数据平台->玩家明细->账号明细->找到用户 点击其他的[封账号]即可完成</div>
      </div>
      <div>
        <div class="paybanned_waste">
          <div style="display:flex">
            <div class="paybanned_bianji" @click="bianji" v-if="false">编辑</div>
            <Select v-model="model1" style="width:160px">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.channel_name }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="paybanned_table">
        <div class="paybanned_table1">
          <div class="paybanned_td21">渠道</div>
          <div class="paybanned_td21">禁止登陆提示语</div>
          <div class="paybanned_td211">可登录</div>
          <div class="paybanned_td211">可支付</div>
          <div class="paybanned_td211">新增角色可游戏</div>
          <div class="paybanned_td211">操作</div>
        </div>
        <div></div>
        <div>
          <div class="paybanned_td2" v-for="(item,index) in msg" :key="index">
            <div class="paybanned_td1">{{item.name}}</div>
              <div class="paybanned_td1">
                <!-- 内容  -->
                    <div v-if="indexs!=index" >{{item.login_txt}}</div>
                    <input class="tishiyu" v-if="indexs==index" type="text" v-model="prompt" placeholder="请输入提示语">
                     
                     
              </div>
            <div class="paybanned_td11">
              <div v-if="indexs!=index" :class="item.login==1?'paybanned_td1_td1':'paybanned_td1_td2'"></div>
                   <i-switch v-if="indexs==index" true-color="#25c172" false-color="#e1e1e1" :value="item.login==1" @on-change="login"/>
            </div>
            <div class="paybanned_td11">
              <div v-if="indexs!=index"  :class="item.pay==1?'paybanned_td1_td1':'paybanned_td1_td2'"></div>
               <i-switch v-if="indexs==index" true-color="#25c172" false-color="#e1e1e1" :value="item.pay==1" @on-change="pay"/>
            </div>
            <div class="paybanned_td11">
              <div v-if="indexs!=index"  :class="item.role==1?'paybanned_td1_td1':'paybanned_td1_td2'"></div>
               <i-switch v-if="indexs==index" true-color="#25c172" false-color="#e1e1e1" :value="item.role==1" @on-change="role"/>
            </div>
              <div class="paybanned_td11">
                    <div @click="bianjis(item)"> <Button v-if="indexs!=index" type="primary" size="small" :disabled="disableds" @click="bianji(index)">编辑</Button></div>
                     <Button v-if="indexs==index" type="primary" size="small" @click="tijiao(item)">提交</Button>
                  
              </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      <Page :total="total" @on-change="gaibianpage" v-if="total>10" />
    </div>
    <Modal class="paybanned_model" width="800px" v-model="modal1" title="登陆支付封禁">
      <div class="paybanned_model1">
        <div class="paybanned_model1_left">
          <div v-for="(item,index) in fenzu" :key="index" @click="kongzhiIX(index)">
            <div :class="iX==index?'paybanned_model1_left2': 'paybanned_model1_left1'">{{item.name}}</div>
          </div>
        </div>
        <div class="paybanned_model1_right1" v-if="iX==0">
          <div class="paybanned_model1_right11">
            <div class="paybanned_model1_right11_text1">选择渠道已经选择({{number}})家</div>
            <div style="position: relative;display: flex; align-items: center">
              <input class="paybanned_model1_right11_input1" type="text" placeholder="请输入渠道名称" />
              <img class="paybanned_model1_right11_img1" src="../../assets/search.png" alt />
            </div>
          </div>
          <div class="paybanned_model1_right11_Checkbox">
            <CheckboxGroup v-model="border" @on-change="xuanzhong">
              <Checkbox
                :label="item.status"
                v-for="(item,index) in modelList"
                :key="index"
              >{{item.name}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <div style="margin-top: 14px">提示语配置</div>
            <div style="margin-top: 20px">
              <label for class="paybanned_model1_right11_text2">默认提示语</label>
              <input type="text" class="paybanned_model1_right11_input2" />
            </div>
          </div>
        </div>
        <div class="paybanned_model1_right1" v-if="iX==1">
          <div class="paybanned_model1_right11">
            <div class="paybanned_model1_right11_text1">选择渠道已经选择({{number}})家</div>
            <div style="position: relative;display: flex; align-items: center">
              <input class="paybanned_model1_right11_input1" type="text" placeholder="请输入渠道名称" />
              <img class="paybanned_model1_right11_img1" src="../../assets/search.png" alt />
            </div>
          </div>
          <div class="paybanned_model1_right11_Checkbox">
            <CheckboxGroup v-model="border" @on-change="xuanzhong">
              <Checkbox
                :label="item.status"
                v-for="(item,index) in modelList"
                :key="index"
              >{{item.name}}</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="paybanned_model1_right1" v-if="iX==2">
          <div class="paybanned_model1_right11">
            <div class="paybanned_model1_right11_text1">选择渠道已经选择({{number}})家</div>
            <div style="position: relative;display: flex; align-items: center">
              <input class="paybanned_model1_right11_input1" type="text" placeholder="请输入渠道名称" />
              <img class="paybanned_model1_right11_img1" src="../../assets/search.png" alt />
            </div>
          </div>
          <div class="paybanned_model1_right11_Checkbox">
            <CheckboxGroup v-model="border" @on-change="xuanzhong">
              <Checkbox
                :label="item.status"
                v-for="(item,index) in modelList"
                :key="index"
              >{{item.name}}</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      prompt:"",
      logins:"",
      pays:"",
      roles:"",
      indexs:-1,
      disableds:false,
      number: "",
      modelList: [
        {
          name: "游戏久",
          status: 1123456
        },
        {
          name: "轩辕传奇",
          status: 223456
        },
        
      ],
      id:"",
      total:"",
      page:1,
      pagesize:10,
      border: [],
      // 控制弹框颜色
      iX: 0,
      // 控制弹框
      modal1: false,
      cityList: [
      ],
      model1: 0,
      msg: [
      ],

      fenzu: [
        { id: 0, name: "禁用渠道登陆" },
        { id: 1, name: "禁用渠道支付" },
        { id: 2, name: "禁用渠道新增角色" }
      ]
    };
  },
  props: ["GameAuth"],
  methods: {
      // 提交
    tijiao:function(datas){
        var cc={
          1:'',
          2:'',
          3:""
        }
        cc[1]=this.logins
        cc[2]=this.pays
        cc[3]=this.roles
        this.disableds=false
        this.indexs=-1
        if(cc[1]==datas.login&&cc[2]==datas.pay&&cc[3]==datas.role && this.prompt==datas.login_txt){
          return
        }
        this.$post("/api/v1/channelstop",{
          id:datas.id,
          data:JSON.stringify(cc),
          prompt:this.prompt
        }).then(res=>{
              if(res.code==200){
                this.Game()
                this.$Message.success(res.message);
              }
              else{
                 this.$Message.warning(res.message);
              }
        })
    },
    // 编辑需要传两个值
    bianjis:function(data){
        this.logins=data.login
        this.pays=data.pay
        this.roles=data.role
        this.prompt=data.login_txt
    },
    bianji: function(data) {

        this.disableds=true
        this.indexs=data
      // this.modal1 = true;
    },
    login:function(data){
      if(data){
        this.logins=1
      }
      else{
        this.logins=0
      }
    },
    pay:function(data){
      if(data){
        this.pays=1
      }
      else{
        this.pays=0
      }
    },
    role:function(data){
      if(data){
        this.roles=1
      }
      else{
        this.roles=0
      }
    },
    kongzhiIX: function(val) {
      this.iX = val;
    },
    xuanzhong: function() {
      console.log(this.border.length);
      this.number = this.border.length;
      console.log(this.number);
    },
      // 表格数据
    Game:function(){
      this.$get("/api/v1/stoplist",{
        channel:this.model1,
        page:this.page,
        pagesize:this.pagesize,
        gid:this.id
      }).then(res=>{
          this.msg=res.data.data.data
          this.total=res.data.data.total
      })
    },
    // 渠道列表
    list:function(){
      this.$get("/api/v1/channel",{
        gid:this.id
      }).then(res=>{
          this.cityList=res.data.data.data
           this.cityList.unshift({id:0,channel_name:'全部渠道'})
      })
    },
    // 分页
    gaibianpage:function(data){
        this.page=data
        this.Game()
    }
  },
  computed: {},
  mounted() {
      // 监听到的游戏id
      if(localStorage.getItem("SDKGame")){

         this.id=JSON.parse(localStorage.getItem("SDKGame")).id
      }
   
    this.Game()
    this.list()
  },
  watch: {
    GameAuth:function(){
       this.id=JSON.parse(localStorage.getItem("SDKGame")).id
       console.log(this.id," 登陆支付封禁监听得id")
       this.model1=0
        this.list()
        this.Game()
    },
    model1:function(){
        this.Game()
    }
  }
};
</script>
<style lang="less">
.paybanned_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.paybanned_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 700px;
}
.paybanned_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.paybanned_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.paybanned_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.paybanned_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.paybanned_td1 {
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
.paybanned_td11 {
  width: 12.5%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.paybanned_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paybanned_td211 {
  width: 12.5%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paybanned_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.paybanned_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.paybanned_renew {
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
.paybanned_img15 {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 6px;
  cursor: pointer;
}
.paybanned_input15 {
  width: 160px;
  height: 30px;
  background-color: #ebebeb;
  border: none;
  border-radius: 3px;
  margin-left: 20px;
  padding-left: 15px;
}
.paybanned_searchss {
  display: flex;
  align-items: center;
  position: relative;
}
.paybanned_bianji {
  width: 60px;
  height: 30px;
  background-color: #599af7;
  color: #ffffff;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
}
.paybanned_hint {
  margin: 10px 15px 0 15px;
  padding-top: 14px;
  padding-bottom: 6px;
  padding-left: 14px;
  background-color: #ffe5e5;
  border-radius: 3px;
}
.paybanned_text1 {
  display: flex;
  align-items: center;
}
.paybanned_text1 div {
  font-size: 12px;
  color: #666;
}
.paybanned_text2 {
  font-size: 12px;
  color: #666666;
  text-align: left;
  padding-left: 53px;
}
.paybanned_td1_td1 {
  width: 26px;
  height: 26px;
  background-image: url(../../assets/yes.png);
  background-size: 100% 100%;
}
.paybanned_td1_td2 {
  width: 26px;
  height: 26px;
  background-image: url(../../assets/no.png);
  background-size: 100% 100%;
}
.paybanned_model .ivu-modal-body {
  padding: 0;
}
.paybanned_model1 {
  height: 365px;
  display: flex;
}
.paybanned_model1_left {
  width: 160px;
  border-right: 1px solid #ebebeb;
}
.paybanned_model1_left1 {
  height: 36px;
  border-bottom: 1px solid #ebebeb;
  line-height: 36px;
  padding-left: 20px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.paybanned_model1_left2 {
  height: 36px;
  border-bottom: 1px solid #ebebeb;
  line-height: 36px;
  padding-left: 20px;
  font-size: 12px;
  color: #333;
  cursor: pointer;
  background-color: #f5f5f5;
}
.paybanned_model1_right1 {
  padding-left: 20px;
  padding-right: 20px;
}
.paybanned_model1_right11 {
  height: 40px;
  width: 600px;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.paybanned_model1_right11_text1 {
  font-size: 16px;
  color: #a2a8b3;
}
.paybanned_model1_right11_input1 {
  height: 20px;
  width: 220px;
  border-top: none;
  border-bottom: none;
  border-right: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  padding-left: 15px;
  font-size: 12px;
  color: #ccc;
  padding-right: 40px;
}
.paybanned_model1_right11_img1 {
  position: absolute;
  width: 14px;
  height: 14px;
  right: 15px;
  cursor: pointer;
}
.paybanned_model1_right11_Checkbox {
  max-height: 200px;
  padding-bottom: 20px;
  padding-top: 14px;
  border-bottom: 1px solid #cccccc;
}
.paybanned_model1_right11_text2 {
  font-size: 12px;
  color: #333;
}
.paybanned_model1_right11_input2 {
  width: 250px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  margin-left: 10px;
}.tishiyu{
  width: 250px;
  height: 26px;
  border: 1px solid #f5f5f5;
  background-color: #ebebeb;
  border-radius: 5px;
  padding-left: 15px;

}
</style>