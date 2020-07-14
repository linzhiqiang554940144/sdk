<template>
  <div>
    <div class="textaccount_header">游戏中心>SDK聚合工具>母包测试账号</div>
    <div class="textaccount_main">
      <h2 class="textaccount_main1">母包测试账号</h2>
      <div class="textaccount_hint">
        <div class="textaccount_text1">
          <h5>重要提示 :</h5>
          <div>1.融合SDK支付账号用于游戏母包验证支付流程时使用,不能用于渠道包，渠道包验证支付需要真实进行支付</div>
        </div>
        <div
          class="textaccount_text2"
        >2.母包支付过程中，客户端点击后弹出的 [支付成功]和 [支付失败]选项仅用于发出客户端通知,服务器发货通知是以是否使用此处创建的测试账号且账号余额足够为判断</div>
        <div
          class="textaccount_text2"
        >3.使用母包测试账号进行支付的订单，通知游戏报中的is_test字段为1.游戏可根据清空在包体上线后，不在向is_test为1的测试订单发送道具</div>
      </div>
      <div>
        <div class="textaccount_waste">
          <div style="display:flex">
            <div class="textaccount_bianji" @click="bianji">新增</div>
            <div class="guanli_main2233">
              <img @click="searchname" class="guanli_img13" src="../../assets/search.png" alt />
              <input class="guanli_input13" type="text" placeholder="筛选测试账号" v-model="value" />
            </div>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="textaccount_table">
        <div class="textaccount_table1">
          <div class="textaccount_td21">用户名称</div>
          <div class="textaccount_td21">分配额度</div>
          <div class="textaccount_td212">IP白名单</div>
          <div class="textaccount_td21">操作</div>
        </div>
        <div v-if="!msgstatus">
          暂无数据
        </div>
        <div v-if="msgstatus">
          <div class="textaccount_td2" v-for="(item,index) in msg" :key="index">
            <div class="textaccount_td1">{{item.username}}</div>
            <div class="textaccount_td1">{{item.money}}</div>
            <div class="textaccount_td12">
              <Poptip trigger="hover" title="IP白名单"  placement="top" >
                <div slot="content" class="poptipExplain">
                  {{JSON.parse(item.ip_white).join(",")}}
                </div>
                
                <div class="textaccount_td1_ip">{{JSON.parse(item.ip_white).join(",")}}</div>
                
              </Poptip>
            </div>
            <div class="textaccount_td1">
              <div class="textaccount_xinxi1" @click="basic(item)">编辑</div>
              <div class="textaccount_shanchu1" @click="shanchu(item)">删除</div>
            </div>
          </div>
        </div>
      </div>
      <Modal width="740px" class="textaccount_model" v-model="modal1" title="新增">
        <div slot="footer">
          <Button type="text" size="default" @click="zno">取消</Button>
          <Button type="primary" size="default" @click="zok">确定</Button>
        </div>
        <div class="textaccount_model1">
          <label for class="textaccount_model_label">用户名</label>
          <input type="text" class="textaccount_model_input1" v-model="zusername" />
        </div>
        <div class="textaccount_model1">
          <label for class="textaccount_model_label">分配额度</label>
          <div class="textaccount_model11">
            <input type="text" class="textaccount_model_input1" v-model="zmoney" />
            <div class="textaccount_model11_text">
              <span>*</span>
              <span>分配额度不能超过5000</span>
            </div>
          </div>
        </div>
        <div class="textaccount_model12">
          <label for class="textaccount_model_label">IP白名单</label>
          <textarea
            name
            id
            cols="30"
            rows="10"
            class="textaccount_model_input12"
            placeholder="请核对手机公网IP填写..."
            v-model="zip"
          ></textarea>
        </div>
        <div class="textaccount_model123">
          <div class="textaccount_model123_text1">可以添加多个IP地址,每行只能填写一个IP地址;不填写则不限制IP</div>
          <div class="textaccount_model123_text2">此IP指用来进行母包支付时的手机IP，而非电脑IP，若IP不符合则系统不会向游戏发送成功通知</div>
        </div>
      </Modal>
      <Modal width="740px" class="textaccount_model" v-model="modal12" title="编辑">
        <div slot="footer">
          <Button type="text" size="default" @click="bno">取消</Button>
          <Button type="primary" size="default" @click="bok">确定</Button>
        </div>
        <div class="textaccount_model1">
          <label for class="textaccount_model_label">用户名</label>
          <input type="text" class="textaccount_model_input1" v-model="busername" />
        </div>
        <div class="textaccount_model1">
          <label for class="textaccount_model_label">分配额度</label>
          <div class="textaccount_model11">
            <input type="text" class="textaccount_model_input1" v-model="bmoney" />
            <div class="textaccount_model11_text">
              <span>*</span>
              <span>分配额度不能超过5000</span>
            </div>
          </div>
        </div>
        <div class="textaccount_model12">
          <label for class="textaccount_model_label">IP白名单</label>
          <textarea
            name
            id
            cols="30"
            rows="10"
            class="textaccount_model_input12"
            placeholder="请核对手机公网IP填写..."
            v-model="bip"
          ></textarea>
        </div>
        <div class="textaccount_model123">
          <div class="textaccount_model123_text1">可以添加多个IP地址,每行只能填写一个IP地址;不填写则不限制IP</div>
          <div class="textaccount_model123_text2">此IP指用来进行母包支付时的手机IP，而非电脑IP，若IP不符合则系统不会向游戏发送成功通知</div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 游戏ID
      id: "",
      // 搜索内容
      value: "",
      // 新增
      zusername: "",
      zmoney: "",
      zip: "",
      // 编辑
      busername: "",
      bmoney: "",
      bip: [],
      bid: "",
      modal12: false,
      modal1: false,
      cityList: [],
      model1: 0,
      msg: [],
      msgs: [],
      msgstatus:true,
    };
  },
  props: ["GameAuth"],
  methods: {
    bianji: function() {
      this.modal1 = true;
      this.zusername = "";
      this.zmoney = "";
      this.zip = "";
    },
    basic: function(item) {
      this.modal12 = true;
      this.bid = item.id;
      this.busername = item.username;
      this.bmoney = item.money;
      let ip = JSON.parse(item.ip_white);
      let a = ip.join("\n");
      this.bip = a;
    },
    zno: function() {
      this.modal1 = false;
    },
    zok: function() {
      let ip = this.zip.replace(/\n/g, " ");
      let ipArr = ip.split(" ");
      if (ipArr.length > 10) {
        this.$Message.warning("最多只能输入10条IP");
        return;
      }
      let zips = JSON.stringify(ipArr);
      this.$post("/api/v1/test/user", {
        gid: this.id,
        username: this.zusername,
        money: this.zmoney,
        ip: zips
      }).then(res => {
        if (res.code == 200) {
          this.infoData();
          this.$Message.success("成功");
          this.modal1 = false;
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    bno: function() {
      this.modal12 = false;
    },
    bok: function() {
      let ip = this.bip.replace(/\n/g, " ");
      let ipArr = ip.split(" ");
      if (ipArr.length > 10) {
        this.$Message.warning("最多只能输入10条IP");
        return;
      }
      let bips = JSON.stringify(ipArr);

      this.$put("/api/v1/test/user/" + this.bid + "", {
        gid: this.id,
        username: this.busername,
        money: this.bmoney,
        ip: bips
      }).then(res => {
        if (res.code == 200) {
          this.modal12 = false;
          this.infoData();
          this.$Message.success("成功");
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    infoData: function() {
      this.$get("/api/v1/test/user", {
        gid: this.id
      }).then(res => {
        if (res.code == 200) {
          this.msgs = res.data.data;
          this.msg = res.data.data;
          if(this.msg.length>0){
            this.msgstatus=true
          }
          else{
            this.msgstatus=false
          }
        }
        else{
          
        }
      });
    },
    searchname: function() {},
    shanchu: function(item) {
      this.$delete("/api/v1/test/user/" + item.id + "").then(res => {
        if (res.code == 200) {
          this.infoData();
          this.$Message.success("删除成功");
        } else {
          this.$Message.warning(res.message);
        }
      });
    }
  },
  computed: {},
  mounted() {
    if (localStorage.getItem("SDKGame")) {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
    }
    this.infoData();
  },
  watch: {
    GameAuth: function() {
      this.id = JSON.parse(localStorage.getItem("SDKGame")).id;
      console.log(this.id, " 登陆支付封禁监听得id");
      this.infoData();
    },
    value: function() {
      var that = this;
      this.msg = this.msgs.filter(function(e) {
        return e.username.indexOf(that.value) != -1;
      });
    }
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
  font-weight: bold;
}
.textaccount_td1 {
  width: 13%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.textaccount_td12{
   width: 61%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  overflow: hidden;
}
.textaccount_td1_ip {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.textaccount_td21 {
  width: 13%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.textaccount_td212{
   width: 61%;
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
  border-radius: 4px;
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
  font-size: 12px;
}
.textaccount_model_label {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  margin-left: 97px;
}
.textaccount_model1 {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 20px;
}
.textaccount_model12 {
  display: flex;
  justify-content: left;
  margin-top: 20px;
}
.textaccount_model_input1 {
  width: 360px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  padding-right: 40px;
}
.textaccount_model11 {
  position: relative;
  display: flex;
}
.textaccount_model11_text {
  position: absolute;
  right: -135px;
  line-height: 30px
}
.textaccount_model_input12 {
  width: 360px;
  border: 1px solid #cccccc;
  padding-left: 15px;
  padding-top: 5px;
  resize: none;
}
.textaccount_xinxi1 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #ffffff;
  background-color: #599ae7;
  border-radius: 3px;
  margin-right: 14px;
  cursor: pointer;
}
.textaccount_shanchu1 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  color: #ffffff;
  border-radius: 3px;
  background-color: #d9534f;
  cursor: pointer;
}
.textaccount_model123 {
  width: 360px;
  margin: 0 auto;
  margin-bottom: 22px;
}
.textaccount_model123_text1 {
  font-size: 12px;
  color: #a2a8b3;
}
.textaccount_model123_text2 {
  color: #d9534f;
  font-size: 12px;
}
.guanli_main2233 {
  position: relative;
}
.guanli_img13 {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 6px;
  left: 15px;
  cursor: pointer;
}
.guanli_input13 {
  width: 160px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background-color: #ebebeb;
  padding-left: 35px;
  padding-right: 5px;
  color: #666666;
}
.poptipExplain{
	    width: 110px;
	    white-space: normal;
	    word-break: break-all;
	    line-height: 25px;
	    font-size: 14px;
  }
  .textaccount_td12 .ivu-poptip{
      height: 100%;
      width: 100%
  }
</style>