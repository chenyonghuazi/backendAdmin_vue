import {getRooms} from '@/api'

export default{
    actions:{
        async getRoomsList(context,config){
            let result = await getRooms(config)
            if(result.code == 200){
                context.commit('GETROOMSLIST',result.data)
            }
        }
    },
    mutations:{
        GETROOMSLIST(state,result){
            state.rooms = result
            console.log(result)
        }
    },
    state:{
        rooms:[]
    }
}