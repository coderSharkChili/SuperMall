<template>
<div id="detail">
<!-- <h2>{{iid}}</h2> -->
<detail-nav-bar ref='nav' class="detail-nav" @titleClick='titleClick'></detail-nav-bar>
<scroll class="content" ref='scroll' @scroll="contentScroll" :probeType='3'  :pullUpLoad='true'>

        <detail-swiper :swiper-list="topImages" @swiperImgLoad="swiperImgLoad"></detail-swiper> 
    
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shops"></detail-shop-info>
        <detail-goods-info :details-info="detailsInfo" @imgLoad='isLoad'></detail-goods-info>
        <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods='recommends'></goods-list>
</scroll>

<back-top  @click="backClick" v-show="isShowBackTop"></back-top>

<detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

<!-- <toast :message='message' :show='show'></toast> -->
</div>
</template>

<script>
import DetailNavBar from './childcomponents/DetailNavBar'
import DetailSwiper from './childcomponents/DetailSwiper'
import DetailBaseInfo from './childcomponents/DetailBaseInfo'
import DetailShopInfo from './childcomponents/DetailShopInfo'
import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
import DetailParamInfo from './childcomponents/DetailParamInfo'
import DetailCommentInfo from './childcomponents/DetailCommentInfo'
import DetailBottomBar from './childcomponents/DetailBottomBar'

import GoodsList from 'components/content/Goods/GoodsList'
import BackTop from 'components/content/BackTop/BackTop'

import Scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'
import { Toast } from 'vant'; // 用vant ui 库里面的 Toast

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'

import {debounce} from 'common/util'
import emitter from '@/eventbus';//导入事件总线
import {itemListenerMixin} from 'common/mixin'

import {mapActions} from 'vuex' //vuex 的辅助函数 将actions中定义的方法映射进来

export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,

        GoodsList,
        BackTop,

        Scroll,
        // Toast,
    },
    mixins:[itemListenerMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shops:{},
            detailsInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],// 获取offsetTop 实现点击导航便滚动到对应位置
            currentIndex:0,
            isShowBackTop:false,
            // message:'',
            // show:false
            
        }
    },
    // activated 钩子 与 keep-alive 搭配使用 
    // activated(){
    //     // console.log(this.$route.params);

    //     // 1. 保存传入的  iid
    //     this.iid=this.$route.params.iid

    //      getDetail(this.iid).then(res=>{
    //         console.log(res);
    //         // 1.获取顶部的图片轮播数据
    //         this.topImages = res.result.itemInfo.topImages
    //     });
    // },
    created(){  // 生命周期函数 created 
        // 1. 保存传入的  iid
         this.iid=this.$route.params.iid

        //  2. 根据 iid 请求详情数据
         getDetail(this.iid).then(res=>{
            // console.log(res);
            // 获取数据
            const data = res.result
            // 1.获取顶部的图片轮播数据
            this.topImages = res.result.itemInfo.topImages
            // 2. 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 3.  获取店铺信息
            this.shops = new Shop(data.shopInfo)
            // 4. 获取商品下面的图片详细信息
            this.detailsInfo = data.detailInfo
            // 5. 获取商品规格信息
            this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {})
            // 6. 获取商品评论
            if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
        });
        
        // 3.获取详情页的推荐数据
        getRecommend().then(res=>{
            // console.log(res);
            this.recommends = res.data.list
        })
    },
    methods:{
        // 使用mapActions 辅助函数映射actions中定义的函数
        ...mapActions(['addCart']),
        swiperImgLoad(){//轮播图图片加载完 refresh
            this.$refs.scroll.refresh()
        // console.log('轮播图加载完成');
        },
        isLoad(){//商品信息图片加载完refresh
            this.$refs.scroll.refresh()
        //    console.log('图片加载完成')
            this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)//为了下面判断用  Number.MAX_VALUE jS中的最大值
        console.log(this.themeTopYs)
        },

// 实现点击标题滚动到对应内容
        titleClick(index){
        //    console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
        console.log(this.themeTopYs[index]);
        },

// 实现滚动到对应内容处 标题也随之改变
        contentScroll(position){
        //    console.log(position);
        const positionY= -position.y

        for(let i=0;i<this.themeTopYs.length-1;i++ ){
            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex
            } 
        }
        //  判断滚动位置 来决定 显示隐藏 backtop
            this.isShowBackTop=Math.abs(position.y) > 1000
},
        backClick(){
              this.$refs.scroll.scrollTo(0,0) //返回顶部
        },

        addToCart(){
            // console.log('222222');

            // 1. 获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.lowNowPrice;
            product.iid = this.iid

            // 2. 将商品添加到购物车中

            // vueX 的细节 通过 return new Promise((resolve, reject)=>{}) 来知道vuex里面完成了什么操作
            //   （比如这次就定义在了actions.js 的addCart方法里 用来告诉用户完成了什么操作）
            // this.$store.dispatch('addCart',product).then(res =>{
            //     console.log(res);   //当前商品数量加一  || 添加了新商品
            // })

            this.addCart(product).then(res =>{
                // console.log(res);

                // this.message = res;
                // this.show = true; 

                // setTimeout(()=>{
                //     this.show = false
                //     this.message = ''
                // },1500)

                // this.$toast.show(res, 1500)
                Toast(res);//使用vant UI库里的Toast
            })
        }
    },
    mounted(){
    },
    unmounted(){
        emitter.off('itemImageLoad',this.itemImgListener)
    }
}
</script>

<style scoped>
#detail{
position: relative;
z-index: 11;
background-color: #fff;
height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 10;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px - 49px) ;
    overflow: hidden;
     /* position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff; */
}
</style>