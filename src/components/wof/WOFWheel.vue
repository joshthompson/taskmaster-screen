<script lang="ts">
	import WOFAudio from '@/services/wof/WOFAudio'
	import { Component, Vue } from 'vue-property-decorator'

	interface Word {
		value: string | number
		cross?: boolean
	}

	@Component
	export default class WOFWheel extends Vue {

		public colours = [
			'#C340DE',
			'#7D35CC',
			'#0026DC',
			'#50B291',
			'#F4E84E',
			'#D56B2C',
			'#963335',
			'#409AE8'
		]

		public words: Word[] = [
			{ value: 'BANKRUPT' },
			{ value: 700 },
			{ value: 450 },
			{ value: 1000 },
			{ value: 300 },
			{ value: 750 },
			{ value: 'FREE SPIN', cross: true },
			{ value: 400 },
			{ value: 150 },
			{ value: 600 },
			{ value: 400 },
			{ value: 1000 },
			{ value: 'BANKRUPT' },
			{ value: 800 },
			{ value: 250 },
			{ value: 500 },
			{ value: 300 },
			{ value: 200 },
			{ value: 'LOSE A TURN', cross: true },
			{ value: 400 },
			{ value: 1000 },
			{ value: 900 },
			{ value: 500 },
			{ value: 200 }
		]

		public rotate = 0
		public speed = 0
		public spins = 0
		public readonly deceleration = 0.08
		public readonly pegDeceleration = 0.3
		public readonly spinFrame = 50

		get segments() {
			return this.words.length
		}

		segment(n: number) {
			const radius = 49
			const cx = 50
			const cy = 50
			const circ = Math.PI * 2
			const start = n * circ / this.segments
			const end = (n + 1) * circ / this.segments

			const rotate = ((this.rotate + 90) % 360) * circ / 360
			const top = rotate > start && rotate <= end

			return {
				d: [
					`M ${cx} ${cy}`,
					`L ${cx + Math.cos(start) * radius} ${cy - Math.sin(start) * radius}`,
					`A ${radius} ${radius} 0 0 0 ${cx + Math.cos(end) * radius} ${cy - Math.sin(end) * radius}`,
					`L ${cx} ${cy}`
				].join(' '),
				fill: this.colours[n % this.colours.length],
				class: {
					top,
					stopped: this.speed === 0,
					spun: this.spins > 0
				}
			}
		}

		textpath(n: number) {
			const radius = 49
			const cx = 50
			const cy = 50
			const circ = Math.PI * 2
			const angle = (n + 0.5) * circ / this.segments

			return [
				`M ${cx + Math.cos(angle) * radius} ${cy - Math.sin(angle) * radius}`,
				`L ${cx} ${cy}`
			].join(' ')
		}

		textpathcross(n: number) {
			const radius = 46
			const cx = 50
			const cy = 50
			const circ = Math.PI * 2
			const start = (n + 0.1) * circ / this.segments
			const end = (n + 0.9) * circ / this.segments
			return [
				`M ${cx + Math.cos(end) * radius} ${cy - Math.sin(end) * radius}`,
				`L ${cx + Math.cos(start) * radius} ${cy - Math.sin(start) * radius}`
			].join(' ')
		}

		circle(n: number) {
			const radius = 49
			const cx = 50
			const cy = 50
			const circ = Math.PI * 2
			const angle = n * circ / this.segments

			return {
				cx: cx + Math.cos(angle) * radius,
				cy: cy + Math.sin(angle) * radius,
				fill: '#000000',
				r: 0.75
			}
		}

		spin() {
			this.spins++
			// Lowest spin = 10
			// Highest spin = 30
			this.speed = 20 + Math.random() * 20
			// this.speed = 30
			this.processSpin()
		}

		stopped() {
			const rotate = this.rotate % 360
			const segment = (Math.floor(rotate / this.segments) - 12 + this.words.length) % this.words.length
			const word = this.words[segment]
			console.log((this.$refs.svg as SVGElement).querySelector('.top').getAttribute('data-word'))
		}

		processSpin() {
			if (Math.abs(this.speed) < 1) {
				this.speed = 0
				this.stopped()
				return
			}

			const direction = this.speed / Math.abs(this.speed)

			this.speed = this.speed + -direction * this.deceleration * ((this.speed + 30) / 30)

			const segment = Math.floor(this.rotate / this.segments)
			const nextSegment = Math.floor((this.rotate + this.speed) / this.segments)
			if (segment !== nextSegment) {
				this.speed = this.speed + -direction * this.pegDeceleration
				WOFAudio.peg()
			}

			this.rotate += this.speed
			this.rotate = (this.rotate + 360) % 360

			setTimeout(() => this.processSpin(), this.spinFrame)
		}

		pathMain(word: string) {
			switch (word) {
				case 'FREE SPIN': return 'SPIN'
				case 'LOSE A TURN': return 'TURN'
				default: return word
			} 
		}
		pathCross(word: string) {
			switch (word) {
				case 'FREE SPIN': return 'FREE'
				case 'LOSE A TURN': return 'LOSE A'
				default: return null
			} 
		}
	}
</script>

<template>
	<svg viewBox="0 0 100 100" :style="{ transform: `rotate(${rotate}deg) translate(-50%, 50%)` }" ref="svg">
		<circle class="outer" cx="50" cy="50" r="50" fill="#000000" @click="spin()" />
		<circle cx="50" cy="50" r="49" fill="#FFFFFF" />
		<g class="segments">
			<path v-for="(word, n) in words" :key="`segment-${n}`" v-bind="segment(n)" :data-word="word.value" />
		</g>
		<g class="pegs">
			<circle v-for="(word, n) in words" :key="`circle-${n}`" v-bind="circle(n)" />
		</g>
		<defs>
			<path v-for="(word, n) in words" :key="`textpath-${n}`" :d="textpath(n)" :id="`textpath-${n}`" />
			<path v-for="(word, n) in words" :key="`textpath-cross-${n}`" :d="textpathcross(n)" :id="`textpath-cross-${n}`" />
		</defs>
		<g>
			<text v-for="(word, n) in words" :key="`text-${n}`" :class="{ cross: word.cross }">
				<textPath
					v-if="word.cross"
					class="bg"
					:href="`#textpath-cross-${n}`"
					:data-word="word.value"
				>{{ pathCross(word.value) }}</textPath>
				<textPath
					v-if="word.cross"
					class="fg"
					:href="`#textpath-cross-${n}`"
					:data-word="word.value"
				>{{ pathCross(word.value) }}</textPath>
				<textPath
					class="bg"
					:href="`#textpath-${n}`"
					:data-word="word.value"
					:startOffset="word.cross ? 5 : 0"
				>{{ pathMain(word.value) }}</textPath>
				<textPath
					class="fg"
					:href="`#textpath-${n}`"
					:data-word="word.value"
					:startOffset="word.cross ? 5 : 0"
				>{{ pathMain(word.value) }}</textPath>
			</text>
		</g>
		<circle cx="50" cy="50" r="7" fill="#000000" />
		<circle cx="50" cy="50" r="21" stroke="rgba(0, 0, 0, 0.25)" stroke-width="0.25" fill="rgba(0, 0, 0, 0.125)" />
		<path class="peg" d="M 49 0 L 51 0 L 50 3 L 49 0" :style="{ transform: `rotate(${-rotate}deg)` }" />
	</svg>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	$size: 150;
	
	svg {
		width: s($size);
		height: s($size);
		position: absolute;
		left: 50%;
		bottom: 0;
		transform-origin: 0% 100%;

		.outer {
			cursor: pointer;
		}

		:not(.outer) {
			pointer-events: none;
		}

		.stopped.spun.top {
			animation: flash 2s ease-in-out infinite;
		}

		.peg {
			fill: #000000;
			transform-origin: 50px 50px; 
		}

		@keyframes flash {
			50% {
				opacity: 0.5;
			}
		}

		text {
			font-size: 7px;
			font-weight: bold;
			fill: black;
			stroke: white;
			stroke-width: 1;
			font-family: Arial Black, Helvetica, sans-serif;
			writing-mode: vertical-lr;
			text-orientation: upright;
			letter-spacing: -0.9px;

			textPath[href^="#textpath-cross"] {
				text-orientation: sideways;
			}

			textPath[data-word="1000"] {
				letter-spacing: -3.85px;
			}

			textPath[data-word="BANKRUPT"] {
				font-size: 4px;
				letter-spacing: -2.6px;
			}

			textPath[data-word="FREE SPIN"] {
				font-size: 4.9px;
				letter-spacing: -2px;

				&[href^="#textpath-cross"] {
					font-size: 3.2px;
					letter-spacing: 0px;
				}
			}

			textPath[data-word="LOSE A TURN"] {
				font-size: 4.9px;
				letter-spacing: -2.1px;

				&[href^="#textpath-cross"] {
					font-size: 2.3px;
					letter-spacing: 0px;
				}
			}

			.fg {
				stroke-width: 0;
			}
		}

	}
</style>


