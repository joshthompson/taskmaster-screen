import { audio, stop, setVolume } from '@/services/shared/Audio'

async function bing() {
	audio(`/wheel-of-fortune/audio/bing.m4a`)
}

async function peg() {
	audio(`/wheel-of-fortune/audio/peg.m4a`)
}

async function bankrupt() {
	audio(`/wheel-of-fortune/audio/bankrupt.mp3`)
}

async function wrong() {
	audio(`/wheel-of-fortune/audio/wrong.mp3`, { volume: 0.3 })
}

async function token() {
	audio(`/wheel-of-fortune/audio/prize.mp3`)
}

export default {
	stop,
	setVolume,
	bing,
	peg,
	bankrupt,
	wrong,
	token
}
