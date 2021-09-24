<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <template v-slot:center>
        <div>
          商品分类
        </div>
      </template>
    </nav-bar>
    <slide-bar :slide-bar-list='categoryList' @slideBarItemClick='slideBarItemClick'></slide-bar>
    <scroll ref="scroll" class="content" :probeType='3'  :pullUpLoad='true'>
      <subcategory :category-list='subcategoryList'></subcategory>
      <tab-control :titles='titleList' @tabcontrol="tabClick"></tab-control>
      <goods-list :goods='categoryDetailList' ref="cate-detail"></goods-list>
    </scroll>
  </div>
</template>

<script>
import emitter from '@/eventbus';
import {debounce} from 'common/util' //导入防抖函数

import NavBar from 'components/common/navbar/NavBar'
import Scroll from "components/common/scroll/Scroll"

import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/Goods/GoodsList'

import SlideBar from './childcategory/SlideBar'
import Subcategory from './childcategory/Subcategory'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
export default {
  name:'Category',
  components:{
    NavBar,
    Scroll,

    TabControl,
    GoodsList,

    SlideBar,
    Subcategory
  },
  data(){
    return{
      // 分类内容数据
      subcategoryList:[],
      categoryDetailList:[],
       // 分类侧边栏数据
      categoryList: [],
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0,
      currentType:null
    }
  },
  methods:{
    slideBarItemClick({maitKey, index}){
      // console.log(123);
      this.currentIndex = index
        this.getSubcategory(maitKey);
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey,'pop')
    },
    getCategory() {
        getCategory().then(res => {
        // console.log(res.data.category.list);
        this.categoryList = res.data.category.list;
        // this.$nextTick()在页面交互，尤其是从后台获取数据后重新生成dom对象之后的操作有很大的优势
        // 通过this.$nextTick()获取到的值为dom更新之后的值
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[0].maitKey);
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
        });
      });
    },
      getSubcategory(key) {
      getSubcategory(key).then(res => {
        // console.log(res.data.list);
        this.subcategoryList = [...res.data.list];//ES6 扩展运算符
      });
    },
    getCategoryDetail(key, type) {
      getCategoryDetail(key, type).then(res => {
        // console.log(res);
        this.categoryDetailList = [...res];
      });
    },

    tabClick(index){
      // console.log(2222);
      switch(index){
        case 0: this.currentType = 'pop'
        break;
        case 1: this.currentType = 'new'
        break;
        case 2: this.currentType = 'sell'  
      }
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, this.currentType)
    }
  },
  created() {
    this.getCategory()
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh)
    emitter.on('itemImageLoad',()=>{
      // console.log('1');
      refresh()
    })
  }
}
</script>

<style scoped>
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.content{
  position: fixed;
  left: 100px;
  top: 44px;
  bottom: 49px;
  right: 0;
  overflow: hidden;
}
</style>