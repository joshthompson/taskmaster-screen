import { audio, stop, setVolume } from '@/services/shared/Audio'

async function bing() {
	audio(`/wheel-of-fortune/audio/bing.m4a`)
}

async function peg() {
	audio(`/wheel-of-fortune/audio/peg.m4a`)
}

export default {
	stop,
	setVolume,
	bing,
	peg
}
