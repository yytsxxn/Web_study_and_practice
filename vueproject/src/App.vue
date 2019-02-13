<template>
  <div id="app">
    <c-header></c-header>
  </div>
</template>

<script>
  import CHeader from '@/components/CHeader';
  export default {
    components :{
      CHeader
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

</style>
