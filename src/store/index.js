import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import sign from './modules/sign'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		sign
	}
})

export default store
