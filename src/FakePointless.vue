<script lang="ts">
	import { Component, Watch, Vue } from 'vue-property-decorator'
	import { getState } from './services/data'
	
	import DisplayArea from '@/components/shared/DisplayArea.vue'
	import ControlBar from '@/components/shared/ControlBar.vue'
	import ScriptBar from '@/components/shared/ScriptBar.vue'

	@Component({
		components: { DisplayArea, ControlBar, ScriptBar }
	})
	export default class FakePointless extends Vue {

		private active: boolean = false
		private current: number = 100
		private final: number = 27
		private target: number = null
		private speed: number = 57

		private redGlow: boolean = false
		private blueGlow: boolean = false

		public start() {
			this.active = true
			this.current = 100
			this.reduce()
		}

		public reduce() {
			this.current--

			if (this.current === this.target) {
				this.redGlow = true
				setTimeout(() => this.redGlow = false, 1000)
			}

			

			if (this.current > this.final) {
				setTimeout(() => this.reduce(), this.speed)
			} else {
				this.blueGlow = true
				setTimeout(() => this.blueGlow = false, 1000)
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
	}
</script>

<template>
	<div id="fake-pointless">
		<DisplayArea>
			<div class="score">
				<div class="number" @click="start">
					<div class="inner">{{ current }}</div>
				</div>
				<div class="glow left" :style="glowStyle"></div>
				<div class="glow right" :style="glowStyle"></div>
				<div class="points" :class="pointsClass">
					<div
						class="point"
						v-for="i in 100"
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

	.score {
		position: absolute;
		top: $s5;
		right: $s5;
		width: $s30;
		height: $s90;
		transition: filter 0.5s ease-in-out;
		background: #000000;
		padding: $s1;
		display: flex;
		flex-direction: column;
		border-radius: $s1;

		.number {
			position: relative;
			z-index: 10;
			border: $s0_5 solid #FFFFFF;
			height: $s15;
			line-height: $s14;
			border-radius: 50%;
			font-size: $s12_5;
			font-weight: bold;
			text-shadow: 0 0 $s2 #000000;
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
				height: $s14;
				border: $s0_25 solid #000000;
				box-shadow: inset 0 0 $s1 #000000;
				border-radius: 50%;
			}
		}

		.points {
			flex-grow: 1;
			display: flex;
			flex-direction: column-reverse;
			margin-top: $s2;

			background: radial-gradient(circle, rgba(24,23,177,1) 9%, rgba(0,0,0,1) 59%);

			&.redGlow {
				transition-duration: 0.1s;
				filter: hue-rotate(90deg);
			}

			&.blueGlow {
				transition-duration: 0.1s;
				filter: brightness(1.1);
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
				border-bottom: $s0_25 solid rgba(0, 0, 0, 0.25);

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
					box-shadow: 0 0 $s0_5 $s0_25 rgba(21, 0, 255, 0.5);
				}

				&.target {
					z-index: 2;
					background: #990000;
					box-shadow: 0 0 $s1 $s0_25 rgba(255, 0, 0, 0.5);
				}

				&.old {
					animation: fadeUp 0.5s ease-in;
					opacity: 0;
					transform: translateY($s-10);
				}
			} 
		}

		.glow {
			position: absolute;
			mix-blend-mode: lighten;
			z-index: 3;
			left: 0;
			width: $s1_5;
			height: $s20;
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
