import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import { AppState } from '@/types'

Vue.use(Vuex)

const initialState: AppState = {
	tm: {
		contestants: [],
		screen: { type: 'logo' }
	},
	wl: {
		game: null,
		script: ''
	}
}

const mutations: MutationTree<AppState> = {
	wlSetGame: (state, game) => {
		state.wl.game = game
	},
	wlUpdateScript: (state, line) => {
		state.wl.script = line
	}
}

export default new Vuex.Store({
	strict: true,
	state: initialState,
	mutations
})
