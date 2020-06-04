const ELEMENT_ID = 'fake-game-show-music'
import store from '@/store'

export function audio(file: string) {
	// Stop the music
	stop()

	// Create new audio tag
	const element = document.createElement('audio')
	element.setAttribute('id', ELEMENT_ID)
	element.setAttribute('src', file)
	document.body.appendChild(element)

	// Play
	element.currentTime = 0
	element.play()
	element.volume = store.state.volume

	return element
}

export function setVolume(volume: number) {
	store.commit('setVolume', volume)
	const element = document.getElementById(ELEMENT_ID) as HTMLAudioElement
	if (element) {
		element.volume = volume
	}
}

export function stop() {
	// Remove previous audio tags
	if (document.getElementById(ELEMENT_ID)) {
		document.getElementById(ELEMENT_ID).remove()
	}
}
