<script lang="ts">
import { Contestant, RoundType } from '@/FakeWheelOfFortune.vue'
import WOFAudio from '@/services/wof/WOFAudio'
import { Component, Prop, Vue } from 'vue-property-decorator'
import WOFContestants from './WOFContestants.vue'

export enum Token {
	STAR_PRIZE = 'star-prize',
	PITCHERS_PRIZE = 'pitchers-prize'
}

interface Segment {
	n: number
	value: string | number
	cross?: boolean
	token?: Token
	tokenOrder?: number
	tokenCollected?: boolean
}

enum SpecialSegments {
	BANKRUPT = 'BANKRUPT',
	FREE_SPIN = 'FREE SPIN',
	LOSE_A_TURN = 'LOSE A TURN'
}

@Component({
	components: { WOFContestants }
})
export default class WOFWheel extends Vue {

	@Prop({ default: [] }) public contestants: Contestant[]
	@Prop({ default: 0}) public current: number
	@Prop({ default: false }) public showTotals: boolean
	@Prop() public round: RoundType
	@Prop({ default: 0 }) public rotate: number

	public Token = Token

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

	public segments: Segment[] = [
		{ value: SpecialSegments.BANKRUPT },
		{ value: 700 },
		{ value: 450 },
		{ value: 1000 },
		{ value: 300 },
		{ value: 750 },
		{ value: SpecialSegments.FREE_SPIN, cross: true },
		{ value: 400 },
		{ value: 150 },
		{ value: 600 },
		{ value: 400 },
		{ value: 1000 },
		{ value: SpecialSegments.BANKRUPT },
		{ value: 800 },
		{ value: 250 },
		{ value: 500 },
		{ value: 300 },
		{ value: 200 },
		{ value: SpecialSegments.LOSE_A_TURN, cross: true },
		{ value: 400 },
		{ value: 1000 },
		{ value: 900 },
		{ value: 500 },
		{ value: 200 }
	].map((s, n) => ({ ...s, n }))

	public speed = 0
	public spins = 0
	public readonly deceleration = 0.08
	public readonly pegDeceleration = 0.3
	public readonly spinFrame = 50
	public readonly RoundType = RoundType
	public topSegment: number = 0
	private tokenOrder = 0

	get totalSegments() {
		return this.segments.length
	}

	public segmentData(n: number) {
		const radius = 49
		const cx = 50
		const cy = 50
		const circ = Math.PI * 2
		const start = n * circ / this.totalSegments
		const end = (n + 1) * circ / this.totalSegments

		const rotate = ((this.rotate + 90) % 360) * circ / 360
		const top = rotate > start && rotate <= end

		if (top) {
			this.topSegment = n
		}

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

	public textpath(n: number) {
		const radius = 49
		const cx = 50
		const cy = 50
		const circ = Math.PI * 2
		const angle = (n + 0.5) * circ / this.totalSegments

		return [
			`M ${cx + Math.cos(angle) * radius} ${cy - Math.sin(angle) * radius}`,
			`L ${cx} ${cy}`
		].join(' ')
	}

	public textpathcross(n: number) {
		const radius = 46
		const cx = 50
		const cy = 50
		const circ = Math.PI * 2
		const start = (n + 0.1) * circ / this.totalSegments
		const end = (n + 0.9) * circ / this.totalSegments
		return [
			`M ${cx + Math.cos(end) * radius} ${cy - Math.sin(end) * radius}`,
			`L ${cx + Math.cos(start) * radius} ${cy - Math.sin(start) * radius}`
		].join(' ')
	}

	public tokenData(n: number) {
		const radius = 40
		const tokenSize = 13
		const cx = 50
		const cy = 50
		const circ = Math.PI * 2
		const angle = (n + 0.45) * circ / this.totalSegments
		const x = cx + Math.cos(angle) * (radius * 0.75) - tokenSize / 2
		const y = cy - Math.sin(angle) * (radius * 0.75) - tokenSize / 2
		return {
			x,
			y
		}
	}

	public circle(n: number) {
		const radius = 49
		const cx = 50
		const cy = 50
		const circ = Math.PI * 2
		const angle = n * circ / this.totalSegments

		return {
			cx: cx + Math.cos(angle) * radius,
			cy: cy + Math.sin(angle) * radius,
			fill: '#000000',
			r: 0.75
		}
	}

	public spin(speed?: number) {
		this.spins++
		// Lowest spin = 10
		// Highest spin = 30
		if (speed) {
			this.speed =  Math.abs(speed) + 10
			this.speed = Math.min(this.speed, 40)
			this.speed *= Math.random() * 0.2 + 0.9
		} else {
			this.speed = 20 + Math.random() * 20
		}
		// this.speed = 30
		this.processSpin()
	}

	public stopped() {
		const n = (this.$refs.svg as SVGElement).querySelector('.top').getAttribute('data-segment')
		const segment = this.segments[n]
		if (typeof segment.value === 'number') {
			this.$emit('setValue', segment.value)
		} else { switch (segment.value) {
			case SpecialSegments.BANKRUPT:
				this.$emit('bankrupt')
				break
			case SpecialSegments.FREE_SPIN:
				this.$emit('freeSpin')
				break
			case SpecialSegments.LOSE_A_TURN:
				this.$emit('loseATurn')
				break
		}
		}
		if (segment.token && !segment.tokenCollected) {
			segment.tokenCollected = true
			this.$emit('token', segment.token)
			this.segments = [...this.segments]
		}
	}

	public processSpin() {
		if (Math.abs(this.speed) < 1) {
			this.speed = 0
			this.stopped()
			return
		}

		const direction = this.speed / Math.abs(this.speed)

		this.speed = this.speed + -direction * this.deceleration * ((this.speed + 30) / 30)

		const segment = Math.floor(this.rotate / this.totalSegments)
		const nextSegment = Math.floor((this.rotate + this.speed) / this.totalSegments)
		if (segment !== nextSegment) {
			this.speed = this.speed + -direction * this.pegDeceleration
			WOFAudio.peg()
		}

		this.$emit('setRotate', (this.rotate + this.speed + 360) % 360)
		setTimeout(() => this.processSpin(), this.spinFrame)
	}

	public pathMain(word: string | number) {
		switch (word) {
			case SpecialSegments.FREE_SPIN: return 'SPIN'
			case SpecialSegments.LOSE_A_TURN: return 'TURN'
			default: return word
		}
	}
	public pathCross(word: string | number) {
		switch (word) {
			case SpecialSegments.FREE_SPIN: return 'FREE'
			case SpecialSegments.LOSE_A_TURN: return 'LOSE A'
			default: return null
		}
	}

	public addToken(token: Token) {
		const segments = this.visibleSegments.filter((s) => typeof s.value === 'number' && !s.token)
		const segment = segments[Math.floor(Math.random() * segments.length)]
		if (segment) {
			this.segments = this.segments.map((s) => s.n === segment.n ? { ...s, token, tokenOrder: this.tokenOrder++ } : s)
		}
	}

	public get visibleSegments() {
		return this.segments.filter((_, n) => {
			const dist1 = Math.abs(this.topSegment - n)
			const dist2 = Math.abs(this.topSegment - (n + this.segments.length))
			const dist3 = Math.abs(this.topSegment - (n - this.segments.length))
			const dist = Math.min(dist1, dist2, dist3)
			return dist <= 5
		})
	}

	public get tokenSegments() {
		return this.segments.filter((s) => s.token).sort((a, b) => {
			if (a.tokenCollected && !b.tokenCollected) return 1
			return a.tokenOrder - b.tokenOrder
		})
	}
}
</script>

<template>
	<div>
		<WOFContestants v-if="round !== RoundType.FINAL" :contestants="contestants" :current="current" :showTotals="showTotals" />
		<svg viewBox="0 0 100 100" :style="{ transform: `rotate(${rotate}deg) translate(-50%, 50%)` }" ref="svg" class="wheel">
			<circle class="outer" cx="50" cy="50" r="50" fill="#000000" @click="spin()" />
			<circle cx="50" cy="50" r="49" fill="#FFFFFF" />
			<g class="segments">
				<path
					v-for="(_segment, n) in segments"
					:key="`segment-${n}`"
					class="segment"
					v-bind="segmentData(n)"
					:data-segment="n"
				/>
			</g>
			<g class="pegs">
				<circle v-for="(_segment, n) in segments" :key="`circle-${n}`" v-bind="circle(n)" />
			</g>
			<defs>
				<path v-for="(_segment, n) in segments" :key="`textpath-${n}`" :d="textpath(n)" :id="`textpath-${n}`" />
				<path v-for="(_segment, n) in segments" :key="`textpath-cross-${n}`" :d="textpathcross(n)" :id="`textpath-cross-${n}`" />
			</defs>
			<g>
				<text v-for="(segment, n) in segments" :key="`text-${n}`" :class="{ cross: segment.cross }" class="segment-text">
					<textPath
						v-if="segment.cross"
						class="bg"
						:href="`#textpath-cross-${n}`"
						:data-segment="segment.value"
					>{{ pathCross(segment.value) }}</textPath>
					<textPath
						v-if="segment.cross"
						class="fg"
						:href="`#textpath-cross-${n}`"
						:data-segment="segment.value"
					>{{ pathCross(segment.value) }}</textPath>
					<textPath
						class="bg"
						:href="`#textpath-${n}`"
						:data-segment="segment.value"
						:startOffset="segment.cross ? 5 : 0"
					>{{ pathMain(segment.value) }}</textPath>
					<textPath
						class="fg"
						:href="`#textpath-${n}`"
						:data-segment="segment.value"
						:startOffset="segment.cross ? 5 : 0"
					>{{ pathMain(segment.value) }}</textPath>
				</text>
			</g>
			<circle cx="50" cy="50" r="7" fill="#000000" />
			<circle cx="50" cy="50" r="21" stroke="rgba(0, 0, 0, 0.25)" stroke-width="0.25" fill="rgba(0, 0, 0, 0.125)" />
			<path class="peg" d="M 49 0 L 51 0 L 50 3 L 49 0" :style="{ transform: `rotate(${-rotate}deg)` }" />

			<g class="tokens">
				<g v-for="segment in tokenSegments" :key="`token-${segment.n}`">
					<svg class="token" v-bind="tokenData(segment.n)" :class="{ [segment.token]: true, collected: segment.tokenCollected }">
						<g v-if="segment.token === Token.STAR_PRIZE">
							<path d="M13.99,7.58l-1.6,1.6c-.09,.09-.14,.21-.14,.33v2.26c0,.26-.21,.47-.47,.47h-2.26c-.12,0-.24,.05-.33,.14l-1.6,1.6c-.18,.18-.48,.18-.67,0l-1.6-1.6c-.09-.09-.21-.14-.33-.14H2.72c-.26,0-.47-.21-.47-.47v-2.26c0-.12-.05-.24-.14-.33l-1.6-1.6c-.18-.18-.18-.48,0-.67l1.6-1.6c.09-.09,.14-.21,.14-.33V2.72c0-.26,.21-.47,.47-.47h2.26c.12,0,.24-.05,.33-.14l1.6-1.6c.18-.18,.48-.18,.67,0l1.6,1.6c.09,.09,.21,.14,.33,.14h2.26c.26,0,.47,.21,.47,.47v2.26c0,.12,.05,.24,.14,.33l1.6,1.6c.18,.18,.18,.48,0,.67Z"/>
							<text class="text1">STAR</text>
							<text class="text2">PRIZE</text>
						</g>
						<g v-if="segment.token === Token.PITCHERS_PRIZE">
							<path d="M13.99,7.58l-1.6,1.6c-.09,.09-.14,.21-.14,.33v2.26c0,.26-.21,.47-.47,.47h-2.26c-.12,0-.24,.05-.33,.14l-1.6,1.6c-.18,.18-.48,.18-.67,0l-1.6-1.6c-.09-.09-.21-.14-.33-.14H2.72c-.26,0-.47-.21-.47-.47v-2.26c0-.12-.05-.24-.14-.33l-1.6-1.6c-.18-.18-.18-.48,0-.67l1.6-1.6c.09-.09,.14-.21,.14-.33V2.72c0-.26,.21-.47,.47-.47h2.26c.12,0,.24-.05,.33-.14l1.6-1.6c.18-.18,.48-.18,.67,0l1.6,1.6c.09,.09,.21,.14,.33,.14h2.26c.26,0,.47,.21,.47,.47v2.26c0,.12,.05,.24,.14,.33l1.6,1.6c.18,.18,.18,.48,0,.67Z"/>
							<text class="text">PP</text>
						</g>
					</svg>
				</g>
			</g>
		</svg>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/style/sizing.scss';

	@font-face {
		font-family: 'Seven Segment';
		src: url('/wheel-of-fortune/fonts/seven-segment.ttf');
	}

	$size: 150;

	.wheel {
		width: s($size);
		height: s($size);
		position: absolute;
		left: 50%;
		bottom: 0;
		transform-origin: 0% 100%;

		// .outer {
		// 	cursor: pointer;
		// }

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

		.segment {
			stroke: rgba(0, 0, 0, 0.1);
			stroke-width: 1.5;
		}

		.segment-text {
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

			textPath[data-segment="1000"] {
				letter-spacing: -3.85px;
			}

			textPath[data-segment="BANKRUPT"] {
				font-size: 4px;
				letter-spacing: -2.6px;
			}

			textPath[data-segment="FREE SPIN"] {
				font-size: 4.9px;
				letter-spacing: -2px;

				&[href^="#textpath-cross"] {
					font-size: 3.2px;
					letter-spacing: 0px;
				}
			}

			textPath[data-segment="LOSE A TURN"] {
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

		.token {

			&:not(.collected) > g {
				animation: new-token 1s ease-out;
				transform: scale(1);
				transform-box: content-box;
			}

			&.collected > g {
				animation: token-collected 2s ease-out;
				opacity: 0;
				transform: scale(3);
			}

			@keyframes new-token {
				0% { opacity: 0; transform: scale(3); }
				100% { opacity: 1; transform: scale(1); }
			}

			@keyframes token-collected {
				0% { opacity: 1; transform: scale(1); }
				100% { opacity: 0; transform: scale(3); }
			}

			path {
				transform: scale(1);
				stroke-width: 1px;
				stroke: #c9c23f;
				fill: #fff188;
			}

			&.star-prize {
				path {
					stroke: #c9c23f;
					fill: #fff188;
				}
				text {
					font-size: 2.9px;
					font-weight: bold;
					&.text1 { transform: translate(3.45px, 6.5px); }
					&.text2 { transform: translate(2.85px, 9.5px); }
				}
			}

			&.pitchers-prize {
				path {
					stroke: #c9643f;
					fill: #ffa888;
				}
				text {
					font-size: 6px;
					font-weight: bold;
					transform: rotate(45deg) translate(6.5px, 2.4px);
				}
			}
		}

	}
</style>


