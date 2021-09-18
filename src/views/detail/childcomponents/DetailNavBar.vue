<template>
  <div>
      <nav-bar>
          <!-- vue3.x  具名插槽搭配 template和v-slot：插槽名字 使用-->
          <template v-slot:left>
              <div class="back" @click="backClick">
                  <img src="~assets/img/common/back.svg" alt="">
              </div>
          </template>
          <template v-slot:center>
              <div class="title">
                    <div v-for="(item,index) in titles"
                     :key="index" class="title-item"
                      @click='titleClick(index)'
                      :class="{active:this.currentIndex===index}">
                     {{item}}
                     </div>
              </div>
          </template>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name:'DetailNavBar',
    components:{
        NavBar,
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0,
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex=index
            // console.log('1');
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style>
.title{
    display: flex;
}
.title-item{
    flex:1;
    font-size: 13px;
}
.active{
    color: var(--color-high-text)
}
.back img{
    margin-top:12px;
}
</style>