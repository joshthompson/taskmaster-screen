export interface WLState {
	game: WLGameState
	script: string
}

export interface WLGameState {
	contestants: WLContestant[]
	roundNumber: number
	totalBanked: number
	round?: WLRoundState
	strongest?: WLContestant[]
}

export interface WLRoundState {
	banked: number
	started: boolean
	questionStart: number
	timer: number
	contestant: number
	chainPosition: number
	timeoutId: number
	value: number
	max: number
	currentContestant: WLContestant
}

export interface WLContestant {
	name: string
	out: boolean
	right?: number
	time?: number
	banked?: number
	lost?: number
	total?: number
	outTime?: number
}

export const WLBaseTime = 180 // Starting time
export const WLTimeReduction = 10 // How much less time for whenever a contestant leaves
export const WLChain = [ 5, 10, 25, 50, 100, 150, 250, 375, 500 ]
