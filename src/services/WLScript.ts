import store from '@/store'

const lines = {
	empty: '',
	intro: 'Welcome to the weakest link',
	startRound: `Let's play, the weakest link`,
	startClock: 'Start the clock',
	endOfRound: 'Who was really bad at those questions? Who sucks? Time to vote for - The Weakest Link'
}

export function set(line: string) {
	store.commit('wlUpdateScript', line)
}

export default {
	set,
	...lines
}
