import { audio, stop, setVolume } from '@/services/shared/Audio'

async function countdown() {
	audio(`/pointless/audio/countdown.wav`)
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

export default {
	stop,
	setVolume,
	countdown,
	correct,
	wrong,
	pointless,
	passedRedLine
}
