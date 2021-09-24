<template>
    <div class="profile-list">
        <div class="profile-list-item">
            <van-icon name="comment" class="profile-list-icon" />
            <p>我的消息</p>
            </div>

        <div class="profile-list-item">
            <van-icon name="point-gift" class="profile-list-icon" />
        <p>积分商城</p>
        </div>

        <div class="profile-list-item">
            <van-icon name="gem" class="profile-list-icon"/>
            <span>会员特权</span>
        </div>

        <div class="line"></div>

            <div class="profile-list-item">
        <van-icon class="profile-list-icon" name="shopping-cart" />
        <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
        <van-icon class="profile-list-icon" name="good-job" />
        <span>点赞购物APP</span>
    </div>
    </div>
</template>

<script>
export default {
    name:'ProfileList'
}
</script>

<style scoped>
.profile-list{
    width: 100%;
    margin-top: 8px;
    
}
.profile-list-item{
    display: flex;
    height: 45px;
    line-height: 45px;
    align-items:center;
    margin-left: 20px;
}
.profile-list-item .profile-list-icon{
    font-size: 24px;
    
}
.profile-list-item p{
    color: #333;
    width: 100%;
    margin-left:10px ;
    font-size: 16px;
    border-bottom: 1px solid #dddddd;
}
.profile-list-item span{
    display: inline-block;
    color: #333;
    width: 100%;
    margin-left:10px ;
    font-size: 16px;
    border-bottom: 1px solid #dddddd;
}
.line{
    width: 100%;
    height: 8px;
    background-color: #eeeeee;
}
</style>