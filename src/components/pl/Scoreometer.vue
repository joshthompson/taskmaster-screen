<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import PLAudio from '@/services/pl/PLAudio'
	import WLAudio from '@/services/wl/WLAudio'

	@Component
	export default class Scoreometer extends Vue {

		private standardMax: number = 100		// The standard number for timings to be correct
		private max: number = 100
		private active: boolean = false
		private current: number = this.max
		private final: number = 0
		private target: number = null
		private duration: number = 7500			// Duration of a full countdown in ms
		private wobble: boolean = false
		public percentExtra: number = 100
		private lastUpdate: number = null		// Used to know progress between larger steps

		public pointless: boolean = false

		@Prop() public type: 'standard' | 'left' | 'right'

		private blueGlow: boolean = false

		public created() {
			this.wobbleToggle()
		}

		private wobbleToggle() {
			this.wobble = !this.wobble
			setTimeout(() => this.wobbleToggle(), 500)
		}

		public start() {
			this.active = true
			this.current = this.max
			this.reduce()
			this.pointless = false
			PLAudio.countdown()
		}

		public get step() {
			return this.duration / this.max
		}

		public reduce() {
			this.current--
			this.lastUpdate = Date.now()

			if (this.current === this.target) {
				PLAudio.passedRedLine()
			}

			if (this.current > this.final) {
				setTimeout(() => this.reduce(), this.step)
			} else {
				PLAudio.correct()
				this.pointless = this.final === 0
				this.blueGlow = true
				setTimeout(() => this.blueGlow = false, 500)
			}
			this.calcPercentExtra()
		}

		public get percent() {
			return 100 * this.current / this.max
		}

		public calcPercentExtra() {
			if (this.active && this.current > this.final) {
				const d = (Date.now() - this.lastUpdate) / this.step
				this.percentExtra = this.percent - d * this.standardMax / this.max
				setTimeout(() => this.calcPercentExtra(), 50)
			} else {
				this.percentExtra = this.percent
			}
		}

		public pointClass(i: number) {
			return {
				old: this.active && i > this.current,
				current: this.active && i === this.current,
				target: i === this.target
			}
		}

		public get pointsClass() {
			return {
				blueGlow: this.blueGlow
			}
		}

		public get glowStyle() {
			return {
				// transition: `top ${this.step / 1000}s linear`,
				top: `${ 25 + this.percentExtra * 0.5 }%` // 25-75%
			}
		}

		public get scoreBackgroundStyle() {
			if (this.pointless) {
				return {
					background: this.wobble ? '#33CC78' : '#C1CCB9'
				}
			}
			const p1 = 0
			const p2 = this.percentExtra ** 2 / 100
			const p3 = Math.min(100, p2 + 30)
			return {
				background: `linear-gradient(0deg,
					#EC5989 ${p1}%,
					#E90A52 ${p2}%,
					#2C089B ${p3}%
				)`
			}
		}

		public pointInnerStyle(i: number) {
			const width = Math.max(100 * (this.max - i) / this.max, 0)
			return {
				width: `${width}%`
			}
		}
	}
</script>

<template>
	<div class="score-o-meter" :class="{ pointless }" :type="type">
		<div class="score-background" :style="scoreBackgroundStyle" :class="{ white: blueGlow }">
			<div class="overlay"></div>
			<div class="vertical"></div>
			<div class="horizontal"></div>
			<div class="middle"></div>
			<div class="middle2"></div>
		</div>
		<div class="score">
			<div class="number-container">
				<div v-if="type !== 'standard'" class="divide"></div>
				<div class="number" @click="start(false)">
					<div class="inner">{{ type === 'standard' && pointless ? 'POINTLESS' : current }}</div>
				</div>
			</div>
			<div class="glow left" :style="glowStyle"></div>
			<div class="glow right" :style="glowStyle"></div>
			<div class="border"></div>
			<div class="points" :class="pointsClass">
				<div
					class="point"
					v-for="i in max"
					:data-glow="(max-i) * 0.2"
					:key="i"
					:class="pointClass(i)"
				>
					<div class="inner" :style="pointInnerStyle(i)"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import '@/style/sizing.scss';

	.score-o-meter {
		position: absolute;
		top: 0;
		right: 0;
		width: s(40);
		height: s(100);
		overflow: hidden;

		&[type="left"] {
			right: s(20);
			width: s(20);
			& > * {
				margin-right: s(-20);
			}
		}

		&[type="right"] {
			width: s(20);
		}
	}

	[type="left"],
	[type="right"] {
		display: initial;
		.score .points .point {
			width: 50%;
		}

		.score .number {
			font-size: s(6.5);
		}
	}

	[type="left"] {
		.score .points .point {
			background: linear-gradient(
				90deg,
				rgb(168, 162, 97) 20%,
				rgb(223, 208, 37) 40%,
				rgb(247, 240, 22) 80%,
				rgb(255, 255, 255) 100%
			);
			align-items: flex-end;

			.inner {
				background: linear-gradient(
					90deg,
					rgba(255, 255, 255, 0) 0%,
					rgba(255, 255, 255, 0.7) 70%
				);
			}
		}

		.score .number .inner {
			padding-right: s(14);
		}
	}

	[type="right"] {

		.score .points .point {
			margin-left: 50%;
			background: linear-gradient(
				90deg,
				rgb(255, 255, 255) 0%,
				rgb(22, 232, 247) 20%,
				rgb(37, 217, 223) 60%,
				rgb(97, 163, 168) 100%,
			);
			align-items: flex-start;

			.inner {
				background: linear-gradient(
					90deg,
					rgba(255, 255, 255, 0.7) 30%,
					rgba(255, 255, 255, 0) 100%
				);
			}
		}

		.score .number .inner {
			padding-left: s(14);
		}
	}
	
	.score-background {
		$bg-border: s(1) solid #000000;
		position: absolute;
		top: 0;
		right: 0;
		height: s(100);
		width: s(40);
		transition: background 0.5s linear;

		background: #DDDDFF;
		border: $bg-border;

		.vertical {
			position: absolute;
			top: s(5);
			top: s(4);
			left: s(-1);
			width: s(40);
			height: s(90);
			border: $bg-border;
		}

		.horizontal {
			position: absolute;
			top: s(-1);
			left: s(4);
			width: s(30);
			height: s(100);
			border: $bg-border;
		}
		
		.middle {
			position: absolute;
			top: s(-1);
			left: s(-1);
			width: s(40);
			height: s(50);
			border: $bg-border;
		}
		
		.middle2 {
			position: absolute;
			top: s(-1);
			left: s(-1);
			width: s(20.5);
			height: s(100);
			border: $bg-border;
		}

		.overlay {
			position: absolute;
			width: s(38);
			height: s(98);
			background: rgba(255, 255, 255, 0);
			transition: background 0.5s linear;
		}

		.pointless & .overlay {
			background: rgba(255, 255, 255, 0);
		}
	}

	.score-background-overlay {
		position: absolute;
		top: 0;
		right: 0;
		height: s(100);
		width: s(40);
	}

	.score {
		position: absolute;
		z-index: 9;
		top: s(5);
		right: s(5);
		width: s(30);
		height: s(90);
		transition: filter 0.5s ease-in-out;
		background: #000000;
		display: flex;
		flex-direction: column;
		border-radius: s(1);
		overflow: hidden;
		padding: s(1);

		.number-container {
			position: relative;
			display: flex;

			.divide {
				position: absolute;
				width: s(1);
				height: s(13.9);
				border: s(0.25) solid black;
				border-top: none;
				border-bottom: none;
				top: s(0.75);
				left: s(27.6 / 2 - 0.25);
				background: #FFFFFF;
				z-index: 12;
			}
		}

		.number {
			position: relative;
			z-index: 10;
			border: s(0.5) solid #FFFFFF;
			height: s(15);
			width: s(27.6);
			margin: s(0.2);
			line-height: s(14);
			border-radius: 50%;
			text-align: center;
			font-size: s(12.5);
			font-weight: bold;
			text-shadow: 0 0 s(1) #000000;
			background: rgb(255, 255, 255);
			background: linear-gradient(
				180deg,
				rgba(255,255,255,1) 0%,
				rgba(139,137,161,1) 7%,
				rgba(29,23,119,1) 22%,
				rgba(86,22,144,1) 50%,
				rgba(204,19,195,1) 83%,
				rgba(40,23,124,1) 100%
			);

			& .inner {
				position: relative;
				z-index: 13;
				height: s(14);
				border: s(0.25) solid #000000;
				box-shadow: inset 0 0 s(1) #000000;
				border-radius: inherit;
			}

			.pointless[type="standard"] & {
				animation: pointless-text 0.5s linear;
				font-size: s(4);

				@keyframes pointless-text {
					0% { font-size: s(0); }
					70% { font-size: s(4.5); }
				}
			}

		}

		.points {
			flex-grow: 1;
			display: flex;
			flex-direction: column-reverse;
			margin-top: s(2);
			background: radial-gradient(circle, rgba(24,23,177,1) 9%, rgba(0,0,0,1) 59%);

			.point {
				flex-grow: 1;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;

				.inner {
					flex-grow: 1;
					background: linear-gradient(
						90deg,
						rgba(255, 255, 255, 0) 0%,
						rgba(255, 255, 255, 0.3) 30%,
						rgba(255, 255, 255, 0.7) 70%,
						rgba(255, 255, 255, 0) 100%
					);
				}

				background: rgb(97,123,168);
				background: linear-gradient(
					90deg,
					rgba(97,123,168,1) 10%,
					rgba(172,220,224,1) 20%,
					rgba(172,220,224,1) 80%,
					rgba(97,123,168,1) 90%
				);
				border-bottom: s(0.25) solid rgba(0, 0, 0, 0.25);

				&.current {
					z-index: 2;
					background: linear-gradient(
						90deg,
						rgb(49, 11, 235) 0%,
						rgba(204,19,195,1) 17%,
						rgba(204,19,195,1) 30%,
						rgb(244, 134, 238) 50%,
						rgba(204,19,195,1) 70%,
						rgba(204,19,195,1) 83%,
						rgb(49, 11, 235) 100%
					);
					box-shadow: 0 0 s(0.5) s(0.25) rgba(21, 0, 255, 0.5);
				}

				&.target {
					z-index: 2;
					background: #990000;
					box-shadow: 0 0 s(1) s(0.25) rgba(255, 0, 0, 0.5);
					border-color: #990000;
				}

				&.old {
					opacity: 0;
				}

				&.old:not(.target) {
					transform: translateY(s(-10));
					animation: fadeUp 0.5s ease-in;
				}

				&.old.target {
					animation: targetGlow 2s ease-in;
					border: transparent;
					height: 0;
					background: rgba(255, 0, 0, 0.67);
					z-index: 10;
					box-shadow: 0 0 s(15) s(15) rgba(255, 0, 0, 0.7);
				}

				@keyframes targetGlow {
					0%, 100% {
						opacity: 0;
					}
					20% {
						opacity: 1;
						// box-shadow: 0 0 s(1) s(1) rgba(255, 0, 0, 0.7);
					}
				}
			} 
		}

		.border {
			border: s(1) solid #000000;
			position: absolute;
			z-index: 5;
			top: 0;
			left: 0;
			width: s(30);
			height: s(90);
		}

		.glow {
			position: absolute;
			mix-blend-mode: lighten;
			z-index: 6;
			left: 0;
			width: s(1.5);
			height: s(15);
			background: radial-gradient(
				ellipse,
				rgba(255,255,255,1) 0%,
				rgb(249, 204, 107, 0.7) 45%,
				rgba(245, 83, 33, 0.4) 65%,
				rgba(255,160,15,0) 80%
			);

			// background: radial-gradient(ellipse, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%);

			&.right {
				left: initial;
				right: s(0);
			}
		}

	}

	@keyframes fadeUp {
		0% {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
		100% {
			filter: blur(5px);
		}
	}
</style>