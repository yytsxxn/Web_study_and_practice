<template>
  <div id="app">
    <button @click="prev">&lt;</button>
    <button @click="next">&gt;</button>
    <button @click="home">goHome</button>
    <div id="nav">
      <router-link to="/home">redirect</router-link> |
      <router-link to="/about">About</router-link> |
      <!-- <router-link to="/mine">Mine</router-link> -->
      <router-link :to="{name:'mine',params:{name:'yyt',age:'20'}}">Mine</router-link> |
      <router-link to="/notfindtest">notfindtest</router-link>|
      <router-link to="/count">count</router-link>
      <transition name="fade">
        <router-view/>
    </transition>
    </div>
  </div>
</template>
<script>
    export default {
        methods:{
          prev(){
            this.$router.go(-1);
          },
          next(){
            this.$router.go(1);
          },
          home(){
            this.$router.push('/');
          }
        }
    }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.fade-enter{
  /* opacity: 0; */
  transform: translateX(-100%);
}
.fade-enter-active{
  transition: transform 1s ease;
}
.fade-enter-to{
  /* opacity: 1; */
  transform: translateX(0);
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  transition: opacity 2s ease;
}
.fade-leave-to{
  opacity: 0;
}
</style>
