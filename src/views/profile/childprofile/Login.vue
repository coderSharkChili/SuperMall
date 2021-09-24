<template>
    <div class="login">
        <div class="user-pic">
            <img src="~assets/img/profile/user.png" alt="">
        </div>

        <div class="user-info">
            <p class="user-info-login">登录/注册</p>
            <div class="user-info-phone">
                <img src="~assets/img/profile/phone.png" alt="">
                <p>暂未绑定手机号</p></div>
        </div>

        <div class="profile-right">
            <img src="~assets/img/profile/arrow_right.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'Login',
}
</script>

<style scoped>
.login{
    position: relative;
    display: flex;
    align-items: center;
    width:100%;
    height: 90px;
    background-color: #ff8198;
}
.user-pic{
    margin-left: 20px;
    background-color: #fff;
    border-radius: 50%;
}
.user-pic img{
    height: 70px;
}
.user-info{
    font-size: 16px;
    margin-left: 20px;
    color: white;
}
.user-info-login{
    
    margin-bottom: 7px;
}
.user-info-phone{

    display: flex;
}
.profile-right{
    position: absolute;
    right: 15px;
}
.profile-right img{
    width: 20px;
    height: 20px;
}
</style>