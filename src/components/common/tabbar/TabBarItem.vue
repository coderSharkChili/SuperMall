<template>
  <div class="tab-bar-item" @click="getclick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
    <!-- 具名插槽 -->
    <!-- 最好包装一层div 用来定义其他属性 防止被替换掉 只替换div里面的slot-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      //   isActive: true,
    };
  },
  // 父传子
  props: {
    path: String,
    // 通过 activeColor属性 用户可以自己定义字体颜色
    activeColor: {
      type: String,
      default: "skyblue", //默认是蓝色
    },
  },
  methods: {
    getclick() {
      // 手动跳转路由
      this.$router.push(this.path);
    },
  },
  computed: {
    isActive() {
      // 例如点击 home 当前活跃路由的path为 /home 只有item1匹配
      //  /home == item1(/home)  true
      //  /home == item2(/category)   false
      //  /home == item3(/shopcart)   false
      //    /home == item4(/profile)    false
      return this.$route.path.indexOf(this.path) !== -1; // $route 当前活跃路由
      //indexOf() 看路径是否匹配（相同）  == -1 不匹配  ！== -1 匹配
      //    返回值是Boolean类型
      //以此确定每个item的 isActive 是true 还是 false
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* 一般App中 Tabbar高度都为49px */
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.2);
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 把此元素放置在父元素的中部。 使每个图片一样齐*/
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>