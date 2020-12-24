<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"><div class="titlestyle">Original Molecular Structure PNG:</div></el-col>
        <el-col :span="6" :offset="4"><div class="titlestyle">New Molecular Structure PNG:</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="1">
          <div>
            <input style= "display:none" type="file" @change="onFileSelected" ref="fileInput">
            <el-button class="bt1" @click="$refs.fileInput.click()" icon="el-icon-search">Pick File</el-button>
            <el-button class="bt2" @click="onUpload" icon="el-icon-upload">Upload</el-button>
            <el-button class="bt3" @click="prediction" icon="el-icon-view">Prediction</el-button>
          </div>
        </el-col>
        <el-col :span="6" :offset="1"><div><img  class="pngstyle" :src="img1" alt=""></div></el-col>
        <el-col :span="6" :offset="4"><div><img  class="pngstyle" :src="img2" alt=""></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" :offset="3">
          <div class="grid-content bg-purple">
            <el-input v-model="smileinfo" placeholder="please smile" :disabled="true"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
    <div class="pdicResult" v-loading="loading">
      <el-table
        v-show="showResult"
        :data="pdicData"
        style="width: 1600px">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Method"
          width="400">
        </el-table-column>
        <el-table-column
          prop="result"
          label="Result"
          width="400">
        </el-table-column>
        <el-table-column
          prop="runtime"
          label="Runtime"
          width="400">
        </el-table-column>
      </el-table>
    </div>
  </div>
  
</template>

<script>
import {axiosInstance} from "../util/axios";
export default {
  name: 'Search',
  data(){
    return{
       img1:'http://localhost:3000/nullpic.png',
       img2:'http://localhost:3000/nullpic.png',
       smileinfo:'',
       selectedFile: null,
       pdicData:'',
       showResult: false,
       loading:false
    }
  },
  methods:{
    onFileSelected(e){
      this.showResult = false;
      this.img2 = 'http://localhost:3000/nullpic.png';
      this.smileinfo = '';
      const file = e.target.files[0] || e.dataTransfer.files[0]
      let URL = window.URL || window.webkitURL; // Get the current domain name address.
      this.img1 = URL.createObjectURL(file);   // Stitch the URL and file, and transfer to the blob address.
      // console.log(event)
      this.selectedFile = e.target.files[0] // give the file which input button input to selectedFile
    },
    onUpload(){
      const fd = new FormData(); 
      fd.append('image',this.selectedFile, this.selectedFile.name)
      axiosInstance.post('/upload',fd,{
        onUploadProgress: uploadEvent => {
          console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
        }
      }).then((response)=>{
        this.img2 = response.data+'?'+Math.random()*1000;
        axiosInstance.get('/download')
      .then(response =>{
      console.log(response.data);
      this.smileinfo = response.data;
      })
      })
    },
    prediction(){
      this.loading=true;
      var data = {
        'smile':this.smileinfo
      }
      axiosInstance.post('/prediction',data).then((response)=>{
        console.log(response.data);
        this.pdicData=response.data;
        this.loading=false;
        this.showResult = true;
      })
    },
    indexMethod(index){
      return index+1;
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .pngstyle{
  width: 300px;
  height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .titlestyle{
  font-family:Arial;
  font-size:20px;
  font-weight: bold;
  color: #606266;
  }
  .bt1{
    position:relative;
    top:30px;
  }
  .bt2{
    position:relative;
    top:80px;
    left:-10px;
  }
  .bt3{
    position: relative;
    top: 130px;
    left:-10px;
  }
  .pdicResult{

    width: 1600px;
    height: 400px;
  }

</style>