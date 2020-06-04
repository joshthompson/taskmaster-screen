import store from '@/store'

const lines = {
	empty: '',
	intro: 'Welcome to the weakest link',
	startRound: `Let's play, the weakest link`,
	startClock: 'Start the clock'
}

export function set(line: string) {
	store.commit('wlUpdateScript', line)
}

const insults = [
	// 1
	`Who doesn't look up to the challenge ahead?`,
	`Who will lose you toilet paper in the rounds to come?`,

	// 2
	`Whose face is on a not wanted poster?`,
	`Who's public enemy number one?`,

	// 3
	`Whose brain is smaller than a raisin?`,
	`Who thinks that cucumber tastes amazing?`,

	// 4
	`Who unironically likes Nickleback?`,
	`Who's the minister for morons?`,

	// 5
	`Who thinks Scrabble is a way to cook eggs?`,
	`Who thinks lockdown includes a round trip to Durham?`,

	// 6
	`Who has the swagger of a blagger?`,
	`Which goose should be cut loose?`,

	// 7
	`Who's the biggest muppet since kermit?`,
	`Who needs armbands for the paddling pool?`,

	`Who is a right stupid head?`,
	`Who is ... thick?!`,

	`Who thinks Henry Hoover was a US president?`,
	`Who thinks Dumos Enxon is a Swedish man?`,

	`Who's dropped the biggest clanger?`,
	`Whose the vegan in the sausage shop?`,

	`Who needs to be taken off life support?`,
	`Who's jingle bells and who's alarm bells?`

]
export function getInsult() {
	return insults.shift() || `Who is a right stupid head?`
}

export default {
	set,
	getInsult,
	...lines
}
