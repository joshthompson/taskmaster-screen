<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	
	@Component
	export default class PointlessTrophy extends Vue {
		public mounted() {
			const video = this.$refs.video as HTMLVideoElement
			video.addEventListener('ended', () => this.$emit('finished'))
		}
	}
</script>s

<template>
	<video ref="video" src="/pointless/video/trophy.mp4" autoplay></video>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';
	video {
		width: $width;
		height: $height;
	}
</style>
