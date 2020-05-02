<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import Logo from './components/Logo.vue'
	import Scores from './components/Scores.vue'
	import { Contestant } from './types'
	import { getState} from './services/data'

	@Component({
		components: {
			Logo,
			Scores
		}
	})
	export default class App extends Vue {
		public contestants: Contestant[] = []
		public mode: string = 'logo'
		public created() {
			this.getState()
		}
		private async getState() {
			setTimeout(this.getState, 2000)
			const state = await getState()
			this.mode = state.mode
			this.contestants = state.contestants
		}

	}
</script>

<template>
	<div id="app">
		<Logo v-if="mode === 'logo'" />
		<Scores v-if="mode === 'scores'" :contestants="contestants" />
	</div>
</template>

<style lang="scss">
	@import './style/app.scss';
</style>
