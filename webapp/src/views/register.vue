<template>
    <div class="container">
        <div class="headregi">
            sign up your account
        </div>
        <div class="mainregi">
            <div class="paddiv"></div>
            <el-form>
                <!-- <div class="error-info" v-if="loginResult">
                    <div><i class="el-icon-warning"></i><span>{{loginResult}}</span></div>
                </div> -->
                <el-form-item>
                    <el-input v-model="username" placeholder="input your name" size="medium"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-input v-model="yourAccount" placeholder="input your account"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-input v-model="password" placeholder="input your password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="passwordRepeat" placeholder="input your password again" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="signUp">sign up</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {axiosInstance} from "../util/axios";
export default {
  name: 'register',
  data(){
    return{
        username:'',
        password:'',
        passwordRepeat:'', 
      }
     },
    
  methods:{
      signUp(){
          axiosInstance.post('/register', {
            username:this.username,
            password:this.password,
            passwordRepeat:this.passwordRepeat
            })
            .then((res)=>{
            if(res.data=='111'){
                // console.log(res)
                alert("The password entered is not the same.please have a check!")
            }else if (res.data=='222'){
                alert("The length of username or password should be less than 30!")
            }else if(res.data=='333'){
                alert("username is exist, please try another!")
            }else{
                alert("register success! Click \"OK\" to the dashboard page");
                this.$router.replace('/');
            }
            console.log(res)
            })
      }
      
  }
}
</script>


<style scoped>
    .container{
    position: absolute;
    left: 42%;
    top: 30%;
  }
    .mainregi{
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    height: 280px;
    width:300px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
    .headregi{
    line-height: 50px;
    text-align: center;   
    font-family:Arial;
    font-size: 25px;
    color: #5c9bf9;
    font-weight: bold;
    }
    .el-input{
        line-height: 30px;
        width:220px
    }
    .paddiv{
        padding: 20px 9px 7px ;
    }
</style>
