import router from './router/index.js'
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
// import { Loading } from "element-ui"
// Vue.use(Loading);
// let loading;
// function startLoading() {    //使用Element loading-start 方法
//     loading = Loading.service({
//         text: '拼命加载中...',
//         background: 'rgba(0, 0, 0, 0)',
//         spinner: 'icon_icon',
//         lock: true,
//     })

// }
// function endLoading() {

//     setTimeout(() => {
//         loading.close()
//     }, 1000)

// }
axios.defaults.withCredentials = true
axios.defaults.timeout = 30000
axios.defaults.baseURL = process.env.VUE_APP_API
let newToken = ''
let isRefreshing = false
const requests = []


//http request 拦截器
axios.interceptors.request.use(
    config => {
        // startLoading();
        config.data = qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
        let token = localStorage.getItem('SDKtoken')
        if (token) {
            config.headers['X9-Token'] = token
        }
        return config;
    },
    error => {
        return Promise.reject(err)
    }
);
//http response 拦截器
axios.interceptors.response.use(
    response => {
        const { code } = response.data
        if (response.data.code == 200 && typeof response.data.data.token == 'string') {
            localStorage.setItem('SDKtoken', response.data.data.token)
        }
        if (response.data.code == 11010 || response.data.code == 11005) {
            localStorage.removeItem('SDKtoken')
            localStorage.removeItem('SDKbroadside')
            localStorage.removeItem('SDKGame')
            localStorage.removeItem('SDKbroadsidetwo')
            router.push({
                path: "/",
                querry: { redirect: router.currentRoute.fullPath }
            }).catch(res=>{
                
            })
        }

        if (response.data.code == 11011) {
            if (!isRefreshing) {
                isRefreshing = true
                return refreshToken().then(res => {
                    const config = response.config
                    if (config.method != 'get') {
                        let data = config.data
                        config.data = getUrlVars(decodeURI(data))
                    }
                    config.headers['X9-Token'] = newToken
                    config.baseURL = ''
                    config.headers = {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    }
                    requests.forEach(cb => cb(newToken))
                    requests.length = 0
                    isRefreshing = false
                    return axios(config)
                }).catch(res => {
                    localStorage.removeItem('SDKtoken')
                    localStorage.removeItem('SDKtoken')
                    router.push({
                        path: "/",
                        querry: { redirect: router.currentRoute.fullPath }
                    })
                }).finally(() => {

                })
            } else {
                return new Promise((resolve) => {
                    requests.push((newToken) => {
                        const config = response.config
                        if (config.method != 'get') {
                            let data = config.data
                            console.log(data, 'data')
                            config.data = getUrlVars(decodeURI(data))
                            console.log(config.data, 'data2')
                        }
                        config.headers = {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        }
                        config.baseURL = ''
                        config.headers['X-Token'] = newToken
                        resolve(axios(config))
                    })
                })
            }
        }
        // endLoading();
        return response
    },
    error => {
        // endLoading();
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}




  /**
  * 封装put请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 
 export function put(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.put(url,data)
           .then(response => {
             resolve(response.data)
           },err => {
             reject(err)
           })
    })
  }



   /**
  * 封装deletes请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 
 export function deletes(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.delete(url,data)
           .then(response => {
             resolve(response.data)
           },err => {
             reject(err)
           })
    })
  }



function getUrlVars(url) {
    var hash
    var myJson = {}
    var hashes = url.slice(url.indexOf('?') + 1).split('&')
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = decodeURIComponent(hash[1]);
    }
    return myJson;
}


function refreshToken() {
    return axios.get('/api/refresh', { id: "id" }).then((response) => {
        if (typeof response.headers['x9-token-new'] == "string") {
            newToken = response.headers['x9-token-new']
            localStorage.setItem('SDKtoken', newToken)
            return response.data
        }
    })
}
