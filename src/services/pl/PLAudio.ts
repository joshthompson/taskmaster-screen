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

export default {
	setVolume,
	countdown,
	correct,
	wrong
}
