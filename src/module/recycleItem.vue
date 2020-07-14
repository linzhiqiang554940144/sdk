<template>
  <div>
    <div class="recycle_header">控制中心>游戏中心>游戏管理>回收站</div>
    <div class="recycle_main">
      <h2 class="recycle_main1">产品回收站</h2>
      <div>
        <div class="recycle_waste">
          <div class="recycle_waste2" @click="returns">返回</div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="recycle_table">
        <div class="recycle_table1">
          <div class="recycle_td21">游戏名称</div>
          <div class="recycle_td21">游戏类型</div>
          <div class="recycle_td21">PFAFAGUKHIUHIHAF</div>
          <div class="recycle_td21">操作</div>
        </div>
        <div>
          <div class="recycle_td2" v-for="(item,index) in msgs" :key="index">
            <div class="recycle_td1">{{item.name}}</div>
            <div class="recycle_td1">{{item.type_name}}</div>
            <div class="recycle_td1">{{item.product_code}}</div>
            <div class="recycle_td1">
              <section class="recycle_renew" @click="huifu(item.id)">恢复</section>
            </div>
          </div>
        </div>
         <div class="recycle_fenye" v-if="total>10">
           <Page :total="total"  @on-change="Gtotal" />
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msgs:[],
      total:"",
      page:1
    }
  },
  methods: {
    Gtotal:function(val){
        this.page=val
        this.msg()
    },
    huifu:function(val){
        this.$post("/api/v1/game/trash",{
          id:val
        }).then(res=>{
            this.msg()
        })
    },
    returns: function() {
      this.$router.push({
        name: "gameManage"
      });
    },
    msg:function(){
      this.$get("/api/v1/game/trash",{
        page:this.page,
        pagesize:10,
      }).then(res=>{
          if(res.code==200){
            this.msgs=res.data.data.data
          this.total=res.data.data.total
          }
          
      })
    }
  },
  mounted() {
      this.msg()
  },
};
</script>
<style lang="less">
.recycle_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.recycle_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 680px;
}
.recycle_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.recycle_waste {
  display: flex;
  margin-right: 15px;
  color: #666;
  margin-top: 14px;
  font-size: 14px;
  line-height: 30px;
  justify-content: flex-end;
}
.recycle_waste2 {
  width: 60px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 3px;
  cursor: pointer;
}
.recycle_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
}
.recycle_td1 {
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
.recycle_td21 {
  width: 25%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recycle_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
}
.recycle_td2 {
  display: flex;
  justify-content: space-between;
}
.recycle_renew {
  width: 60px;
  height: 24px;
  border: 1px solid #999;
  border-radius: 3px;
  line-height: 24px;
  cursor: pointer;
}
.recycle_fenye{
  margin-top: 50px
}
</style>