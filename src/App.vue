<template>
  <div id="app">
    <broad-side v-if="headerShow" :requiresAuth="requiresAuth" v-on:formSubmit="translateText"></broad-side>
    <router-view :class="classX" :GameAuth="GameAuth"></router-view>
  </div>
</template>
<script>
import bus from "./bus.js";
import broadSide from "./views/broadside/broadside";
export default {
  data() {
    return {
      headerShow: false,
      classX: "cccccc",
      class1: false,
      class2: true,
      requiresAuth: true,
      GameAuth: true
    };
  },
  methods: {
    translateText: function(text) {
      this.GameAuth = !this.GameAuth;
    }
  },
  components: {
    broadSide
  },
  computed: {},
  mounted() {
    var that = this;
    bus.$on("txt", function(val) {
      that.class1 = val;
    });
    bus.$on("txt1", function(val) {
      that.class2 = val;
     
    });
  },
  watch: {
    $route(to, from) {
      if (this.$route.path === "/" || this.$route.path === "/reset") {
        this.headerShow = false;
      } else if (
        this.$route.path === "/login" ||
        this.$route.path === "/enroll"
      ) {
        this.headerShow = false;
      } else {
        this.headerShow = true;
      }
      if (this.$route.meta.requiresAuth) {
        this.requiresAuth = true;
      } else {
        this.requiresAuth = false;
      }
    },
    class1: function() {
      if (!this.class1 && !this.class2) {
        this.classX = "ssssss";
        console.log(this.classX);
        return;
      }
      if (this.class1 && this.class2) {
        this.classX = "xxxxxx";
        return;
      }
      if (!this.class1 && this.class2) {
        this.classX = "cccccc";
        return;
      }
      if (this.class1 && !this.class2) {
        this.classX = "aaaaaa";
        return;
      }
    },
    class2: function() {
      console.log(this.class1, "22");
      console.log(this.class2, "222");
      if (!this.class1 && !this.class2) {
        this.classX = "ssssss";
        console.log(this.classX);
        return;
      }
      if (this.class1 && this.class2) {
        this.classX = "xxxxxx";
        return;
      }
      if (!this.class1 && this.class2) {
        this.classX = "cccccc";
        return;
      }
      if (this.class1 && !this.class2) {
        this.classX = "aaaaaa";
        return;
      }
    }
  },
  beforeDestroy() {
    window.sessionStorage.removeItem("SDKstatus");
  }
};
</script>
<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
.ssssss {
  height: calc(100vh - 50px);
  width: calc(100vw - 50px);
  margin-left: 50px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f0f3f8;
  transition: all 0.2s;
  overflow: auto;
}
.xxxxxx {
  height: calc(100vh - 50px);
  width: calc(100vw - 310px);
  margin-left: 310px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f0f3f8;
  transition: all 0.2s;
  overflow: auto;
}
.cccccc {
  height: calc(100vh - 50px);
  width: calc(100vw - 210px);
  margin-left: 210px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f0f3f8;
  transition: all 0.2s;
  overflow: auto;
}
.aaaaaa {
  height: calc(100vh - 50px);
  width: calc(100vw - 150px);
  margin-left: 150px;
  background-color: #f0f3f8;
  padding-left: 15px;
  padding-right: 15px;
  transition: all 0.2s;
  overflow: auto;
}
input {
  outline: none;
}
// ::-webkit-scrollbar {
//   /*滚动条整体样式*/
//   width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
//   height: 6px;
// }
// ::-webkit-scrollbar-thumb {
//   /*滚动条里面小方块样式*/
//   border-radius: 5px;
//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2)!important;
//   background: #595d6a!important;
// }
// ::-webkit-scrollbar-track {
//   /*滚动条里面轨道样式*/
//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   border-radius: 0;
//   background: rgba(0, 0, 0, 0.1);
// }
.ivu-input {
  height: 30px !important;
}
.ivu-btn-text {
  border: 1px solid #999999 !important;
}
.ivu-btn-text:hover {
  // border: 1px solid #999999;
  background-color: #599ae7 !important;
  color: #ffffff !important;
  border: none;
}
</style>
