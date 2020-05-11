<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Logo from './components/Logo.vue'
	import Scores from './components/Scores.vue'
	import VT from './components/VT.vue'
	import Slide from './components/Slide.vue'
	import Letter from './components/Letter.vue'
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
	export default class App extends Vue {
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
	<div id="app" :class="{ started }">
		<a 		v-if="!started" @click="started = true">Start</a>
		<Logo   v-if="started && screen.type === 'logo'" />
		<Scores v-if="started && screen.type === 'scores'" :contestants="contestants" />
		<VT     v-if="started && screen.type === 'video'"  :video="screen.video" :key="screen.video" />
		<Slide  v-if="started && screen.type === 'slide'"  :slide="screen.image" />
		<Letter v-if="started && screen.type === 'letter'" :letter="screen.letter" />
	</div>
</template>

<style lang="scss">
	@import './style/app.scss';

	#app.started {
		cursor: none;
	}

	#app > a {
		display: inline-block;
		padding: 2rem 10rem;
		font-size: 4rem;
		color: #000000;
		border-radius: 4rem;
		background: #FFFFFF;
		margin-top: 50vh;
		transform: translateY(-50%);
		cursor: pointer;
	}
</style>
