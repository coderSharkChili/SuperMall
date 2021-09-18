<template>
  <div id="app">
    <main-tabbar></main-tabbar>
    
    <!-- <keep-alive 保存组件状态  Vue3.x 新写法-->
    
     <router-view v-slot='{Component}'>
       <keep-alive exclude="Detail">
       <component :is="Component"/>
       </keep-alive>
    </router-view>

  </div>
</template>

<script>
import MainTabbar from 'components/content/mainTabbar/MainTabbar'
export default {
  name:'App',
  components:{
    MainTabbar,
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
