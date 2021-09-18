<template>
  <div id="home" class="wrapper">
    <!-- 导航 -->
    <nav-bar class="home-nav">
     <template v-slot:center>
       <h3>蘑菇街</h3>
     </template>
    </nav-bar>
     <!-- tabControl 吸顶效果 狸猫换太子-->
     <tab-control :titles="['流行', '新款', '精选']" 
     @tabcontrol='TabControl'
     ref='tabControl1' 
     class="tab-control"
     v-show='isTabFixed'
     ></tab-control>

    <!-- 使用封装的 Better-Scroll 插件 -->
    <scroll class="content" ref="scroll" :probeType='3' @scroll="contentScroll" :pullUpLoad='true' @pullUpLoad='loadMore'>

       <!-- 轮播图 -->
    <!-- <home-swiper :banners='banners' @swiperImageload='swiperImageload'></home-swiper> -->
    <my-swiper :swiper-list="banners" @swiperLoad="swiperImageload" />
    <!-- recommend 推荐 -->
    <home-recommend-view :recommends='recommends'></home-recommend-view>
    <!-- feature -->
     <home-feature-view></home-feature-view>
     <!-- tabControl -->
     <tab-control :titles="['流行', '新款', '精选']" 
     @tabcontrol='TabControl'
     ref='tabControl2'></tab-control>
     <!-- 商品列表 Goodlist -->
     <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
// import HomeSwiper from './childcomponents/HomeSwiper'
import MySwiper from 'components/common/swiper/MySwiper'
import HomeRecommendView from './childcomponents/HomeRecommendView'
import HomeFeatureView from './childcomponents/HomeFeatureView'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/Goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/BackTop/BackTop'

import { getHomeMultdata, getHomeGoods} from 'network/home'
import {debounce} from 'common/util' //导入防抖函数

import emitter from '@/eventbus';// 导入 事件总线 插件需要先安装
export default {
  name: "Home",
   components:{
    // HomeSwiper,
    MySwiper,
    HomeRecommendView,
    HomeFeatureView,

    GoodsList,
        NavBar,
        TabControl,
        Scroll,
        BackTop
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false ,// 来决定backtop是否隐藏
      tabOffsetTop:0,
      itemImgListener:null,
      isTabFixed:false,//函数  用来监听事件总线传出的函数
      
    }
  },
  deactivated(){
    // 取消全局事件的监听
    emitter.off('itemImageLoad',this.itemImgListener)
  },
  created(){
    // 1.请求多个数据
    this.getHomeMultdata()

    // 2. 请求商品数据 Goods
    this.getHomeGoods('pop') 
     this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  mounted(){
    // 用封装好的防抖函数
    const refresh= debounce(this.$refs.scroll.refresh)// 传的是个函数所以scroll.refresh不加括号(加上就变成了一个返回值,这里传的是函数)
       
     // 3.监听goodsListItem中图片加载完成
      // 从事件总线中监听 itemImageLoad 事件
      //   emitter.on('itemImageLoad',()=>{
      //     refresh()
      // })

//  对监听的函数进行保存
      this.itemImgListener = ()=>{
        refresh()
      }
      emitter.on('itemImageLoad',this.itemImgListener)
  },
  unmounted(){
    console.log('Home destroy');
  },
  // 计算属性
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{

//     /* 防抖函数 debounce */
//     debounce(func,delay){
//       let timer=null
//       return function(...args){ // ...args 表示可以传多个参数
//         if(timer) clearTimeout(timer)

//         timer=setTimeout(() =>{
//  // .其实这里的this没有用。之所以用func.apply(this,arguments)而不用fn()，是因为要传参数，而且参数的个数不固定
//           func.apply(this,args)
//         },delay)
//       }
//     },

    TabControl(index){
      // console.log(index);
      switch(index){
        case 0: this.currentType='pop'
        break
        case 1: this.currentType='new'
        break
        case 2: this.currentType='sell'
        break
      }
      // 使两个 tabControl 新点击的流行、新品、精选 保持一致
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
     /*事件监听相关*/

    //  返回顶部
     backClick(){
      //  父访问子
      // console.log(this.$refs.scroll.message);
      //   .scrollTo(x,y,毫秒)
      //  this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 对 scrollTo()进行封装
      this.$refs.scroll.scrollTo(0,0) //返回顶部
      },

      contentScroll(position){
        // 1.显示隐藏 backTop 按钮
        // console.log(position);
        // y 值大于1000时 显示 backTop （注意y是负值 应先取绝对值） 
        this.isShowBackTop=Math.abs(position.y) > 1000  // true  或 false

        // 2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed=Math.abs(position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore(pullUpLoad){
        // console.log('上拉加载更多-----');
        this.getHomeGoods(this.currentType)
      },
        //  吸顶效果
      //  获取 tabcontrol的 offsetTop
      // 所有组件中都有一个属性 $el:用于获取组件的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
      // 如何获取正确的值？    
      //  1.监听 homeswiper中 img图片的加载完成
      // 2.加载完成后，发出事件 在 Home.vue中获取正确的值
      swiperImageload(){
        // console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },
    /*
     * 网络请求相关
     */
    getHomeMultdata(){
      getHomeMultdata().then(res =>{
      // console.log(res);
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1         // 这类货物的page 0+1 / 2 / 3
      // 网络请求 Goods
       getHomeGoods(type,page).then(res =>{
      // console.log(res);
      this.goods[type].list.push(...res.data.list); // 数组A.push(...数组B) 把数组B添加到数组A中  
      this.goods[type].page += 1 //这类货物的page  2 /3 /4

      this.$refs.scroll.finishPullUp() //结束 pullingUp 并开启下一次
    })
    }
  }

};
</script>

<style scoped>
#home{
  /* 子绝父相  相对定位不脱离标准流*/
  position: relative;
  /* padding-top: 44px; */
  /* 可视高度 100%  */
  height: 100vh;
}
.home-nav{
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  background-color:var(--color-tint);
  color: #fff;
}

.content{
  /*子绝父相  这样 backtop按钮 就不会独占一行了*/
  /* 绝对定位 脱离标准流 */
  position: absolute;
  /* 必须给wrapper一个高度 */
  /* calc() 运算符两边都要 加 空格 */
  /* 注意吸顶效果不用下面这种方式给高度 */
  /* height: calc(100% - 93px); 当前屏幕的高度 - 上下导航的高度  */

  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden; /*超出的内容隐藏 */
  
}
.tab-control{
  position: relative;
  z-index:9;
}
</style>