<template>
    <div class="category-detail">
        <div class="category-detail-item" v-for='(item, index) in categoryList' :key='index'>
            <a :href="item.link"><img :src="item.image" alt=""></a>
            <p>{{item.title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Subcategory',
    props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.category-detail{
    display: flex;
    /* margin-left: 100px; */
    /* flex-wrap:wrap 必要的时候拆行或拆列 */
    flex-wrap: wrap; 
    /* 弹性盒子周围留有空白 */
    justify-content: space-between;
    width: 100%;
    padding: 10px;
}
.category-detail-item{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 80px;
    height: 100px;
    margin-bottom: 10px;
}
.category-detail-item img{
    width: 65px;
    margin-bottom: 7px;
}
.category-detail-item  p {
    font-size: 14px;
}
</style>