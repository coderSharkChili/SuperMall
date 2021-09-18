<template>
  <tab-bar>
    
      <tab-bar-item path="/home" activeColor="red">
        <!--通过 activeColor属性 用户可以自己定义字体的颜色-->
        <!-- vue2.x 写法 -->
        <!-- <img slot="item-icon" src="./assets/img/tabbar/home.svg" alt="" />
        <div slot="item-text">主页</div> -->

        <!-- 具名插槽 vue3.x 要写在template里面 且用 v-slot：插槽名 -->
        <template v-slot:item-icon>
          <!-- // 路径起别名写法 Vuecli4自己配置vue.config.js-->
          <img src="~assets/img/tabbar/home.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/home_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <div>主页</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/category.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/category_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/shopcart">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/shopcart.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/profile.svg" alt="" />
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg" alt="" />
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>

    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
    name:'MainTabbar',
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>