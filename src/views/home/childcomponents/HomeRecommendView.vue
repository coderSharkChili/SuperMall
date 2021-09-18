<template>
  <div class="recommend">
     <div class="item-id" v-for="(item,index) in recommends" :key='index'>
      <a :href="recommends[index].link">
          <img :src="recommends[index].image" alt="">
          <div>{{item.title}}</div>
      </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'HoemRecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style>
.recommend{
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 10px 0px 20px; /*上 10 左右 0  下 20*/
    border-bottom: 8px solid #eee;
}
.item-id{
      flex: 1;
}
.item-id img{
    width: 80px;
    padding-bottom: 5px;
}
</style>