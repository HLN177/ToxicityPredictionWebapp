<template>
  <div id="app">
      <el-container style="height: 100%;">
        <el-header>
          <span>Toxicity Prediction Webapp</span>
          <el-button class="logout-bt"  @click="logoutMethod">logout</el-button>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-row class="tac">
             <el-col :span="1">
              <el-menu default-active="1" class="el-menu-vertical-demo" router>
                <el-menu-item index="/dashboard/search">
                  <i class="el-icon-zoom-in"></i>
                  <span slot="title">Search</span>
                </el-menu-item>
                <!-- <el-menu-item index="/dashboard/result">
                  <i class="el-icon-document"></i>
                  <span slot="title">Result</span>
                </el-menu-item> -->
                <el-menu-item index="/dashboard/userlog">
                  <i class="el-icon-notebook-1"></i>
                  <span slot="title">Log</span>
                </el-menu-item>
              </el-menu>
             </el-col>
          </el-row>
          </el-aside>
          <el-container>
            <el-main>
              <router-view/>
            </el-main>
            <el-footer></el-footer>
          </el-container>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import {axiosInstance} from "../util/axios";

export default {
  name: 'dashboard',
  components: {
    
  },
  data() {
      return {

      }
    },
    methods:{
      logoutMethod(){
        axiosInstance.get('/logout')
        .then((response)=>{
          if(response.data=='ok'){
            this.$router.push('/');
          }
        // if(response.data=='logout'){
        //   this.$router.push('/');
        // }
        })
      }
    }
  
}
</script>


<style>
  #app {
  font-family: "Arial", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  background-color:transparent;
  height: 100%;
}
  .el-header, .el-footer {
    background-color: #F2F6FC;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-family:Arial;
    font-size: 23px;
    color: #409EFF;
    font-weight: bold;
  }
  
  .el-aside {
    background-color: #F2F6FC;
    color:#333;
    text-align: center;
    line-height: 300px;
  }
  .el-menu-item{
    font-family:Arial;
    font-size: 15px;
    font-weight: bold;
    color: #409EFF;
  }
  .el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .logout-bt{
    position: absolute;
    left: 90%;
    top: 1%;
    color:#67C23A;
    
  }
</style>
