const ELEMENT_ID = 'wl-music'

// Has good quality everything - https://www.youtube.com/watch?v=11i_Y4FD554
// Final winner - https://www.youtube.com/watch?v=Z7UgtFSWvII
// Voting bed - https://www.youtube.com/watch?v=Mfh3eu0VD4E
// Head to head and winners sting - https://www.youtube.com/watch?v=WAa47Fb5xKc

function audio(file: string) {
	// Remove previous audio tags
	if (document.getElementById(ELEMENT_ID)) {
		document.getElementById(ELEMENT_ID).remove()
	}
	
	// Create new audio tag
	const element = document.createElement('audio')
	element.setAttribute('id', ELEMENT_ID)
	element.setAttribute('src', file)
	document.body.appendChild(element)

	// Play
	element.currentTime = 0
	element.play()
}

async function sting() {
	// console.log('Audio start: ..... sting')
	// await audio(0, 3)
	// console.log('Audio finish: .... sting')
}

function round(length: number) {
	audio(`/weakest-link/audio/${length}s.mp3`)
}

function endRound() {
	const element = document.getElementById(ELEMENT_ID) as HTMLAudioElement
	if (element) {
		element.currentTime = element.duration - 5.45
	}
}

export default {
	sting,
	round,
	endRound
}
