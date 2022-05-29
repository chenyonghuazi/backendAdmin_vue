import {getData} from '@/api'

export default {
    actions:{
        async updateHomeData({commit}){
            let result = await getData()
            if(result.code == 200){
                commit('UPDATEHOMEDATA',result.data)
            }
            
        }
    },
    mutations:{
        UPDATEHOMEDATA(state,data){
            state.homeData = data
        }
    },
    state:{
        homeData: []
    }
}