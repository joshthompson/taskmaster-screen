import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import { AppState } from '@/types'
import { WLGameState, WLScreenState } from '@/types/WeakestLink'

Vue.use(Vuex)

const initialState: AppState = {
	tm: {
		contestants: [],
		screen: { type: 'logo' }
	},
	wl: {
		game: null,
		script: '',
		screenState: 'preShow',
		director: 'free'
	},
	pl: {
		game: null,
		director: 'free',
		screen: 'nothing',
		jackpot: 4
	},
	volume: 0.45
}

const mutations: MutationTree<AppState> = {
	wlSetGame: (state, game: WLGameState) => {
		state.wl.game = game
	},
	wlUpdateScript: (state, line: string) => {
		state.wl.script = line
	},
	wlSetScreenState: (state, screenState: WLScreenState) => {
		state.wl.screenState = screenState
	},
	wlSetDirector: (state, director: string) => {
		state.wl.director = director
	},
	plSetDirector: (state, director: string) => {
		state.pl.director = director
	},
	plSetScreen: (state, screen: string) => {
		state.pl.screen = screen
	},
	plSetJackpot: (state, jackpot: number) => {
		state.pl.jackpot = jackpot
	},
	setVolume: (state, volume: number) => {
		state.volume = volume
	}
}

export default new Vuex.Store({
	strict: true,
	state: initialState,
	mutations
})
