<template>
  <div class="home">
    欢迎来到，瞎鸡巴公司官网管理中心
    <div class="counts">
      <div style="float:left;background-color: #69b3ff;color: #FFFFFF;width: 38px;height: 90px;padding-top:20px;margin: 0;border: none;" >
        <p style="    font-size: 16px;
    width: 20px;
    margin-left: 10px;
    line-height: 1.5;">总览</p>
      </div>



      <div class="count">
        <p>要素池量</p>
        <h1>{{elePreCnt}}<span>项</span></h1>
      </div>
      <div class="count">
        <p>全图池量</p>
        <h1>{{fullPicCnt}}<span>项</span></h1>
      </div>
      <div class="count">
        <p>规则池量</p>
        <h1>{{ruleCheckCnt}}<span>项</span></h1>
      </div>
      <div class="count">
        <p>记账池量</p>
        <h1>11111<span>项</span></h1>
      </div>
      <div class="count" style="border: none;">
        <p>复核池量</p>
        <h1>{{reCheckCnt}}<span>项</span></h1>
      </div>

    </div>
    <!-- <button @click="down()"></button> -->
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
  /*font-size: 36px;*/

}
p{
  margin: 0px;

}
.counts
{
	width: 100%;
  margin: 20px auto 30px auto;
  height: 90px;
  background: #f3f3f3;
}
.count
{
    float: left;
    color: #838383;
    width: calc(20% - 10px);
    text-align: center;
    margin-top: 17px;
    border-right: solid 1px #dcdcdc;
    height: 56px;
}
.count h1
{
    color: #3b3b3b;
    /* float: left; */
    margin-top: 10px;
    font-size: 1.6em;
}
.count>p
{
	margin-bottom: 0px;
	font-size: 0.8em;
}
.count>h1>span
{
    /*float: right;*/
    font-size: 0.6em;
    margin-top: 14px;
}


</style>
