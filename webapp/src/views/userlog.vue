<template>
  <div>
    <div>
      <el-table
        :data="loglist"
        style="width: 800px">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="loginfo"
          label="SMILE File"
          width="400">
        </el-table-column>
        <el-table-column
          prop="time"
          label="Datetime"
          width="400">
        </el-table-column>
      </el-table>
      
    </div>
  </div>
</template>

<script>
import {axiosInstance} from "../util/axios";
let moment = require("moment");
export default {
  name: 'userlog',
  data(){
      return{
          loglist:[],
      }
  },
  created:function(){
    axiosInstance.get('/showdb')
        .then((response)=>{
            for(var i =0; i<response.data.length; i++){
              response.data[i].time = moment(response.data[i].time).format('YYYY-MM-DD HH:mm:ss') //format datetime
            }
            console.log(response.data);
            this.loglist=response.data;
        });
  },
  methods:{
      indexMethod(index){
        return index+1;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>