<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.index" :goodsitem='item'>
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    name:'GoodsList',
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      }
    }
}
</script>

<style>
 .goods {
    display: flex;
    /* 换行  wrap规定灵活的项目在必要的时候拆行或拆列。*/
    flex-wrap: wrap;
    /* 留白 在弹性盒对象的 <div> 元素中的各项周围留有空白： */
    justify-content: space-around;

    padding: 2px;
  }
</style>