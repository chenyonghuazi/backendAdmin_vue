<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 100%">
      <el-tab-pane 
        v-for="(item, index) in rooms" :key="index"
        :label="item.floor + '楼'"
      >
          <el-card
            v-for="(subItem, index) in item.rooms" :key="index"
            :body-style="{ padding: '0px'}"
          >
          <div class="room">
            <div class="roomBar" :class="subItem.occupy === 0 ? 'roomStatusOut' : 'roomStatusIn'">
              {{subItem.number}}
            </div>
            <div>
              <span style="justify-content:center; margin-right: 15px">{{subItem.name}}</span>
              <span>{{subItem.sex === 0 ? '女' : '男'}}</span>
              <p>{{subItem.date}}</p>
            </div>
          </div>

          </el-card>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "mall",
  data(){
      return {
          tabPosition:'left',
          
      }
  },

  computed:{
      ...mapState({
          rooms:(state)=>{
              return state.mall.rooms
          }
      })
  },

  mounted(){
      this.$store.dispatch('getRoomsList',{floor:0})
  }
};
</script>

<style scoped>

.el-tabs{
    height: 100vh;
}
.el-tab-pane{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  row-gap: 20px;
}
.el-card{
  height:160px;
  width: 160px;
}
.roomBar{
  height:40px;
  text-align: center;
  font-size: 25px;
  
} 
.roomStatusOut{
  
  background-color: greenyellow
}
.roomStatusIn{
  
  background-color: orange
}
</style>