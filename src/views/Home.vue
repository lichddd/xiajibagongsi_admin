<template>
  <div class="hello">

  <button @click="submit()"></button>
  <div v-html="content" style="text-align:left"></div>
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
    this.$el.appendChild(ed);
    this.editor = new E('#'+name);
    this.editor.customConfig.onchange = (html) => {
      this.content = html
    };
    this.editor.customConfig.uploadImgServer = 'admin/upload';
    this.editor.create();
    this.editor.txt.clear();



  },
  data () {
    return {
      content:"",
      editor:null,
      msg: 'Welcome to Your Vue.js App'
    }
  }
  ,
  methods:{
    submit(){

      console.log(this.content);

    }


  },
  beforeDestroy(){
    this.editor=null;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
