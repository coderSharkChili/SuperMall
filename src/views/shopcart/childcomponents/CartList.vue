<template>
  <div class="cart-list">
      <scroll class="content" ref='scroll' :probeType='3'  :pullUpLoad='true'>

        <cart-list-item v-for='(item,index) in cartList' 
        :key="index"
        :item-info='item'></cart-list-item>
        
      </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'// vuex 的辅助函数
export default {
name:'CartList',
components:{
    Scroll,
    CartListItem,
},
data(){
    return{
        
    }
},
computed:{
    ...mapGetters([ 'cartList','cartLength'])
},
activated(){
    this.$refs.scroll.refresh()
    console.log(99999);
},
mounted(){
  this.$refs.scroll.refresh()
}
}
</script>

<style scoped>
.cart-list{
    /* 注意 clac() 减号 前后必须加空格 否则不生效*/
    /* height: calc(100% - 44px - 49px - 40px); */
    width: 100%;
    height: 100%; 
}

.content{
    /* height: 100%;
    overflow: hidden; */


    position: absolute;
    top: 44px;
    right: 0;
    /* bottom: 49px;  加上 cart-bottom-bar的高度 40px*/ 
    bottom: 89px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
}
</style>