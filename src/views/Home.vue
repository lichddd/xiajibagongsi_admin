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
          this.drawChart();

    });
    this.echart = echarts.init(document.getElementsByClassName('echart')[0]);


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
      this.echart.setOption(this.getData());


    }
    ,
    getData(){

var date = [];
var data = [];
this.info.visit.visit.forEach((l)=>{

  date.push(l.date);
  data.push(l.count);
})



      return  {
          tooltip: {
              trigger: 'axis',
              position: function (pt) {
                  return [pt[0], '10%'];
              }
          },
          title: {
              left: 'center',
              text: '每日访问量',
          },
          toolbox: {
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: date
          },
          yAxis: {
              type: 'value',
              boundaryGap: [0, '100%']
          },
          dataZoom: [{
              type: 'inside',
              start: 0,
              end: 2
          }, {
              start: 0,
              end: 2,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '50%',
              handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
              }
          }],
          series: [
              {
                  name:'人数',
                  type:'line',
                  smooth:true,
                  symbol: 'none',
                  sampling: 'average',
                  itemStyle: {
                      normal: {
                          color: 'rgb(255, 70, 131)'
                      }
                  },

                  data: data
              }
          ]
      };
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
