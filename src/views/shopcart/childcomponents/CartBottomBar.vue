<template>
    <div class="cart-bottom-bar">
        <div class="check-content">
            <check-button :is-checked='isSelectAll' class="check-button" @click="checkClick"></check-button>
            <span>全选</span>
        </div>

        <div class="price">总价格：{{totalPrice}}</div>
        <div class="calculate">去结算({{checkLength}})</div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'
export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    computed:{

        ...mapGetters(['cartList']),

        totalPrice(){
            return '￥'+ this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },

        checkLength(){
            return  this.cartList.filter(item => item.checked).length
        },

        isSelectAll(){
            if(this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){//全部选中
            // forEach 遍历数组 可以改变数组内的值     ||  map高阶函数 返回的是一个新数组
            this.cartList.forEach(item => item.checked = false)
            }else{//部分或全部不选中
                this.cartList.forEach(item => item.checked = true)
            }
        }
    },
}
</script>

<style scoped>
.cart-bottom-bar{
    background-color: #eee;
    font-size: 15px;
    position: fixed;
    right: 0;
    bottom: 50px;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-top: 1px solid #cccccc;
}

.check-content{
    display: flex;
    align-items: center;
}

.check-button{
    height: 20px;
    width: 20px;
    margin-right: 5px;
}

.price{
    margin-left:10px ;
}

.calculate{
    position: absolute;
    right: 0;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    color: white;
    background: linear-gradient(to right, #ff6034, #ee0a24);
}
</style>