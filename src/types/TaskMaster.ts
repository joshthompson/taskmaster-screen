export interface TMState {
	screen: TMScreenState
	contestants: TMContestant[]
}

export interface TMScreenState {
	type: 'logo' | 'scores' | 'video' | 'slide'
	video?: string
	image?: string
}

export interface TMContestant {
	name: string
	score: number
	icon: string
}
