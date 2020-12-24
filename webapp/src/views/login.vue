<template>
  <div class="container">
      <el-container>
            <el-header>Toxicity Prediction</el-header>
            <el-main>
                <el-input placeholder="Account" v-model="username" clearable></el-input>
                <el-input placeholder="Password" v-model="password" show-password></el-input>
                <el-button class="register-btn" type="primary" size="medium" @click.native.prevent='loginMethod'> login </el-button>
                <el-button class="login-btn" type="primary" size="medium" @click.native.prevent='registerLoad'>register</el-button>
            </el-main>
      </el-container>
  </div>
</template>

<script>
import {axiosInstance} from "../util/axios";
import store from "../util/store";
export default {
  name: 'login',
    data(){
      return {
        username: '',
        password:''
      }
    },
    methods:{
      loginMethod(){
      store.user= this.username;
      axiosInstance.post("/login", {
            username:this.username,
            password:this.password,
            })
            .then((response) => {
            // console.log(response.data);
            if(response.data=='success'){
              this.$router.push('/dashboard');
            }else if(response.data=='overflow'){
              alert("The length of username or password should be less than 30!");
            }else{
              alert("username or password is incorrect!");
            }
            })
      },
      registerLoad(){
        this.$router.push('/register');
      }
    }
}
</script>


<style scoped> 
    .el-header{
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 300px;
    font-family:Arial;
    font-size: 23px;
    color: #5c9bf9;
    font-weight: bold;
  }
  .el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 50px;
    width:300px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .register-btn{
    width: 45%;
  }
  .login-btn {
    width: 45%;
  }
  .container{
    position: absolute;
    left: 42%;
    top: 30%;
  }
</style>