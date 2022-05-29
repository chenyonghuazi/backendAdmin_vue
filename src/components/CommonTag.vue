<template>
  <!-- 公共组件 Tag标签 -->
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tabList"
      :key="item.name"
      size="small"
      :closable="item.name != 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
//effect属性是为了tag高亮和特效效果

import { mapState } from "vuex";
export default {
  name: "CommonTag",

  computed: {
    ...mapState({
      tabList: (state) => {
        return state.tab.tabList;
      },
    }),
  },

  methods: {
    //处理点击tag
    changeMenu(tag) {
      this.$router.push({name:tag.name})
      
    },
    //处理删除tag
    handleClose(tag, index) {

      const length = this.tabList.length - 1 //得到最后一个历史记录页面的index

      this.$store.commit('CLOSETAG',tag)  //删除你点击删除的那个历史记录页面

      //可能会跳转页面
      //如果点击删除的页面不是当前页面
      if(this.$route.name !== tag.name){
        console.log("第一种情况") //不做任何操作
      }
      
      //如果点击删除的页面是最后一个页面
      if(index === length){
        console.log("第二种情况")
        this.$router.push({
          name:this.tabList[index - 1].name
        })
      }
      // 如果删除的是中间某个页面，或者是中间的当前页面，则会往后一页跳转
      else{
        console.log("第三种情况")
        this.$router.push(this.tabList[index].name) //这里的index是删除更新了的tablist
      }
    },
  },
};
</script>

<style scoped>
/*样式 */
.tabs{
    padding:20px;
}
.el-tag{
    margin-right: 15px;
    cursor: pointer;
}
</style>