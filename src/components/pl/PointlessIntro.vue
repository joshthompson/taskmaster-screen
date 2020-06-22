<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import PLAudio from '@/services/pl/PLAudio'
	import CircleOverlay from '@/components/pl/CircleOverlay.vue'
	import { PointlessGame } from '@/types/Pointless'

	@Component({
		components: { CircleOverlay }
	})
	export default class PointlessIntro extends Vue {

		@Prop() private game: PointlessGame

		public rings: any[] = []
		public numbers: any[] = []

		private length: number = 27
		public ending: boolean = false
		public starring: any = null

		public created() {
			PLAudio.intro()

			const ringsPerSecond = 4
			const totalRings = this.length * ringsPerSecond
			for (let i = 0; i < totalRings; i++) {
				this.rings.push({
					animationDelay: `${i / ringsPerSecond}s`,
					transform: `translateX(${Math.random() * i * 20 - 100}%) translateY(${Math.random() * i * 20 - 100}%)`,
					transformOrigin: `${Math.random() * 300 - 150}% ${Math.random() * 200 - 100}%`
				})
			}

			const numbersPerSecond = 1
			for (let i = 0; i < this.length * numbersPerSecond; i++) {
				this.numbers.push({
					value: Math.floor(Math.random() * 26),
					animationDelay: `${i / numbersPerSecond}s`,
					transform: `
						translateX(-50%)
						translateY(-50%)
						translateX(${Math.random() * 2000 - 1000}%)
						translateY(${Math.random() * 700 - 350}%)
					`
				})
			}

			const starring = [ 'Craig Pitcher', 'Josh Thompson' ]
			this.game.teams.map((team) => starring.push(...team.credits))
			const duration = (this.length - 10) * 1000 / starring.length
			starring.forEach((s, i) => setTimeout(() => this.starring = s, duration * (i + 1)))

			setTimeout(() => {
				this.ending = true
			}, (this.length - 6) * 1000)

			setTimeout(() => {
				this.$emit('finished')
			}, this.length * 1000)
		}
	}
</script>

<template>
    <CircleOverlay class="pointless-intro">
		<div class="rings">
			<div class="ring" v-for="(ring, i) in rings" :key="i" :style="ring"></div>
		</div>
		<div class="numbers">
			<div class="number" v-for="(number, i) in numbers" :key="i" :style="number">
				{{ number.value }}
			</div>
		</div>
		<div class="ending" v-if="ending">
			<h1>Fake<br/>Pointless</h1>
		</div>
		<div class="starring" :key="starring" v-if="starring">
			{{ starring }}
		</div>
    </CircleOverlay>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	.pointless-intro {
		background: linear-gradient(20deg, rgb(70, 33, 180) 30%, rgb(50, 43, 184) 50%, rgba(32,26,171,1) 61%, rgba(41,31,179,1) 62%, rgb(86, 49, 199) 100%);
		width: $width;
		height: $height;
		position: relative;
	}

	.rings {
		width: $width;
		height: $height;
		animation: rings 26s linear;
	}

	.ring {
		position: absolute;
		top: s(50);
		left: s(50 * 16/9);
		transform:
			translateX(-50%)
			translateY(-50%);

		animation: ring 4s ease-in;

		width: s(30);
		height: s(3);
		background: rgba(255, 255, 255, 0.5);
		border: s(0.25) solid rgba(255, 255, 255, 0.65);
		border-radius: 50%;
		opacity: 0;
		transition: all 3s linear;
	}

	.number {
		position: absolute;
		top: s(50);
		left: s(50 * 16/9);

		font-size: s(10);
		color: #FFFFFF;
		text-shadow: 0 0 s(1) rgba(0, 0, 0, 0.5);
		animation: number 4s ease-in;
		opacity: 0;
	}
	.ending {
		position: absolute;
		top: s(50);
		left: s(50 * 16/9);
		transform: translateX(-50%) translateY(-50%) rotate(-10deg);
		font-size: s(15);
		text-shadow: 0 0 s(2.5) rgba(0, 0, 0, 0.5);
		opacity: 1;
		animation: ending 1.4s ease-out;
	}

	.starring {
		position: absolute;
		top: s(90);
		left: s(50 * 16/9);
		font-size: s(6);
		text-shadow: 0 0 s(2.5) rgba(0, 0, 0, 0.5);
		opacity: 0;
		animation: starring 2.5s ease-out;
		transform: translateX(-50%);
	}

	@keyframes ring {
		3%, 97% {
			opacity: 1;
		}
		0% {
			transform: translateX(-50%) translateY(-50%) rotate3d(1, 1, 1, -300deg);
		}
	}

	@keyframes rings {
		50% {
			transform:
				scale(1.5);
		}
	}

	@keyframes ending {
		0% {
			opacity: 0;
			transform: scale(3) translateX(-50%) translateY(-50%) rotate(5deg);
		}
	}

	@keyframes starring {
		10%, 90% {
			opacity: 1;
		}
	}

	@keyframes number {
		0% {
			opacity: 0;
			font-size: s(5);
		}
		20%, 80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			font-size: s(25);
		}
	}
</style>
