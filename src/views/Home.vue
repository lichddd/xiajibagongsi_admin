<template>
  <div class="home">
    <div class="counts">
      <div style="float:left;background-color: #69b3ff;color: #FFFFFF;width: 38px;height: 90px;padding-top:20px;margin: 0;border: none;" >
        <p style="    font-size: 16px;
    width: 20px;
    margin-left: 10px;
    line-height: 1.5;">总览</p>
      </div>



      <div class="count">
        <p>总空间</p>
        <h1>{{info.maxsize | disksize}}</h1>
      </div>
      <div class="count">
        <p>图片已使用空间</p>
        <h1>{{info.allsize | disksize}}</h1>
      </div>
      <div class="count">
        <p>数据已使用空间</p>
        <h1>{{info.dbsize | disksize}}</h1>
      </div>
      <div class="count">
        <p>文件数量</p>
        <h1>{{info.filecount}}</h1>
      </div>
      <div class="count" style="border: none;">
        <p>新闻数量</p>
        <h1>{{info.newscount}}</h1>
      </div>

    </div>
    <!-- <button @click="down()"></button> -->
    <el-card class="box-card echart-continer" :body-style="{ padding: '0px' ,height: '100%' ,width: '100%'}">
      <div class="echart">

      </div>

    </el-card>



  </div>


</template>

<script>
import filesaver from 'file-saver'
import echarts from 'echarts'
export default {
  name: 'hello',

  components:{},
  mounted(){
    axios.get('admin/info').then(m => {

      this.info=m.data.info;

    });
    this.echart = echarts.init(document.getElementsByClassName('echart')[0]);

    this.drawChart();
  },
  data () {
    return {
        info:{},
      msg: 'Welcome to Your Vue.js App'
    }
  }
  ,
  methods:{
    down(){
      var blob = new Blob(["a,b,c\n1,2,3"], {type: "text/plain;charset=utf-8"});
      filesaver.saveAs(blob, "hello world.csv");


    }
    ,
    drawChart(){

      // 绘制图表
      this.echart.setOption();


    }
    ,
    getData(){

      return option;
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
  height: 100%;
  position: relative;
  padding-top: 20px;
  /*padding-bottom: 20px;*/
}
p{
  margin: 0px;

}
.counts
{
	width: 100%;
  margin: 0px auto 30px auto;
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
.echart-continer
{
  max-height: calc(100% - 135px);
  height: calc(100% - 135px);
  min-height: 400px;
  margin-bottom: 20px;
  position: relative;
}
.echart
{
  height: 100% ;
  width: 100%;
}

</style>
