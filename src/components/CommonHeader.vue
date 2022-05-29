<template>
  <header>

    <div class="left-content">

      <!-- 折叠按钮 -->
      <el-button plain icon="el-icon-menu" @click="collapse"></el-button>

      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item) in tabList" :key="item.path" :to="{ path: item.path }" class="mianbaoxie">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <div class="right-content">

      <!-- 下拉菜单 -->
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img :src="avatarImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided @click.native="logOut"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
        avatarImg: "/images/logo.jpg",
    };
  },

  methods: {
    collapse() {
      this.$store.dispatch('collapse')
    },
  },

  computed:{
    ...mapState({
      tabList:(state)=>{
        return state.tab.tabList
      }
    })
  }
};
</script>

<style scoped>
/* ------整个header的样式----- */
header {
  
  display: flex;
  height: 100%;
  /*设置占满整个顶部布局 这个必须要设置*/
  width: 100%;
  /*设置水平排序*/
  justify-content: space-between;
  /*设置垂直方向的排序*/
  align-items: center;
}
/* -----左边区域的样式------- */
.left-content {
  display: flex;
  align-items: center;
}
.el-button {
  margin-right: 20px;
}
/* 
面包屑字体样式
*/
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
        color: #d9bb95 !important;
}

/* ------右边区域下拉菜单的图片的样式----- */
div.right-content img {
  width: 40px;
  height: 40;
  border-radius: 50%;
}
</style>