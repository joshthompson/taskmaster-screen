export interface TMState {
	screen: TMScreenState
	contestants: TMContestant[]
}

export interface TMScreenState {
	type: 'logo' | 'scores' | 'video' | 'slide' | 'portrait' | 'audio' | 'letter'
	video?: string
	image?: string
	portraits?: { name: string, image: string }[]
	audio?: string
	letter?: string
	after?: TMScreenState
}

export interface TMContestant {
	name: string
	score: number
	icon: string
}
