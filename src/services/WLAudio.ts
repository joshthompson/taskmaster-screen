const ELEMENT_ID = 'wl-music'

function audio(file: string) {
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

	return element
}

async function sting() {
	audio(`/weakest-link/audio/sting.mov`)
}

async function sting2() {
	audio(`/weakest-link/audio/sting2.mov`)
}

function round(length: number) {
	audio(`/weakest-link/audio/${length}s.mp3`)
}

function endRound() {
	audio(`/weakest-link/audio/round-end.mp3`)
}

function voting() {
	// Voting bed - https://www.youtube.com/watch?v=Mfh3eu0VD4E
	audio(`/weakest-link/audio/voting.mp3`)
}

function walkOfShame() {
	// Has good quality everything - https://www.youtube.com/watch?v=11i_Y4FD554
	audio(`/weakest-link/audio/walk-of-shame.mp3`)
}

async function finalRound1() {
	// Final winner - https://www.youtube.com/watch?v=WAa47Fb5xKc
	audio(`/weakest-link/audio/final-round1.mov`)
}

async function finalRound2() {
	// Final winner - https://www.youtube.com/watch?v=WAa47Fb5xKc
	audio(`/weakest-link/audio/final-round2.mov`)
}

async function winner() {
	// Final winner - https://www.youtube.com/watch?v=WAa47Fb5xKc
	audio(`/weakest-link/audio/winner.mp3`)
}

function suddenDeath() {
	// Has good quality everything - https://www.youtube.com/watch?v=11i_Y4FD554
	audio(`/weakest-link/audio/sudden-death.mp3`)
}

function intro() {
	// Has good quality everything - https://www.youtube.com/watch?v=11i_Y4FD554
	audio(`/weakest-link/audio/intro.mov`)
}

function stop() {
	// Remove previous audio tags
	if (document.getElementById(ELEMENT_ID)) {
		document.getElementById(ELEMENT_ID).remove()
	}
}

export default {
	sting,
	sting2,
	intro,
	round,
	endRound,
	voting,
	walkOfShame,
	stop,
	finalRound1,
	finalRound2,
	winner,
	suddenDeath
}
