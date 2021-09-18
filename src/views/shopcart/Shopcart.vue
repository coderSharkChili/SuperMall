<template>
  <div class="shopcart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
    </template>
    </nav-bar>

    <!-- 购物车商品展示列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childcomponents/CartList'
import CartBottomBar from './childcomponents/CartBottomBar'
import { mapGetters } from 'vuex'// vuex 的辅助函数
export default {
  name: "Shopcart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  methods:{},
  computed:{
    // vuex 的辅助函数 ： mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  },
};
</script>

<style scoped>
/* .shopcart{
  height: 100vh;
} */
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;
  font-weight: 700;
}
</style>