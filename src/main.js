import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 //图片懒加载 <img v-lazy='img.src图片路径'>
import vant from 'vant'
import "vant/lib/index.css";
// import { Lazyload } from 'vant'
// 安装自定义的toast插件 vue3.x暂时不知道
// import Toast from 'components/common/toast'
import  FastClick from 'fastclick' // 安装 fastclick插件  npm install fastclick -S
// 解决移动端300ms延迟
FastClick.attach(document.body)

createApp(App).use(store).use(router).use(vant).mount('#app')

// createApp(App).use(Lazyload,{
//     loading: require("@/assets/img/common/placeholder.png")
// })