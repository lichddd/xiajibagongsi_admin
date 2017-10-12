<template>
  <div class="cheat"  :class="{'show':show,'hide':(!show)}" @click="hasnew=false;">
      <el-tabs type="card" closable @tab-remove="removeMsg">
        <el-tab-pane
          v-for="(l, index) in list"
          :key="l.source"
          :label="l.source"
          :name="l.source"
          @click.native="l.hasnew=0;"
          >
          <span slot="label">
            <el-badge class="tab-title-badge" :value="l.hasnew" :max="9" @click.native="l.hasnew=0;">
              <span>{{l.source}}</span>
            </el-badge>
          </span>
          <div class="msgcontiner">
          <div class="msgcontinerinner">
          <div v-for="m in l.msg" class="msg" :class="{'mymsg':m.my}">
            <div>
              <span>{{m.text}}</span>
            </div>
          </div>
        </div>
        </div>
          <el-input v-model="l.str" style="width:calc(100% - 65px);display:inline-block;" @keydown.native.enter="sendMsg(l)"></el-input>
          <el-button @click="sendMsg(l)" style="width:60px;display:inline-block;">发送</el-button>
        </el-tab-pane>
      </el-tabs>
    <el-badge  class="icon" :is-dot="hasnew&&!show">
      <div class="iconpic" :class="{'el-icon-message':(!show),'el-icon-close':show}" @click="show=!show"></div>
    </el-badge>
  </div>
</template>
<script>
export default {
  name: 'login',
  components:{},
  mounted(){
    this.getMsg();
  },
  data () {
    return {
      hasnew:false,
      show:false,
      list:[],
    }
  }
  ,
  methods:{
    getMsg(){
      axios.get('admin/getMsg',{params:{name:"admin"}}).then(m => {
        console.log(m.data);
        if(m.data.msg.list)
        {
          m.data.msg.list.forEach((l)=>{
            let arr=this.list.filter((m)=>{
              return m.source==l.source;
            });
            if (arr&&arr.length>0) {
              arr[0].msg.push(l.data);
              arr[0].hasnew+=1;
              this.hasnew=true;
              this.setScroll();
            }
            else
            {
              this.list.push({source:l.source,hasnew:1,msg:[l.data],str:""});
              this.hasnew=true;
              this.setScroll();
            }
          });
          console.log(this.list);
          axios.post('admin/readMsg',{lastID:m.data.msg.lastID,myname:"admin"}).then(m => {
            this.getMsg();
          }).catch(m=>{
            this.getMsg();
          });
        }
      })
      .catch(m=>{

        this.getMsg();

      });

    }
    ,
    sendMsg(data){

      axios.post('admin/sendMsg',{
        body:data.str,
        target:data.source,
        source:"admin"
      }).then(m => {
        let arr=this.list.filter((m)=>{
          return m.source==data.source;
        });
        if (arr&&arr.length>0) {
          arr[0].msg.push({text:data.str,my:true});
          this.setScroll();
        }
        else
        {
          this.list.push({source:data.source,msg:[{text:data.str,my:true}],str:""});
          this.setScroll();
        }
      })
      .catch(m=>{
      });

    },
    removeMsg(source){
      this.list=this.list.filter((m)=>{
        return m.source!=source;
      });

    },
    setScroll()
    {
      this.$nextTick(()=>{

        let arr=this.$el.getElementsByClassName("msgcontiner");
        for (var i = 0; i < arr.length; i++) {
          arr[i].scrollTop=arr[i].getElementsByClassName("msgcontinerinner")[0].clientHeight;
        }


      });



    }

  },
  beforeDestroy(){




  }
  ,
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cheat{
  position: absolute;
  right: 0px;
  top: 0px;
  border: solid 1px #888888;
  transition: width 0.5s,height 0.5s,border-radius 0.5s;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
}
.cheat.hide{
  width: 42px;
  height: 42px;
  border-radius: 20px;
}
.cheat.show{
  width: 640px;
  height: 360px;
  border-radius: 5px;
}
.cheat.hide .el-tabs
{
  display: none;
}
.iconpic
{
  width: 35px;
  height: 35px;
  color: #22b2ef;
  font-size: 24px;
  line-height: 1.5;
  position: absolute;
  top: -7px;
  right: -5px;
}
.icon
{
  position: absolute;
  top: 10px;
  right: 7px;
  cursor: pointer;
}
.msgcontiner
{
  width: 100%;
  height: 280px;
  margin-top: -15px;
  overflow-y: scroll;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.msgcontiner .msg
{
  text-align: left;
  margin-top: 10px;
}
.msgcontiner .msg>div
{
  background: rgba(82, 145, 255, 0.2);
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  max-width: 100%;
  position: relative;
}
.msgcontiner .msg>div::before
{
  content: '';
  border-left:solid 0px rgba(82, 145, 255, 0.2);
  border-top:solid 5px rgba(82, 145, 255, 0);
  border-bottom:solid 5px rgba(82, 145, 255, 0);
  border-right:solid 5px rgba(82, 145, 255, 0.2);
  width: 0px;
  height: 0px;
  display: inline-block;
  position: absolute;
  top: 4px;
  left:-5px;
}
.msgcontiner .msg>div>span
{
  word-wrap: break-word;
}
.msgcontiner .msg.mymsg
{
  text-align: right;
}
.msgcontiner .msg.mymsg>div
{
  background: rgba(116, 255, 82, 0.2);
}
.msgcontiner .msg.mymsg>div::before
{
  border-left:solid 5px rgba(116, 255, 82, 0.2);
  border-top:solid 5px rgba(116, 255, 82, 0);
  border-bottom:solid 5px rgba(116, 255, 82, 0);
  border-right:solid 0px rgba(116, 255, 82, 0.2);
  right:-5px;
  left:inherit;
}
</style>
