<template>
<div>
<el-upload
  class="upload-demo"
  action="admin/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList2"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<ul>
  <img v-for="img in uploadedlist" :src="`http://localhost:8081/${img.name}`"></img>
</ul>
</div>
</template>
<script>
  export default {
    mounted(){
      axios.get('admin/uploads').then(m => {
        this.uploadedlist=m.data.list;
      });


    }
    ,
    data() {
      return {
        uploadedlist:[],
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
