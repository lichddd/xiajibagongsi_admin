<template>
  <div class="edit">
  <div class="title">
  <h4>{{newsObj.newsID?'编辑':'新增'}}</h4>
  <el-input v-if="!newsObj.newsID" placeholder="请输入标题" v-model="newsObj.title"></el-input>
  <h4 v-if="newsObj.newsID">{{newsObj.title}}</h4>
  </div>
  <div class="edit-html">

  </div>
  <div class="pre-html" :class="{'show':htmlshow}">
    <div class="html-show-btn" @click="htmlshow=!htmlshow">

      <span class="btn-icon" :class="{'el-icon-arrow-left':!htmlshow,'el-icon-arrow-right':htmlshow,'show':htmlshow}"></span>
      <span class="btn-text" :class="{'show':htmlshow}">{{(htmlshow?'返回':'预览')}}</span>
    </div>

    <div class="content" v-html="htmlStr"></div>
  </div>

  <el-button @click="submit()">提交</el-button>
  <el-button @click="$emit('cancel')">取消</el-button>
  </div>


</template>

<script>
import E from 'wangeditor'
export default {
  name: 'hello',
  mounted(){
    var ed = document.createElement("div");
    let name="editorElem"+(new Date()).getTime();
		ed.setAttribute("id",name );
    this.$el.getElementsByClassName('edit-html')[0].appendChild(ed);
    this.editor = new E('#'+name);
    this.editor.customConfig.onchange = (html) => {
      this.htmlStr = html
    };
    this.editor.customConfig.uploadImgServer = 'admin/upload';
    this.editor.create();
    this.editor.txt.clear();



  },
  props:{
    newsObj:{},
  },
  data () {
    return {
      editor:null,
      htmlshow:false,
      htmlStr:"",
      msg: 'Welcome to Your Vue.js App'
    }
  }
  ,
  methods:{
    submit(){

      if (this.newsObj.newsID) {
        axios.put(`admin/editnews/${this.newsObj.newsID}`,{html:this.htmlStr}).then(m => {


            this.$emit("edited");




        });

      }
      else{
        axios.post('admin/addnews',{title:this.newsObj.title,html:this.htmlStr}).then(m => {

          this.$emit("edited");


        });
      }



    }


  },
  watch:{
    newsObj(){
      this.htmlStr=this.newsObj.content;
      this.editor.txt.html(this.newsObj.content);

    }


  }
  ,
  beforeDestroy(){
    this.editor=null;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit{
  overflow-y: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  min-height: calc(100% - 20px);
  background-color: #ffffff;
}
.title
{
  margin: 5px;
  text-align: left;
}
.title > h4
{
  margin: 5px;
}
.title > .el-input
{
  width: 400px;
  max-width: 80%;
}
.title > *
{
  display: inline-block;
}
  .edit-html
  {
    text-align: left;
    margin-bottom: 10px;
  }

  .pre-html
  {
    text-align: left;
    width: 0px;
    background-color: #fefefe;
    position: fixed;
    top: 0;
    bottom:0;
    right: 0px;
    z-index: 20000;

    overflow: scroll;
  }
  .pre-html.show
  {
    width: 100%;
padding: 10px;
  }
  .pre-html > .content
  {
    display:none;

  }
  .pre-html.show > .content
  {
    display:block;

  }
  .pre-html .html-show-btn
  {
    cursor: pointer;
    position: fixed;
    top: 50%;
    right:-1px;
    border: solid 1px #cccccc;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .pre-html.show .html-show-btn
  {
    right: auto;
    left:-1px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  .pre-html .html-show-btn .btn-text
  {
    width: 15px;
    word-wrap: break-word;
    word-break: break-all;
    display: inline-block;
    font-size: 10px;
  }
  .pre-html .html-show-btn .btn-icon
  {
    width: 20px;
    display: inline-block;
    font-size: 21px;
    position: relative;
    top: -5px;

  }
  .pre-html.show .html-show-btn .btn-text
  {
    float: left;

  }
  .pre-html.show .html-show-btn .btn-icon
  {
    top: 5px;

  }
</style>
