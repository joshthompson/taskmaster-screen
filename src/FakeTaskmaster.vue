<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Logo from './components/tm/Logo.vue'
	import Scores from './components/tm/Scores.vue'
	import VT from './components/tm/VT.vue'
	import Slide from './components/tm/Slide.vue'
	import Letter from './components/tm/Letter.vue'
	import { Contestant, ScreenState } from './types'
	import { getState } from './services/data'

	@Component({
		components: {
			Logo,
			Scores,
			VT,
			Slide,
			Letter
		}
	})
	export default class FakeTaskmaster extends Vue {
		public started: boolean = false
		public contestants: Contestant[] = []
		public screen: ScreenState = { type: 'logo' }
		public created() {
			this.getState()
		}
		private async getState() {
			setTimeout(this.getState, 2000)
			const state = await getState()
			this.screen = state.screen
			this.contestants = state.contestants
		}

	}
</script>

<template>
	<div id="fake-taskmaster">
		<Logo   v-if="screen.type === 'logo'" />
		<Scores v-if="screen.type === 'scores'" :contestants="contestants" />
		<VT     v-if="screen.type === 'video'"  :video="screen.video" :key="screen.video" />
		<Slide  v-if="screen.type === 'slide'"  :slide="screen.image" />
		<Letter v-if="screen.type === 'letter'" :letter="screen.letter" />
	</div>
</template>

<style lang="scss" scoped>
	#fake-taskmaster {
		margin-top: 0;
		font-family: 'Veteran-Typewriter'; 
		background: url('assets/bg.jpg');
		background-size: cover;
		min-height: 100vh;
	}
</style>