import { audio, stop, setVolume } from '@/services/shared/Audio'

async function countdown(finalRound: boolean = false) {
	audio(`/pointless/audio/countdown.wav`, 'default', finalRound ? 0.5 : 1)
}

async function correct() {
	audio(`/pointless/audio/correct.wav`)
}

async function wrong() {
	audio(`/pointless/audio/wrong.wav`)
}

async function passedRedLine() {
	audio(`/pointless/audio/wrong.wav`, 'red-line')
}

async function pointless() {
	stop('red-line')
	audio('/pointless/audio/celebrate.m4a')
}

async function intro() {
	stop('red-line')
	audio('/pointless/audio/intro.mp3')
}

export default {
	stop,
	setVolume,
	countdown,
	correct,
	wrong,
	pointless,
	passedRedLine,
	intro
}
