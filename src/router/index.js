import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'shouye',
    component: () => import( "../views/shouYe.vue"),
    meta: { requiresAuth: true }
  },
  // 登陆页
  {
    path: '/login',
    name: 'login',
    component: () => import( "../views/login.vue"),
    meta:{
      requiresAuth:true
    }
  },
  // 注册页
  {
    path: '/enroll',
    name: 'enroll',
    component: () => import( "../views/enroll.vue"),
    meta: { requiresAuth: true }
   
  },
  // 找回页
  {
    path: '/reset',
    name: 'reset',
    component: () => import( "../views/reset.vue"),
    meta: { requiresAuth: true }
    
  },



  // 下面所有页面 都是组件调用
  // 游戏管理
  {
    path: '/module/gameManage',
    name: 'gameManage',
    component: () => import( "../module/gameManage.vue"),
    meta: { requiresAuth: true }
    
  },
    // 基本信息
  {
    path: '/module/basic',
    name: 'basic',
    component: () => import( "../module/basic.vue")
    ,meta: { requiresAuth: true }
  },
  // 回收站
  {
    path: '/module/recycle',
    name: 'recycle',
    component: () => import( "../module/recycleItem.vue")
    ,meta: { requiresAuth: true }
  },
  // 游戏总览
  {
    path: '/module/gamepandect',
    name: 'Gamepandect',
    component: () => import( "../module/Gamepandect.vue")
    ,meta: { requiresAuth: true }
  },
  // 渠道总览
  {
    path: '/module/ditchpandect',
    name: 'Ditchpandect',
    component: () => import( "../module/Ditchpandect.vue")
    ,meta: { requiresAuth: true }
  },
  // 全局查询
  {
    path: '/module/globalquery',
    name: 'Globalquery',
    component: () => import( "../module/Globalquery.vue")
    ,meta: { requiresAuth: true }
  },
  // 详细信息
  {
    path: '/module/detailmsg',
    name: 'Detailmsg',
    component: () => import( "../modules/Detailmsg.vue")
    ,meta: { requiresAuth: true }
  },
  // 管理分组
  {
    path: '/module/managementgroup',
    name: 'Managementgroup',
    component: () => import( "../modules/Managementgroup.vue")
    ,meta: { requiresAuth: true }
  },
  // 管理员
  {
    path: '/module/administrator',
    name: 'Administrator',
    component: () => import( "../modules/Administrator.vue")
    ,meta: { requiresAuth: true }
  },
  // 系统日志
  {
    path: '/module/systemlog',
    name: 'systemlog',
    component: () => import( "../modules/systemlog.vue")
    ,meta: { requiresAuth: true }
  },
  // 个人日志
  {
    path: '/module/personaldiary',
    name: 'Personaldiary',
    component: () => import( "../modules/Personaldiary.vue")
    ,meta: { requiresAuth: true }
  },
  // 游戏中心、 SDK聚合工具
      // 游戏参数
      {
        path: '/sdk/gameparameter',
        name: 'Gameparameter',
        component: () => import( "../Gamecomponents/module/yxcanshu.vue")
        ,meta: { requiresAuth: false }
      },
      // 渠道参数
      {
        path: '/sdk/ditchparameter',
        name: 'Ditchparameter',
        component: () => import( "../Gamecomponents/module/quDaoC.vue")
        ,meta: { requiresAuth: false }
      },
      // 参数回调
      {
        path: '/sdk/ditchparameters',
        name: 'Ditchparameters',
        component: () => import( "../Gamecomponents/module/quDaoH.vue")
        ,meta: { requiresAuth: false }
      },
      // 登陆支付封禁
      {
        path: '/sdk/paybanned',
        name: 'paybanned',
        component: () => import( "../Gamecomponents/module/paybanned.vue")
        ,meta: { requiresAuth: false }
      },
      // 母包测试账号
      {
        path: '/sdk/textaccount',
        name: 'textaccount',
        component: () => import( "../Gamecomponents/module/textaccount.vue")
        ,meta: { requiresAuth: false }
      },
      // 游戏中心、 游戏数据
      // 游戏概况
      {
        path: '/game/gamecase',
        name: 'Gamecase',
        component: () => import( "../Gamecomponents/module/Gamecase.vue")
        ,meta: { requiresAuth: false }
      },
      // 账号明细
      {
        path: '/game/accountdetail',
        name: 'accountdetail',
        component: () => import( "../Gamecomponents/module/accountdetail.vue")
        ,meta: { requiresAuth: false }
      },
      // 角色明细
      {
        path: '/game/roledetail',
        name: 'roledetail',
        component: () => import( "../Gamecomponents/module/roledetail.vue")
        ,meta: { requiresAuth: false }
      },
      // 订单明细
      {
        path: '/game/orderdetail',
        name: 'orderdetail',
        component: () => import( "../Gamecomponents/module/orderdetail.vue")
        ,meta: { requiresAuth: false }
      },
      // 单日报表
      {
        path: '/game/dailyreport',
        name: 'Dailyreport',
        component: () => import( "../Gamecomponents/modules/Dailyreport.vue")
        ,meta: { requiresAuth: false }
      },
      // 单日报表(时)
      {
        path: '/game/dailyreports',
        name: 'Dailyreports',
        component: () => import( "../Gamecomponents/modules/Dailyreports.vue")
        ,meta: { requiresAuth: false }
      },
      // 渠道报表
      {
        path: '/game/channelreport',
        name: 'Channelreport',
        component: () => import( "../Gamecomponents/modules/Channelreport.vue")
        ,meta: { requiresAuth: false }
      },
      // 订单成功率
      {
        path: '/game/successrate',
        name: 'successrate',
        component: () => import( "../Gamecomponents/modules/successrate.vue")
        ,meta: { requiresAuth: false }
      },
      // 留存报表
      {
        path: '/game/keepreport',
        name: 'keepreport',
        component: () => import( "../Gamecomponents/modules/keepreport.vue")
        ,meta: { requiresAuth: false }
      },
      // LTV报表
      {
        path: '/game/LTVreport',
        name: 'LTVreport',
        component: () => import( "../Gamecomponents/modules/LTVreport.vue")
        ,meta: { requiresAuth: false }
      },
      // 节点转化
      {
        path: '/game/nodechange',
        name: 'nodechange',
        component: () => import( "../Gamecomponents/modules/nodechange.vue")
        ,meta: { requiresAuth: false }
      },
      // 事件跟踪
      {
        path: '/game/eventchange',
        name: 'eventchange',
        component: () => import( "../Gamecomponents/modules/eventchange.vue")
        ,meta: { requiresAuth: false }
      },
      // 区服数据
      {
        path: '/game/districtData',
        name: 'districtData',
        component: () => import( "../Gamecomponents/modules/districtData.vue")
        ,meta: { requiresAuth: false }
      },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
