export interface PLState {
	game: PointlessGame
	director?: string
}

export interface PointlessGame {
	currentRound: number
	currentQuestion: number
	rounds: PointlessRound[]
	teams: PointlessTeam[]
}

export interface PointlessRound {
	questions: PointlessQuestion[]
}

export interface PointlessTeam {
	name: string
	googleName: string
}

export interface PointlessQuestion {
	max: number
	category: string
	type: PointlessQuestionType
	question: string
	detail: string
	openAnswers?: PointlessAnswer[]
	boardAnswers?: PointlessBoardAnswer[]
}

export type PointlessQuestionType = 'open' | 'board'

export interface PointlessAnswer {
	answer: string
	score: number
	extra?: string
}

export interface PointlessBoardAnswer extends PointlessAnswer {
	image?: string
	hint?: number
}
