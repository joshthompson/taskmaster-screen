<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Scores extends Vue {
		public id = 0
		private timeout: number = null
		public preloadedImages: HTMLImageElement[] = [] // To keep preloaded images in memory

		public mounted() {
			this.next(Math.floor(Math.random() * this.images.length))
			this.next();
			this.preloadImages()
		}

		public destroyed() {
			window.clearTimeout(this.timeout)
		}

		public next(setID: number = null) {
			this.id = setID === null ? ++this.id % this.images.length : setID
			this.portrait.style.backgroundImage = this.images[this.id]

			window.clearTimeout(this.timeout)
			this.timeout = window.setTimeout(this.next, 60_000)
		}

		private get portrait() {
			return this.$refs.portrait as HTMLElement;
		}

		private get images() {
			return this.portrait
				? window.getComputedStyle(this.portrait).getPropertyValue('--images').split(', ')
				: []
		}

		private preloadImages() {
			this.preloadedImages = this.images.map(src => {
				const img = new Image()
				img.src = src.substring(6, src.length - 1).replaceAll('\\', '')
				return img
			})
		}
	}
</script>

<template>
	<div class="logo">
		<div class="frame">
			<div ref="portrait" class="portrait" @click="next()"></div>
		</div>
		<div class="text">FAKE TASKMASTER</div>
	</div>
</template>

<style scoped lang="scss">

	.logo {
		width: 100vw;
		height: 100vh;
		background-image: url('../../assets/taskmaster/logo-bg.jpg');
		background-size: cover;
		background-position: center center;

		color: #000000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.frame {
			height: 80vh;
			aspect-ratio: 0.8006777572;
			background-image: url('../../assets/taskmaster/craig-frame.png');
			background-size: 100%;

			.portrait {
				--images: url('../../assets/taskmaster/craig-frida.png'),
						  url('../../assets/taskmaster/craig-popart.png'),
						  url('../../assets/taskmaster/craig-sun.png'),
						  url('../../assets/taskmaster/craig-beard.png'),
						  url('../../assets/taskmaster/craig-clouds.jpg'),
						  url('../../assets/taskmaster/craig-godfather.png'),
						  url('../../assets/taskmaster/craig-throne.png');

				width: 51.3%;
				margin: 22% 23.9%;
				aspect-ratio: 0.63;

				background-color: #000000;
				background-size: cover;
				background-position: center center;
				transition: background-image 0.5s linear;
			}
		}

		.text {
			color: white;
			font-size: 5rem;
			text-shadow: 0 0 1rem #000000;
		}
	}
</style>
