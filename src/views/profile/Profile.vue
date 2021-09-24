<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <template v-slot:center>
        <div>
          用户信息
        </div>
      </template>
    </nav-bar>
    <login/>
    <money/>
    <profile-list></profile-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import Login from './childprofile/Login'
import Money from './childprofile/Money'
import ProfileList from './childprofile/ProfileList'
export default {
  name: "Profile",
  components:{
    NavBar,

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
</style>