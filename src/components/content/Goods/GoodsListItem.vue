<template>
  <div class="goods-item" @click="itemLoad">
      <img :src="showImage" alt="" @load="imgLoad"> 
      <!-- 用 vant UI库中的lazyload 插件进行图片懒加载 -->
      <!-- <img v-lazy="showImage" alt="" @load="imgLoad">  -->
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span> |
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
// 导入封装好的事件总线  vue3.x
import emitter from '@/eventbus';
import { Toast } from 'vant'; // 用vant ui 库里面的 Toast
export default {
    name:'GoodsListItem',
    props:{
      goodsitem:{
        type:Object,
        dafault(){
          return {}
        },
      }
    },
    computed:{
      showImage(){
        // 有顺序要求  只要||左边的值为真就返回自身，反之，如果||左边的值为假就返回||右边的值。
        return this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
      }
    },
    methods: {
      // @load='' 图片加载完成后执行自己定义的imgload()函数 
      // 把自定义的事件传送到“事件总线”中 ,
      // 在home.vue 中接收“事件总线”中自定义的事件 emitter.on('自定义事件名',funcation)
      // 调用 scroll.refresh()方法，从而解决Better-Scroll有时候不能滚动的问题
          imgLoad(){
            // console.log('图片加载完成')
            //  传到事件总线中
            emitter.emit('itemImageLoad') //emitter.emit('aaa')
          },
          itemLoad(){
            // console.log('进入详情页面');
            // this.$router.push('/detail/'+this.goodsitem.iid)
            if(this.goodsitem.iid){
              this.$router.push('/detail/'+this.goodsitem.iid)
            }else{
              Toast(this.goodsitem.title)
            }
          }
        },
}
</script>

<style>
 .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>