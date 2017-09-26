<template>
  <div class="home">
    欢迎来到，瞎鸡巴公司官网管理中心
    <button @click="down()"></button>
  </div>


</template>

<script>
import filesaver from 'file-saver'
export default {
  name: 'hello',
  components:{},
  mounted(){



  },
  data () {
    return {

      msg: 'Welcome to Your Vue.js App'
    }
  }
  ,
  methods:{
    down(){
      var blob = new Blob(["a,b,c\n1,2,3"], {type: "text/plain;charset=utf-8"});
      filesaver.saveAs(blob, "hello world.csv");


    }
  },
  beforeDestroy(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  font-size: 36px;
}

</style>
