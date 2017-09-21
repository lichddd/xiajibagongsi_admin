<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" class="form" label-width="60px">
      <el-form-item label="账户" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" @click="$refs.form.resetFields()" :disabled="!(form.user||form.password)">重置</el-button>
        <el-button size="large" type="primary" @click="login()">登录</el-button>



      </el-form-item>


    </el-form>


  </div>


</template>

<script>
import cookie from '@/util/cookie'
import crypto from 'crypto'
export default {
  name: 'login',
  components:{},
  mounted(){



  },
  data () {
    return {
      form:{
        user:"",
        password:"",
      }
      ,
      rules:{
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          {min:8,max:16,message:'长度在8到16个字符',trigger:'blur'}
        ],
        user:[
          { required: true, message: '请输入账户', trigger: 'blur' },
          {min:4,max:16,message:'长度在4到16个字符',trigger:'blur'}
        ],
      }
    }
  }
  ,
  methods:{
    login(){
      this.$refs.form.validate((valid)=>{

        if (valid) {
          axios.post(`login`,{user:this.form.user,password:crypto.createHash('md5').update(this.form.password).digest('hex')}).then(m => {

            this.$router.replace({path:(this.$route.query.redirect||"/")});

          });
        }



      });

    }
  },
  beforeDestroy(){
  }
  ,
  watch:{
    $route(){
      this.$refs.form.resetFields();

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form{
  width: 400px;
  margin:12% auto;
}

</style>
