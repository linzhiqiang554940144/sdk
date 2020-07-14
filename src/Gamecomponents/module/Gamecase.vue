<template>
  <div>
    <div class="Gamecase_header">游戏中心>SDK聚合工具>游戏概况</div>
    <div class="Gamecase_main">
      <div class="Gamecase_main1">
        <div>
          <h3 class="Gamecase_main_text1">基础数据</h3>
          <div class="Gamecase_main_msg1">
            <div v-for="(item,index) in msgList" :key="index" class="Gamecase_main_msg1_main">
              <div>
                <img :src='"../../assets/msg"+index+".png"' alt class="Gamecase_main_msg1_img" />
              </div>
              <div class="Gamecase_main_text2">{{item.name}}</div>
              <div class="Gamecase_main_text3">
                <div class="Gamecase_main_text31">
                  <div>今日</div>
                </div>
                <div
                  class="Gamecase_main_text32"
                >{{item.name=="付费额"?"￥"+item.yesterday:item.yesterday}}</div>
              </div>
              <div class="Gamecase_main_text4">
                <div class="Gamecase_main_text41">
                  <div>昨日</div>
                </div>
                <div class="Gamecase_main_text42">{{item.name=="付费额"?"￥"+item.today:item.today}}</div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="Gamecase_main2">
        <h3 class="Gamecase_main_text1">最近15日趋势图</h3>
        <div class="Gamecase_main2_msg">
          <div
            v-for=" (item,index) in msgList"
            :key="index"
            :class="indexs==index?'Gamecase_main2_msg1':'Gamecase_main2_msg2'"
            @click="msgindex(index)"
          >{{item.name}}</div>
        </div>
        <div id="Gamecase_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indexs: 0,
      msgList: [
        {
          name: "新增账号",
          yesterday: 50,
          today: 100
        },
        {
          name: "新增设备",
          yesterday: 50,
          today: 100
        },
        {
          name: "活跃用户",
          yesterday: 50,
          today: 100
        },

        {
          name: "付费额",
          yesterday: 50,
          today: 100
        },
        {
          name: "ARPPU",
          yesterday: 50,
          today: 100
        },
        {
          name: "ARPU",
          yesterday: 50,
          today: 100
        }
      ],
      msgnumber: [],

      msg: [
        [
          1555,
          5001,
          3104,
          1177,
          6205,
          6700,
          914,
          1141,
          1556,
          515,
          11,
          5553,
          111,
          666,
          88
        ],
        [
          155,
          22211,
          3140,
          41707,
          6251,
          670,
          91406,
          11141,
          12556,
          10515,
          11,
          5553,
          111,
          666,
          88
        ],
        [
          155,
          2221,
          314,
          4177,
          625,
          67,
          9146,
          11141,
          12556,
          10515,
          11111,
          5553,
          111,
          6660,
          808
        ],
        [
          155,
          2221,
          314,
          4177,
          625,
          6711,
          91461,
          11141,
          12556,
          10515,
          11,
          5553,
          1111,
          66611,
          8811
        ],
        [
          155,
          2221,
          314,
          4177,
          62511,
          6711,
          9146,
          11141,
          12556,
          10515,
          11111,
          5553,
          11111,
          66611,
          882
        ],
        [
          155,
          2221,
          314,
          4177,
          625,
          67,
          9146,
          11141,
          12556,
          10515,
          11,
          5553,
          111,
          666,
          88
        ]
      ],
      day: []
    };
  },
  methods: {
    msgindex: function(val) {
      this.indexs = val;
      this.msgnumber = this.msg[val];
      this.canvas();
    },
    canvas: function() {
      var myChart = this.$echarts.init(
        document.getElementById("Gamecase_container")
      );
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: {
          type: "category",
          data: this.day
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增",
            type: "line",
            data: this.msgnumber
          }
        ],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true
        }
      };

      myChart.setOption(option);
    },
    GetDateStr: function(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); 
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; 
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); 
      return y + "-" + m + "-" + d;
    }
  },
  mounted() {
    this.msgnumber = this.msg[0];
    for (var i = 0; i < 15; i++) {
      if (i == 15) {
        return;
      } else {
        this.day.push(this.GetDateStr(-i));
      }
    }
    this.canvas();
  }
};
</script>
<style lang="less">
.Gamecase_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.Gamecase_main {
  width: 100%;
  //   background-color: #ffffff;
  height: calc(100% - 49px);
  //   border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.Gamecase_main1 {
  padding: 15px 15px 0 15px;
  background-color: #ffffff;
}
.Gamecase_main_text1 {
  text-align: left;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 10px;
}
.Gamecase_main_msg1 {
  display: flex;
}
.Gamecase_main_msg1_img {
  width: 80px;
  height: 80px;
}
.Gamecase_main_msg1_main {
  width: 17%;
  min-width: 250px;
  padding-top: 18px;
  border-right: 1px solid #e1e1e1;
  height: 213px;
}
.Gamecase_main_text2 {
  font-size: 16px;
  color: #333;
  margin-top: 13px;
}
.Gamecase_main_text3 {
  display: flex;
  // justify-content: right;
  margin-top: 9px;
}
.Gamecase_main_text4 {
  display: flex;
  justify-content: right;
  margin-top: 8px;
}
.Gamecase_main_text31 {
  width: 50%;
  height: 22px;
  border-radius: 3px;
  margin-right: 9px;
  display: flex;
  justify-content: flex-end;
}
.Gamecase_main_text32 {
  font-size: 14px;
  color: #599af7;
  width: 50%;
  text-align: left;
}
.Gamecase_main_text41 {
  width: 50%;
  height: 22px;
  // background-color: #ebebeb;
  border-radius: 3px;
  margin-right: 9px;
  display: flex;
  justify-content: flex-end;
}
.Gamecase_main_text42 {
  font-size: 14px;
  color: #999;
  width: 50%;
  text-align: left;
}
.Gamecase_main_msg1_main:nth-child(6) {
  border: none;
}
.Gamecase_main2 {
  background-color: #ffffff;
  margin-top: 15px;
  padding: 15px 15px 30px 15px;
}
.Gamecase_main2_msg {
  display: flex;
  width: 588px;
  border: 1px solid #599af7;
  border-radius: 15px;
  line-height: 30px;
  color: #282c37;
  margin-top: 14px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 24px;
}
.Gamecase_main2_msg1 {
  width: 98px;
  height: 30px;
  border-right: 1px solid #599af7;
  background-color: #599af7;
  color: #ffffff;
  user-select: none;
}
.Gamecase_main2_msg2 {
  width: 98px;
  height: 30px;
  border-right: 1px solid #599af7;
  user-select: none;
}
#Gamecase_container {
  height: 420px;
  border: 1px solid #ccc;
}
.Gamecase_main_text31 div {
  width: 44px;
  background-color: #cdcdcd;
}
.Gamecase_main_text41 div {
  width: 44px;
  background-color: #ebebeb;
  color: #999;
}
.Gamecase_main2_msg2:nth-child(6) {
  border: none;
}
</style>