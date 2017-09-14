<template>
  <div id="app">

  <div class="left-continer">

    <aaa></aaa>

  </div>

  <div class="main-continer"  v-on:scroll="onScroll($event)">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import aaa from '@/views/menu'
export default {
  name: 'app',
  components: {
    aaa,
  },
}
</script>

<style>



#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  /*min-width: 1000px;*/
  font-size: 16px;
}

.main-continer {
  left: 200px;
  height: 100%;
  width: calc(100% - 200px);
  position: absolute;
  overflow: auto;
  background-color: #ffffff;
  padding: 10px;
}



.left-continer {
  background-color: #f1f1f1;
  position: absolute;
  left: 0px;
  height: 100%;
  width: 200px;
  /*width: 0px;*/
  border-right: solid 1px #dcdcdc;
}
</style>
