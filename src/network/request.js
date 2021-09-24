import axios from "axios"; // 先安装 axios    npm install axios
export function request(config){
    // 1. 创建axios实例
    const instance=axios.create({
        // baseURL 注意大写
        baseURL:'http://152.136.185.210:7878/api/hy66',
        setTimeout:10000
    })
    // 2。拦截器
    // 请求拦截
    instance.interceptors.request.use(config =>{
        return config;
    }),err =>{

    }
    // 响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    }),err =>{
        // console.log(err);
    }
    // 3. 发送真正的网络请求
    return instance(config)
    
}