<template>
  <div class="tab-control">
      <div class="tab-control-item" 
      :class="{active:index===currentIndex}"
       @click="getIndex(index)" 
       v-for='(item,index) in titles' :key='item.index'>
           <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            currentIndex:0,
        }
    },
    methods:{
        getIndex(index){
            this.currentIndex=index
            this.$emit('tabcontrol',index)
        },

    }
}
</script>

<style>
.tab-control{
    display:flex;
    text-align: center;
    background-color: #fff;
}
.tab-control-item{
    flex:1;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
}
.tab-control-item span{
    padding: 5px;
}
.active span{
    color:var(--color-high-text);
    border-bottom:5px solid var(--color-tint);
}
</style>