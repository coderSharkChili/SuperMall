<template>
    <div class="money">
        <div class="money-left money-item">
            <p>0.00<span>元</span></p>
            <p>我的余额</p>
        </div>

        <div class="money-center money-item">
            <p>0<span>个</span></p>
            <p>我的优惠</p>
        </div>

        <div class="money-right money-item">
            <p>0<span>分</span></p>
            <p>我的积分</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Money',
}
</script>

<style scoped>
.money{
    display: flex;
    width: 100%;
    border-bottom: 8px solid #eee;
}
.money-item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    height: 85px;
}
.money .money-item:nth-of-type(1),
.money .money-item:nth-of-type(2) {
    border-right: 2px solid #eeeeee;
}
.money .money-item p:first-child{
    font-size: 24px;
    font-weight: 700;
    color: red;
    margin-bottom: 3px;
}
.money .money-item p:first-child span {
  font-size: 14px;
  font-weight: normal;
  margin-left: 3px;
  color: #666666;
}

.money .money-item p:last-child {
  font-size: 14px;
  color: #666666;
}
</style>