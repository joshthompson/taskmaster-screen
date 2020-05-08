export interface State {
	screen: ScreenState
	contestants: Contestant[]
}

export interface ScreenState {
	type: 'logo' | 'scores' | 'video' | 'slide'
	video?: string
	image?: string
}

export interface Contestant {
	name: string
	score: number
	icon: string
}
