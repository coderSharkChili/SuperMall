<template>
<!-- ref 如果是绑定在组件中的，那么通过  this.$refs.wrapper 获取到的是一个组件对象
     ref 如果绑定在普通的元素中,那么通过 this.$refs.wrapper 获取到的是一个元素对象
-->
<div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<script>
import  BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            // default(){
            //     return 0
            //     }
            default:0  //number类型可以直接这样写
        },
        pullUpLoad:{
            type:Boolean,
            default:false
            },
    },
    data(){
        return{
            scroll:null,
            message:'hhh'
        }
    },
    methods:{
        // 封装好的 scrollTo()方法  this.$refs.scroll.scrollTo(0,0)
        // time=300 这种参数写法是： 若不传 time参数  默认time为300毫秒
        scrollTo(x,y,time=500){
           this.scroll && this.scroll.scrollTo(x,y,time)
        },
        // 完成上拉加载   可执行下一次上拉加载了
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            // console.log('------');
            // 重新计算 scrollerHeight（可滚动区域） 解决滚动不彻底的问题
           this.scroll && this.scroll.refresh()
        //    解决 refresh()找不到的 Bug
        //   先来判断 this.scroll是否是null
        }
    },
    mounted(){
        // 1. 创建 BScroll 对象
        this.scroll=new BScroll(this.$refs.wrapper,{
            observeDOM:true, //2.x 以后要加这个东西
            // 封装probeType
            // probeType:3,//当值为3的时候监听所有滑动的位置
            probeType:this.probeType,
            click:true, // 可以监听里面的DOM事件
            // pullUpLoad:true//设置为true时 pullingUp才能监听成功
            pullUpLoad:this.pullUpLoad
        })
        // 2. 监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scroll',position)
        })

        // console.log(this.scroll);
        // this.scroll.refresh() 可以重新计算可滚动区域

    //    3. 监听上拉事件
        this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载..');
            this.$emit('pullUpLoad')
        })
        // 回到 顶部
        // this.scroll.scrollTo(0,0)
    },
}
</script>

<style>

</style>