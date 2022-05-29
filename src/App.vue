<template>
  <el-container id="app">
    <!-- 这里el-aside一定要设置width为auto 不然样式有问题 -->
    <el-aside width="auto"><CommonAside/></el-aside>

    <el-container>

      <el-header><CommonHeader/></el-header>

      <CommonTag/>

      <el-main>
        
        <router-view></router-view>
      
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'
export default {
  name: "App",
  components:{CommonAside,CommonHeader,CommonTag}
};
</script>

<style>
#app {
  /* 让布局拉满全部空间 */
  height: 100vh;
}
html body{
  /* 取消上下左右的空白 */
  padding: 0;
  margin: 0;
}
.el-aside{
  /* 拉满高度 */
  height: 100%;
}
.el-main {
  /* 取消顶部空白 */
  padding-top: 0;
  background-color: white;
  /* 拉满高度 */
  height: 100%;
}
.el-header{
  /*设置背景颜色*/
  background-color: #333;
}

</style>
