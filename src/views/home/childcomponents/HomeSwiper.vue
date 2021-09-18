<template>
<swiper>
  <swiper-item v-for='(item,index) in banners' :key="index">
    <a :href='banners[index].link'>
      <img :src='banners[index].image' alt="" @load="imageLoad">
    </a>
  </swiper-item>
</swiper>
</template>

<script>
import{Swiper, SwiperItem} from 'components/common/swiper'
export default {
    name:'HomeSwiper',
    components:{
        Swiper, 
        SwiperItem
    },
    data(){
      return{
        isLoad:false
      }
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
      imageLoad(){
        // 补充  为了不让Homeswiper多次发出事件 可以使用 isLoad变量进行状态的记录
        if(!this.isLoad){
          this.$emit('swiperImageload')
          this.isLoad=true
        }
      }
    }
}
</script>

<style>
</style>