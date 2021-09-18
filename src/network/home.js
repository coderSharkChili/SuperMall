import { request } from "./request";

export function getHomeMultdata(){
   return request({
       url:'http://123.207.32.32:8000/home/multidata',
   })
}

export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    }
    )
}