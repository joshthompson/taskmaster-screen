export interface WLState {
	game: WLGameState
	script: string
	screenState?: WLScreenState
	director?: string
}

export type WLScreenState
	= 'preShow'
	| 'nothing'
	| 'showLogo'
	| 'showTotal'
	| 'round'
	| 'finalRound'
	| 'voting'
	| 'credits'
	| 'intro'

export interface WLGameState {
	contestants: WLContestant[]
	roundNumber: number
	totalBanked: number
	round?: WLRoundState
	finalRound?: WLFinalRoundState
	strongest?: WLContestant[]
	currentlyVoting?: boolean
	namePlaque?: string
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

export interface WLFinalRoundState {
	player1: WLContestant
	player2: WLContestant
	questionNumber: number
	results: boolean[][]
	started: boolean
	suddenDeath: boolean
	ready: boolean
}

export interface WLContestant {
	name: string
	fullName: string
	googleName?: string
	out: boolean
	right?: number
	time?: number
	banked?: number
	lost?: number
	total?: number
	outTime?: number
}
