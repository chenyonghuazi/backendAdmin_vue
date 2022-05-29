<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"

    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 标题 -->
    <h3>{{isCollapse? '后台' : '通用后台管理系统'}}</h3>

    <!-- 无子导航的父导航 -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.name"
      @click="handleClick(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 有子导航的父导航 -->
    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="subItem in item.children"
        :key="subItem.name"
        :index="subItem.name"
      >
        <!-- <span slot="title">分组一</span> -->

        <!-- 子导航 -->
        <el-menu-item :index="subItem.name" @click="handleClick(subItem)">{{ subItem.label }}</el-menu-item>

      </el-menu-item-group>
    </el-submenu>



  </el-menu>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "CommonAside",
  data() {
    return {
      
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManageme/UserManageme",
        },
        {
          path: "/other",

          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({
        isCollapse:(state)=>{
            return state.tab.isCollapse
        }
    }),
    hasChildren() {
      return this.menu.filter((item) => {
        return item.children;
      });
    },

    noChildren() {
      return this.menu.filter((item) => {
        return !item.children;
      });
    },
  },

  methods: {
    //处理打开有子导航的父导航
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    //处理折叠有子导航的父导航
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    //处理点击menu导航
    handleClick(item){
      //更新面包屑和tag
      this.$store.commit('SELECTMENU',item)
      //跳转页面
      this.$router.push({
        name:item.name
      })
    }
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  min-height: 400px;
}

h3 {
  color: #fff;
  text-align: center;
}
</style>