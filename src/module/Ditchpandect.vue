<template>
  <div>
    <div class="Gamepandect_header">控制中心>游戏中心>渠道总览</div>
    <div class="Gamepandect_main">
      <h2 class="Gamepandect_main1">全部渠道概况</h2>
      <div>
        <div class="Gamepandect_waste">
          <div>
            <DatePicker
              type="daterange"
              placement="bottom-end"
              placeholder="请选择时间"
              style="width: 220px"
            ></DatePicker>
            <Select v-model="model1" style="width:160px;margin-left: 20px">
              <Option
                v-for="item in cityList"
                :value="item.id"
                :key="item.id"
              >{{ item.name }}</Option>
            </Select>
          </div>
          <div class="Gamepandect_waste2">导出数据</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="Gamepandect_table">
        <div class="Gamepandect_table1">
          <input type="checkbox" @click="checkAll" v-model="checkall" class="Gamepandect_duoxuan" />
          <div class="Gamepandect_td21">游戏名称</div>
          <div class="Gamepandect_td21">渠道名称</div>
          <div class="Gamepandect_td21">累计用户(人)</div>
          <div class="Gamepandect_td21">累计设备(台)</div>
          <div class="Gamepandect_td21">累计充值(元)</div>
          <div class="Gamepandect_td21">付费用户(人)</div>
          <div class="Gamepandect_td21">昨日活跃用户(人)</div>
          <div class="Gamepandect_td21">今日充值总额(元)</div>
        </div>
        <div>
          <div class="Gamepandect_td2">
            <div class="Gamepandect_td1">总计</div>
            <div class="Gamepandect_td1">{{game}}</div>
            <div class="Gamepandect_td1">{{game1}}</div>
            <div class="Gamepandect_td1">{{game2}}</div>
            <div class="Gamepandect_td1">{{game3}}</div>
            <div class="Gamepandect_td1">{{game4}}</div>
            <div class="Gamepandect_td1">{{game5}}</div>
            <div class="Gamepandect_td1">{{game6}}</div>
          </div>
        </div>
        <div>
          <div class="Gamepandect_td2" v-for="(item,index) in msg" :key="index">
            <input
              type="checkbox"
              v-model="checked"
              :value="item.value"
              class="Gamepandect_duoxuan"
            />
            <div class="Gamepandect_td1">{{item.name}}</div>
            <div class="Gamepandect_td1">{{item.one}}</div>
            <div class="Gamepandect_td1">{{item.two}}</div>
            <div class="Gamepandect_td1">{{item.three}}</div>
            <div class="Gamepandect_td1">{{item.four}}</div>
            <div class="Gamepandect_td1">{{item.five}}</div>
            <div class="Gamepandect_td1">{{item.six}}</div>
            <div class="Gamepandect_td1">{{item.seven}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        cityList:[],
        model1:0,
      game: 0,
      game1: 0,
      game2: 0,
      game3: 0,
      game4: 0,
      game5:0,
      game6:0,
      checkall: false,
      checked: [],
      msg: [
        {
          name: "苍穹",
          one: 10,
          two: 20,
          three: 30,
          four: 40,
          five: 50,
          six: 60,
          seven: 70,
          value: 1
        },
        {
          name: "苍穹",
          one: 10,
          two: 20,
          three: 30,
          four: 40,
          five: 50,
          six: 60,
          seven: 70,
          value: 2
        },
        {
          name: "苍穹",
          one: 10,
          two: 20,
          three: 30,
          four: 40,
          five: 50,
          six: 60,
          seven: 70,
          value: 3
        }
      ]
    };
  },
  methods: {
    //   游戏类型
      type: function() {
      this.$get("/api/v1/gametype").then(res => {
            if(res.code==200){
                this.cityList=res.data.data
            this.cityList.unshift({id:0,name:'全部游戏'})
            }
          
      });
    },
    checkAll: function() {
      var _this = this;
      if (this.checkall) {
        // 实现反选
        this.checked = [];
      } else {
        // 实现全选
        this.checked = [];
        this.msg.forEach(function(item) {
          _this.checked.push(item.value);
        });
      }
      if (this.checked.length === this.msg.length) {
        this.checkall = true;
      }
    }
  },
  computed: {},
  mounted() {
      this.type()
  },
  watch: {
    checked: function() {
      
      this.game=0
      this.game1=0
      this.game2=0
      this.game3=0
      this.game4=0
      this.game5=0
      this.game6=0
      console.log(this.checked.length);
      if (this.checked.length == 0) {
        this.game = 0;
        return;
      }
      for (var i = 0; i < this.checked.length; i++) {
        var item = this.msg[i];
        this.game += item.one;
        this.game1 += item.two;
        this.game2 += item.three;
        this.game3 += item.four;
        this.game4 += item.five;
        this.game5 += item.six;
        this.game6 += item.seven;
      }
    }
  }
};
</script>
<style lang="less">
.Gamepandect_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.Gamepandect_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
   min-width: 1500px;
  min-height: 600px;
}
.Gamepandect_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.Gamepandect_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: space-between;
  margin-left: 15px;
}
.Gamepandect_waste2 {
  width: 80px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
}
.Gamepandect_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  position: relative;
  font-weight: bold
}
.Gamepandect_td1 {
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
.Gamepandect_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Gamepandect_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px
}
.Gamepandect_td2 {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.Gamepandect_renew {
  width: 60px;
  height: 24px;
  border: 1px solid #999;
  border-radius: 3px;
  line-height: 24px;
  cursor: pointer;
}
.Gamepandect_duoxuan {
  position: absolute;
  top: 13px;
  left: 14px;
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
.ivu-input:focus{
    box-shadow:none;
    outline: none;
    border-color: #dcdee2
}
.ivu-input:hover{
    box-shadow:none;
    outline: none;
    border-color: #dcdee2
}
.ivu-input{
    background-color: #ebebeb
}
.ivu-input::placeholder{
  color: #666666
}
</style>