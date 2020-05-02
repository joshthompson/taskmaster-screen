export interface State {
	mode: 'logo' | 'scores'
	contestants: Contestant[]
}

export interface Contestant {
	name: string
	score: number
	icon: string
}
