<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class DisplayArea extends Vue {
		@Prop({ default: false }) private screenCapture: boolean

		public get screenCaptureOut() {
			return this.$refs.screenCaptureOut as HTMLVideoElement
		}

		public async created() {
			if (this.screenCapture) {
				try {
					this.screenCaptureOut.srcObject = await (navigator.mediaDevices as any).getDisplayMedia()
					this.screenCaptureOut.play()
				} catch (error) {
					console.log('Error', error)
				}
			}
		}
	}
</script>

<template>
	<div class="display-area">
		<video v-if="screenCapture" ref="screenCaptureOut">
			<source />
		</video>
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
	@import '@/style/sizing.scss';

	.display-area {
		position: relative;
		width: $width;
		height: $height;
		margin: 0;
		background-color: #00FF00;
		user-select: none;
		overflow: hidden;

		video {
			position: absolute;
			top: 0;
			left: 0;
			width: $width;
			height: $height;
		}
	}
</style>
