import Vue from 'vue'
import App from './App.vue'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router'
import store from '@/store'

import '@/mock'; //读入Mock的模拟接口

Vue.config.productionTip = false

Vue.use(elementUi)



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


/**
 * 步骤
 * 1.先做页面布局
 * 2.再做Components （初始页面）
 * 3.建立router并完成初步路由设置 （首页）
 * 4.测试
 * 
 * 导入element-ui
 * 5.再完成左边aside的第一个Component： NavMenu导航菜单
 * 6.再完成顶部Header的第二个Component： 这里会用到dropdown下拉菜单 el-button按钮，后面会用到Breadcrumb面包屑
 * 7.导入Vuex，完成Header的collapse按钮
 * 
 * 8.完成Home Page，这里要用到el-row, el-col, el-card(可能), el-table, el-table-column
 * 示意图：                   el-row
 *          ------------------------------------------
 *          |       el-col       |       el-col      |
 *          |                    |                   |
 *          |                    |                   |
 *          ------------------------------------------
 * 
 * 9. 导入mockjs， 创建文件夹啊和写模拟数据返回接口（模拟服务器端接收到的接口和需要返回的数据）
 * 10. 导入axios，二次封装request，写发送请求的接口API
 * 11. 编写vuex中home page的模块，存储home page的数据和mounted()生命周期中发送请求的动作
 * 12. home page的左上角的卡片和左下角table
 * 13. home page右上角的卡片群
 * 14. 导入echarts，完成右下角的表
 * 
 * 15. 初始化第二页第三页，并顺带设置路由
 * 16. 完成header组件里的面包屑功能， 首先需要初始化vuex管理的tab模块，网站初始化时tab模块中的面包屑数据 https://element.eleme.cn/#/zh-CN/component/breadcrumb
 * 17. 写CommonTag组件
 * 
 * 18. 剩下就是完成最后的逻辑页面了 看客户要求
 * 
 *     可编辑table和可输入的form，这里因为是弹窗式，所以要用el-dialog
 * 
 * 19. 最后还有登录系统 就完成了
 */
