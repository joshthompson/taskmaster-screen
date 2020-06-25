import { audio, stop, setVolume } from '@/services/shared/Audio'

async function countdown() {
	audio(`/pointless/audio/countdown.wav`, 'default')
}

async function countdownFinal() {
	audio(`/pointless/audio/countdown - final.mp3`, 'default')
}

async function correct() {
	audio(`/pointless/audio/correct.wav`)
}

async function wrong() {
	audio(`/pointless/audio/wrong.wav`)
}

async function passedRedLine() {
	audio(`/pointless/audio/ting.mp3`, 'red-line')
}

async function pointless() {
	stop('red-line')
	audio('/pointless/audio/celebrate.m4a')
}

async function intro() {
	audio('/pointless/audio/intro.mp3')
}

async function flick() {
	audio('/pointless/audio/flick.mp3')
}

async function ting() {
	audio('/pointless/audio/ting.mp3')
}

export default {
	stop,
	setVolume,
	countdown,
	countdownFinal,
	correct,
	wrong,
	pointless,
	passedRedLine,
	intro,
	flick,
	ting
}
