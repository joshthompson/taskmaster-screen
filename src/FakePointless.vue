<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	import { getState } from './services/tm/TMFetchData'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'

	import PLAudio from '@/services/pl/PLAudio'

	@Component({
		components: { DisplayArea, ControlBar, ScriptBar }
	})
	export default class FakePointless extends Vue {

		private max: number = 100
		private active: boolean = false
		private current: number = 100
		private final: number = 50
		private target: number = 80
		private duration: number = 7500 // Duration of a full countdown in ms

		private redGlow: boolean = false
		private blueGlow: boolean = false

		public start() {
			this.active = true
			this.current = 100
			this.reduce()
			PLAudio.countdown()
		}

		public reduce() {
			this.current--

			if (this.current === this.target) {
				this.redGlow = true
				setTimeout(() => this.redGlow = false, 1000)
			}

			if (this.current > this.final) {
				setTimeout(() => this.reduce(), this.duration / this.max)
			} else {
				PLAudio.correct()
				this.blueGlow = true
				setTimeout(() => this.blueGlow = false, 500)
			}
		}

		public pointClass(i: number) {
			return {
				old: this.active && i > this.current,
				current: this.active && i === this.current,
				target: i === this.target && this.current > this.target
			}
		}

		public get pointsClass() {
			return {
				redGlow: this.redGlow,
				blueGlow: this.blueGlow
			}
		}

		public get glowStyle() {
			return {
				top: `${ 25 + this.current * 0.5 }%` // 25-75%
			}
		}

		public get scoreBackgroundStyle() {
			const p1 = 0
			const p2 = this.current ** 2 / 100
			const p3 = Math.min(100, p2 + 30)
			return {
				background: `linear-gradient(0deg,
					#EC5989 ${p1}%,
					#E90A52 ${p2}%,
					#2C089B ${p3}%
				)`
			}
		}
	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea>
			<div class="score-background" :style="scoreBackgroundStyle" :class="{ white: blueGlow }">
				<div class="overlay"></div>
				<div class="vertical"></div>
				<div class="horizontal"></div>
				<div class="middle"></div>
			</div>
			<div class="score">
				<div class="number" @click="start">
					<div class="inner">{{ current }}</div>
				</div>
				<div class="glow left" :style="glowStyle"></div>
				<div class="glow right" :style="glowStyle"></div>
				<div class="points" :class="pointsClass">
					<div
						class="point"
						v-for="i in max"
						:key="i"
						:class="pointClass(i)"
					></div>
				</div>
			</div>
		</DisplayArea>
		<ControlBar>
			<h3>Pointless</h3>
		</ControlBar>
		<ScriptBar />
	</div>
</template>

<style lang="scss">
	@import './style/sizing.scss';
	#fake-pointless {
		height: 100vh;
		width: 100vw;
		position: relative;

		.btn {
			border: 0;
			display: inline-block;
			background: #FFFFFF;
			color: #000000;
			text-transform: uppercase;
			padding: 0.5em 1em;
			margin: 0.25rem;
			border-radius: 0.5em;
			cursor: pointer;
			outline: none;

			&.large {
				font-size: 1rem;
			}

			&:hover {
				background: #EEEEEE;
			}
		}
	}

	.score-background {
		$bg-border: s(1) solid #000000;
		position: absolute;
		top: 0;
		right: 0;
		height: s(100);
		width: s(40);

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

		.overlay {
			position: absolute;
			width: s(38);
			height: s(98);
			background: rgba(255, 255, 255, 0);
			transition: background 0.5s linear;
		}

		&.white .overlay {
			background: rgba(255, 255, 255, 0.8);
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
		top: s(5);
		right: s(5);
		width: s(30);
		height: s(90);
		transition: filter 0.5s ease-in-out;
		background: #000000;
		padding: s(1);
		display: flex;
		flex-direction: column;
		border-radius: s(1);

		.number {
			position: relative;
			z-index: 10;
			border: s(0.5) solid #FFFFFF;
			height: s(15);
			line-height: s(14);
			border-radius: 50%;
			font-size: s(12.5);
			font-weight: bold;
			text-shadow: 0 0 s(2) #000000;
			background: rgb(255,255,255);
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
				z-index: 11;
				height: s(14);
				border: s(0.25) solid #000000;
				box-shadow: inset 0 0 s(1) #000000;
				border-radius: 50%;
			}
		}

		.points {
			flex-grow: 1;
			display: flex;
			flex-direction: column-reverse;
			margin-top: s(2);

			background: radial-gradient(circle, rgba(24,23,177,1) 9%, rgba(0,0,0,1) 59%);

			&.redGlow {
				transition-duration: 0.1s;
				filter: hue-rotate(90deg);
			}


			.point {
				flex-grow: 1;
				position: relative;

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
					animation: fadeUp 0.5s ease-in;
					opacity: 0;
					transform: translateY(s(-10));
				}
			} 
		}

		.glow {
			position: absolute;
			mix-blend-mode: lighten;
			z-index: 3;
			left: 0;
			width: s(1.5);
			height: s(20);
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
				right: 0;
			}
		}

	}

	@keyframes fadeUp {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
