// 对axios二次封装
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress';


// 利用axios对象的方法create，去创建一个axios实例
// requests就是axios，只不过进行了二次封装 稍微配置了一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发送请求时，路径当中会出现api
    // 使用axios处理跨域只能在服务器端 使用cros
    baseURL: '/mock',
    // 代表请求超时的时间5s
    timeout: 5000,
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，并进行一些处理
requests.interceptors.request.use((config) => {

    // config：配置对象，里面有headers请求头
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来之后，响应拦截器可以检测到，进行一些处理
    return res.data
}, (err) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('file'))
})

// 对外暴露
export default requests