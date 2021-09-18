<template>
  <div class="image-info" v-if="Object.keys(detailsInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailsInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div :key="index" v-for="(item, index) in detailsInfo.detailImage">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          :key="imageIndex"
          :src="image"
          @load="imgLoad"
          alt=""
          v-for="(image, imageIndex) in item.list"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      count: 0,
      imagesLength: 0
    };
  },
  props: {
    detailsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      if (++this.count === this.imagesLength) {
        this.$emit("imgLoad");
      }
    }
  },
//   watch是监听属性值的变化，只要属性值发生变化就会调用watch对应的的函数
  watch: {
    detailsInfo() {
      this.imagesLength = this.detailsInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.image-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}

.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.info-list img {
  width: 100%;
}
</style>
