import { audio, stop, setVolume } from '@/services/shared/Audio'

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

export default {
	setVolume,
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
