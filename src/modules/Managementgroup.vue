<template>
  <div>
    <div class="QXguanli_header">控制中心>游戏中心>权限管理>管理分组</div>
    <div class="QXguanli_main">
      <!-- <div class="QXguanli_main1">
          全部游戏
      </div>-->
      <h2 class="QXguanli_main1">管理分组</h2>
      <div style="display:flex;justify-content: space-between">
        <div class="QXguanli_main2">
          <div class="QXguanli_mains_one" @click="found">
            <div class="QXguanli_mains_one1">新增</div>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div class="QXguanli_table">
        <div class="QXguanli_table1">
          <div class="QXguanli_td21">角色名</div>
          <div class="QXguanli_td21">人数</div>
          <div class="QXguanli_td21">操作</div>
        </div>
        <div>
          <div class="QXguanli_td2" v-for="(item,index) in datalist" :key="index">
            <div class="QXguanli_td1">{{item.name}}</div>
            <div class="QXguanli_td1">{{item.group_access_count}}</div>
            <div class="QXguanli_td1">
              <div class="QXguanli_xinxi1" @click="basic(item)">查看</div>
              <div class="QXguanli_shanchu1" @click="deletes(item)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增11 -->
    <Modal class="QXguanli_fenzus" v-model="qxmodal1" title="新增分组" width="800px">
      <div slot="footer">
        <Button @click="quxiao">取消</Button>
        <Button type="primary" @click="xiayibu">下一步</Button>
      </div>

      <div style="display:flex">
        <div class="QXguanli_fenzu1s">
          <div class="QXguanli_fenzu3">基础信息</div>
        </div>
        <div class="QXguanli_fenzuone">
          <div>
            <label for class="QXguanli_fenzu_label">上级分组</label>
            <Select v-model="model31" style="width:240px">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
          <div style=" margin-top: 12px">
            <label for class="QXguanli_fenzu_label">分组名</label>
            <input type="text" class="QXguanli_fenzu_input" v-model="fenzu_name" maxlength="10" />
          </div>
          <div class="QXguanli_fenzu_texts">
            <span class="QXguanli_fenzu_text1">描述该角色的主要职责，如</span>
            <span class="QXguanli_fenzu_text2">文章管理员</span>
            <span class="QXguanli_fenzu_text1">等</span>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 新增2 -->
    <!-- 弹框 -->
    <Modal class="QXguanli_fenzus" width="800px" height="578px" v-model="modal12" title="新增分组">
      <div slot="footer">
        <Button @click="shangyibu">上一步</Button>
        <Button type="primary" @click="submit">确定</Button>
      </div>
      <div style="display:flex">
        <div class="QXguanli_fenzu1s">
          <div
            @click="click0(item)"
            v-for="(item,index) in fenzu"
            :key="index"
            :class="indexs==index?'QXguanli_fenzu2':'QXguanli_fenzu3'"
          >{{item.name}}</div>
        </div>
        <div v-if="indexs==0" class="QXguanli_fenzutwo">
          <!-- 选择游戏 -->
          <div class="QXguanli_fenzutwo1">
            <div class="QXguanli_fenzutwo11">
              <h4 class="QXguanli_fenzutwo111">选择游戏</h4>
              <input class="QXguanli_fenzutwo112" type="text" placeholder="搜索" />
              <img class="QXguanli_fenzutwo113" src="../assets/search.png" alt />
            </div>
            <div class="QXguanli_fenzutwo12">
              <div v-for="(item,index) in checkboxSs" :key="index">
                <!-- <input type="checkbox" :checked="item.status" @click="QXyouxi(item)" /> -->
                <Checkbox v-model="item.status" @on-change="QXyouxi(item)">{{item.name}}</Checkbox>
                <!-- {{item.name}} -->
              </div>
            </div>
          </div>
          <div class="QXguanli_fenzutwo13">
            <h3 class="QXguanli_fenzutwo13_h3">选择渠道</h3>

            <div class="QXguanli_fenzutwo13_main1">
              <div v-for="(item,index) in messages" :key="index">
                <div class="QXguanli_fenzutwo13_line">
                  <div>
                    <div class="QXguanli_fenzutwo13_name">{{item.name}}</div>
                    <Checkbox
                      :indeterminate="item.statu"
                      :value="item.statux"
                      @click.prevent.native="handleCheckAll(item)"
                    >全选</Checkbox>
                  </div>
                  <CheckboxGroup v-model="item.msg1" @on-change="checkAllGroupChange(item)">
                    <Checkbox
                      :label="items.id"
                      v-for="(items,i) in item.data"
                      :key="i"
                      v-model="items.status"
                    >{{items.name}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="indexs==1" class="QXguanli_fenzuthree1">
          <div class="QXguanli_fenzutwo13_main1">
            <div v-for="(item,index) in checkboxSX" :key="index">
              <div class="QXguanli_fenzutwo13_line">
                <div>
                  <Checkbox
                    :indeterminate="item.statu"
                    :value="item.statux"
                    @click.prevent.native="handleCheckAlls(item)"
                  >{{item.name}}</Checkbox>
                </div>
                <CheckboxGroup v-model="item.msg1" @on-change="checkAllGroupChanges(item)">
                  <Checkbox
                    :label="items.id"
                    v-for="(items,i) in item.child"
                    :key="i"
                    v-model="items.status"
                  >{{items.name}}</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 修改1 -->
    <Modal class="QXguanli_fenzus" v-model="qxmodal2" title="修改分组" width="800px">
      <div slot="footer">
        <Button>取消</Button>
        <Button type="primary" @click="xiayibus">下一步</Button>
      </div>

      <div style="display:flex">
        <div class="QXguanli_fenzu1s">
          <div class="QXguanli_fenzu3">基础信息</div>
        </div>
        <div class="QXguanli_fenzuone">
          <div>
            <label for class="QXguanli_fenzu_label">上级分组</label>
            <Select v-model="model31" style="width:240px" disabled>
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </div>
          <div style=" margin-top: 12px">
            <label for class="QXguanli_fenzu_label">分组名</label>
            <input type="text" class="QXguanli_fenzu_input" v-model="fenzu_name" maxlength="10" />
          </div>
          <div class="QXguanli_fenzu_texts">
            <span class="QXguanli_fenzu_text1">描述该角色的主要职责，如</span>
            <span class="QXguanli_fenzu_text2">文章管理员</span>
            <span class="QXguanli_fenzu_text1">等</span>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 修改2 -->
    <!-- 弹框 -->
    <Modal class="QXguanli_fenzus" width="800px" height="578px" v-model="modal21" title="修改分组">
      <div slot="footer">
        <Button @click="shangyibus">上一步</Button>
        <Button type="primary" @click="submits">确定</Button>
      </div>
      <div style="display:flex">
        <div class="QXguanli_fenzu1s">
          <div
            @click="click0(item)"
            v-for="(item,index) in fenzu"
            :key="index"
            :class="indexs==index?'QXguanli_fenzu2':'QXguanli_fenzu3'"
          >{{item.name}}</div>
        </div>
        <div v-if="indexs==0" class="QXguanli_fenzutwo">

          <!-- 选择游戏 -->
          <div class="QXguanli_fenzutwo1">
            <div class="QXguanli_fenzutwo11">
              <h4 class="QXguanli_fenzutwo111">选择游戏</h4>
              <input class="QXguanli_fenzutwo112" type="text" placeholder="搜索" />
              <img class="QXguanli_fenzutwo113" src="../assets/search.png" alt />
            </div>
            <div class="QXguanli_fenzutwo12">
              <div v-for="(item,index) in checkboxMsg" :key="index">
                <Checkbox v-model="item.status" @on-change="QXyouxis(item)">{{item.name}}</Checkbox>
              </div>
            </div>
          </div>
          <div class="QXguanli_fenzutwo13">
            <h3 class="QXguanli_fenzutwo13_h3">选择渠道</h3>

            <div class="QXguanli_fenzutwo13_main1">
              <div v-for="(item,index) in messages" :key="index">
                <div class="QXguanli_fenzutwo13_line">
                  <div>
                    <div class="QXguanli_fenzutwo13_name">{{item.name}}</div>
                    <Checkbox
                      :indeterminate="item.statu"
                      :value="item.statux"
                      @click.prevent.native="handleCheckAllxiugai(item)"
                    >全选</Checkbox>
                  </div>
                  <CheckboxGroup
                    v-model="item.channelId"
                    @on-change="checkAllGroupChangexiugai(item)"
                  >
                    <Checkbox
                      :label="items.id"
                      v-for="(items,i) in item.data"
                      :key="i"
                    >{{items.name}}</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 功能权限 -->
        <div v-if="indexs==1" class="QXguanli_fenzuthree1">
          <div class="QXguanli_fenzutwo13_main1">
            <div v-for="(item,index) in checkboxSX" :key="index">
              <div class="QXguanli_fenzutwo13_line">
                <div>
                  
                  <Checkbox
                    :indeterminate="item.statu"
                    :value="item.statux"
                    @click.prevent.native="handleCheckAllsxiugai(item)"
                  >{{item.name}}</Checkbox>
                </div>

                <CheckboxGroup v-model="item.menu_id" @on-change="checkAllGroupChangesxiugai(item)">

                  <Checkbox
                    :label="items.id"
                    v-for="(items,i) in item.child"
                    :key="i"
                    v-model="items.status"
                  >{{items.name}}</Checkbox>

                </CheckboxGroup>
              </div>
            </div>
          </div>
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
      // 修改的变量1
      id: "",
      // 控制的修改
      qxmodal2: false,
      modal21: false,
      datalist: "",
      fenzu_name: "",
      // 新增的游戏修改
      checkboxSs: [],
      // 第二个新增游戏的修改
      checkboxMsg: [],
      checkboxSX: [],
      sjsjk: true,
      model31: 0,
      indexs: 0,
      model1: 0,
      model11: 0,
      model123: 0,
      modal12: false,
      fenzu: [{ id: 0, name: "游戏权限" }, { id: 1, name: "功能权限" }],
      cityList: [],
      qxmodal1: false,
      // 提交得游戏数据变量
      messages: [],
      msgs1: [],
      menu_info: []
    };
  },
  methods: {
    quxiao: function() {
      this.qxmodal1 = false;
    },
    deletes: function(item) {
      console.log(item);
      this.$delete("api/v1/rbac/group?id=" + item.id).then(res => {
        if ((res.code = 200)) {
          this.$Message.success("删除成功");
          this.infoData();
        }
      });
    },
    infoData: function() {
      this.$get("api/v1/rbac/group").then(res => {
          if(res.code==200){
             this.datalist = res.data.data;
          }
      });
    },
    shangyibu: function() {
      this.qxmodal1 = true;
      this.modal12 = false;
    },
    shangyibus: function() {
      this.qxmodal2 = true;
      this.modal21 = false;
    },
    // 功能权限 添加
    handleCheckAlls(data) {
      // 判断按钮状态  存在为1 点击为空见

      if (data.statu) {
        data.statux = false;
        data.statu = false;
        console.log("进入");
      } else {
        data.statu = false;
        data.statux = !data.statux;
        console.log("出去");
      }
      console.log(data);
      if (!data.statux) {
        data.msg1 = [];
      } else {
        data.msg1 = [];
        data.child.forEach(function(items) {
          data.msg1.push(items.id);
        });

        data.statux = true;
        data.statu = false;
      }
    },
    // 游戏权限 添加
    handleCheckAll(data) {
      // 判断按钮状态  存在2 点击为空间
      if (data.statu) {
        data.statux = false;
        data.statu = false;
      } else {
        data.statu = false;
        data.statux = !data.statux;
      }
      if (!data.statux) {
        data.msg1 = [];
      } else {
        data.msg1 = [];
        data.data.forEach(function(items) {
          data.msg1.push(items.id);
        });
        console.log(data.msg1, "65165");
        data.statux = true;
        data.statu = false;
      }
    },
    // 修改游戏
    handleCheckAllxiugai(data) {
      // 判断按钮状态  存在3 点击为空间
      if (data.statu) {
        data.statux = false;
        data.statu = false;
      } else {
        data.statu = false;
        data.statux = !data.statux;
      }
      if (!data.statux) {
        data.channelId = [];

        console.log(this.messages, "选中游戏1");
      } else {
        data.channelId = [];
        data.data.forEach(function(items) {
          data.channelId.push(items.id);
        });
        console.log(data.channelId, "651615");
        // console.log(this.messages, "选中游戏1");
        data.statux = true;
        data.statu = false;
      }
    },
    // 功能修改
    handleCheckAllsxiugai(data) {
      // 判断按钮状态  存在 点击为空
      if (data.statu) {
        data.statux = false;
        data.statu = false;
        console.log("进入");
      } else {
        data.statu = false;
        data.statux = !data.statux;
        console.log("出去");
      }
      console.log(data);
      if (!data.statux) {
        data.menu_id = [];
      } else {
        data.menu_id = [];
        data.child.forEach(function(items) {
          data.menu_id.push(items.id);
        });

        data.statux = true;
        data.statu = false;
      }
    },
    checkAllGroupChanges(data) {
      if (data.child.length == data.msg1.length) {
        data.statu = false;
        data.statux = true;
        return;
      }
      if (data.msg1.length > 0) {
        data.statu = true;
        data.statux = false;
        return;
      }

      data.statu = false;
      data.statux = false;
    },
    checkAllGroupChange(data) {
      // 选中的 数组 和所有数组 一样 则为选中
      if (data.data.length == data.msg1.length) {
        data.statu = false;
        data.statux = true;
        return;
      }
      if (data.msg1.length > 0) {
        data.statu = true;
        data.statux = false;
        return;
      }
      data.statu = false;
      data.statux = false;
    },
    // 修改游戏渠道
    checkAllGroupChangexiugai(data) {
      // 选中的 数组 和所有数组 一样 则为选中
      if (data.data.length == data.channelId.length) {
        data.statu = false;
        data.statux = true;
        return;
      }
      if (data.channelId.length > 0) {
        data.statu = true;
        data.statux = false;
        return;
      }
      data.statu = false;
      data.statux = false;
    },
    checkAllGroupChangesxiugai(data) {
      console.log(data);
      if (data.child.length == data.menu_id.length) {
        data.statu = false;
        data.statux = true;
        return;
      }
      if (data.menu_id.length > 0 && data.menu_id.length < data.child.length) {
        data.statu = true;
        data.statux = false;
        return
      }
      data.statu = false;
      data.statux = false;
    },
    // 跳转基本信息页面
    basic: function(item) {
      this.checkboxMsg = [];
      this.messages = [];
      this.qxmodal2 = true;
      this.id = item.id;
      this.menu_info=[]
      this.checkboxSX=[]
      this.$get("api/v1/rbac/list/group").then(res => {
        this.cityList = res.data.data;
        this.cityList.unshift({ id: 0, name: "顶级" });
      });
      this.$get("api/v1/rbac/group/" + this.id + "").then(res => {
        (this.fenzu_name = res.data.data.name),
          (this.model31 = res.data.data.top_id);
      });
    },
    //   创建游戏
    found: function() {
      this.indexs = 0;
      this.fenzu_name = "";
      (this.model31 = 0), (this.messages = []);
      this.checkboxSX = [];
      this.$get("api/v1/rbac/list/group").then(res => {
        this.cityList = res.data.data;
        this.cityList.unshift({ id: 0, name: "顶级" });
      });
      this.qxmodal1 = true;
    },
    click0: function(item) {
      this.indexs = item.id;
    },
    QXyouxi: function(val) {
      var that = this;
      if (val.status) {
        that
          .$get("api/v1/rbac/game/channel", {
            game_id: val.id,
            top_id: this.model31
          })
          .then(res => {
            res.data.statux = false;
            res.data.statu = false;
            res.data.name = val.name;
            res.data.game_id = val.id;
            this.messages.push(res.data);
            console.log(this.messages, "选中游戏1");
          });
      } else {
        for (var int = 0; int < this.messages.length; int++) {
          if (this.messages[int].game_id == val.id) {
            this.messages.splice(int, 1);
          }
        }
        console.log(this.messages, "选中游戏2");
      }
    },
    QXyouxis: function(val) {
      console.log(val, "是否");
      var that = this;
      if (val.status) {
        that
          .$get("api/v1/rbac/game/channel", {
            game_id: val.id,
            top_id: this.model31,
            id: that.id
          })
          .then(res => {
            res.data.name = val.name;
            res.data.game_id = val.id;
            if (res.data.channelId.length == res.data.data.length) {
              res.data.statux = true;
              res.data.statu = false;
            } else if (res.data.channelId.length < res.data.data.length && res.data.channelId.length!=0) {
              res.data.statux = false;
              res.data.statu = true;
            } else {
              res.data.statu = false;
              res.data.statux = false;
            }
            that.messages.push(res.data);
            console.log(that.messages, "选中游戏1");
          });
      } else {
        for (var int = 0; int < that.messages.length; int++) {
          if (that.messages[int].game_id == val.id) {
            that.messages.splice(int, 1);
          }
        }
      }
    },
    // 点击下一步
    xiayibu: function() {
      if (this.fenzu_name == "") {
        this.$Message.warning("输入分组名");
        return;
      }

      this.$get("api/v1/rbac/check/group", {
        name: this.fenzu_name
      }).then(res => {
        if (res.code == 10062) {
          this.$Message.warning(res.message);
        } else if (res.code == 10002) {
          this.$Message.warning(res.message);
        } else {
          this.qxmodal1 = false;
          this.modal12 = true;
          this.$get("api/v1/rbac/game", {
            top_id: this.model31
          }).then(res => {
            // 游戏权限得数据
            this.checkboxSs = res.data.data;
          });
          this.$get("api/v1/rbac/menu", {
            top_id: this.model31
          }).then(res => {
            // 游戏权限得数据

            res.data.data.forEach(function(item) {
              item.statu = false;
              item.statux = false;
            });
            this.checkboxSX = res.data.data;
            console.log(this.checkboxSX, "数据");
          });
        }
      });
    },
    // 修改的下一步
    xiayibus: function() {
      var that = this;
      if (this.fenzu_name == "") {
        this.$Message.warning("输入分组名");
        return;
      }
      this.qxmodal2 = false;
      this.modal21 = true;
      this.$get("api/v1/rbac/game", {
        top_id: this.model31,
        id: this.id
      }).then(res => {
        // 修改的游戏数据
        this.checkboxMsg = res.data.data;
        console.log(this.checkboxMsg, "修改");
        this.checkboxMsg.forEach(function(item) {
          if (item.status) {
            that
              .$get("api/v1/rbac/game/channel", {
                game_id: item.id,
                top_id: that.model31,
                id: that.id
              })
              .then(res => {
                res.data.name = item.name;
                res.data.game_id = item.id;
                if (res.data.channelId.length == res.data.data.length) {
                  res.data.statux = true;
                  res.data.statu = false;
                } else if (res.data.channelId.length < res.data.data.length) {
                  res.data.statux = false;
                  res.data.statu = true;
                } else {
                  res.data.statu = false;
                  res.data.statux = false;
                }
                that.messages.push(res.data);
              });
          }
        });
      });
      // 功能权限数据
      this.$get("api/v1/rbac/menu", {
        top_id: this.model31,
        id: this.id
      }).then(res => {
        // 游戏权限得数据
        res.data.data.forEach(function(item) {
          if (item.child.length == item.menu_id.length) {
            item.statux = true;
            item.statu = false;
          } else if (
            item.menu_id.length < item.child.length &&
            item.menu_id.length != 0
          ) {
            item.statux = false;
            item.statu = true;
          } else {
            item.statu = false;
            item.statux = false;
          }
        });
        this.checkboxSX = res.data.data;
        console.log(this.checkboxSX, "数据");
      });
    },
    // 提交
    submit: function() {
      var submits = [];
      var that = this;
      console.log(this.messages);
      this.messages.forEach(function(item) {
        var i = {};

        if (item.msg1 && item.msg1.length > 0) {
          let arr = { channel: item.msg1, game: item.game_id };
          submits.push(arr);
        }
      });
      this.checkboxSX.forEach(function(item) {
        if (item.msg1) {
          that.menu_info.push(item.msg1.toString());
        }
      });
      this.$post("/api/v1/rbac/group", {
        game_info: JSON.stringify(submits),
        name: this.fenzu_name,
        top_id: this.model31,
        menu_info: this.menu_info.toString()
      }).then(res => {
        if (res.code == 200) {
          this.modal12 = false;
          this.infoData();
          this.$Message.success("添加成功");
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    submits:function(){
         var submits = [];
      var that = this;
    
      this.messages.forEach(function(item) {
        var i = {};

        if (item.channelId && item.channelId.length > 0) {
          let arr = { channel: item.channelId, game: item.game_id };
          submits.push(arr);
        }
      });  
        this.checkboxSX.forEach(function(item) {
        if (item.menu_id && item.menu_id.length>0) {
          that.menu_info.push(item.menu_id.toString());
        }
      });
      this.$put("api/v1/rbac/group",{
        id:that.id,
        game_info:JSON.stringify(submits),
        menu_info:that.menu_info.toString(),
        name:that.fenzu_name
      }).then(res=>{

      })
    }
  },
  mounted() {
    this.infoData();
  }
};
</script>
<style lang="less">
.QXguanli_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.QXguanli_main {
  width: 100%;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
  min-width: 1500px;
  min-height: 600px;
}
.QXguanli_main1 {
  font-size: 16px;
  color: #282c37;
  text-align: left;
  margin-top: 9px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cccccc;
}
.QXguanli_main2 {
  display: flex;
}
.QXguanli_main22 {
  margin-top: 14px;
  margin-left: 10px;
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
.QXguanli_mains_one {
  width: 60px;
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
.QXguanli_mains_one1 {
  font-size: 14px;
}
.QXguanli_img1 {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 6px;
  left: 15px;
}
.QXguanli_input1 {
  width: 160px;
  height: 31px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background-color: #ebebeb;
  padding-left: 35px;
  padding-right: 5px;
  color: #666666;
}
.QXguanli_table1 {
  display: flex;

  justify-content: space-between;

  border-radius: 3px;
  font-size: 14px;
  color: #282c37;
  background-color: #ebebeb;
  font-weight: bold;
}
.QXguanli_td1 {
  width: 34%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.QXguanli_td21 {
  width: 34%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.QXguanli_table {
  border: 1px solid #d7d7d7;
  border-bottom: none;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-right: none;
  border-radius: 4px;
  max-height: 700px;
  overflow: auto;
}
.QXguanli_td2 {
  display: flex;
  justify-content: space-between;
}
.QXguanli_xinxi1 {
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
.QXguanli_shanchu1 {
  width: 60px;
  height: 26px;
  line-height: 26px;
  color: #ffffff;
  border-radius: 3px;
  background-color: #d9534f;
  cursor: pointer;
}
.QXguanli_model1 {
  display: flex;
  margin-left: 172px;
  margin-bottom: 30px;
  line-height: 30px;
  position: relative;
}
.QXguanli_model1 label {
  width: 100px;
  margin-right: 15px;
  text-align: right;
  line-height: 30px;
}
.QXguanli_model1_input1 {
  width: 420px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #999999;
  padding-left: 15px;
}
.QXguanli_err {
  position: absolute;
  font-size: 12px;
  color: #a2a8b3;
  left: 134px;
  top: 30px;
}
.QXguanli_file {
  width: 146px;
  height: 146px;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
.QXguanli_files {
  width: 146px;
  height: 146px;
  position: absolute;
  left: 115px;
  background-image: url(../assets/file1.png);
  background-size: 100% 100%;
  cursor: pointer;
}
.ivu-btn-text {
  border: 1px solid #999999;
}
.ivu-btn-text:hover {
  background-color: #599ae7;
  color: #ffffff;
}
.ivu-btn-primary {
  background-color: #599ae7;
}
.QXguanli_fenzus .ivu-modal-body {
  padding: 0 !important;
}
.QXguanli_fenzu1s {
  height: 330px;
  width: 160px;
  border-right: 1px solid #e8eaec;
}
.QXguanli_fenzu2 {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #e8eaec;
  text-align: center;
  background-color: #f5f5f5;
  cursor: pointer;
}
.QXguanli_fenzu3 {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #e8eaec;
  text-align: center;
  cursor: pointer;
}
.QXguanli_fenzu_text1 {
  font-size: 12px;
  color: #a2a8b3;
}
.QXguanli_fenzu_text2 {
  font-size: 12px;
  color: #333;
}
.QXguanli_fenzu_label {
  width: 80px;
  text-align: right;
  display: inline-block;
  margin-right: 20px;
  color: #333;
}
.QXguanli_fenzu_input {
  width: 240px;
  height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding-left: 15px;
}
.QXguanli_fenzu_texts {
  margin-left: 107px;
}
.QXguanli_fenzuone {
  margin: 38px auto;
}
.QXguanli_fenzutwo {
  padding: 20px;
  display: flex;
}
.QXguanli_fenzutwo1 {
  width: 220px;
  height: 290px;
  border: 1px solid #cccccc;
  border-radius: 6px;
}
.QXguanli_fenzutwo11 {
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  margin-top: 10px;
}
.QXguanli_fenzutwo111 {
  font-size: 14px;
  color: #282c37;
}
.QXguanli_fenzutwo112 {
  width: 120px;
  height: 24px;
  border-radius: 20px;
  background-color: #ebebeb;
  border: none;
  padding-left: 15px;
  padding-right: 44px;
  font-size: 12px;
  margin-left: 10px;
}
.QXguanli_fenzutwo113 {
  width: 14px;
  height: 14px;
  position: absolute;
  right: 45px;
  top: 5px;
  cursor: pointer;
}
.QXguanli_fenzutwo12 {
  margin-top: 20px;
  max-height: 210px;
  overflow: auto;
}
.QXguanli_fenzutwo13 {
  width: 370px;
  max-height: 290px;
  border: 1px solid #cccccc;
  margin-left: 10px;
  border-radius: 15px;
  padding: 15px;
}
.QXguanli_fenzutwo13_line {
  border: 1px solid #cccccc;
  border-radius: 15px;
  padding: 18px;
  position: relative;
  margin-top: 20px;
}
.QXguanli_fenzutwo13_h3 {
  margin-bottom: 15px;
}
.QXguanli_fenzutwo13_main1 {
  max-height: 200px;
  overflow: auto;
}
.QXguanli_fenzutwo13_name {
  background-color: #ffffff;
  position: absolute;
  top: -12px;
}
.QXguanli_fenzuthree1 {
  width: 600px;
  height: 290px;
  border: 1px solid #333;
  margin-left: 20px;
  margin-top: 14px;
}
</style>