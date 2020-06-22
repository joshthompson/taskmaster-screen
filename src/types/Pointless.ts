export interface PLState {
	game: PointlessGame
	director?: string,
	screen?: string
}

export interface PointlessGame {
	currentRound: number
	currentQuestion: number
	currentPass: 1 | 2
	currentTeam: PointlessTeam
	guessedAnswers: PointlessAnswer[]
	rounds: PointlessRound[]
	teams: PointlessTeam[]
}

export interface PointlessRound {
	questions: PointlessQuestion[]
}

export interface PointlessTeam {
	name: string
	googleName: string
	credits: string[]
	score: number
	headToHeadScore: number
	answers: number
	out: boolean
}

export const PointlessWrongAnswer: PointlessAnswer = {
	answer: '✘',
	score: 100
}

export interface PointlessQuestion {
	max: number
	category: string
	question: string | string[]
	detail: string
	openAnswers?: PointlessAnswer[]
	boards?: PointlessBoard[]
}

export type PointlessBoard = PointlessBoardAnswer[]

export interface PointlessAnswer {
	answer: string
	score: number
	extra?: string
}

export interface PointlessBoardAnswer extends PointlessAnswer {
	image?: string
	hint?: string
}
