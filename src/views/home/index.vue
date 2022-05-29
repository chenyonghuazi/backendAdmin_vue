<template>
  <div>
    <!-- gutter属性是row内的内容之间的gap https://element.eleme.cn/#/zh-CN/component/table-->
    <el-row class="home" :gutter="30">

      <!-- 左边区域 -->
      <el-col :span="8">

        <!-- 左上角的第一个卡片 https://element.eleme.cn/#/zh-CN/component/card-->
        <el-card shadow="hover">
          <div class="user">
            <img :src="avatarImg" alt="" />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>{{todayDate}}</span></p>
            <p>上次登录地点：<span>上海</span></p>
          </div>
        </el-card>

        <!-- 左下角的第二个卡片 -->
        <el-card style="margin-top: 20px; height: 400px">
          <el-table :data="homeData.tableData">
            <!-- prop属性是链接属性,要跟数据源的列名一样 -->
            <el-table-column
              v-for="(value, name) in tableLabel"
              :key="name"
              :label="value"
              :prop="name"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <!-- 右边区域 -->
      <el-col :span="16">

        <!-- 右边第一个区域 -->
        <div class="num">
          <el-card
            v-for="item in homeData.countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <div>
              <i
                :class="`el-icon-${item.icon}`"
                :style="{ background: item.color }"
              ></i>
            </div>

            <div class="detail">
              <p class="number">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>

        <!-- 右边第二个区域 -->
        <el-card style="height:280px; margin-top:20px">
          <div ref="echart1" style="height:280px">
            <!-- 折线图表的占位 -->
          </div>
        </el-card>

        <!-- 右边第三个区域 两个图表-->
        <div class="graph">
          <!-- 柱状图 -->
          <el-card style="height:260px">
            <div ref="echart2" style="height:240px"></div>
          </el-card>
          <!-- 饼图 -->
          <el-card style="height:260px">
            <div ref="echart3" style="height:240px"></div>
          </el-card>
        </div>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import {lineChart, Histogram, pieChart} from '@/echarts';

export default {
  name: "home",
  data() {
    return {
      todayDate:'',
      avatarImg: "/images/logo.jpg",
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
    };
  },
  mounted() {
    //拿取首页的数据
    this.$store.dispatch("updateHomeData");

    //首页左上角时间
    this.todayDate = new Date().toDateString()
  },

  computed: {
    ...mapState({
      homeData: (state) => {
        console.log(state.home.homeData.tableData);
        return state.home.homeData;
      },
    }),
  },

  watch:{
    homeData:{
      handler(newValue, oldValue){

        // nextTick是自带的等待整个组件dom更新循环结束后再做回调
        this.$nextTick(()=>{
          lineChart(this.$refs.echart1,this.homeData) //制作折线图
          Histogram(this.$refs.echart2, this.homeData) //制作柱状图
          pieChart(this.$refs.echart3,this.homeData) //制作饼图
        })
      }
      
    }
  }
};
</script>

<style scoped>
/*
左上角卡片的样式
*/
.user {
  display: flex;
  border-bottom: 1px solid black;
}
.user img {
  width: 100px;
  height: 100px;
  padding-right: 20px;
}
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.userInfo p {
  margin: 0;
}

/** 
右侧上方的卡片群的样式
*/
.num {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 20px;
  row-gap: 20px;
}
.num .el-card {
  
  
  border-radius: 5px;
  height: 60px;
}
.num .el-card div:first-child{
  width: 56px;
}
.num .el-card div{
  
  
  text-align:left;
  justify-content: center;
}
.num .el-card i{
  display: block;
  width: 100%;
  height: 100%;
  text-align:center;
  justify-content: center;
}
.detail p {
  font-size: 0.5rem;
  
}

/**
右下角两个图表群卡片的样式

*/
.graph{
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top:20px;
  column-gap: 10px;
}
</style>