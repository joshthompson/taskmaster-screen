<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	import { WLState } from '@/types/WeakestLink'
	import io from 'socket.io-client'

	@Component
	export default class ScriptBar extends Vue {

		private ready: boolean = false
		private socket: any = io('localhost:6226')

		public created() {
			this.socket.on('connect', (socket) => {
				this.ready = true
				this.socket.emit('update the script', this.script)
				this.socket.emit('update the contestants', this.game?.strongest || [])
			})
		}

		public get script() {
			return (this.$store.state.wl as WLState).script
		}

		public get game() {
			return (this.$store.state.wl as WLState).game
		}

		@Watch('script', { immediate: true })
		private updateScript() {
			this.socket.emit('update the script', this.script)
		}

		@Watch('game', { immediate: true, deep: true })
		private updateContestants() {
			this.socket.emit('update the contestants', this.game?.strongest || [])
		}
	}
</script>

<template>
	<div class="script-bar" v-html="script"></div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	
	.script-bar {
		$textSize: calc((100vh - #{$height}) / 7);
		position: absolute;
		bottom: 0;
		left: 0;
		width: $width;
		height: calc(100vh - #{$height});
		background: #000000;
		color: #FFFFFF;
		padding: 1rem;
		text-align: center;
		line-height: $textSize;
		font-size: $textSize;
		overflow: auto;
	}
</style>

<style lang="scss">
	.script-bar .answer {
		margin-top: 0.5rem;
		color: #008DD4;
	}
</style>
