import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import { get, post,put,deletes} from './index.js'
import VueClipboard from 'vue-clipboard2'
import echarts from 'echarts'
import imageHash from './filters'
Vue.use(imageHash)
Vue.prototype.$echarts = echarts
Vue.use(VueClipboard)
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put=put;
Vue.prototype.$delete= deletes;
Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.prototype.$Message.config({
  top: 500,                                      //设置高度
  duration:3,                            //设置3秒后消失
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
