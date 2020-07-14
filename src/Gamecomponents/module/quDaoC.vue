<template>
  <div>
    <div class="paybanned_header">游戏中心>SDK聚合工具>渠道参数配置</div>
    <div class="content-box">
      <div class="container">
        <div class="title">
          <span>渠道参数</span>
        </div>
        <div class="content">
            <Button type="primary" class="btn" @click="addqudao">+添加渠道</Button>
            <div>
                <Table border  :columns="columns1" :data="qudaoList"></Table>
            </div>
        </div>

        <Modal
        v-model="modal1"
        title="添加渠道"
        width="680"
        @on-ok="addok"
        okText="添加"
        :loading="loading"
        @on-cancel="cancel">
          <div class="pop-box">
            <div class="pop-title">
              <!-- <span>选择渠道 ( 已选择{{qudaoNum}}家 )</span> -->
              <!-- <Input @on-change="onChange_search" v-model="searchs" suffix="ios-search" placeholder="请输入渠道名称" style="width: auto;" /> -->
              <div style="position: relative;display: flex; align-items: center; margin-left: 338px;">
                <input @keyup="onChange_search" v-model="searchs" class="paybanned_model1_right11_input1" type="text" placeholder="请输入渠道名称" />
                <img class="paybanned_model1_right11_img1" src="../../assets/search.png" alt />
              </div>
            </div>
            <div class="pop-content">
              <CheckboxGroup v-model="fruit" @on-change="on_select">
                <Checkbox :label="item.id" v-for="(item,index) in this.brr" :key="index">{{item.name}}</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
      </Modal>
      <Modal
      class="QXguanli_fenzus"
      width="1000px"
      height="703px"
      v-model="modal2"
      title="渠道参数配置"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div style="display:flex">
        <div class="QXguanli_fenzu1">
          <div
            @click="click0(item)"
            v-for="(item,index) in fenzu"
            :key="index"
            :class="indexs==index?'QXguanli_fenzu2':'QXguanli_fenzu3'"
          >{{item.name}}</div>
        </div>
        <div v-if="indexs==0" class="QXguanli_fenzuone" ref="fenzuone" id="fenzuone">
          <div style="padding:12px 0 20px 20px"><span class="md1-title">{{qudaoData[0].name}}</span></div>
          <div class="md1-text" v-html="this.qudaoData[0].title">
            <!-- <p>若充值界面提示“出错了”，抱歉，由于系统原因当前无法支付</p>
            <p>1.检查回调地址是否已在UC后台进行配置</p>
            <p>2.需要游戏现在UC开放平台完成在线签约，签署成功后才能打开支付</p>
            <p>如确认以上两点配置好，且合同签署成功，但仍无法支付，请联系UC技术接口人核查支付权限是否已开通</p> -->
          </div>
          <div class="md1-tt"><span style="font-weight: bold;">客户端参数 <span style="font-weight: normal;">(修改客户端参数需重新打包，不会影响线上)</span></span></div>
          <div class="md1-inputbox" v-for="(item,index) in qudaoData[0].client_setting" >
            <div>
              <span class="span2">{{item.name}}</span>
              <Input v-if="!item.select" v-model="item.value" placeholder="" style="width: 300px;height:30px;" />
              <Select v-if="item.name == '是否需要使用19分成'" v-model="item.value" style="width: 300px;height:30px;">
                  <Option v-for="item in direction1" :value="`${item.value}`" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-if="item.name == '横竖屏设置'" v-model="item.value" style="width: 300px;height:30px;">
                  <Option v-for="item in direction" :value="`${item.value}`" :key="item.value">{{ item.label }}</Option>
              </Select>
              <p  class="ps">{{item.title}}</p>
            </div>
            <!-- <div>
              <span class="span2">客户端ID</span>
              <Input v-model="yx_name" placeholder="渠道参数" style="width: 300px;height:30px;" />
            </div>
            <div>
              <span class="span2">客户端KEY</span>
              <Input v-model="yx_name" placeholder="渠道参数" style="width: 300px;height:30px;" />
            </div> -->
          </div>
          <div class="md1-tt"><span style="font-weight: bold;">服务端端参数 <span style="font-weight: normal;">(修改服务器参数会即时影响线上游戏，请谨慎操作)</span></span></div>
          <div class="md1-inputbox" v-for="(item,index) in qudaoData[0].service_setting" >
            <div>
              <span class="span2">{{item.name}}</span>
              <Input v-model="item.value" placeholder="" style="width: 300px;height:30px;" />
              <p  class="ps">{{item.title}}</p>
            </div>
          </div>
          <div class="md1-tt"><span style="font-weight: bold;">其它参数 <span style="font-weight: normal;">(修改其它参数需要重新打包)</span></span></div>
          <div class="md1-inputbox" v-for="(item,index) in qudaoData[0].other" >
            <div>
              <span class="span2">{{item.name}}</span>
              <Input v-if="!item.select" v-model="item.value" placeholder="" style="width: 300px;height:30px;" />
              <Select v-if="item.name == '是否需要使用19分成'" v-model="item.value" style="width: 300px;height:30px;">
                  <Option v-for="item in direction1" :value="`${item.value}`" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-if="item.name == '横竖屏设置'" v-model="item.value" style="width: 300px;height:30px;">
                  <Option v-for="item in direction" :value="`${item.value}`" :key="item.value">{{ item.label }}</Option>
              </Select>
              <p  class="ps">{{item.title}}</p>
            </div>
            <!-- <div>
              <span class="span2"></span>
              <Select v-model="model1" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div> -->
          </div>
        </div>

        <div v-if="indexs==1" class="QXguanli_fenzutwo">
          <div class="icon">
            <p style="font-size: 18px;">上传带有角标的ICON</p>
            <input type="file" class="guanli_file">
            <div class="guanli_files">

            </div>
            <div class="icon-text" style="margin-top:30px;">*如渠道有特定角标的要求，请上传带有渠道角标的图标，否则使用游戏包的默认图标;</div>
            <div class="icon-text">*必须上传PNG格式的图片;建议图片大小：512*512。</div>
            <div class="icon-text">*iOS游戏建议不要包含透明度。</div>
          </div>
        </div>
        <div v-if="indexs==2" class="QXguanli_fenzutwo">
          <div class="icon">
            <input type="file" class="guanli_file">
            <div class="guanli_files" style="top:0;">

            </div>
            <div class="icon-text">*渠道包闪屏，闪屏顺序根据添加的顺序展现，拖动缩略图可调整顺序。</div>
            <div class="icon-text">*必须上传PNG格式的图片;建议横屏游戏1280*768，竖屏游戏768*1280</div>
          </div>
        </div>
        <div v-if="indexs==3" :class="item.shop_id? 'table-box' : 'shopping'" v-for="item in qudaoData">
          <h2 v-if="!item.shop_id" style="color: #777;font-weight: 400;text-align: center;font-size: 22px;margin-top:20px;">该渠道无需配置商品信息</h2>
          <div v-if="item.shop_id">
            <!-- <div class="pop-table">
              <div class="td" style="width:30%;">商品ID</div>
              <div class="td" style="width:30%;">渠道商品ID</div>
              <div class="td" style="width:40%;">操作</div>
            </div> -->
            <table style="width: 100%;" id="setDataTable">
              <tbody><tr>
                <td width="30%">商品ID</td>
                <td width="30%">渠道商品ID</td>
                <td width="40%">操作</td>
              </tr>
              <tr id="addSettr" v-for="(item,index) in shopList" :key="index">
                <td><span style="width:80%; height: 24px;line-height: 24px;text-align: center;border: none;">{{item.shop_id}}</span></td>
                <td><span style="width:80%; height: 24px;line-height: 24px;text-align: center;border: none;">{{item.channel_id}}</span></td>
                <td><a href="javascript:;" class="addTableAddButton addSet" @click="delete_qudaoShop(index)">删除</a></td>
              </tr>
              <tr id="addSettr">
                <td><input v-model="shopInput1" type="text" class="set_name" placeholder="goodsConf" style="width:80%; height: 24px;line-height: 24px;text-align: center;border: none;"></td>
                <td><input v-model="shopInput2" type="text" class="set_amount" placeholder="请输入渠道商品ID" style="width:80%; height: 24px;line-height: 24px;text-align: center;border: none;"></td>
                <td><a href="javascript:;" class="addTableAddButton addSet" @click="add_qudaoShop">添加</a></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="delCheck"
      title="确认删除该条记录吗?"
      @on-ok="deleteOk"
      @on-cancel="cancel"
    >确认删除吗</Modal>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      loading: true,
      poptitle: "",
      delCheck: false,
      searchs: "",
      direction: [
        {
          value: "landscape",
          label: "landscape"
        },
        {
          value: "portrait",
          label: "portrait"
        }
      ],
      direction1: [
        {
          value: "true",
          label: "true"
        },
        {
          value: "false",
          label: "false"
        }
      ],
      yx_name: "",
      yes: require("../../assets/yes.png"),
      no: require("../../assets/no.png"),
      fruit: [],
      arr: [],
      brr: [],
      qudaoList: [],
      qudaoNum: "0",
      fenzu: [
        { id: 0, name: "基础配置" },
        { id: 1, name: "ICON" },
        { id: 2, name: "闪屏" },
        { id: 3, name: "渠道商品ID" }
      ],
      indexs: 0,
      columns1: [
        {
          title: "渠道Code",
          key: "id",
          align: "center",
          sortable: true, //开启排序
          sortType: "asc"
          // width:'153px'
        },
        {
          title: "渠道名称",
          key: "channel_name",
          align: "center"
          // width:'285px'
        },
        {
          title: "SDK版本",
          key: "sdk_version",
          align: "center"
          // width:'134px'
        },
        {
          title: "包名/bundleID",
          key: "package_name",
          align: "center"
          // width:'260px'
        },
        {
          title: "商品",
          key: "channal",
          align: "center",
          render: (h, params) => {
            let name = h("img", {
              style: {
                width: "26px",
                height: "26px",
                verticalAlign: "middle"
              },
              attrs: {
                src: this.yes
              }
            });
            if (params.row.channal == 0) {
              name = h("img", {
                style: {
                  width: "26px",
                  height: "26px",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: this.no
                }
              });
            }
            return name;
          }
          // width:'159px'
        },
        {
          title: "ICON",
          key: "icon",
          align: "center",
          render: (h, params) => {
            let name = h("img", {
              style: {
                width: "26px",
                height: "26px",
                verticalAlign: "middle"
              },
              attrs: {
                src: this.yes
              }
            });
            if (params.row.icon == 0) {
              name = h("img", {
                style: {
                  width: "26px",
                  height: "26px",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: this.no
                }
              });
            }
            return name;
          }
          // width:'168px'
        },
        {
          title: "配置状态",
          key: "setting",
          align: "center",
          render: (h, params) => {
            let name = h("img", {
              style: {
                width: "26px",
                height: "26px",
                verticalAlign: "middle"
              },
              attrs: {
                src: this.yes
              }
            });
            if (params.row.setting == 0) {
              name = h("img", {
                style: {
                  width: "26px",
                  height: "26px",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: this.no
                }
              });
            }
            return name;
          }
          // width:'186px'
        },
        {
          title: "操作",
          key: "age",
          align: "center",
          // width:'291px',
          render: (h, params) => {
            return h("div", { style: { minWidth: "100px" } }, [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "14px",
                    width: "60px",
                    height: "26px"
                  },
                  on: {
                    click: () => {
                      this.qudaoPz(params.row.id, params.row.channel_name);
                    }
                  }
                },
                "配置"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    width: "60px",
                    height: "26px"
                  },
                  on: {
                    click: () => {
                      this.deleteOpen(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      id: "",
      gid: "",
      shopList: [],
      shopInput1: "",
      shopInput2: "",
      qudaoData: [
        {
          name: "小米",
          client_setting: [
            { name: "app_id", value: "", title: "" },
            { name: "app_key", value: "", title: "" }
          ],
          service_setting: [
            { name: "app_id", value: "", title: "" },
            { name: "app_key", value: "", title: "" },
            { name: "app_ecret", value: "", title: "" }
          ],
          other: [{ name: "bundle_id", value: "" }]
        }
      ],
      qudaototle: [
        {
          name: "小米",
          title:
            "<p>1.在渠道后台配置收费类型时按“任意金额付费”<br>2.在渠道后台配置应用内支付后才可登陆测试。<br>3.包体包名与小米后台不一致时包体会无法登陆。 3.小米现版本只有使用小米账号登陆才会弹出登陆框，其他第三方支付不会弹出，点击退出按钮会直接退出游戏。&nbsp;&nbsp;<br></p>",
          client_setting: [
            { name: "appid", value: "", title: "渠道参数", key: "app_id" },
            { name: "appkey", value: "", title: "渠道参数", key: "app_key" }
          ],
          service_setting: [
            { name: "appid", value: "", title: "渠道参数", key: "app_id" },
            { name: "appkey", value: "", title: "渠道参数", key: "app_key" },
            {
              name: "appsecret",
              value: "",
              title: "渠道参数",
              key: "app_secret"
            }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title:
                "一般以.mi结尾，注意填入包名需与小米后台一致，否则包体无法登陆",
              key: "bundle_id"
            }
          ]
        },
        {
          name: "UC(九游)",
          title:
            "<p>若充值界面提示“出错了，抱歉，由于系统原因当前无法支付”<br>1.检查回调地址是否已在UC后台进行配置<br>2.需要游戏现在UC开放平台完成在线签约，签署成功后才能打开支付<br>如确认以上两点配置好，且合同签署成功，但仍无法支付，请联系UC技术接口人核查支付权限是否已开通&nbsp;&nbsp;<br></p>",
          client_setting: [
            {
              name: "GameId",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "game_id"
            }
          ],
          service_setting: [
            {
              name: "GameId",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "game_id"
            },
            { name: "ApiKey", value: "", title: "渠道参数", key: "api_key" }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以 .aligames结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "landscape 为横屏，portrait 为竖屏",
              key: "horizontal_vertical"
            }
          ]
        },
        {
          name: "百度",
          title: "无需单独配置闪屏，SDK自带闪屏",
          client_setting: [
            {
              name: "APP ID",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "app_id"
            },
            { name: "APP KEY", value: "", title: "渠道参数", key: "app_key" }
          ],
          service_setting: [
            {
              name: "APP ID",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "app_id"
            },
            { name: "APP KEY", value: "", title: "渠道参数", key: "app_key" },
            {
              name: "SECRET KEY",
              value: "",
              title: "渠道参数",
              key: "secret_key"
            }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.baidu结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "landscape 为横屏，portrait 为竖屏",
              key: "horizontal_vertical"
            }
          ]
        },
        {
          name: "360",
          title:
            "<p>1.登录时报错invalid param:appid(错误码400)，是因为新游戏开登录系统需要一定时间去反应,此时应联系渠道进行确认。<br>2.privatekey这个参数是自动计算的，一般不需要改动&nbsp;&nbsp;<br></p>",
          client_setting: [
            { name: "appid", value: "", title: "渠道参数", key: "app_id" }
          ],
          service_setting: [
            { name: "appid", value: "", title: "渠道参数", key: "app_id" },
            {
              name: "appsecret",
              value: "",
              title: "渠道参数",
              key: "app_secret"
            },
            { name: "appkey", value: "", title: "渠道参数", key: "app_key" }
          ],
          other: [
            { name: "appid", value: "", title: "渠道参数", key: "app_id" },
            { name: "appkey", value: "", title: "渠道参数", key: "app_key" },
            {
              name: "bundle_id",
              value: "",
              title:
                "需与提供给渠道的包名保持一致，注意后缀不能为纯数字，会导致apk安装失败。",
              key: "bundle_id"
            },
            {
              name: "privatekey",
              value: "",
              title:
                "privatekey的算法为md5（appSecret#appKey），在线算key地址http://md5.supfree.net/（取32位小写）",
              key: "private_key"
            }
          ]
        },
        {
          name: "应用宝",
          title:"",
          client_setting: [
            { name: "手Q AppID", value: "", key: "qq_app_id" },
            { name: "微信 AppID", value: "", key: "vx_app_id" },
            { name: "MSDK Key", value: "", key: "msdk_key" },
            {
              name: "米大师offerId",
              value: "",
              title: "如果暂未分配,先填入手Q AppID",
              key: "offer_id"
            }
          ],
          service_setting: [
            { name: "MSDK Key", value: "", title: "", key: "msdk_key" }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一定要与应用宝后台包名一致",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "landscape为横屏，portrait为竖屏",
              key: "horizontal_vertical"
            }
          ]
        },
        {
          name: "oppo",
          title:
            "<p>1. OPPO广告SDK：<br>1.1 OPPO广告SDK如要区分买来的量与实际的量，需先处理母包，做个判断“当渠道号为23的时候才取channel和adid“，在userinfo中获取的username就是channel和adid拼接起来的，格式为：channel@@@adid 比如 3@@@1 当没有adid的时候adid是default 比如 1@@@default，只有OPPO这个广告SDK才做了这处理 ，其他的SDK还是正常的，所以需要游戏做个判断，然后再进行打包<br>1.2 注意需在OPPO那边开通了买量服务，才会返回 channel 和 adid 这2个参数<br>1.3 OPPO和Quick后台无法查看区分的量，需要游戏自己做数据区分，游戏客户端获得买量数据 ，然后上传游戏服务端&nbsp;<br>2. OPPO礼包与社区功能：<br>礼包：礼包功能需要游戏服务端自己进行接入<br>社区：社区功能需要游戏母包对接quick的时候加上如下接口，然后再出包<br>Extend.getInstance().callFunction(FuncType.HIDE_TOOLBAR);&nbsp;</p>",
          client_setting: [
            {
              name: "AppId",
              value: "",
              title: "渠道参数，一般为4位左右纯数字",
              key: "app_id"
            },
            { name: "AppKey", value: "", title: "渠道参数", key: "app_key" },
            {
              name: "AppSecret",
              value: "",
              title: "渠道参数",
              key: "app_secret"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "游戏横屏为landscape，竖屏为portrait",
              key: "horizontal_vertical"
            }
          ],
          service_setting: [
            { name: "AppKey", value: "", title: "渠道参数", key: "app_id" },
            {
              name: "AppSecret",
              value: "",
              title: "渠道参数",
              key: "app_secret"
            }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.nearme.gamecenter结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            }
          ]
        },
        {
          name: "vivo",
          title:
            "<p>关于VIVO19分成：<br>1.如游戏需要使用19分成，则下面的参数“是否需要使用19分成”选择true<br>2.需要的信息返回到登录的用户名里面的，用@@@分隔，后面的就是安装信息<br>tring userName2 = userName + @@@ + VivoUnionSDK.getChannelInfo(activity)&nbsp;<br>例如：187****3990@@@null<br>3.游戏需要自己在登录成功的回调里面截取安装信息，先根据渠道号判断是否是vivo渠道，如果不是不用处理用户名；如果是判断quick登录返回的用户名是否包含@@@ (包含安装信息的用户名是username@@@安装信息)， 如果用户名里面包含@@@，游戏客户端需要截取获取用户名， 这个需要游戏母包对接Quick的时候加上&nbsp;&nbsp;<br></p>",
          client_setting: [
            { name: "app-id", value: "", title: "渠道参数", key: "app_id" },
            {
              name: "是否需要使用19分成",
              value: "",
              select: true,
              title: "false不需要,true表示需要",
              key: "divide_into"
            }
          ],
          service_setting: [
            { name: "app-id", value: "", title: "渠道参数", key: "app_id" },
            { name: "cp-id", value: "", title: "渠道参数", key: "cp_id" },
            {
              name: "app-key",
              value: "",
              title: "配置支付的App-key",
              key: "app_key"
            }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.vivo结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "横屏游戏选择landscape,竖屏游戏选择portrait",
              key: "horizontal_vertical"
            },
            { name: "cp-id", value: "", title: "", key: "cp_id" },
            { name: "app-key", value: "", title: "", key: "app_key" }
          ]
        },
        {
          name: "华为",
          title:
            "<p>1.华为的参数需要到华为后台产品服务列表中，分别点“支付”和“游戏”获取，注意支付私钥和游戏私钥为不同参数，不要填错了<br>2.华为渠道需要现在渠道后台配置指纹！否则无法登陆游戏，按照该链接配置：http://developer.huawei.com/consumer/cn/service/hms/catalog/HuaweiJointOperation.html?page=hmssdk_jointOper_prepare<br>3.渠道测试支付花币不到账被打回：可以自己在浮标里面支付，如果自己能到账，重新提交审核即可。如果自己测试支付不到账，请联系QQ596314145<br>4.华为push已接入，直接出包就行<br>5.华为广告SDK数据流已接入，母包需做如下处理，然后再出渠道包：<br>先根据渠道号判断是否为华为渠道，然后调用自定义参数 ，值传入500&nbsp;&nbsp;<br></p>",
          client_setting: [
            {
              name: "APPID",
              value: "",
              title: "来源于开发者联盟网站应用的权益详情",
              key: "app_id"
            },
            {
              name: "CPID",
              value: "",
              title: "来源于开发者联盟网站应用的权益详情",
              key: "cp_id"
            },
            {
              name: "公司名称",
              value: "",
              title: "开发者注册的公司名称",
              key: "company_name"
            },
            {
              name: "游戏公钥",
              value: "",
              title: "华为后台点“游戏”以获取",
              key: "game_gkey"
            },
            { name: "游戏私钥", value: "", title: "", key: "game_skey" },
            { name: "支付公钥", value: "", title: "", key: "payment_gkey" },
            { name: "product_id", value: "", title: "", key: "product_id" },
            {
              name: "client_secret",
              value: "",
              title: "3.0的版本需要配置这个参数，之前的版本直接使用默认值",
              key: "client_secret"
            }
          ],
          service_setting: [
            {
              name: "APPID",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "app_id"
            },
            {
              name: "支付公钥",
              value: "",
              title: "渠道参数，不可包含空格回车",
              key: "payment_gkey"
            },
            {
              name: "支付私钥",
              value: "",
              title: "渠道参数",
              key: "payment_skey"
            },
            { name: "支付ID", value: "", title: "渠道参数", key: "payment_id" }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.huawei结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            }
          ]
        },
        {
          name: "酷派",
          title:
            "<p>点击银行卡支付提示“获取tn为空值998”是正常的，渠道的问题。</p>",
          shop_id: "true",
          client_setting: [
            {
              name: "APP_ID（应用编码）",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "app_id"
            },
            { name: "appkey", value: "", title: "渠道参数", key: "app_key" },
            {
              name: "平台公钥",
              value: "",
              title: "使用酷派SDK2.1.2之后的版本无公钥，可填入任意值。",
              key: "platform_gkey"
            },
            {
              name: "paykey",
              value: "",
              title:
                "使用酷派SDK2.1.2之后的版本才填入该参数，之前版本可填入任一值",
              key: "pay_key"
            }
          ],
          service_setting: [
            {
              name: "APP_ID（应用编码）",
              value: "",
              title: "渠道参数，一般为纯数字",
              key: "app_id"
            },
            { name: "appkey", value: "", title: "渠道参数", key: "app_key" },
            {
              name: "paykey",
              value: "",
              title: "使用酷派SDK2.1.2版本之后的版本填入pay_key值",
              key: "pay_key"
            },
            {
              name: "应用私钥",
              value: "",
              title: "使用酷派SDK2.1.2之后的版本无私钥，可填入任意值。",
              key: "application_skey"
            },
            {
              name: "public_key",
              value: "",
              title: "使用酷派SDK2.1.2之前的平台公钥，没有可填入任意值。",
              key: "public_key"
            }
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.coolpad结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "DataEye_AppId",
              value: "",
              title: "账户和支付共用的AppID",
              key: "dataeye_appid"
            }
          ]
        },
        {
          name: "金立",
          title:"",
          client_setting: [
            { name: "APIKey", value: "", title: "渠道参数", key: "api_key" },
          ],
          service_setting: [
            { name: "APIKey", value: "", title: "渠道参数", key: "api_key" },
            { name: "SecretKey", value: "", title: "渠道参数，不能有空格回车", key: "secret_key" },
            {
              name: "PrivateKey",
              value: "",
              title: "渠道参数，不能有空格回车",
              key: "private_key"
            },
            { name: "PublicKey", value: "", title: "渠道参数，不能有空格回车", key: "public_key" },
            { name: "GameToken", value: "", title: "", key: "game_token" },
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.am结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "landscape为横屏，portrait为竖屏",
              key: "horizontal_vertical"
            },
          ]
        },
        {
          name: "魅族",
          title:"",
          client_setting: [
            { name: "AppID", value: "", title: "渠道参数，一般为纯数字", key: "app_id" },
            { name: "AppKey", value: "", title: "渠道参数", key: "app_key" },
          ],
          service_setting: [
            { name: "AppID", value: "", title: "渠道参数，一般为纯数字", key: "app_id" },
            { name: "AppSecret", value: "", title: "渠道参数，不能有空格回车", key: "app_secret" },
          ],
          other: [
            {
              name: "bundle_id",
              value: "",
              title: "一般以.mz结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "landscape为横屏，portrait为竖屏",
              key: "horizontal_vertical"
            },
          ]
        },
        {
          name: "联想",
          title:"<p>1.联想的浮标只有上架后开通论坛功能才能显示出来。<br>2.如果支付不到账，请到渠道后台配置QuickSDK提供的回调地址。<br>3.支付是需要充值成他们的V币在支付才能充值成元宝，就是要支付两次。这个是正常的。<br>4.渠道自带闪屏，不用再配置闪屏了。&nbsp;&nbsp;<br></p>",
          client_setting: [
            { name: "Open AppId", value: "", title: "渠道参数", key: "apen_appid" },
            { name: "支付秘钥", value: "", title: "渠道参数，不能有空格回车", key: "payment_secret_key" },
          ],
          service_setting: [
            { name: "Open AppId", value: "", title: "渠道参数", key: "apen_appid" },
            { name: "支付秘钥", value: "", title: "渠道参数，不能有空格回车", key: "payment_secret_key" },
          ],
          other: [
            {
              name: "Open AppId",
              value: "",
              title: "渠道参数",
              key: "apen_appid"
            },
            {
              name: "bundle_id",
              value: "",
              title: "一般以.lenovo结尾，建议跟渠道确认过后填入",
              key: "bundle_id"
            },
            {
              name: "横竖屏设置",
              value: "",
              select: true,
              title: "landscape为横屏，portrait为竖屏",
              key: "horizontal_vertical"
            },
          ]
        },
      ],
      qudaoEdit: null
    };
  },
  props: ["GameAuth"],
  created() {
    if (localStorage.getItem("SDKGame")) {
      this.SDKGame = JSON.parse(localStorage.getItem("SDKGame"));
      this.gid = this.SDKGame.id;
    }

    this.initData();
    this.$get("/api/v1/channellist").then(res => {
      this.arr = res.data.data;
      this.brr = res.data.data;
      // this.qudaoNum = this.qudaoList.length;
    });
  },
  computed: {},
  methods: {
    initData() {
      this.$get("/api/v1/channel", {
        gid: this.gid
      }).then(res => {
        if (res.code == 200) {
          this.qudaoList = res.data.data.data;
        }
        // this.qudaoNum = this.qudaoList.length;
      });
    },
    copy({ value, event }) {
      this.$Message.success("已复制");
    },
    addqudao() {
      this.modal1 = true;
    },
    ok() {
      let data = this.qudaoData;
      this.$put("/api/v1/channel/" + this.id + "", {
        name: this.qudaoData[0].name,
        client: JSON.stringify(this.qudaoData[0].client_setting),
        service: JSON.stringify(this.qudaoData[0].service_setting),
        channel:
          this.shopList.length == 0 ? undefined : JSON.stringify(this.shopList),
        other: JSON.stringify(this.qudaoData[0].other)
      }).then(res => {
        if (res.code == 200) {
          this.initData();
          this.cancel();
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    addok() {
      if (this.id) {
        this.$post("/api/v1/channel", {
          id: this.id,
          gid: this.gid
        }).then(res => {
          this.modal1 = false;
          this.fruit = [];
          this.id = "";
          if (res.code == 200) {
            this.initData();
            this.$Message.success(res.message);
          } else {
            this.$Message.error(res.message);
          }
        });
      } else {
        this.$Message.error("请选择渠道");
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 1000);
      }
    },
    qudaoPz(id, name) {
      this.id = id;
      this.qudaoData = this.qudaototle.filter((item, index) => {
        return item.name == name;
      });
      this.$get("/api/v1/channel/" + id + "").then(res => {
        if (res.code == 200) {
          this.qudaoEdit = res.data.data;
          if (this.qudaoEdit.client_setting) {
            this.qudaoData[0].client_setting = this.qudaoEdit.client_setting;
          }
          if (this.qudaoEdit.service_setting) {
            this.qudaoData[0].service_setting = this.qudaoEdit.service_setting;
          }
          if (this.qudaoEdit.other_setting) {
            this.qudaoData[0].other = this.qudaoEdit.other_setting;
          }
          if (this.qudaoEdit.channel_goods) {
            this.shopList = this.qudaoEdit.channel_goods;
          }
        }
      });
      this.modal2 = true;
    },
    cancel() {
      this.$nextTick(()=>{
        document.getElementById('fenzuone').scrollTop= 0;
      })
      this.indexs = 0;
      this.searchs = "";
      this.fruit = [];
      this.shopList = [];
      this.qudaoNum = 0;
      this.id = null;
      this.shopInput1 = "";
      this.shopInput2 = "";
      this.qudaoData[0].client_setting.forEach(item => {
        item.value = "";
      });
      this.qudaoData[0].service_setting.forEach(item => {
        item.value = "";
      });
      this.qudaoData[0].other.forEach(item => {
        item.value = "";
      });
      this.onChange_search();
    },
    add_qudaoShop() {
      if (!(this.shopInput1 && this.shopInput1)) {
        this.$Message.error("参数不能为空");
        return;
      }
      let shop_id = this.shopInput1;
      let channel_id = this.shopInput2;
      this.shopList.push({ shop_id: shop_id, channel_id: channel_id });
      this.shopInput1 = "";
      this.shopInput2 = "";
    },
    delete_qudaoShop(index) {
      this.shopList.splice(index, 1);
    },
    on_select(val) {
      let a = val.pop();
      this.fruit = [];
      this.fruit.push(a);
      console.log(this.fruit);
      this.qudaoNum = val.length;
      this.id = this.fruit[0];
    },
    onChange_search() {
      this.brr = this.arr.filter(value => {
        return value.name.match(this.searchs);
      });
    },
    click0: function(item) {
      this.indexs = item.id;
    },
    deleteOpen(id) {
      this.delCheck = true;
      this.delId = id;
    },
    deleteOk() {
      this.$delete("/api/v1/channel/" + this.delId + "").then(res => {
        if (res.code == 200) {
          this.initData();
          this.$Message.success("删除成功");
        }
      });
    }
  },
  watch: {
    GameAuth: function() {
      this.gid = JSON.parse(localStorage.getItem("SDKGame")).id;
      this.initData();
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.content-box {
  padding-left: 15px;
  padding-right: 15px;
  background-color: #ffffff;
  height: calc(100% - 49px);
  border: 1px solid #ebebeb;
}
.paybanned_header {
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #666666;
}
.container {
  min-width: 1500px;
}
.content {
  text-align: left;
}
.btn {
  margin-bottom: 15px;
}
.title {
  height: 45px;
  line-height: 40px;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 14px;
  text-align: left;
  span {
    font-size: 16px;
    font-weight: bold;
  }
}

.pop-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  align-items: center;
  span {
    font-size: 16px;
    color: #a2a8b3;
  }
  .ivu-input {
    border-top: none !important;
    border-bottom: none !important;
    border-radius: 0px !important;
    background-color: #fff !important;
    padding: 0 25px;
    height: 25px;
    line-height: 25px;
  }
}
.ivu-input {
  background-color: #fff !important;
}
.pop-box {
  padding: 0px 45px;
}
.pop-content {
  padding: 15px 0px;
  .ivu-checkbox-group-item {
    margin: 0 45px 15px 35px;
  }
}

// 模态框
.QXguanli_fenzus .ivu-modal-body {
  padding: 0 !important;
  height: 630px;
}
.QXguanli_fenzu1 {
  height: 630px;
  width: 160px;
  min-width: 160px;
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
  margin: 0;
  width: 100%;
  height: 630px;
  overflow-y: scroll;
}
.QXguanli_fenzutwo {
  padding: 20px 40px;
  display: flex;
  .guanli_file {
    width: 146px;
    height: 146px;
    opacity: 0;
    z-index: 1;
    margin-left: 30px;
    cursor: pointer;
  }
  .guanli_files {
    width: 146px;
    height: 146px;
    position: absolute;
    left: 0;
    top: 40px;
    background-image: url(../../assets/file1.png);
    background-size: 100% 100%;
    cursor: pointer;
  }
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
.QXguanli_fenzuthree {
  width: 600px;
  height: 290px;
  border: 1px solid #333;
  margin-left: 20px;
  margin-top: 14px;
}

.md1-title {
  font-size: 16px;
  color: #a2a8b3;
}
.md1-text {
  padding: 0 0 20px 20px;
  p {
    font-size: 12px;
    color: #444444;
  }
}
.md1-tt {
  background-color: #f5f5f5;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  span {
    font-size: 14px;
    color: #333333;
    span {
      font-size: 12px;
      color: #ff6600;
    }
  }
}
.md1-inputbox {
  padding-left: 70px;
  > div {
    margin-bottom: 20px;
    &:nth-child(1) {
      margin-top: 20px;
    }
  }
  .span2 {
    display: inline-block;
    width: 110px;
    text-align: right;
    font-size: 12px;
    color: #333333;
    margin-right: 10px;
    font-weight: bold;
    white-space: nowrap;
  }
}
.pop-content .ivu-checkbox-group-item {
  width: 58px;
  white-space: nowrap;
}
//
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
.icon {
  position: relative;
  .icon-text {
    margin-left: 0px;
    margin-top: 10px;
    color: #9fa9b9;
    font-size: 12px;
  }
}
.shopping {
  text-align: center;
  width: 100%;
}
.ps {
  color: rgb(159, 169, 185);
  font-size: 12px;
  margin-left: 122px;
  margin-top: 3px;
}
::-webkit-scrollbar-thumb {
  background-color: #999;
  background-clip: padding-box;
  border-radius: 10px;
  min-height: 15px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  border: 1px solid transparent;
  border-left-width: 2px;
  min-height: 15px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}
::-webkit-scrollbar {
  border-left: none;
  overflow: visible;
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
// 表格
.table-box {
  width: 100%;
  padding: 20px;
  // .pop-table{
  //   padding: 10px 0;
  //   color: #333333;
  //   font-size: 12px;
  //   display: flex;
  //   .td{
  //     border: 1px solid #ccc;
  //   }
  // }
}
#setDataTable {
  border: 1px solid #ccc;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  td {
    border: 1px solid #ccc;
    padding: 10px 0;
  }
}
</style>