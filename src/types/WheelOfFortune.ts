export enum ClueClass {
	void = '_',
	blank = '-',
	hidden = 'X',
	found = 'H',
	letter = 'O',
	star = 'S'
}

export interface Clue {
	original: string
	category: string
	letters: string[][]
	classes: ClueClass[][]
}

export interface WOFState {
}
