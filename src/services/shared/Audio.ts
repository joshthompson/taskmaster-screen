const ELEMENT_CLASS = 'fake-game-show-music'
import store from '@/store'

interface AudioOptions {
	id?: string
	playbackRate?: number
	volume?: number
}

export function audio(file: string, options: Partial<AudioOptions> = {}) {

	const { id, playbackRate, volume } = { id: 'default', playbackRate: 1, volume: 1, ...options }

	// Stop the music
	stop(options.id)

	// Create new audio tag
	const element = document.createElement('audio')
	element.setAttribute('class', ELEMENT_CLASS)
	element.setAttribute('data-audio-id', id)
	element.setAttribute('src', file)
	document.body.appendChild(element)

	// Play
	element.currentTime = 0
	element.play()
	element.volume = store.state.volume * volume
	element.playbackRate = playbackRate

	return element
}

export function setVolume(volume: number) {
	store.commit('setVolume', volume)
	Array.from(
		document.getElementsByClassName(ELEMENT_CLASS) as HTMLCollectionOf<HTMLAudioElement>
	).forEach((element) => element.volume = volume)
}

export function stop(id: string = 'default') {
	// Remove previous audio tags
	const element = document.querySelector(`.${ELEMENT_CLASS}[data-audio-id="${id}"]`)
	if (element) {
		element.remove()
	}
}
