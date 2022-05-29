import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import tab from './tab'
import home from './home'
import mall from './mall'

export default new Vuex.Store({
    modules:{
        tab,
        home,
        mall
    }
})