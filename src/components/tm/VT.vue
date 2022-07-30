<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { setServerState } from '@/services/tm/TMFetchData'
	import { TMScreenState } from '@/types/TaskMaster'

	@Component
	export default class VT extends Vue {
		@Prop() public screen: TMScreenState
		public faded: boolean = false

		public get video() {
			return this.screen.video;
		}

		public get audio() {
			return this.screen.audio;
		}

		public mounted() {
			const media = this.$refs.media as HTMLMediaElement
			media.play()
			media.onload = () => media.play()
			media.onclick = () => media.paused ? media.play() : media.pause()
			media.onplay = () => this.faded = false
			media.onended = () => {
				this.faded = true
				setServerState(this.screen.after || { type: 'logo' });
			}
		}
	}
</script>

<template>
	<div class="vt" :class="{ faded }">
		<video v-if="video" ref="media" autoplay>
			<source :src="video" type="video/mp4" />
		</video>
		<audio v-if="audio" ref="media" autoplay>
			<source :src="audio" type="audio/m4a" />
		</audio>
	</div>
</template>

<style scoped lang="scss">
	.vt {
		background: #000000;
		width: 100vw;
		height: 100vh;

		&.faded video {
			opacity: 0;
		}

		video {
			width: 100vw;
			height: 100vh;
			transition: opacity 0s linear;
		}
	}
</style>
