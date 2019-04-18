<template>
  <div id="app">
    <!-- <page-header/> -->
    <router-view></router-view>

    
  </div>
  
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Montserrat', sans-serif;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #43668a;
  margin-top: 0px; 
}
@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
</style>



