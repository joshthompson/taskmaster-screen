import { audio, stop, setVolume } from '@/services/shared/Audio'

async function bing() {
	audio(`/wheel-of-fortune/audio/bing.m4a`)
}

export default {
	stop,
	setVolume,
	bing
}
