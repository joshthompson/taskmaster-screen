<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class VT extends Vue {
		@Prop() public video: string
		public faded: boolean = false

		public mounted() {
			const video = this.$refs.video as HTMLVideoElement
			video.play()
			video.onload = () => video.play()
			video.onclick = () => video.paused ? video.play() : video.pause()
			video.onplay = () => this.faded = false
			video.onended = () => this.faded = true
		}
	}
</script>

<template>
	<div class="vt" :class="{ faded }">
		<video ref="video">
			<source :src="video" type="video/mp4" />
		</video>
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
