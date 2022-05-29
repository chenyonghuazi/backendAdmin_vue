export default {
    actions:{
        //导航折叠功能 在CommonHeader 组件中使用
        collapse({commit}){
            commit('COLLAPSE')
        }
    },

    mutations:{
        //导航折叠功能 在CommonHeader 组件中使用
        COLLAPSE(state){
          state.isCollapse = !state.isCollapse  
        },

        //点击导航菜单 更新tabList 为面包屑和tag服务 （使用场景：CommonAside)
        SELECTMENU(state,tab){
            if(tab.name !== 'home'){
                state.currentMenu = tab 
                //如果tablist不存在这个页面，那么增加这个页面
                const result = state.tabList.findIndex(item => item.name === tab.name)
                if (result === -1) {
                    state.tabList.push(tab)
                }
            }else {
                state.currentMenu = null
            }
        },

        CLOSETAG(state,tag){

            const index = state.tabList.findIndex(item => item.name == tag.name)

            if(index !== -1){
                state.tabList.splice(index,1)
            }
        }
    },

    state:{
        //左侧导航菜单组件的折叠功能
        isCollapse: false,

        //导航面包屑 在CommonHeader和CommonTag 组件中使用
        tabList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        //面包屑和tag使用 ： 当前页面
        currentMenu:null
    }
}