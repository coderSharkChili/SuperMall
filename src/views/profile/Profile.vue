<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <template v-slot:center>
        <div>
          用户信息
        </div>
      </template>
    </nav-bar>

    <scroll ref='scroll' class="content" :probeType='3'  :pullUpLoad='true'>
    <login/>
    <money/>
    <profile-list></profile-list>
    </scroll>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import Login from './childprofile/Login'
import Money from './childprofile/Money'
import ProfileList from './childprofile/ProfileList'
export default {
  name: "Profile",
  components:{
    NavBar,
    Scroll,

    Login,
    Money,
    ProfileList
  }
};
</script>

<style scoped>
.profile{
  width: 100%;
}
.profile-nav-bar{
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
.content{
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>