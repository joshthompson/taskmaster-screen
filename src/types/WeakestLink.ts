import WLFinalRound from '@/services/WLFinalRound'

export interface WLState {
	game: WLGameState
	script: string
	screenState?: WLScreenState
}

export type WLScreenState = 'nothing' | 'showLogo' | 'showTotal' | 'round' | 'finalRound' | 'voting'

export interface WLGameState {
	contestants: WLContestant[]
	roundNumber: number
	totalBanked: number
	round?: WLRoundState
	finalRound?: WLFinalRoundState
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

export interface WLFinalRoundState {
	player1: WLContestant
	player2: WLContestant
	questionNumber: number
	results: boolean[][]
	started: boolean
	suddenDeath: boolean
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
