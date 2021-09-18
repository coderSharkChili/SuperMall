<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
#tab-bar {
  display: flex;
  /* flex 布局 */
  background-color: #f6f6f6;
  position: fixed;
  /* 固定定位 */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>